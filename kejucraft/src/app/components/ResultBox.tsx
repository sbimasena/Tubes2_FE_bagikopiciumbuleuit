import React, { useState } from "react";

interface Step {
  ingredients: [string, string];
  result: string;
}

interface Path {
  steps: Step[];
  final_item: string;
}

interface DfsResponse {
  duration: string;
  nodes_visited: number;
  paths: Path[];
}

interface ResultBoxProps {
  result: DfsResponse | null;
}

export default function ResultBox({ result }: ResultBoxProps) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!result) {
    return (
      <div className="text-white text-[20px] mt-4" style={{ fontFamily: 'Minecraft' }}>
        Belum ada hasil pencarian
      </div>
    );
  }

  const currentPath = result.paths[currentPage];

  // Recursive visual tree rendering
  const renderVisualTree = (steps: Step[], target: string): JSX.Element => {
    const stepMap = new Map<string, Step>();
    steps.forEach(step => stepMap.set(step.result, step));

    const buildTree = (node: string): JSX.Element => {
      const step = stepMap.get(node);
      if (!step) {
        return <li>{node}</li>;
      }
    
      return (
        <li>
          <span className="font-bold">{step.result}</span>
          <ul className="ml-6 list-disc">
            {buildTree(step.ingredients[0])}
            {buildTree(step.ingredients[1])}
          </ul>
        </li>
      );
    };

    return (
      <div className="mt-4 max-h-[400px] overflow-y-auto pr-2 bg-[#3E3E3E]">
        <p className="text-white font-bold text-xl mb-2">🧬 Pohon Resep (Tree):</p>
        <ul className="text-white ml-4 list-disc">{buildTree(target)}</ul>
      </div>
    );
  };

  return (
    <div className="text-white text-[20px] mt-4 space-y-4" style={{ fontFamily: 'Minecraft' }}>
      {/* Stats */}
      <div>
        <p>⏱ Waktu: {result.duration}</p>
        <p>📦 Node Dikunjungi: {result.nodes_visited}</p>
        <p>🧪 Jumlah Resep: {result.paths.length}</p>
      </div>

      {/* Main Box with scroll if needed */}
      <div className="bg-[#5A5A5A] rounded p-4 max-h-[500px] overflow-y-auto">
        <p className="text-lg font-bold mb-2">🔢 Resep #{currentPage + 1}</p>
        {currentPath.steps.map((step, i) => (
          <p key={i}>
            {step.ingredients[0]} + {step.ingredients[1]} → {step.result}
          </p>
        ))}
        {renderVisualTree(currentPath.steps, currentPath.final_item)}
      </div>

      {/* Pagination */}
      {result.paths.length > 1 && (
        <div className="flex justify-center items-center space-x-6 text-[24px] mt-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="hover:underline disabled:opacity-50"
          >
            {"<"}
          </button>

          {result.paths.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`text-xl px-2 ${index === currentPage ? "underline font-bold" : ""}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, result.paths.length - 1))}
            disabled={currentPage === result.paths.length - 1}
            className="hover:underline disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}
