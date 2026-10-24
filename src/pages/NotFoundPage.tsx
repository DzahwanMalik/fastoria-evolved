import type { JSX } from "react";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function NotFoundPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-6 py-12 text-center text-slate-50">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-rose-400">404</p>
      <h1 className="text-3xl font-black uppercase sm:text-5xl">Halaman tidak ditemukan</h1>
      <p className="max-w-md text-slate-300">Tautan yang kamu buka mungkin salah atau halaman sudah dipindahkan.</p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Kembali ke Beranda
      </Link>
    </main>
  );
}
