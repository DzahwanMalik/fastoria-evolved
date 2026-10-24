import type { JSX } from "react";

import { PagePlaceholder } from "@/components/molecules/PagePlaceholder";

export function AdminAccountPage(): JSX.Element {
  return (
    <PagePlaceholder
      title="Akun"
      description="Informasi akun dan tombol logout akan tersedia di sini."
    />
  );
}
