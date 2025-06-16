import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
interface AppleCardProps {
  memberName?: string;
  cardNumber?: string;
  expiryDate?: string;
  isPersonalized?: boolean;
  cvv?: string;
}
const AppleCard = ({
  memberName = '',
  cardNumber = '•••• •••• •••• ••••',
  expiryDate = '12/25',
  isPersonalized = false,
  cvv = ''
}: AppleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || isMobile) return;
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
      if (!cardRef.current || isMobile) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    // Mobile device orientation handling
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!cardRef.current || !isMobile) return;
      const card = cardRef.current;
      const beta = e.beta || 0; // X-axis rotation
      const gamma = e.gamma || 0; // Y-axis rotation

      // Limit rotation values for better effect
      const rotateX = Math.max(-15, Math.min(15, beta / 3));
      const rotateY = Math.max(-15, Math.min(15, gamma / 3));
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    // Request permission for iOS devices
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        } catch (error) {
          console.log('Permission denied for device orientation');
        }
      } else {
        // For Android and other devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
    const card = cardRef.current;
    if (card && !isMobile) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    if (isMobile) {
      requestPermission();
    }
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Add wallet button click handler
  const handleAddToWallet = () => {
    // Create an anchor element for the wallet pass download
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify({
      cardholderName: memberName || 'عضو مهم',
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cardType: 'membership',
      issuer: 'The Black Card',
      cvv: cvv
    }))}`);
    element.setAttribute('download', 'black-card-pass.pkpass');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return <div className="flex flex-col justify-center items-center p-4 md:p-8 gap-4">
      <div ref={cardRef} className="apple-card card-glow w-80 h-52 md:w-96 md:h-64 rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 ease-out relative" style={{
      transformStyle: 'preserve-3d',
      willChange: 'transform'
    }}>
        <div className="h-full flex flex-col justify-between text-white relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs md:text-sm text-gray-300 mb-1 md:mb-2">Premium Card</div>
              <div className="text-xl md:text-2xl font-bold gradient-text">
                The Black Card
              </div>
            </div>
            <div className="w-10 h-6 md:w-12 md:h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
              <div className="w-5 h-3 md:w-6 md:h-4 bg-yellow-300 rounded-sm"></div>
            </div>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <div className="text-base md:text-lg font-mono tracking-wider">
              {cardNumber}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-400">VALID THRU</div>
                <div className="text-sm font-bold">{expiryDate}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-1">
                  {isPersonalized ? 'MEMBER NAME' : 'CARDMEMBER'}
                </div>
                <div className="text-xs md:text-sm font-bold">
                  {isPersonalized ? memberName : 'PREMIUM MEMBER'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Holographic effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-500/10 to-transparent opacity-50 rounded-3xl"></div>
      </div>

      {isPersonalized && <button onClick={handleAddToWallet} className="flex items-center gap-2 bg-black text-white border border-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-900/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          إضافة إلى المحفظة
        </button>}
    </div>;
};
export default AppleCard;