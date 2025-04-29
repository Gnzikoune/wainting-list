import { useState, useEffect, useRef } from 'react';

interface Transform {
  rotateX: number;
  rotateY: number;
}

export const useParallax = (intensity: number = 5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<Transform>({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the element (in percentage)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center in percentage (-1 to 1)
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply rotation based on mouse position (with intensity factor)
      const rotateY = percentX * intensity;
      const rotateX = -percentY * intensity; // Invert Y for natural movement
      
      setTransform({ rotateX, rotateY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      // Reset transform when mouse leaves
      setTransform({ rotateX: 0, rotateY: 0 });
    };

    // Add event listeners to window for better tracking outside the element
    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return { ref, transform, isHovered };
};