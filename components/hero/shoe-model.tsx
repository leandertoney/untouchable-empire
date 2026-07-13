'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import type { Group } from 'three';

export function ShoeModel({ url, spin = true }: { url: string; spin?: boolean }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    if (spin && group.current) {
      group.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={1} />
      </Center>
    </group>
  );
}

useGLTF.preload('/models/jordan-4-military-black.glb');
