'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[#161616]">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
          New
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={cn(
                'relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all duration-300',
                active === index
                  ? 'border-accent'
                  : 'border-white/10 hover:border-white/30'
              )}
            >
              <Image
                src={image}
                alt={`${name} view ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
