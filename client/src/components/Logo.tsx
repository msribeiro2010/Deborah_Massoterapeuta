import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flor de Lis */}
      <g>
        {/* Base */}
        <path 
          d="M50 95C55 85 65 80 65 80C65 80 60 85 60 75V60C60 60 65 65 70 65C75 65 75 60 75 55C75 40 60 35 60 35C60 35 65 30 70 25C75 20 75 10 70 5C65 0 60 0 55 5C52.5 7.5 51 12.5 50 20C49 12.5 47.5 7.5 45 5C40 0 35 0 30 5C25 10 25 20 30 25C35 30 40 35 40 35C40 35 25 40 25 55C25 60 25 65 30 65C35 65 40 60 40 60V75C40 85 35 80 35 80C35 80 45 85 50 95Z" 
          fill="url(#gradient)"
          stroke="#4A7C91"
          strokeWidth="2"
        />
        
        {/* Detalhes */}
        <path 
          d="M50 35C50 35 55 45 50 55C45 45 50 35 50 35Z" 
          fill="#4A7C91" 
          opacity="0.7"
        />
        <path 
          d="M40 45C40 45 45 50 50 45C55 50 60 45 60 45" 
          stroke="#4A7C91" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </g>
      
      {/* Gradiente */}
      <defs>
        <linearGradient id="gradient" x1="25" y1="5" x2="75" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8BBF9F" />
          <stop offset="100%" stopColor="#4A7C91" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;