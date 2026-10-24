import type { JSX } from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function HomePage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 px-6 py-12 text-center text-slate-50">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-300">Mock Landing Page</p>
      <h1 className="text-4xl font-black uppercase sm:text-6xl">THE FASTORIA 2027</h1>
      <p className="max-w-md text-balance text-slate-300">
        Landing page publik belum diimplementasikan. Konten ini hanya untuk menguji router.
      </p>
      <Link
        to="/admin/login"
        className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-lime-200"
      >
        Masuk Dashboard
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </main>
  );
}
