import type { JSX } from "react";

import { PagePlaceholder } from "@/components/molecules/PagePlaceholder";

export function AdminDashboardPage(): JSX.Element {
  return (
    <PagePlaceholder
      title="Ringkasan"
      description="Ringkasan jumlah kategori, cabang lomba, dan checklist konten akan tampil di sini setelah CMS terhubung."
    />
  );
}
