'use client'
import dynamic from "next/dynamic";
import React, { useMemo, useState, useEffect } from "react";
import { RawNodeDatum } from "react-d3-tree";

const TreeWrapper = dynamic(() => import("./TreeWrapper"), { ssr: false });


type TreeNodeDatum = {
  name: string;
  imageUrl?: string;
  children?: TreeNodeDatum[];
};

interface CustomTreeNodeDatum extends RawNodeDatum {
  imageUrl?: string;
}

function buildTreeData(
  node: string,
  steps: Record<string, [string, string]>,
  elementImages: Record<string, string>,
  visited: Set<string> = new Set()
): TreeNodeDatum {
  if (visited.has(node)) {
    return {
      name: node,
      imageUrl: elementImages[node] || undefined,
      children: [],
    };
  }
  visited.add(node);

  const ingredients = steps[node];
  if (!ingredients) {
    return {
      name: node,
      imageUrl: elementImages[node] || undefined,
      children: [],
    };
  }

  return {
    name: node,
    imageUrl: elementImages[node] || undefined,
    children: [
      buildTreeData(ingredients[0], steps, elementImages, visited),
      buildTreeData(ingredients[1], steps, elementImages, visited),
    ],
  };
}
interface TreeNodeProps {
  steps: Record<string, [string, string]>;
  finalItem: string;
  elementImages: Record<string, string>;
  liveUpdate?: boolean;
}

export default function TreeVisualizer({ steps, finalItem, elementImages, liveUpdate }: TreeNodeProps) {
  const [partialSteps, setPartialSteps] = useState<Record<string, [string, string]>>({});
  const basicElements = new Set(["Fire", "Water", "Earth", "Air"]);

  useEffect(() => {
    if (!liveUpdate) {
      setPartialSteps(steps);
      return;
    }
  
    setPartialSteps({});
    const keys = Object.keys(steps);
    let i = 0;
  
    const interval = setInterval(() => {
      if (i >= keys.length) {
        clearInterval(interval);
        return;
      }
      const key = keys[i];
      setPartialSteps(prev => ({ ...prev, [key]: steps[key] }));
      i++;
    }, 300);
  
    return () => clearInterval(interval);
  }, [steps, liveUpdate]);

  const treeData = useMemo(() => {
    if (!partialSteps[finalItem] && basicElements.has(finalItem)) {
      return [{
        name: finalItem,
        imageUrl: elementImages[finalItem] || undefined,
        children: [], 
      }];
    }

    return [buildTreeData(finalItem, partialSteps, elementImages, new Set())];
  }, [partialSteps, finalItem, elementImages]);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <TreeWrapper
        key={finalItem}
        data={treeData}
        orientation="vertical"
        translate={{ x: 400, y: 50 }}
        zoomable
        collapsible={false}
        renderCustomNodeElement={({ nodeDatum }: { nodeDatum: CustomTreeNodeDatum }) => (
          <g>
            {nodeDatum.imageUrl ? (
              <image
                href={`http://localhost:8080/api/image?url=${encodeURIComponent(nodeDatum.imageUrl)}`}
                x={-20}
                y={-20}
                width={40}
                height={40}
                preserveAspectRatio="xMidYMid slice"
              />
            ) : (
              <circle r={10} fill="#4B5563" stroke="#fff" strokeWidth={2} />
            )}
            <text fill="#fff" stroke="none" fontSize="14" x={25} y={5}>
              {nodeDatum.name}
            </text>
          </g>
        )}
      />
    </div>
  );
}
