import React from 'react';
import Image from 'next/image';

export const LeafLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src="/leaf.png"
        alt="FarmWise Leaf Logo"
        width={227}
        height={296}
        className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
        priority
      />
    </div>
  );
};
