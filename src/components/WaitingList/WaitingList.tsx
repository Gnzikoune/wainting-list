import React, { useState } from 'react';
import { useParallax } from '../../hooks/useParallax';
import { EmailForm } from './EmailForm';

export const WaitingList: React.FC = () => {
  const { ref, transform } = useParallax();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (email: string) => {
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-4">
      <div 
        ref={ref}
        className="relative max-w-md w-full rounded-2xl p-8 overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glass background effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-sm">
              Rejoignez notre liste d'attente ✨
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Soyez le premier à découvrir notre lancement.
            </p>
          </div>
          
          <EmailForm onSubmit={handleSubmit} isSubmitted={isSubmitted} />
        </div>
      </div>
    </div>
  );
};