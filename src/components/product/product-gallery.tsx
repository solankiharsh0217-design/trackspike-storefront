'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80';

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [imgSrc, setImgSrc] = useState(images[0] || FALLBACK_IMAGE);

  const handleThumbnailClick = (index: number) => {
    setActive(index);
    setImgSrc(images[index] || FALLBACK_IMAGE);
  };

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-[#161616]">
        <Image
          src={imgSrc}
          alt={name}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-contain p-4"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
          New
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                'relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all duration-300',
                active === index
                  ? 'border-accent ring-2 ring-accent/20'
                  : 'border-white/10 hover:border-white/30'
              )}
            >
              <Image
                src={image}
                alt={`${name} view ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = FALLBACK_IMAGE;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
