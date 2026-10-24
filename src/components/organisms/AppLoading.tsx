import type { JSX } from "react";

import { LoaderCircle } from "lucide-react";

export function AppLoading(): JSX.Element {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-background px-6 py-12"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <LoaderCircle aria-hidden="true" className="size-8 animate-spin text-primary" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">Memuat…</p>
      </div>
    </div>
  );
}
