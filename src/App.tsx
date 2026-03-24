import { lazy, Suspense, useState } from 'react';
import ControlPanel, {
  type ControlHint,
  type PlanetFact,
} from './components/ControlPanel';
import { solarSystem } from './data/solarSystem';

const SolarSystemScene = lazy(() => import('./components/SolarSystemScene'));

const controlHints: ControlHint[] = [
  { keyLabel: 'Drag', description: 'Orbit the camera around the star field.' },
  { keyLabel: 'Scroll', description: 'Zoom from the inner planets to the ice giants.' },
  { keyLabel: 'Click', description: 'Focus the panel on any world or the sun.' },
];

function getFacts(selectedBody: string): { status: string; description: string; facts: PlanetFact[] } {
  if (selectedBody === 'Sun') {
    return {
      status: 'Fusion active',
      description:
        'A cinematic orbital atlas of our neighborhood, balancing motion, scale, and atmosphere in one continuous 3D view.',
      facts: [
        { label: 'Type', value: 'G-type main-sequence star', note: 'Contains 99.8% of the solar system mass.' },
        { label: 'Surface', value: '5,500C', note: 'Core temperature rises to roughly 15 million C.' },
        { label: 'Reach', value: '8 planets shown', note: 'From Mercury to Neptune in one navigable frame.' },
        { label: 'Light', value: '8m 20s to Earth', note: 'Photons take minutes, gravity shapes everything.' },
      ],
    };
  }

  const planet = solarSystem.planets.find((entry) => entry.name === selectedBody) ?? solarSystem.planets[2];

  return {
    status: `${planet.category} world`,
    description: planet.blurb,
    facts: [
      { label: 'Distance', value: planet.distanceFromSun, note: 'Average orbital distance from the sun.' },
      { label: 'Year Length', value: planet.orbitalPeriod, note: 'One complete solar orbit.' },
      { label: 'Temperature', value: planet.temperature, note: planet.atmosphere ? 'Atmospheric scattering is visible in the scene.' : 'No major atmosphere glow is shown.' },
      { label: 'Companions', value: planet.moons ? `${planet.moons.count} moon${planet.moons.count > 1 ? 's' : ''}` : 'No moons shown', note: planet.ring ? 'Ring system rendered in the orbital view.' : 'Orbital track rendered around the sun.' },
    ],
  };
}

export default function App() {
  const [selectedBody, setSelectedBody] = useState('Sun');
  const { status, description, facts } = getFacts(selectedBody);

  return (
    <main className="solar-app">
      <Suspense
        fallback={
          <div className="solar-scene solar-scene--loading" aria-hidden="true">
            <div className="solar-scene__placeholder">
              <div className="solar-scene__sun-core" />
              <div className="solar-scene__orbit solar-scene__orbit--inner" />
              <div className="solar-scene__orbit solar-scene__orbit--mid" />
              <div className="solar-scene__orbit solar-scene__orbit--outer" />
            </div>
          </div>
        }
      >
        <SolarSystemScene
          className="solar-scene"
          selectedBody={selectedBody}
          onSelectBody={setSelectedBody}
        />
      </Suspense>
      <ControlPanel
        description={description}
        selectedBody={selectedBody}
        status={status}
        facts={facts}
        hints={controlHints}
        footer={
          <p>
            Built as a live Three.js tableau: glowing star core, orbital tracks, scaled gas giants, and a mobile-ready HUD.
          </p>
        }
      />
    </main>
  );
}
