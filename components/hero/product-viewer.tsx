'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Bounds } from '@react-three/drei';
import { ShoeModel } from './shoe-model';

export function ProductViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 3], fov: 32 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.3}>
          <ShoeModel url={modelUrl} />
        </Bounds>
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.35} scale={8} blur={2.4} far={2} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={false}
      />
    </Canvas>
  );
}
