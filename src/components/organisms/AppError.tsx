import type { JSX } from "react";

import { RefreshCw, TriangleAlert } from "lucide-react";

type Props = {
  message: string;
  onRetry: () => void;
};

export function AppError({ message, onRetry }: Props): JSX.Element {
  return (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center bg-background px-6 py-12"
    >
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-center">
        <TriangleAlert aria-hidden="true" className="mx-auto size-8 text-danger" />
        <h1 className="mt-3 font-display text-2xl font-black uppercase text-foreground">Gagal Memuat</h1>
        <p className="mt-2 text-sm text-foreground-muted">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
