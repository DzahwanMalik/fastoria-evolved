import type { JSX } from "react";

import { BrowserRouter } from "react-router";

import { AppRoutes } from "@/router";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
