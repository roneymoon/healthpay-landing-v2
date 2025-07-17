import { FC, ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

const GradientText: FC<GradientTextProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`bg-gradient-to-r from-[#3c8fe8] to-[#8bdbf6] bg-clip-text text-transparent inline-block ${className}`}
    >
      {children}
    </span>
  );
};

export default GradientText; 