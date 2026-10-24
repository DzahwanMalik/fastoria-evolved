import type { JSX } from "react";

import { BrowserRouter } from "react-router";

import { AppError } from "@/components/organisms/AppError";
import { AppLoading } from "@/components/organisms/AppLoading";
import { useAppBootstrap } from "@/hooks/useAppBootstrap";
import { AppRoutes } from "@/router";

export function App(): JSX.Element {
  const bootstrap = useAppBootstrap();

  if (bootstrap.status === "loading") {
    return <AppLoading />;
  }

  if (bootstrap.status === "error") {
    return <AppError message={bootstrap.message} onRetry={bootstrap.retry} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
