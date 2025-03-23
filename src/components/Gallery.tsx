
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    alt: 'Birthday celebration',
    rotate: '2deg',
  },
  {
    url: 'https://images.unsplash.com/photo-1537132572a105e1d959a1de5e726836',
    alt: 'Family gathering',
    rotate: '-3deg',
  },
  {
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Beautiful flowers',
    rotate: '1deg',
  },
  {
    url: 'https://images.unsplash.com/photo-1593642532454-e138e28a63f4',
    alt: 'Happy moments',
    rotate: '-2deg',
  },
  {
    url: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d',
    alt: 'Celebration',
    rotate: '3deg',
  },
  {
    url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    alt: 'Birthday cake',
    rotate: '-1deg',
  },
];

interface ImageProps {
  src: string;
  alt: string;
  rotate: string;
  index: number;
}

const LazyImage: React.FC<ImageProps> = ({ src, alt, rotate, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="photo-frame rounded-md overflow-hidden"
      style={{ '--rotate': rotate } as React.CSSProperties}
    >
      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <div className="ribbon" style={{ 
          '--ribbon-color': index % 2 === 0 ? '#EACACB' : '#F7E7CE',
          '--ribbon-rotate': index % 2 === 0 ? '25deg' : '-25deg'
        } as React.CSSProperties}></div>
        
        <img
          ref={imgRef}
          src={isInView ? src : ''}
          alt={alt}
          className={`w-full h-auto aspect-[4/3] object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>
      <div className="py-2 px-1 text-center text-sm text-muted-foreground font-medium">
        {alt}
      </div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-3">Beautiful Memories</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Captured moments that bring joy to our hearts and remind us of the special times we've shared.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <LazyImage
              key={index}
              src={photo.url}
              alt={photo.alt}
              rotate={photo.rotate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
