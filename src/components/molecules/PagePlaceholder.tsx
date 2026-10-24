import type { JSX } from "react";

type Props = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: Props): JSX.Element {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Mock</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-950">{title}</h1>
      <p className="mt-2 max-w-prose text-sm text-slate-600">{description}</p>
    </section>
  );
}
