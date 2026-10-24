import type { JSX } from "react";

type Props = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: Props): JSX.Element {
  return (
    <section className="rounded-2xl border border-dashed border-border bg-surface p-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">Mock</p>
      <h1 className="mt-2 font-display text-2xl font-black text-foreground">{title}</h1>
      <p className="mt-2 max-w-prose text-sm text-foreground-muted">{description}</p>
    </section>
  );
}
