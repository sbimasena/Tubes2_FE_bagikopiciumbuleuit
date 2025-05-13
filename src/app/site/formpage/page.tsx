// src/app/site/formpage/page.tsx
import { Suspense } from "react";
import { SwitchButtonProvider } from "@/src/app/components/SwitchButton";
import ClientFormWrapper from "@/src/app/components/ClientFormWrapper";

export default function FormPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/main-bg.svg')" }}
      >
        <div className="flex items-center justify-center pt-16">
          <SwitchButtonProvider>
            <Suspense fallback={<div>Loading form...</div>}>
              <ClientFormWrapper />
            </Suspense>
          </SwitchButtonProvider>
        </div>
      </div>
    </div>
  );
}
