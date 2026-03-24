export type PlanetCategory = 'rocky' | 'gas' | 'ice' | 'dwarf';

export type RingBand = {
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity: number;
  tilt: number;
};

export type MoonSpec = {
  count: number;
  orbitRadius: number;
  size: number;
  speed: number;
  color: string;
};

export type PlanetSpec = {
  name: string;
  category: PlanetCategory;
  orbitRadius: number;
  size: number;
  orbitSpeed: number;
  spinSpeed: number;
  tilt: number;
  color: string;
  accent: string;
  blurb: string;
  distanceFromSun: string;
  orbitalPeriod: string;
  temperature: string;
  atmosphere?: string;
  moons?: MoonSpec;
  ring?: RingBand;
};

export type SolarSystemSpec = {
  sunRadius: number;
  sunColor: string;
  sunGlow: string;
  planets: readonly PlanetSpec[];
};

export const solarSystem: SolarSystemSpec = {
  sunRadius: 2.75,
  sunColor: '#ffd36b',
  sunGlow: '#ff7a18',
  planets: [
    {
      name: 'Mercury',
      category: 'rocky',
      orbitRadius: 5,
      size: 0.34,
      orbitSpeed: 1.75,
      spinSpeed: 1.4,
      tilt: 0.04,
      color: '#b8a08d',
      accent: '#8d7a6a',
      blurb: 'A scorched rock face with cratered terrain and violent day-night temperature swings.',
      distanceFromSun: '57.9 million km',
      orbitalPeriod: '88 days',
      temperature: '-180C to 430C',
    },
    {
      name: 'Venus',
      category: 'rocky',
      orbitRadius: 7.2,
      size: 0.62,
      orbitSpeed: 1.25,
      spinSpeed: 0.55,
      tilt: 0.02,
      color: '#d8b07c',
      accent: '#9f7654',
      blurb: 'A dense acid-cloud world glowing under a runaway greenhouse atmosphere.',
      distanceFromSun: '108.2 million km',
      orbitalPeriod: '225 days',
      temperature: '465C average',
      atmosphere: '#f2cd8a',
    },
    {
      name: 'Earth',
      category: 'rocky',
      orbitRadius: 9.8,
      size: 0.66,
      orbitSpeed: 1,
      spinSpeed: 2.1,
      tilt: 0.24,
      color: '#5ba7ff',
      accent: '#3f7bd9',
      blurb: 'An ocean planet with nitrogen-rich skies, liquid water, and a single stabilizing moon.',
      distanceFromSun: '149.6 million km',
      orbitalPeriod: '365 days',
      temperature: '15C average',
      atmosphere: '#9dd6ff',
      moons: {
        count: 1,
        orbitRadius: 1.15,
        size: 0.13,
        speed: 2.8,
        color: '#d7dbe5',
      },
    },
    {
      name: 'Mars',
      category: 'rocky',
      orbitRadius: 12.6,
      size: 0.5,
      orbitSpeed: 0.82,
      spinSpeed: 1.8,
      tilt: 0.18,
      color: '#e48961',
      accent: '#b35a3f',
      blurb: 'A rust-red desert planet marked by canyons, dust storms, and polar caps.',
      distanceFromSun: '227.9 million km',
      orbitalPeriod: '687 days',
      temperature: '-63C average',
      moons: {
        count: 2,
        orbitRadius: 0.95,
        size: 0.08,
        speed: 3.3,
        color: '#c9b8a5',
      },
    },
    {
      name: 'Jupiter',
      category: 'gas',
      orbitRadius: 17,
      size: 1.55,
      orbitSpeed: 0.42,
      spinSpeed: 2.6,
      tilt: 0.09,
      color: '#d2ab88',
      accent: '#a97853',
      blurb: "The system's storm giant, layered with bands, auroras, and immense atmospheric pressure.",
      distanceFromSun: '778.5 million km',
      orbitalPeriod: '11.9 years',
      temperature: '-145C cloud tops',
      atmosphere: '#f0d8b8',
      moons: {
        count: 4,
        orbitRadius: 2.2,
        size: 0.1,
        speed: 2.2,
        color: '#d3d3d3',
      },
      ring: {
        innerRadius: 1.85,
        outerRadius: 2.15,
        color: '#c39a74',
        opacity: 0.18,
        tilt: 0.15,
      },
    },
    {
      name: 'Saturn',
      category: 'gas',
      orbitRadius: 22,
      size: 1.3,
      orbitSpeed: 0.31,
      spinSpeed: 2.3,
      tilt: 0.12,
      color: '#e7d2a1',
      accent: '#b99656',
      blurb: 'A luminous gas giant wrapped in broad icy rings that throw light like vinyl grooves.',
      distanceFromSun: '1.43 billion km',
      orbitalPeriod: '29.5 years',
      temperature: '-178C average',
      atmosphere: '#fff0c8',
      ring: {
        innerRadius: 1.65,
        outerRadius: 2.75,
        color: '#f5e3b3',
        opacity: 0.35,
        tilt: 0.38,
      },
    },
    {
      name: 'Uranus',
      category: 'ice',
      orbitRadius: 26.5,
      size: 0.94,
      orbitSpeed: 0.24,
      spinSpeed: 1.7,
      tilt: 0.31,
      color: '#7dd8dc',
      accent: '#4fadc0',
      blurb: 'An ice giant tipped sideways, orbiting the sun like a rolling lantern.',
      distanceFromSun: '2.87 billion km',
      orbitalPeriod: '84 years',
      temperature: '-224C average',
      atmosphere: '#c7fbff',
      ring: {
        innerRadius: 1.15,
        outerRadius: 1.4,
        color: '#a6e6ec',
        opacity: 0.2,
        tilt: 1.42,
      },
    },
    {
      name: 'Neptune',
      category: 'ice',
      orbitRadius: 30.5,
      size: 0.9,
      orbitSpeed: 0.19,
      spinSpeed: 1.95,
      tilt: 0.28,
      color: '#4a73ff',
      accent: '#2f4fd8',
      blurb: 'A cobalt wind world where supersonic storms carve through methane-blue haze.',
      distanceFromSun: '4.5 billion km',
      orbitalPeriod: '164.8 years',
      temperature: '-214C average',
      atmosphere: '#a9c4ff',
    },
  ] as const,
};
