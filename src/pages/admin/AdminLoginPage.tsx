import type { JSX } from "react";

import { ArrowLeft, LogIn } from "lucide-react";
import { Link } from "react-router";

export function AdminLoginPage(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-background-deep/60">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">THE FASTORIA 2027</p>
        <h1 className="mt-2 font-display text-2xl font-black uppercase text-foreground">Login Admin</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Form login belum terhubung. Halaman ini masih berupa mock untuk menguji router.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <LogIn aria-hidden="true" className="size-4" />
            Buka Dashboard (Mock)
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground-muted transition hover:bg-surface-raised hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </main>
  );
}
