
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

const AppleCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center p-8">
      <div
        ref={cardRef}
        className="apple-card card-glow w-96 h-64 rounded-3xl p-8 cursor-pointer transition-all duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div className="h-full flex flex-col justify-between text-white relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-300 mb-2">Premium Card</div>
              <div className="text-2xl font-bold gradient-text">The Black Card</div>
            </div>
            <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
              <div className="w-6 h-4 bg-yellow-300 rounded-sm"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-lg font-mono tracking-wider">
              •••• •••• •••• ****
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-400">VALID THRU</div>
                <div className="text-sm font-bold">12/25</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-1">CARDMEMBER</div>
                <div className="text-sm font-bold">THE BLACK CARD</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Holographic effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-500/10 to-transparent opacity-50 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default AppleCard;
