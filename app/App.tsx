"use client";

import { useCallback, useEffect } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "next/navigation";
import { WORKFLOW_ID } from "@/lib/config";

export default function App() {
  const { scheme, setScheme } = useColorScheme();
  const router = useRouter();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  // If no env workflow and nothing saved locally, guide users to Setup first
  useEffect(() => {
    try {
      if (!WORKFLOW_ID || WORKFLOW_ID.startsWith("wf_replace")) {
        const stored = window.localStorage.getItem("chatkit_workflow_id");
        if (!stored || !stored.trim()) {
          router.replace("/setup");
        }
      }
    } catch {
      // ignore localStorage errors
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
