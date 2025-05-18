import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoFleurDeLis: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flor de Lis - design mais detalhado */}
      <g>
        {/* Corpo principal */}
        <path 
          d="M50 100C52 90 60 85 65 85C65 85 60 90 60 80V65C60 65 65 70 70 70C75 70 80 65 80 55C80 40 65 35 65 35C65 35 70 30 75 20C80 10 75 0 65 5C60 7.5 55 15 50 25C45 15 40 7.5 35 5C25 0 20 10 25 20C30 30 35 35 35 35C35 35 20 40 20 55C20 65 25 70 30 70C35 70 40 65 40 65V80C40 90 35 85 35 85C40 85 48 90 50 100Z" 
          fill="url(#fleur-gradient)"
          stroke="#4A7C91"
          strokeWidth="1.5"
        />
        
        {/* Detalhes ornamentais */}
        <path 
          d="M50 40C50 40 55 50 50 60C45 50 50 40 50 40Z" 
          fill="#4A7C91" 
          opacity="0.8"
        />
        
        <path 
          d="M35 35C35 35 45 45 50 40C55 45 65 35 65 35" 
          stroke="#4A7C91" 
          strokeWidth="1" 
          strokeLinecap="round"
        />
        
        {/* Detalhes da base */}
        <path 
          d="M45 85C45 85 50 90 50 100C50 90 55 85 55 85" 
          stroke="#4A7C91" 
          strokeWidth="1" 
          strokeLinecap="round"
        />
        
        {/* Adornos superiores */}
        <path 
          d="M50 25C50 25 45 15 40 10M50 25C50 25 55 15 60 10" 
          stroke="#4A7C91" 
          strokeWidth="1" 
          strokeLinecap="round"
          opacity="0.7"
        />
        
        {/* Círculo decorativo */}
        <circle 
          cx="50" 
          cy="50" 
          r="5" 
          fill="#8BBF9F" 
          opacity="0.6"
        />
        
        {/* Base decorativa */}
        <path 
          d="M30 100H70" 
          stroke="#4A7C91" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        
        <ellipse 
          cx="50" 
          cy="108" 
          rx="20" 
          ry="4" 
          fill="url(#base-gradient)" 
          opacity="0.3"
        />
      </g>
      
      {/* Gradientes */}
      <defs>
        <linearGradient id="fleur-gradient" x1="20" y1="5" x2="80" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8BBF9F" />
          <stop offset="100%" stopColor="#4A7C91" />
        </linearGradient>
        
        <linearGradient id="base-gradient" x1="30" y1="108" x2="70" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8BBF9F" stopOpacity="0" />
          <stop offset="50%" stopColor="#4A7C91" />
          <stop offset="100%" stopColor="#8BBF9F" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoFleurDeLis;