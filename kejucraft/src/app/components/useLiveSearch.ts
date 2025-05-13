import { useEffect, useRef } from "react";


  type Step = {
    ingredients: [string, string];
    result: string;
  };
  
  export type StepMessage =
    | {
        type: "step";
        step: Step;
      }
    | {
        type: "done";
        visited: number;
        duration: string;
      }
    | {
        type: "error";
        error: string;
      };

export function useLiveSearch(
  {
    target,
    algorithm,
    maxPaths,
    onStep,
    onDone,
    onError,
    liveUpdate,
  }: {
    target: string;
    algorithm: string;
    maxPaths?: number;
    onStep: (step: { ingredients: [string, string]; result: string }) => void;
    onDone: (duration: string, visited: number) => void;
    onError?: (err: string) => void;
    liveUpdate: boolean;
  }
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!target || !liveUpdate) return;

    const ws = new WebSocket("ws://localhost:8080/ws/search");
    socketRef.current = ws;

    ws.onopen = () => {
        console.log("WebSocket OPEN");
      ws.send(
        JSON.stringify({
          target,
          algorithm,
          maxPaths: maxPaths ?? 5,
          starting: ["Air", "Earth", "Fire", "Water"],
        })
      );
    };

    ws.onmessage = (event) => {
      const msg: StepMessage = JSON.parse(event.data);
      console.log("📩 WebSocket MSG", msg);

      if (msg.type === "step") {
        console.log("✅ STEP DITERIMA", msg.step);
        onStep(msg.step);
      }
      
      if (msg.type === "step") {
        onStep(msg.step);
      } else if (msg.type === "done") {
        onDone(msg.duration, msg.visited);
        ws.close();
      } else if ("error" in msg) {
        onError?.(msg.error);
        ws.close();
      }
    };

    ws.onerror = () => {
      onError?.("WebSocket error");
    };

    return () => {
      ws.close();
    };
  }, [target, algorithm, maxPaths]);
}
