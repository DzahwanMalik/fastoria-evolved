import type { JSX } from "react";
import type { NavLinkRenderProps } from "react-router";

import { LayoutDashboard, Settings, Tags, Trophy, UserRound } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";

const navigation = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard, end: true },
  { to: "/admin/pengaturan", label: "Pengaturan Acara", icon: Settings, end: false },
  { to: "/admin/kategori", label: "Kategori", icon: Tags, end: false },
  { to: "/admin/cabang-lomba", label: "Cabang Lomba", icon: Trophy, end: false },
  { to: "/admin/akun", label: "Akun", icon: UserRound, end: false },
] as const;

function navigationClass({ isActive }: NavLinkRenderProps): string {
  return isActive
    ? "flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
    : "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground-muted transition hover:bg-surface-raised hover:text-foreground";
}

export function AdminLayout(): JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">THE FASTORIA 2027</p>
            <p className="font-display text-sm font-black uppercase">CMS Dashboard</p>
          </div>
          <Link to="/" className="text-sm font-medium text-foreground-muted transition hover:text-foreground">
            Lihat Landing Page
          </Link>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <nav aria-label="Navigasi dashboard" className="rounded-xl bg-background-deep p-2">
            <ul className="flex flex-wrap gap-1 lg:flex-col">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={navigationClass}>
                    <item.icon aria-hidden="true" className="size-4" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
