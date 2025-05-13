"use client";
import { Tree, TreeProps } from "react-d3-tree";

const TreeWrapper = (props: TreeProps) => {
  return <Tree {...props} />;
};

export default TreeWrapper;