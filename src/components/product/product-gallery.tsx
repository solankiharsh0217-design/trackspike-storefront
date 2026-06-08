'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';

// Dynamically import 3D viewer (client-side only)
const ShoeViewer = dynamic(
  () => import('@/components/3d/shoe-viewer').then((mod) => mod.ShoeViewer),
  {
    loading: () => (
      <div className="w-full aspect-square bg-background rounded-2xl flex items-center justify-center">
        <div className="text-center text-secondary/50">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading 3D viewer...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

interface ProductGalleryProps {
  images: string[];
  model3dUrl?: string;
  colors: { name: string; hex: string }[];
}

export function ProductGallery({ images, model3dUrl, colors }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.hex || '#000000');
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image / 3D Viewer */}
      <div className="relative aspect-square bg-gradient-to-b from-stone-100 to-stone-200 rounded-2xl overflow-hidden">
        {show3D && model3dUrl ? (
          <ShoeViewer
            modelUrl={model3dUrl}
            colors={colors}
            selectedColor={selectedColor}
          />
        ) : (
          <Image
            src={images[selectedImage]}
            alt="Product image"
            fill
            className="object-cover"
            priority
          />
        )}

        {/* 3D Toggle Button */}
        {model3dUrl && (
          <button
            onClick={() => setShow3D(!show3D)}
            className={cn(
              'absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              show3D
                ? 'bg-accent text-white'
                : 'bg-surface/90 backdrop-blur-sm text-primary hover:bg-surface'
            )}
          >
            {show3D ? '2D View' : '3D View'}
          </button>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="accent">New</Badge>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(index);
              setShow3D(false);
            }}
            className={cn(
              'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200',
              selectedImage === index && !show3D
                ? 'border-accent'
                : 'border-transparent hover:border-border'
            )}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}

        {/* 3D Thumbnail */}
        {model3dUrl && (
          <button
            onClick={() => setShow3D(true)}
            className={cn(
              'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-gradient-to-br from-stone-100 to-stone-200',
              show3D ? 'border-accent' : 'border-transparent hover:border-border'
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-secondary">3D</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
