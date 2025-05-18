import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoLeaves: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo de folhas verdes inspirado na referência */}
      <g>
        {/* Folha da esquerda (amarelo-verde) */}
        <path 
          d="M80 150C80 110 120 80 160 120C140 140 120 160 80 150Z" 
          fill="#D1E553"
          opacity="0.9"
        />
        
        {/* Folha do meio (verde claro) */}
        <path 
          d="M150 80C190 80 220 120 180 160C160 140 140 120 150 80Z" 
          fill="#7ED957"
          opacity="0.9"
        />
        
        {/* Folha da direita (verde escuro) */}
        <path 
          d="M220 150C220 110 180 80 140 120C160 140 180 160 220 150Z" 
          fill="#1D9943"
          opacity="0.9"
        />
      </g>
    </svg>
  );
};

export default LogoLeaves;