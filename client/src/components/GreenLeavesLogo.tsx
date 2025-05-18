import React from 'react';

interface LogoProps {
  className?: string;
}

const GreenLeavesLogo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo de folhas verdes inspirado na referência */}
      
      {/* Folha da esquerda (amarelo-verde) */}
      <path 
        d="M120 180C85 170 70 130 120 100C135 120 145 140 120 180Z" 
        fill="#CBE453"
      />
      
      {/* Folha do meio (verde médio) */}
      <path 
        d="M150 80C185 90 200 130 150 160C135 140 125 120 150 80Z" 
        fill="#7CDA57"
      />
      
      {/* Folha da direita (verde escuro) */}
      <path 
        d="M180 180C145 170 130 130 180 100C195 120 205 140 180 180Z" 
        fill="#1D9943"
      />
    </svg>
  );
};

export default GreenLeavesLogo;