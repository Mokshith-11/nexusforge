'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 2.4;
const SPHERE_RADIUS = 5;
const MAX_CONNECTIONS = 600; // cap line segments for perf

/* ------------------------------------------------------------------ */
/*  Colour palette                                                     */
/* ------------------------------------------------------------------ */
const COLORS = {
  violet: new THREE.Color('#7C3AED'),
  blue: new THREE.Color('#3A82FF'),
  mint: new THREE.Color('#06D6A0'),
};

/* ------------------------------------------------------------------ */
/*  Helper: build initial particle positions + per-particle colour     */
/* ------------------------------------------------------------------ */
function generateParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const offsets = new Float32Array(count); // phase offset per particle
  const speeds = new Float32Array(count);

  const tmpColor = new THREE.Color();

  for (let i = 0; i < count; i++) {
    // Organic sphere distribution (golden angle + random jitter)
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    const r = SPHERE_RADIUS * (0.4 + Math.random() * 0.6);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Gradient colour based on normalized height (y)
    const t = (positions[i * 3 + 1] / SPHERE_RADIUS + 1) * 0.5; // 0‑1
    if (t < 0.5) {
      tmpColor.copy(COLORS.violet).lerp(COLORS.blue, t * 2);
    } else {
      tmpColor.copy(COLORS.blue).lerp(COLORS.mint, (t - 0.5) * 2);
    }
    colors[i * 3] = tmpColor.r;
    colors[i * 3 + 1] = tmpColor.g;
    colors[i * 3 + 2] = tmpColor.b;

    offsets[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.3 + Math.random() * 0.7;
  }

  return { positions, colors, offsets, speeds };
}

/* ------------------------------------------------------------------ */
/*  Particles (Points)                                                 */
/* ------------------------------------------------------------------ */
interface ParticlesProps {
  reducedMotion: boolean;
}

function Particles({ reducedMotion }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors, offsets, speeds } = useMemo(
    () => generateParticles(PARTICLE_COUNT),
    [],
  );

  // Store base positions for oscillation
  const basePositions = useMemo(() => new Float32Array(positions), [positions]);

  // Pre-allocate line geometry buffers
  const linePositions = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 6),
    [],
  );
  const lineColors = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 6),
    [],
  );

  const pointGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    geo.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions, lineColors]);

  // Animate
  useFrame(({ clock }) => {
    if (reducedMotion) return;

    const t = clock.getElapsedTime();
    const posAttr = pointGeometry.getAttribute(
      'position',
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Oscillate particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = offsets[i];
      const spd = speeds[i];
      arr[i3] = basePositions[i3] + Math.sin(t * spd + phase) * 0.15;
      arr[i3 + 1] = basePositions[i3 + 1] + Math.cos(t * spd * 0.8 + phase) * 0.2;
      arr[i3 + 2] = basePositions[i3 + 2] + Math.sin(t * spd * 0.6 + phase + 1) * 0.15;
    }
    posAttr.needsUpdate = true;

    // Rebuild connections
    let lineIdx = 0;
    const tmpC = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (lineIdx >= MAX_CONNECTIONS) break;
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        if (lineIdx >= MAX_CONNECTIONS) break;
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const li = lineIdx * 6;

          linePositions[li] = arr[i * 3];
          linePositions[li + 1] = arr[i * 3 + 1];
          linePositions[li + 2] = arr[i * 3 + 2];
          linePositions[li + 3] = arr[j * 3];
          linePositions[li + 4] = arr[j * 3 + 1];
          linePositions[li + 5] = arr[j * 3 + 2];

          // colour per vertex (start + end of segment)
          tmpC.set(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
          lineColors[li] = tmpC.r * alpha;
          lineColors[li + 1] = tmpC.g * alpha;
          lineColors[li + 2] = tmpC.b * alpha;

          tmpC.set(colors[j * 3], colors[j * 3 + 1], colors[j * 3 + 2]);
          lineColors[li + 3] = tmpC.r * alpha;
          lineColors[li + 4] = tmpC.g * alpha;
          lineColors[li + 5] = tmpC.b * alpha;

          lineIdx++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIdx * 2);
    (lineGeometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (lineGeometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <group>
      {/* Particle nodes */}
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Glow core points (larger, softer) */}
      <points geometry={pointGeometry}>
        <pointsMaterial
          size={0.25}
          vertexColors
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene rotation + mouse parallax                                    */
/* ------------------------------------------------------------------ */
interface SceneRigProps {
  reducedMotion: boolean;
}

function SceneRig({ reducedMotion }: SceneRigProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = (e.clientY / size.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [size, reducedMotion]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      // Static gentle tilt
      groupRef.current.rotation.y = 0.3;
      groupRef.current.rotation.x = 0.1;
      return;
    }

    const t = clock.getElapsedTime();

    // Auto‑rotation (slow)
    groupRef.current.rotation.y = t * 0.08;

    // Mouse parallax (subtle tilt)
    const targetX = mouse.current.y * 0.15;
    const targetZ = -mouse.current.x * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <Particles reducedMotion={reducedMotion} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                 */
/* ------------------------------------------------------------------ */
interface ForgeSceneProps {
  className?: string;
}

export default function ForgeScene({ className }: ForgeSceneProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Prevent fallback error if WebGL is unsupported */
  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.setClearColor(new THREE.Color('#0C1120'), 0);
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    },
    [],
  );

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={handleCreated}
        style={{ background: 'transparent' }}
      >
        <SceneRig reducedMotion={reducedMotion} />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  );
}
