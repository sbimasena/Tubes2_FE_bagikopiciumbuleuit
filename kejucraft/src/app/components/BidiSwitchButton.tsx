import { useState } from "react";
import Image from "next/image";

interface Props {
  activeSearch: string;
  bidiMode: "bfs" | "dfs";
  setBidiMode: (mode: "bfs" | "dfs") => void;
}

export default function BidiSwitchButton({ activeSearch, bidiMode, setBidiMode }: Props) {
  const isEnabled = activeSearch === "bi";

  const toggle = () => {
    if (!isEnabled) return;
    setBidiMode(bidiMode === "bfs" ? "dfs" : "bfs");
  };

  return (
    <div
      onClick={toggle}
      className={`w-[60px] h-[60px] rounded overflow-hidden relative ${
        isEnabled ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
      } bg-[#6B6B6B]`}
      title={
        isEnabled
          ? (bidiMode === "bfs" ? "BFS Bidirectional" : "DFS Bidirectional")
          : "Bidirectional only"
      }
    >
      <div
        className="flex transition-transform duration-300 ease-in-out w-[120px] h-[60px]"
        style={{
          transform: bidiMode === "bfs" ? "translateX(0)" : "translateX(-60px)",
        }}
      >
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <Image
            src="/images/command.png" 
            alt="Bidirectional BFS"
            width={50}
            height={50}
          />
        </div>
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <Image
            src="/images/tnt.jpeg"
            alt="Bidirectional DFS"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}
