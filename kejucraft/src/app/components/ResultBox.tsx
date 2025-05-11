import React, { useState, useEffect, useMemo } from "react";
import TreeVisualizer from "./TreeVisualizer";

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
  paths: string[][]; // ← sesuai backend
  steps: Record<string, [string, string]>[]; // ← map result -> ingredients
  algorithm: string;
}

interface ResultBoxProps {
  result: DfsResponse | null;
}

export default function ResultBox({ result }: ResultBoxProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (result && currentPage >= result.paths.length) {
      setCurrentPage(0);
    }
  }, [result]);

  if (!result || !result.paths?.length || !result.steps?.length) {
    return (
      <div className="text-white text-[20px] mt-4" style={{ fontFamily: 'Minecraft' }}>
        Tidak ada resep yang ditemukan.
      </div>
    );
  }

  const currentPath = result.paths[currentPage];
  const currentStepMap = result.steps[currentPage];

  const finalItem = currentPath[currentPath.length - 1];

  const visualSteps = useMemo(() => {
    const steps: Step[] = [];
    const visited = new Set<string>();
  
    const dfs = (resultName: string) => {
      if (visited.has(resultName)) return;
      const ingredients = currentStepMap[resultName];
      if (!ingredients) return;
  
      dfs(ingredients[0]);
      dfs(ingredients[1]);
  
      steps.push({ ingredients, result: resultName });
      visited.add(resultName);
    };
  
    dfs(finalItem);
    return steps;
  }, [currentPath, currentStepMap, finalItem]);


  return (
    <div className="text-white text-[20px] mt-4 space-y-4" style={{ fontFamily: 'Minecraft' }}>
      <div>
        <p>⏱ Waktu: {result.duration}</p>
        <p>📦 Node Dikunjungi: {result.nodes_visited}</p>
        <p>🧪 Jumlah Resep: {result.paths.length}</p>
      </div>

      <div className="bg-[#5A5A5A] rounded p-4 max-h-[500px] overflow-y-auto">
        <p className="text-lg font-bold mb-2">🔢 Resep #{currentPage + 1}</p>
        {visualSteps.map((step, i) => (
          <p key={i}>
            {step.ingredients[0]} + {step.ingredients[1]} → {step.result}
          </p>
        ))}

        <div className="mt-4 max-h-[400px] overflow-y-auto pr-2 bg-[#3E3E3E]">
          <p className="text-white font-bold text-xl mb-2">🧬 Pohon Resep (Tree):</p>
          <div className="flex justify-center">
            <TreeVisualizer finalItem={finalItem} steps={currentStepMap} />
          </div>
        </div>
      </div>

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

