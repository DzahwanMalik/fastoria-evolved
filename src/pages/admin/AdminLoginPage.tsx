import type { JSX } from "react";

import { ArrowLeft, LogIn } from "lucide-react";
import { Link } from "react-router";

export function AdminLoginPage(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">THE FASTORIA 2027</p>
        <h1 className="mt-2 text-2xl font-black uppercase text-slate-950">Login Admin</h1>
        <p className="mt-2 text-sm text-slate-600">
          Form login belum terhubung. Halaman ini masih berupa mock untuk menguji router.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <LogIn aria-hidden="true" className="size-4" />
            Buka Dashboard (Mock)
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </main>
  );
}
