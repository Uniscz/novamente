// src/pages/AdminPage.tsx
import React, { useEffect, useState } from "react";
import { requireAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

/**
 * Página de administração simples para subir vídeos e PDFs.
 * Esta página é protegida: somente o e‑mail do administrador definido
 * terá acesso. Substitua ADMIN_EMAIL pelo seu e‑mail real.
 */
export function AdminPage() {
  // Defina aqui o e‑mail do administrador. Somente esse usuário poderá acessar
  // o painel para subir aulas. O mesmo valor deve ser configurado na política
  // RLS de INSERT da tabela `lessons`. Substitua por seu e‑mail real.
  const ADMIN_EMAIL = "admin@example.com";

  const [allowed, setAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Verifica se o usuário logado é o administrador
  useEffect(() => {
    (async () => {
      const ok = await requireAuth();
      if (!ok) { setAllowed(false); setLoading(false); return; }
      const session = await supabase.auth.getSession();
      const email = session.data.session?.user.email;
      setAllowed(email === ADMIN_EMAIL);
      setLoading(false);
    })();
  }, []);

  async function handleUpload(e: React.FormEvent) {
      e.preventDefault();
      if (!file) { setMessage("Selecione um arquivo para upload"); return; }
      setMessage("Enviando...");
      try {
        // Cria um caminho único usando timestamp
        const path = `${Date.now()}_${file.name}`;
        // Faz upload para o bucket "videos". Certifique‑se de que o bucket exista no Supabase.
        const { data, error } = await supabase.storage.from("videos").upload(path, file);
        if (error) throw error;
        // Salva metadados em uma tabela "lessons" (crie esta tabela no Supabase conforme necessário)
        await supabase.from("lessons").insert({
          title,
          path: data?.path || path,
          created_at: new Date().toISOString(),
        });
        setMessage("Upload concluído!");
        setTitle("");
        setFile(null);
      } catch (err: any) {
        setMessage(err?.message || "Erro ao fazer upload");
      }
  }

  if (loading) {
    return <section className="p-6">Carregando...</section>;
  }
  if (!allowed) {
    return <section className="p-6">Você não tem acesso a esta página.</section>;
  }

  return (
    <section className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Painel do Administrador</h1>
      <form onSubmit={handleUpload} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Título da aula</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl p-3"
            placeholder="Título descritivo"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Arquivo (vídeo ou PDF)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full"
            required
          />
        </div>
        <button type="submit" className="inline-block rounded-xl px-4 py-2 bg-black text-white">Enviar</button>
      </form>
      {message && <p className="mt-3 text-sm">{message}</p>}
      <p className="text-xs opacity-60 mt-4">Esta é uma implementação básica de upload. Para produção, configure permissões de armazenamento e tabelas no Supabase.</p>
    </section>
  );
}