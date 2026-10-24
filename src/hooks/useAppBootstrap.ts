import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

const BOOTSTRAP_ERROR_MESSAGE = "Aplikasi gagal dimuat. Periksa koneksi internet lalu coba lagi.";

type BootstrapState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready" };

export type AppBootstrap =
  | { status: "loading" }
  | { status: "error"; message: string; retry: () => void }
  | { status: "ready" };

async function loadBootstrap(): Promise<BootstrapState> {
  try {
    const [session, settings] = await Promise.all([
      supabase.auth.getSession(),
      supabase.from("event_settings").select("id").limit(1).maybeSingle(),
    ]);

    if (session.error ?? settings.error) {
      if (import.meta.env.DEV) {
        console.error(session.error ?? settings.error);
      }

      return { status: "error", message: BOOTSTRAP_ERROR_MESSAGE };
    }

    return { status: "ready" };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(error);
    }

    return { status: "error", message: BOOTSTRAP_ERROR_MESSAGE };
  }
}

export function useAppBootstrap(): AppBootstrap {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<BootstrapState>({ status: "loading" });

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void loadBootstrap().then((nextState) => {
      if (!cancelled) {
        setState(nextState);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  if (state.status === "error") {
    return { ...state, retry };
  }

  return state;
}
