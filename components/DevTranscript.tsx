"use client";

import { useMemo } from "react";

type DevLog = {
  ts: number;
  name: string;
  data?: Record<string, unknown> | undefined;
};

export type DevTranscriptProps = {
  logs: DevLog[];
  open: boolean;
  onToggle: () => void;
};

export function DevTranscript({ logs, open, onToggle }: DevTranscriptProps) {
  const sorted = useMemo(
    () => [...logs].sort((a, b) => a.ts - b.ts).slice(-200),
    [logs]
  );

  return (
    <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex justify-end">
      <div className="pointer-events-auto">
        <button
          type="button"
          onClick={onToggle}
          className="rounded-md border border-slate-300 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
          title="Toggle developer transcript"
        >
          {open ? "Hide Developer Transcript" : "Show Developer Transcript"}
        </button>
      </div>

      {open ? (
        <div className="pointer-events-auto mt-2 max-h-[50vh] w-[28rem] overflow-auto rounded-lg border border-slate-300 bg-white/90 p-3 text-xs text-slate-700 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200">
          {sorted.length === 0 ? (
            <div className="text-slate-500">No events yet.</div>
          ) : (
            <ul className="space-y-2">
              {sorted.map((e, i) => (
                <li key={`${e.ts}-${i}`} className="leading-relaxed">
                  <div className="font-semibold">{e.name}</div>
                  {e.data ? (
                    <pre className="mt-1 whitespace-pre-wrap break-words rounded bg-slate-50 p-2 text-[11px] leading-snug dark:bg-slate-800">
                      {safeJson(e.data)}
                    </pre>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

