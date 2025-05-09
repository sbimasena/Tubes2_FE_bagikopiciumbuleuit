import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SwitchButton, { useMode, ModeContext, SwitchButtonProvider } from "./SwitchButton";

// Separate component for Max Resep input that uses the mode context
function MaxResepInput() {
  const { isMultithreading } = useMode();
  const [maxResep, setMaxResep] = useState("");

  return (
    <div className="flex items-center space-x-2">
      <label className={`text-black text-[28px] ${!isMultithreading ? "opacity-50" : ""}`}>
        Max Resep :
      </label>
      <input
        type="text"
        value={maxResep}
        onChange={(e) => setMaxResep(e.target.value)}
        className={`bg-[#6B6B6B] text-white px-2 w-[120px] h-[48px] rounded text-[20px] ${
          !isMultithreading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isMultithreading}
        placeholder={!isMultithreading ? "" : ""}
        title={
          !isMultithreading
            ? "Switch to furnace (multi-threaded) mode to enable"
            : "Maximum number of recipes"
        }
      />
    </div>
  );
}

interface FormProps {
  initialSearchType?: 'bfs' | 'dfs' | 'bi';
}

export default function Form({ initialSearchType = 'bfs' }: FormProps) {
  // State for tracking which search algorithm is active
  const [activeSearch, setActiveSearch] = useState<'bfs' | 'dfs' | 'bi'>(initialSearchType);

  // Handler for switching between search algorithms
  const handleSearchChange = (searchType: 'bfs' | 'dfs' | 'bi') => {
    setActiveSearch(searchType);
  };

  return (
    <SwitchButtonProvider>
      <div className="w-[1400px] h-[850px] bg-[#EDEDED] rounded-2xl p-6 shadow-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center" style={{ fontFamily: 'Minecraft' }}>
        <div className="flex space-x-10">
          <button 
            className={`text-2xl font-bold ${activeSearch === "bfs" ? "text-gray-800" : "text-gray-400"} hover:text-gray-800`}
            onClick={() => handleSearchChange("bfs")}
          >
            Breadth-First Search
          </button>
          <button 
            className={`text-2xl font-bold ${activeSearch === "dfs" ? "text-gray-800" : "text-gray-400"} hover:text-gray-800`}
            onClick={() => handleSearchChange("dfs")}
          >
            Depth-First Search
          </button>
          <button 
            className={`text-2xl font-bold ${activeSearch === "bi" ? "text-gray-800" : "text-gray-400"} hover:text-gray-800`}
            onClick={() => handleSearchChange("bi")}
          >
            Bidirectional Search
          </button>
        </div>
        <Link href="/">
          <button className="text-gray-600 text-2xl font-bold hover:text-gray-400">X</button>
        </Link>
      </div>

      {/* Input Bar */}
      <div className="flex items-center justify-between w-full space-x-4" style={{ fontFamily: 'Minecraft' }}>
        <SwitchButton />

        {/* Elemen Input */}
        <div className="flex items-center space-x-2">
          <label className="text-black text-[28px]">Elemen :</label>
          <input
            type="text"
            className="bg-[#6B6B6B] text-white px-2 w-[400px] h-[48px] rounded text-[20px]"
          />
        </div>

        {/* Max Resep Input - using useMode hook */}
        <MaxResepInput />

        <button className="rounded hover:brightness-110 p-1">
          <Image src="/images/search.png" width={48} height={48} alt="Search" />
        </button>
      </div>

      {/* Display Area based on active search algorithm */}
      <div className="bg-[#6D6D6D] w-[1350px] h-[650px] rounded-md flex flex-col justify-between px-4 py-3">
        {/* Main Display Content */}
        <div className="flex-1">
          {/* Display will change based on activeSearch */}
          {/* For now it's empty, but you could conditionally render different components here */}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-12 text-white text-[28px]" style={{ fontFamily: 'Minecraft' }}>
          <button>{'<'}</button>
          <div className="text-xl">1</div>
          <div className="text-xl">2</div>
          <div className="text-xl">3</div>
          <button>{'>'}</button>
        </div>
      </div>

      {/* Footer with search stats */}
      <div className="flex justify-between text-gray-700 text-[20px]" style={{ fontFamily: 'Minecraft' }}>
        <div>Waktu Eksekusi: 80ms</div>
        <div>Node Dikunjungi: 42</div>
        <div>Jumlah Resep: 3</div>
      </div>
          </div>
    </SwitchButtonProvider>
  );
}