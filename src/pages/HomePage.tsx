import type { JSX } from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function HomePage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Mock Landing Page</p>
      <h1 className="font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl sm:font-stretch-expanded">
        THE FASTORIA 2027
      </h1>
      <p className="max-w-md text-balance text-foreground-muted">
        Landing page publik belum diimplementasikan. Konten ini hanya untuk menguji router.
      </p>
      <Link
        to="/admin/login"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
      >
        Masuk Dashboard
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </main>
  );
}
