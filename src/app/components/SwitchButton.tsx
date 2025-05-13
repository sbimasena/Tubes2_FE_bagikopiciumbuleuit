// src/app/components/SwitchButton.tsx

'use client'; // ✅ Tambahkan baris ini di paling atas

import { useState, createContext, useContext, ReactNode } from "react";
import Image from "next/image";

interface SwitchButtonProviderProps {
  children: ReactNode;
}

// Create a context to share the mode state across components
export const ModeContext = createContext({
  mode: "craft",
  toggleMode: () => {},
  isMultithreading: false
});

// Custom hook to use the mode context
export const useMode = () => useContext(ModeContext);

export function SwitchButtonProvider({ children }: SwitchButtonProviderProps) {
  const [mode, setMode] = useState("craft");
  const isMultithreading = mode === "furnace";
  const toggleMode = () => {
    setMode((prev) => (prev === "craft" ? "furnace" : "craft"));
  };

  const value = {
    mode,
    toggleMode,
    isMultithreading
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
}

export default function SwitchButton() {
  const { mode, toggleMode } = useMode();

  return (
    <div
      onClick={toggleMode}
      className="bg-[#6B6B6B] w-[60px] h-[60px] rounded overflow-hidden relative cursor-pointer"
      title={mode === "craft" ? "Switch for Multithreading Mode" : "Multithreading Mode"}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out w-[120px] h-[60px]"
        style={{
          transform: mode === "craft" ? "translateX(0)" : "translateX(-60px)",
        }}
      >
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <Image
            src="/images/craftingtable.png"
            alt="Crafting (Single-threaded)"
            width={55}
            height={55}
          />
        </div>
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <Image
            src="/images/furnace.jpeg"
            alt="Furnace (Multi-threaded)"
            width={55}
            height={55}
          />
        </div>
      </div>
    </div>
  );
}
