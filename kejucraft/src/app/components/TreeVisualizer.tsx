import dynamic from "next/dynamic";
import React, { useMemo } from "react";

// Dynamic import TreeWrapper, bukan langsung react-d3-tree
const TreeWrapper = dynamic(() => import("./TreeWrapper"), { ssr: false });

type TreeNodeDatum = {
  name: string;
  children?: TreeNodeDatum[];
};

function buildTreeData(
  node: string,
  steps: Record<string, [string, string]>,
  visited: Set<string> = new Set()
): TreeNodeDatum {
  if (visited.has(node)) return { name: node };
  visited.add(node);

  const ingredients = steps[node];
  if (!ingredients) return { name: node };

  return {
    name: node,
    children: [
      buildTreeData(ingredients[0], steps, visited),
      buildTreeData(ingredients[1], steps, visited),
    ],
  };
}

interface TreeNodeProps {
  steps: Record<string, [string, string]>;
  finalItem: string;
}

export default function TreeVisualizer({ steps, finalItem }: TreeNodeProps) {
  const treeData = useMemo(() => [buildTreeData(finalItem, steps, new Set())], [steps, finalItem]);


  return (
    <div style={{ width: "100%", height: "600px" }}>
      <TreeWrapper
  data={treeData}
  orientation="vertical"
  translate={{ x: 400, y: 50 }}
  zoomable
  collapsible={false}
  renderCustomNodeElement={({ nodeDatum }) => (
    <g>
      <circle r={10} fill="#4B5563" stroke="#fff" strokeWidth={2} />
      <text fill="#fff" stroke="none" fontSize="14" x={15}>
        {nodeDatum.name}
        <title>{nodeDatum.name}</title> 
      </text>
    </g>
  )}
/>
    </div>
  );
}
