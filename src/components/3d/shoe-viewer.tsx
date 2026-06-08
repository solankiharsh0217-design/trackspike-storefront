'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface ShoeViewerProps {
  modelUrl?: string;
  colors: { name: string; hex: string }[];
  selectedColor: string;
}

function ShoeModel({ color }: { color: string }) {
  return (
    <mesh position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[1.5, 0.6, 3]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-secondary/50">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>Loading 3D viewer...</p>
      </div>
    </div>
  );
}

export function ShoeViewer({ modelUrl, colors, selectedColor }: ShoeViewerProps) {
  return (
    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [3, 2, 5], fov: 35 }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <ShoeModel color={selectedColor} />
          <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={10} blur={2} />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={3}
            maxDistance={8}
          />
          <Environment preset="studio" />
        </Canvas>
      </Suspense>
    </div>
  );
}
