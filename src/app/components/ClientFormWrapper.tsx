// src/app/components/ClientFormWrapper.tsx
'use client';

import React from "react";
import { useSearchParams } from "next/navigation";
import Form from "./Form";

export default function ClientFormWrapper() {
  const searchParams = useSearchParams();
  const searchType = searchParams.get("type") as "bfs" | "dfs" | "bi" || "bfs";

  return <Form initialSearchType={searchType} />;
}
