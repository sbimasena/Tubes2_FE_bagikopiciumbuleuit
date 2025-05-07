'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CustomButtonProps {
  className?: string;
  children: React.ReactNode;
  link?: string;
  type: string;
  back?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton = ({
  children,
  className = '',
  link = '#',
  type = 'default',
  back = false,
  onClick,
  disabled,
}: CustomButtonProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (back) {
      router.back();
    }
  };

  const commonClasses =
    type === 'search'
      ? `bg-gradient-to-r from-[#6B6B6B] to-[#999999] text-white outline-4 outline-black text-[36px] cursor-pointer ${className}` 
      : `font-semibold text-[24px]
        ${
          type === 'diff'
            ? 'bg-[#FCF5C7] hover:bg-[#97F9F9] shadow-[0_0_10px_2px_rgba(252,245,199,1)] hover:shadow-[0_0_10px_2px_rgba(151,249,249,1)]'
            : 'bg-[#97F9F9] shadow-[0_0_10px_2px_rgba(151,249,249,1)] hover:bg-[#FCF5C7] hover:shadow-[0_0_10px_2px_rgba(252,245,199,1)]'
        } text-[#1E1E1E] hover:border-0 transition-all duration-200 cursor-pointer ${className}`;

  // Handle click for search type or back button
  const handleClick = () => {
    if (back) {
      handleGoBack();
    } else if (link && link !== '#') {
      router.push(link);
    }
    
    if (onClick) onClick();
  };

  // If it's a back button or search type, use a regular button with onClick
  if (back || type === 'search') {
    return (
      <button
        onClick={handleClick}
        className={commonClasses}
        disabled={disabled}
        style={{fontFamily: 'Minecraft'}}
      >
        {children}
      </button>
    );
  }

  // For other types, use Link
  return (
    <Link href={link}>
      <button 
        onClick={onClick} 
        className={commonClasses} 
        disabled={disabled}
        style={{fontFamily: 'Minecraft'}}
      >
        {children}
      </button>
    </Link>
  );
};

export default CustomButton;