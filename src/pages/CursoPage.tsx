
// src/pages/CursoPage.tsx
import React, { useEffect, useState } from "react";
import { requireAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

export function CursoPage() {
  const [allowed, setAllowed] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const ok = await requireAuth();
      if (!ok) return;
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user.id;
      if (!userId) { setAllowed(false); return; }
      const { data } = await supabase.from("enrollments").select("status").eq("user_id", userId).single();
      setAllowed(data?.status === "active");
      if (data?.status !== "active") window.location.hash = "#/aluno";
    })();
  }, []);

  if (allowed === null) {
    return <section className="min-h-screen p-6 max-w-4xl mx-auto"><p>Carregando...</p></section>;
  }
  if (!allowed) return null;

  return (
    <section className="min-h-screen p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Curso — Módulos</h1>
        <p className="text-sm opacity-70">Conteúdo placeholder. Subiremos vídeos/links quando estiverem prontos.</p>
      </header>

      <div className="grid gap-4">
        <article className="rounded-2xl border p-4">
          <h2 className="font-semibold">Módulo 1 — Fundamentos</h2>
          <ul className="text-sm opacity-80 list-disc pl-5">
            <li>Vídeo: link YouTube não listado (placeholder)</li>
            <li>PDF: Guia do aluno (placeholder)</li>
          </ul>
        </article>
        <article className="rounded-2xl border p-4">
          <h2 className="font-semibold">Módulo 2 — Workflow IA</h2>
          <p className="text-sm opacity-80">Placeholder de conteúdo.</p>
        </article>
      </div>
    </section>
  );
}
