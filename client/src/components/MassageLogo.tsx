import React from 'react';

interface LogoProps {
  className?: string;
}

const MassageLogo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo de massagem inspirado na imagem de referência */}
      <g fill="currentColor">
        {/* Contorno do retângulo com cantos arredondados */}
        <rect x="50" y="50" width="200" height="200" rx="20" stroke="currentColor" strokeWidth="8" fill="none"/>
        
        {/* Cabeça */}
        <circle cx="150" cy="90" r="20" />
        
        {/* Corpo */}
        <path d="M120 120C120 120 90 140 110 170C130 200 170 200 190 170C210 140 180 120 180 120C180 120 170 140 150 140C130 140 120 120 120 120Z" />
        
        {/* Pontos de massagem */}
        <circle cx="150" cy="180" r="8" />
        <circle cx="150" cy="210" r="8" />
        <circle cx="150" cy="240" r="8" />
      </g>
    </svg>
  );
};

export default MassageLogo;