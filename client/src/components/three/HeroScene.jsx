import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';

const ParticleField = lazy(() => import('./ParticleField'));
const FloatingShapes = lazy(() => import('./FloatingShapes'));

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#a78bfa" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#22d3ee" />
          <ParticleField />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
