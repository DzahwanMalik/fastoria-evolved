import type { JSX } from "react";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function NotFoundPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-secondary">404</p>
      <h1 className="font-display text-3xl font-black uppercase leading-[0.95] sm:text-5xl sm:font-stretch-expanded">
        Halaman tidak ditemukan
      </h1>
      <p className="max-w-md text-foreground-muted">
        Tautan yang kamu buka mungkin salah atau halaman sudah dipindahkan.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Kembali ke Beranda
      </Link>
    </main>
  );
}
