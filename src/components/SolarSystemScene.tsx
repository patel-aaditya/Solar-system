import { Suspense, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';
import { solarSystem, type MoonSpec, type PlanetSpec } from '../data/solarSystem';

type SolarSystemSceneProps = {
  className?: string;
  style?: CSSProperties;
  selectedBody?: string;
  onSelectBody?: (body: string) => void;
};

function Sun({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect?: (body: string) => void;
}) {
  const sunRef = useRef<Mesh | null>(null);

  useFrame(({ clock }, delta) => {
    if (!sunRef.current) {
      return;
    }

    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2.4) * 0.03;
    sunRef.current.rotation.y += delta * 0.18;
    sunRef.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <pointLight
        position={[0, 0, 0]}
        intensity={180}
        distance={140}
        color={solarSystem.sunGlow}
        decay={1.6}
      />
      <mesh
        ref={sunRef}
        onClick={() => onSelect?.('Sun')}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = '';
        }}
      >
        <sphereGeometry args={[solarSystem.sunRadius, 64, 64]} />
        <meshStandardMaterial
          color={solarSystem.sunColor}
          emissive={solarSystem.sunGlow}
          emissiveIntensity={isSelected ? 4.3 : 3.2}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      <mesh scale={isSelected ? 1.24 : 1.18}>
        <sphereGeometry args={[solarSystem.sunRadius, 64, 64]} />
        <meshBasicMaterial
          color={solarSystem.sunGlow}
          transparent
          opacity={isSelected ? 0.2 : 0.12}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({ planet }: { planet: PlanetSpec }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry
        args={[planet.orbitRadius - 0.04, planet.orbitRadius + 0.04, 160]}
      />
      <meshBasicMaterial
        color={planet.accent}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Moon({ moon, phase }: { moon: MoonSpec; phase: number }) {
  const moonRef = useRef<Group | null>(null);

  useFrame(({ clock }, delta) => {
    if (!moonRef.current) {
      return;
    }

    const t = clock.getElapsedTime() * moon.speed + phase;
    moonRef.current.position.set(
      Math.cos(t) * moon.orbitRadius,
      Math.sin(t * 1.7) * moon.orbitRadius * 0.08,
      Math.sin(t) * moon.orbitRadius,
    );
    moonRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[moon.size, 24, 24]} />
        <meshStandardMaterial
          color={moon.color}
          roughness={0.85}
          metalness={0.08}
        />
      </mesh>
    </group>
  );
}

function PlanetOrbit({
  planet,
  isSelected,
  onSelect,
}: {
  planet: PlanetSpec;
  isSelected: boolean;
  onSelect?: (body: string) => void;
}) {
  const orbitRef = useRef<Group | null>(null);
  const planetRef = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * planet.orbitSpeed * 0.42;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * planet.spinSpeed * 0.8;
    }
  });

  return (
    <group ref={orbitRef} rotation={[0, 0, planet.tilt]}>
      <OrbitRing planet={planet} />
      <group position={[planet.orbitRadius, 0, 0]}>
        <group ref={planetRef}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, planet.tilt]}
            scale={isSelected ? 1.16 : 1}
            onClick={() => onSelect?.(planet.name)}
            onPointerEnter={() => {
              document.body.style.cursor = 'pointer';
            }}
            onPointerLeave={() => {
              document.body.style.cursor = '';
            }}
          >
            <sphereGeometry args={[planet.size, 48, 48]} />
            <meshStandardMaterial
              color={planet.color}
              roughness={planet.category === 'gas' ? 0.72 : 0.9}
              metalness={planet.category === 'gas' ? 0.04 : 0.08}
              emissive={planet.accent}
              emissiveIntensity={isSelected ? 0.45 : planet.category === 'gas' ? 0.18 : 0.08}
            />
          </mesh>

          {planet.atmosphere ? (
            <mesh scale={isSelected ? 1.18 : 1.1}>
              <sphereGeometry args={[planet.size, 48, 48]} />
              <meshBasicMaterial
                color={planet.atmosphere}
                transparent
                opacity={isSelected ? 0.24 : 0.12}
              />
            </mesh>
          ) : null}

          {planet.ring ? (
            <mesh rotation={[Math.PI / 2, 0, planet.ring.tilt]}>
              <ringGeometry
                args={[planet.ring.innerRadius, planet.ring.outerRadius, 128]}
              />
              <meshBasicMaterial
                color={planet.ring.color}
                transparent
                opacity={planet.ring.opacity}
                side={THREE.DoubleSide}
              />
            </mesh>
          ) : null}
        </group>

        {planet.moons
          ? (() => {
              const moon = planet.moons;

              return Array.from({ length: moon.count }, (_, index) => (
                <Moon
                  key={`${planet.name}-moon-${index}`}
                  moon={moon}
                  phase={(index / moon.count) * Math.PI * 2}
                />
              ));
            })()
          : null}
      </group>
    </group>
  );
}

function SolarSystemRig({
  selectedBody,
  onSelectBody,
}: {
  selectedBody: string;
  onSelectBody?: (body: string) => void;
}) {
  return (
    <group>
      <Sun isSelected={selectedBody === 'Sun'} onSelect={onSelectBody} />
      {solarSystem.planets.map((planet) => (
        <PlanetOrbit
          key={planet.name}
          planet={planet}
          isSelected={selectedBody === planet.name}
          onSelect={onSelectBody}
        />
      ))}
      <Sparkles
        count={120}
        scale={[90, 36, 90]}
        size={3.2}
        speed={0.2}
        color="#a7d8ff"
        opacity={0.18}
      />
    </group>
  );
}

export default function SolarSystemScene({
  className,
  style,
  selectedBody = 'Sun',
  onSelectBody,
}: SolarSystemSceneProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top, rgba(65, 98, 255, 0.12), transparent 40%), linear-gradient(180deg, #050816 0%, #02030a 100%)',
        ...style,
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 16, 40], fov: 48, near: 0.1, far: 220 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#02030a']} />
        <fog attach="fog" args={['#02030a', 20, 82]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[12, 15, 8]} intensity={1.1} color="#cfe2ff" />
        <directionalLight position={[-14, -8, -12]} intensity={0.28} color="#ffb77a" />
        <Suspense fallback={null}>
          <Stars
            radius={120}
            depth={60}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.75}
          />
          <SolarSystemRig selectedBody={selectedBody} onSelectBody={onSelectBody} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom
          autoRotate
          autoRotateSpeed={0.18}
          minDistance={16}
          maxDistance={92}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.85}
        />
      </Canvas>
    </div>
  );
}
