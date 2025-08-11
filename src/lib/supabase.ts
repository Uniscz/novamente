// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

console.log("Supabase URL:", url);
console.log("Supabase Anon Key:", anon ? "Presente" : "Ausente");

if (!url || !anon) {
  console.error("Configuração do Supabase incompleta:");
  console.error("VITE_SUPABASE_URL:", url || "NÃO DEFINIDO");
  console.error("VITE_SUPABASE_ANON_KEY:", anon ? "DEFINIDO" : "NÃO DEFINIDO");
  throw new Error("Variáveis de ambiente do Supabase não configuradas corretamente");
}

// Validar formato da URL
try {
  new URL(url);
} catch (error) {
  console.error("URL do Supabase inválida:", url);
  throw new Error("URL do Supabase inválida");
}

export const supabase = createClient(url, anon, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Testar conectividade
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("Erro ao conectar com Supabase:", error);
  } else {
    console.log("Conexão com Supabase estabelecida com sucesso");
  }
}).catch(error => {
  console.error("Erro de conectividade com Supabase:", error);
});

