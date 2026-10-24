import type { JSX } from "react";

import { PagePlaceholder } from "@/components/molecules/PagePlaceholder";

export function AdminSettingsPage(): JSX.Element {
  return (
    <PagePlaceholder
      title="Pengaturan Acara"
      description="Form identitas acara, tanggal, hadiah, lokasi, kontak, timeline, dan sosial media akan tersedia di sini."
    />
  );
}
