'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProductGalleryProps {
  images: string[];
  colors: { name: string; hex: string; images?: string[] }[];
}

export function ProductGallery({ images, colors }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const activeImage = colors[selectedImage]?.images?.[0] || images[selectedImage];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl overflow-hidden border border-border">
        <Image
          src={activeImage}
          alt="Product image"
          fill
          className="object-contain p-8"
          priority
        />

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
            onClick={() => setSelectedImage(index)}
            className={cn(
              'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300',
              selectedImage === index
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
      </div>
    </div>
  );
}
