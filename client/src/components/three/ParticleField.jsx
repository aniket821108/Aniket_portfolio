import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 180;

export default function ParticleField() {
  const meshRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate random positions in a sphere
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    const purple = new THREE.Color('#a78bfa');
    const cyan = new THREE.Color('#22d3ee');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.5 + Math.random() * 2.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Blend between purple and cyan
      const mix = Math.random();
      const color = purple.clone().lerp(cyan, mix);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = 0.015 + Math.random() * 0.04;
    }

    return [pos, col, siz];
  }, []);

  // Track mouse (normalized -1 to 1)
  useMemo(() => {
    const handler = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Slow rotation
    meshRef.current.rotation.y += delta * 0.04;
    meshRef.current.rotation.x += delta * 0.015;

    // Subtle mouse-follow
    const targetX = mouseRef.current.y * 0.15;
    const targetY = mouseRef.current.x * 0.15;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
