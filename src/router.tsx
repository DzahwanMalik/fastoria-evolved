import type { JSX } from "react";

import { Route, Routes } from "react-router";

import { AdminLayout } from "@/components/templates/AdminLayout";
import { AdminAccountPage } from "@/pages/admin/AdminAccountPage";
import { AdminCategoriesPage } from "@/pages/admin/AdminCategoriesPage";
import { AdminCompetitionsPage } from "@/pages/admin/AdminCompetitionsPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage";
import { AdminSettingsPage } from "@/pages/admin/AdminSettingsPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="pengaturan" element={<AdminSettingsPage />} />
        <Route path="kategori" element={<AdminCategoriesPage />} />
        <Route path="cabang-lomba" element={<AdminCompetitionsPage />} />
        <Route path="akun" element={<AdminAccountPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
