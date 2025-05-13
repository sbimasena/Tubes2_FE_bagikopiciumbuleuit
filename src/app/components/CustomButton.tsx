import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CustomButtonProps {
  className?: string;
  children: React.ReactNode;
  link?: string;
  back?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  searchType?: 'bfs' | 'dfs' | 'bi'; // New prop for search algorithm type
}

const CustomButton = ({
  children,
  className = '',
  link = '#',
  back = false,
  onClick,
  disabled,
  searchType, // Add searchType to the component props
}: CustomButtonProps) => {
  const router = useRouter();

  // Generate the correct URL with search type parameter if provided
  const href = searchType ? `${link}?type=${searchType}` : link;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (back) {
      e.preventDefault();
      router.back();
    } else if (onClick) {
      onClick();
    }
  };

  const commonClasses = `
    bg-gradient-to-r from-[#6B6B6B] to-[#999999] text-white outline-4 text-center outline-black
    text-[36px] px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer
    ${className}
  `;

  return (
    <Link
      href={href}
      className={commonClasses}
      onClick={handleClick}
      style={{
        fontFamily: 'Minecraft',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </Link>
  );
};

export default CustomButton;