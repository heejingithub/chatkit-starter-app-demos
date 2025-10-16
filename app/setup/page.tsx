"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [workflowId, setWorkflowId] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const k = window.localStorage.getItem("chatkit_openai_api_key");
      const w = window.localStorage.getItem("chatkit_workflow_id");
      if (k) setApiKey(k);
      if (w) setWorkflowId(w);
    } catch {}
  }, []);

  const handleSave = () => {
    try {
      window.localStorage.setItem("chatkit_openai_api_key", apiKey.trim());
      window.localStorage.setItem("chatkit_workflow_id", workflowId.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };

  const handleStart = () => {
    handleSave();
    router.replace("/");
  };

  const handleClear = () => {
    try {
      window.localStorage.removeItem("chatkit_openai_api_key");
      window.localStorage.removeItem("chatkit_workflow_id");
      setApiKey("");
      setWorkflowId("");
    } catch {}
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-6 dark:bg-slate-950">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h1 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Setup
        </h1>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Enter your OpenAI API Key and ChatKit Workflow ID. These are saved in
          your browser only and used to start the session.
        </p>

        <label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">
          OpenAI API Key
        </label>
        <input
          type="password"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />

        <label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">
          Workflow ID
        </label>
        <input
          type="text"
          placeholder="wf_..."
          value={workflowId}
          onChange={(e) => setWorkflowId(e.target.value)}
          className="mb-6 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Save & Start Chat
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Save Only
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="ml-auto rounded-lg border border-transparent px-3 py-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Clear
          </button>
        </div>

        {saved ? (
          <div className="mt-4 text-sm text-green-600 dark:text-green-400">
            Saved
          </div>
        ) : null}

        <div className="mt-6 text-xs text-slate-500 dark:text-slate-400">
          Prefer environment variables? Set `OPENAI_API_KEY` and
          `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` and go directly to the chat.
        </div>
      </div>
    </main>
  );
}

