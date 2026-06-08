'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';

const ShoeViewer = dynamic(
  () => import('@/components/3d/shoe-viewer').then((mod) => mod.ShoeViewer),
  {
    loading: () => (
      <div className="w-full aspect-square bg-gradient-to-b from-stone-50 to-stone-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-secondary/50">Loading 3D viewer...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

interface ProductGalleryProps {
  images: string[];
  model3dUrl?: string;
  colors: { name: string; hex: string; images?: string[] }[];
}

export function ProductGallery({ images, model3dUrl, colors }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.hex || '#000000');
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image / 3D Viewer */}
      <div className="relative aspect-square bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl overflow-hidden border border-border">
        {show3D && model3dUrl ? (
          <ShoeViewer
            modelUrl={model3dUrl}
            colors={colors}
            selectedColor={selectedColor}
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={colors[selectedImage]?.images?.[0] || images[selectedImage]}
              alt="Product image"
              fill
              className="object-contain p-8"
              priority
            />
          </div>
        )}

        {/* 3D Toggle Button */}
        {model3dUrl && (
          <button
            onClick={() => setShow3D(!show3D)}
            className={cn(
              'absolute top-4 right-4 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
              show3D
                ? 'bg-accent text-black shadow-gold'
                : 'glass text-primary hover:bg-white/80'
            )}
          >
            {show3D ? '2D View' : '3D View'}
          </button>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="accent" className="text-xs font-bold shadow-gold">New</Badge>
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
              'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300',
              selectedImage === index && !show3D
                ? 'border-accent shadow-gold'
                : 'border-border hover:border-border-hover'
            )}
          >
            <Image
              src={colors[index]?.images?.[0] || image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}

        {/* 3D Thumbnail */}
        {model3dUrl && (
          <button
            onClick={() => setShow3D(true)}
            className={cn(
              'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-gradient-to-br from-stone-50 to-stone-100',
              show3D ? 'border-accent shadow-gold' : 'border-border hover:border-border-hover'
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-secondary">3D</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
