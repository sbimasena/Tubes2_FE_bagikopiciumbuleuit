import { useState } from "react";
import Image from "next/image";

export default function SwitchButton() {
  const [mode, setMode] = useState("craft");

  const toggleMode = () => {
    setMode((prev) => (prev === "craft" ? "furnace" : "craft"));
  };

  return (
    <div
      onClick={toggleMode}
      className="bg-[#6B6B6B] w-[60px] h-[60px] rounded overflow-hidden relative cursor-pointer"
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
            alt="Crafting"
            width={55}
            height={55}
          />
        </div>
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <Image
            src="/images/furnace.jpeg"
            alt="Furnace"
            width={55}
            height={55}
          />
        </div>
      </div>
    </div>
  );
}
