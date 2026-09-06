import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function GlowShape({ geometry, position, color, speed = 1, distort = 0.3, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2 * speed;
    meshRef.current.rotation.z += delta * 0.15 * speed;
  });

  return (
    <Float
      speed={1.5 * speed}
      rotationIntensity={0.6}
      floatIntensity={1.2}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          wireframe
          transparent
          opacity={0.25}
          distort={distort}
          speed={2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <group>
      {/* Icosahedron — top left */}
      <GlowShape
        geometry={<icosahedronGeometry args={[1.1, 1]} />}
        position={[-3.5, 1.8, -2]}
        color="#a78bfa"
        speed={0.8}
        distort={0.25}
        scale={0.9}
      />

      {/* Torus — bottom right */}
      <GlowShape
        geometry={<torusGeometry args={[0.8, 0.3, 16, 40]} />}
        position={[3.8, -1.5, -1.5]}
        color="#22d3ee"
        speed={1.2}
        distort={0.15}
        scale={1}
      />

      {/* Octahedron — center back */}
      <GlowShape
        geometry={<octahedronGeometry args={[0.7, 0]} />}
        position={[1.5, 2.2, -3]}
        color="#7c5af0"
        speed={0.6}
        distort={0.35}
        scale={0.75}
      />
    </group>
  );
}
