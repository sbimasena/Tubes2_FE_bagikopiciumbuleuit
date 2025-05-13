import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SwitchButton, { useMode } from "./SwitchButton";  // Remove unused imports
import ResultBox from "./ResultBox";
import BidiSwitchButton from "./BidiSwitchButton";
import ScrapeButton from "./ScrapeButton";

// Separate component for Max Resep input that uses the mode context
function MaxResepInput({ maxResep, setMaxResep }: { maxResep: string, setMaxResep: (val: string) => void }) {
  const { isMultithreading } = useMode();

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

interface DfsResponse {
  duration: string;
  nodes_visited: number;
  paths: string[][]; // ← sesuai backend
  steps: Record<string, [string, string]>[]; // ← map result -> ingredients
  algorithm: string;
}

export default function Form({ initialSearchType = 'bfs' }: FormProps) {
  const [activeSearch, setActiveSearch] = useState<'bfs' | 'dfs' | 'bi'>(initialSearchType);
  const [element, setElement] = useState("");
  const [maxResep, setMaxResep] = useState("");
  const [result, setResult] = useState<DfsResponse | null>(null);
  const { isMultithreading } = useMode();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bidiMode, setBidiMode] = useState<"bfs" | "dfs">("dfs");

  const handleSearchChange = (searchType: 'bfs' | 'dfs' | 'bi') => {
    setActiveSearch(searchType);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const query = new URLSearchParams({
        target: element,
        algorithm: activeSearch === "bi" ? "bidirectional" : activeSearch,
        maxPaths: isMultithreading
          ? (parseInt(maxResep) > 0 ? maxResep : "3")
          : "1",
      });
  
      if (activeSearch === "bi") {
        query.set("bidi", bidiMode);
      }
  
      const response = await fetch(`http://localhost:8080/api/search?${query.toString()}`);
      const responseText = await response.text(); 
  
      if (!response.ok) {
        if (response.status === 404 && responseText.includes("No path found")) {
          throw new Error("Tidak ada Resep untuk Elemen ini");
        }
        throw new Error(responseText);
      }
  
      const data: DfsResponse = JSON.parse(responseText);  // Fix type casting here
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
        <ScrapeButton />
        <SwitchButton />
        <BidiSwitchButton activeSearch={activeSearch} bidiMode={bidiMode} setBidiMode={setBidiMode} />
        
        {/* Elemen Input */}
        <div className="flex items-center space-x-2">
          <label className="text-black text-[28px]">Elemen :</label>
          <input
            type="text"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            className="bg-[#6B6B6B] text-white px-2 w-[400px] h-[48px] rounded text-[20px]"
          />
        </div>

        {/* Max Resep Input */}
        <MaxResepInput maxResep={maxResep} setMaxResep={setMaxResep} />

        <button className="rounded hover:brightness-110 cursor-pointer p-1"  onClick={handleSearch}>
          <Image src="/images/search.png" width={48} height={48} alt="Search" />
        </button>
      </div>

      {loading && <p className="text-gray-700 text-xl bg-[#DADADA] rounded p-4 max-h-[500px] overflow-y-auto" style={{ fontFamily: "Minecraft" }}>Mencari jalur terbaik...</p>}
      {error && (
        <div className="text-gray-700 text-[20px] mt-4 bg-[#DADADA] rounded p-4 max-h-[500px] overflow-y-auto" style={{ fontFamily: "Minecraft" }}>
          {error}
        </div>
      )}

      {result && (
      <div className="text-gray-700 text-[20px] mt-4 bg-[#DADADA] rounded p-4 max-h-[500px]">
        <ResultBox result={result} />
      </div>
    )}
    </div>
  );
}
