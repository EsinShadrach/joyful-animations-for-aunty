
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

const MessageSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-birthday-rose/10" 
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(234, 202, 203, 0.3) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center staggered-fade-in"
        >
          <div className="flex justify-center mb-6">
            <Heart className="text-primary h-10 w-10 animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-foreground">A Birthday Message</h2>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6 font-serif italic">
            "Dear Aunty Ify,
          </p>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
            On this special day, we celebrate the wonderful person you are. Your kindness, wisdom, and love have touched all of our lives in countless ways. You've been a pillar of strength, a fountain of wisdom, and a source of endless joy.
          </p>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
            May this new year of your life bring you as much happiness as you've brought to others. May your days be filled with laughter, your heart with love, and your life with beautiful moments to cherish.
          </p>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
            Wishing you health, wealth, and all the happiness in the world. Happy Birthday!
          </p>
          
          <p className="text-lg md:text-xl font-cursive text-primary">With all our love,</p>
          <p className="text-lg md:text-xl font-medium">Your Family</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageSection;
