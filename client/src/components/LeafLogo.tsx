import React from 'react';

interface LogoProps {
  className?: string;
}

const LeafLogo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo de três folhas verdes com sobreposição */}
      
      {/* Folha da esquerda (amarela esverdeada) */}
      <path 
        d="M140 230C80 230 50 150 100 100C120 130 130 170 140 230Z" 
        fill="#C5E357"
        stroke="#a4cd2c"
        strokeWidth="1"
        opacity="0.9"
      />
      
      {/* Folha central (verde médio) */}
      <path 
        d="M150 70C210 70 240 150 190 200C170 170 160 130 150 70Z" 
        fill="#7FD957"
        stroke="#60c234"
        strokeWidth="1"
        opacity="0.9"
      />
      
      {/* Folha da direita (verde escuro) */}
      <path 
        d="M160 230C100 230 70 150 120 100C140 130 150 170 160 230Z" 
        fill="#1A9940"
        stroke="#138035"
        strokeWidth="1"
        opacity="0.9"
      />
    </svg>
  );
};

export default LeafLogo;