import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/types/database";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
});

const env = envSchema.safeParse(import.meta.env);

if (!env.success) {
  throw new Error("Konfigurasi Supabase tidak lengkap.");
}

export const supabase = createClient<Database>(env.data.VITE_SUPABASE_URL, env.data.VITE_SUPABASE_ANON_KEY);
