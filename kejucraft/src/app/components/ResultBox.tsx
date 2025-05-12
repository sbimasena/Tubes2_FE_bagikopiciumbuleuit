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
  const [elementImages, setElementImages] = useState<Record<string, string>>({});
  const [liveUpdate, setLiveUpdate] = useState(false);

  useEffect(() => {
    if (result && currentPage >= result.paths.length) {
      setCurrentPage(0);
    }

    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/elements");
        const data = await res.json();
        const map: Record<string, string> = {};
        for (const item of data) {
          map[item.element] = item.image_url;
        }
        setElementImages(map);
      } catch (err) {
        console.error("Failed to fetch element images", err);
      }
    };
  
    fetchImages();
  }, [result, currentPage]);

  const safePaths = (result?.paths ?? []).filter((p): p is string[] => Array.isArray(p));
  const safeSteps = (result?.steps ?? []).filter((s): s is Record<string, [string, string]> => !!s);

  const currentPath = safePaths[currentPage] ?? [];
  const currentStepMap = safeSteps[currentPage] ?? {};

  const finalItem = currentPath.length > 0 ? currentPath[currentPath.length - 1] : "";

  const visualSteps = useMemo(() => {
    if (!currentPath.length || !finalItem) return [];

    const steps: Step[] = [];
    const visited = new Set<string>();

    const dfs = (resultName: string) => {
      if (visited.has(resultName)) return;
      visited.add(resultName); 
    
      const ingredients = currentStepMap[resultName];
      if (!ingredients) return;
    
      dfs(ingredients[0]);
      dfs(ingredients[1]);
    
      steps.push({ ingredients, result: resultName });
    };

    if (currentStepMap[finalItem]) {
      dfs(finalItem);
    } else if (finalItem) {
      steps.push({
        ingredients: ["-", "-"],
        result: finalItem,
      });
    }

    return steps;
  }, [currentPath, currentStepMap, finalItem]);

  // Baru sekarang tampilkan fallback jika data tidak valid
  if (!result || result.paths.length === 0) {
    return (
      <div className="text-gray-700 text-[20px] mt-4" style={{ fontFamily: "Minecraft" }}>
        Tidak ada Resep untuk Elemen ini.
      </div>
    );
  }


  return (
    <div className="text-gray-700 text-[20px] mt-4 space-y-4" style={{ fontFamily: 'Minecraft' }}>
      <div>
        <p>⏱ Waktu: {result.duration}</p>
        <p>📦 Node Dikunjungi: {result.nodes_visited}</p>
        <p>🧪 Jumlah Resep: {result.paths.length}</p>
      </div>

      <div className="bg-[#5A5A5A] text-white rounded p-4 max-h-[500px] overflow-y-auto">
        <p className="text-lg font-bold mb-2">🔢 Resep #{currentPage + 1}</p>
        {visualSteps.map((step, i) => (
          <p key={i}>
            {step.ingredients[0]} + {step.ingredients[1]} → {step.result}
          </p>
        ))}

      <div className="mt-4 max-h-[400px] overflow-y-auto pr-2 bg-[#3E3E3E]">
        <div className="flex justify-between items-center px-4 pt-2">
          <p className="text-white font-bold text-xl">🧬 Pohon Resep (Tree):</p>

          {/* Tombol Play */}
          <button
            onClick={() => setLiveUpdate(prev => !prev)}
            title={liveUpdate ? "Live Update Aktif" : "Live Update Nonaktif"}
            className="hover:scale-110 transition-transform mt-2 cursor-pointer"
          >
            <img
              src="/images/live-dot.png"
              alt="Toggle Live Update"
              width={30}
              height={30}
            />
          </button>
        </div>

        <div className="flex justify-center mt-2">
          {currentPath.length === 1 && !currentStepMap[finalItem] ? (
            <div className="flex flex-col items-center">
              <img
                src={elementImages[finalItem]}
                alt={finalItem}
                className="w-[80px] h-[80px] object-contain"
              />
              <p className="text-white mt-2">{finalItem}</p>
            </div>
          ) : (
            <TreeVisualizer
              finalItem={finalItem}
              steps={currentStepMap}
              elementImages={elementImages}
              liveUpdate={liveUpdate}
            />
          )}
        </div>
      </div>

      </div>

      {safePaths.length > 1 && (
        <div className="flex justify-center items-center space-x-6 text-[24px] mt-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="hover:underline disabled:opacity-50"
          >
            {"<"}
          </button>

          {safePaths.map((_, index) => (
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

