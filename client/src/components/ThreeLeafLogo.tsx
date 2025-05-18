import React from 'react';

interface LogoProps {
  className?: string;
}

const ThreeLeafLogo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo de três folhas verdes baseado na imagem de referência */}
      
      {/* Folha da esquerda (verde claro) */}
      <path 
        d="M100 150C100 120 130 100 160 130C145 145 130 160 100 150Z" 
        fill="#c8e150"
        opacity="0.95"
      />
      
      {/* Folha do meio (verde médio) */}
      <path 
        d="M150 100C180 100 200 130 170 160C155 145 140 130 150 100Z" 
        fill="#7eda57"
        opacity="0.95"
      />
      
      {/* Folha da direita (verde escuro) */}
      <path 
        d="M200 150C200 120 170 100 140 130C155 145 170 160 200 150Z" 
        fill="#1a9940"
        opacity="0.95"
      />
    </svg>
  );
};

export default ThreeLeafLogo;