
// src/pages/AlunoPage.tsx
import React, { useEffect, useState } from "react";
import { requireAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

export function AlunoPage() {
  const [status, setStatus] = useState<"loading" | "active" | "inactive">("loading");

  useEffect(() => {
    (async () => {
      const ok = await requireAuth();
      if (!ok) return;
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user.id;
      if (!userId) { setStatus("inactive"); return; }
      const { data, error } = await supabase.from("enrollments").select("status").eq("user_id", userId).single();
      if (error || !data) { setStatus("inactive"); return; }
      setStatus(data.status === "active" ? "active" : "inactive");
    })();
  }, []);

  return (
    <section className="min-h-screen p-6 max-w-3xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Área do Aluno</h1>
        <a href="#/" className="text-sm underline">Voltar</a>
      </header>

      <div className="rounded-2xl border p-4">
        {status === "loading" && <p>Checando sua assinatura...</p>}
        {status === "active" && <p className="text-green-700">✅ Assinatura ativa — acesso liberado.</p>}
        {status === "inactive" && (
          <div>
            <p className="mb-2">⚠️ Assinatura não encontrada ou inativa.</p>
            <a href="#/checkout" className="inline-block rounded-xl px-4 py-2 bg-black text-white">Assinar agora</a>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4">
        <a href="#/curso" className="block rounded-2xl border p-4 hover:shadow">
          <h2 className="font-semibold">Módulos e Aulas</h2>
          <p className="text-sm opacity-70">Acesse suas aulas quando estiverem liberadas.</p>
        </a>
      </div>
    </section>
  );
}
