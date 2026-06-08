'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShoeViewerProps {
  modelUrl?: string;
  colors: { name: string; hex: string }[];
  selectedColor: string;
}

function ShoeModel({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sole */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[2.2, 0.15, 3.8]} />
        <meshStandardMaterial color="#d4a520" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Midsole */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <boxGeometry args={[2, 0.12, 3.6]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.4} metalness={0} />
      </mesh>

      {/* Main body */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.8, 0.5, 3.2]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </mesh>

      {/* Toe cap */}
      <mesh position={[0, 0.1, 1.4]} castShadow>
        <sphereGeometry args={[0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Heel */}
      <mesh position={[0, 0.3, -1.4]} castShadow>
        <boxGeometry args={[1.6, 0.6, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </mesh>

      {/* Tongue */}
      <mesh position={[0, 0.55, 0.2]} castShadow>
        <boxGeometry args={[0.8, 0.25, 2]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Swoosh accent */}
      <mesh position={[0.91, 0.15, 0]} castShadow>
        <boxGeometry args={[0.02, 0.12, 2.2]} />
        <meshStandardMaterial color="#d4a520" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[-0.91, 0.15, 0]} castShadow>
        <boxGeometry args={[0.02, 0.12, 2.2]} />
        <meshStandardMaterial color="#d4a520" roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  );
}

function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-secondary/50">Loading 3D viewer...</p>
      </div>
    </div>
  );
}

export function ShoeViewer({ modelUrl, colors, selectedColor }: ShoeViewerProps) {
  return (
    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [4, 3, 6], fov: 35 }} shadows>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-3, 5, -3]} intensity={0.4} />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <ShoeModel color={selectedColor} />
          </Float>
          <ContactShadows position={[0, -0.5, 0]} opacity={0.3} scale={12} blur={2.5} />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={4}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={1}
          />
          <Environment preset="studio" />
        </Canvas>
      </Suspense>
    </div>
  );
}
