import React, { useEffect, useRef, useState } from "react";

/** Videos Craft IA — Landing Premium (white/black + blue accent) */
export default function LandingPremium() {
  const CTA =
    "https://www.asaas.com/c/sf24e6hym93upjk6";
  const HERO_VIDEO =
    "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/video%20(24).mp4";
  const AUTHOR_IMG =
    "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/a-cinematic-portrait-photograph-of-a-you_AHl6tkPZRTi7hwXV9BIKgg_BoXTMqhdS1umGQ-lfiilYA.jpeg";

  const VIDEOS = [
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2022.13.27.mp4", label: "Transformação impressionante" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.23.mp4", label: "Deepfake ultra realista" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2023.30.40.mp4", label: "Criado em minutos" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.30%20(1).mp4", label: "Lip-sync perfeito" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.30.mp4", label: "Edição cinematográfica" },
    { src: "https://vantwwznsmrmmnewrzia.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-09%20at%2021.09.18.mp4", label: "Cena feita em 5 minutos" },
  ];

  return (
<div className="min-h-screen bg-white text-[#0A0A0A] selection:bg-[#0A68FF]/20">
      <Navbar cta={CTA} />
      <HeroWithBG cta={CTA} video={HERO_VIDEO} />
      <Proof />
      <Examples videos={VIDEOS} />
      <Benefits />
      <Offer cta={CTA} />
      <Faq />
      <Author img={AUTHOR_IMG} />
      <FinalCTA cta={CTA} />
      <Footer />
</div>
  );
}

/* NAVBAR */
function Navbar({ cta }: { cta: string }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-7xl h-16 px-4 md:px-6 flex items-center justify-between">
        <a href="#topo" className="font-semibold text-lg tracking-tight">
          <span>Videos</span> <span>Craft</span>{" "}
          <span className="text-[#0A68FF]">IA</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#exemplos" className="hover:opacity-70">Exemplos</a>
          <a href="#beneficios" className="hover:opacity-70">Benefícios</a>
          <a href="#faq" className="hover:opacity-70">FAQ</a>
          <a href="#autor" className="hover:opacity-70">Autor</a>
        </div>
        <a href="#/login"
                className="hidden md:inline-flex items-center rounded-full border border-[#0A0A0A] px-4 py-2 text-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition"
        >
          Garantir minha vaga
        </a>
      </div>
    </nav>
  );
}

/* HERO — layout idêntico, mas com VÍDEO DE FUNDO ocupando toda a seção */
function HeroWithBG({ cta, video }: { cta: string; video: string }) {
  return (
    <section id="topo" className="relative">
      {/* vídeo de fundo */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* overlay pra legibilidade */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />

      {/* conteúdo mantendo a mesma hierarquia que você aprovou */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-14 md:pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Crie vídeos ultra-realistas com IA
            </h1>
            <p className="mt-6 text-base md:text-xl text-black/70">
              Do roteiro à cena final: imagem, animação, voz e lip-sync — rápido,
              replicável e cinematográfico.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="#/login"
                className="inline-flex items-center rounded-full bg-[#0A68FF] text-white px-6 py-3 text-base font-semibold hover:brightness-110 transition"
              >Começar agora
              </a>
              <a
                href="#exemplos"
                className="inline-flex items-center rounded-full border border-black/15 px-6 py-3 text-base hover:bg-black/[0.03] transition"
              >
                Ver exemplos
              </a>
            </div>
            <div className="mt-6 text-xs text-black/60">
              Pré-venda com vagas limitadas • Acesso vitalício + atualizações
            </div>
          </div>

          {/* mantemos a coluna direita vazia pra preservar o respiro do layout */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}

/* PROVA SOCIAL */
function Proof() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 pb-8">
      <div className="rounded-xl border border-black/10 p-6 md:p-8 bg-white/80 backdrop-blur">
        <h3 className="text-lg font-semibold">Resultados que importam</h3>
        <div className="mt-4 grid sm:grid-cols-3 gap-6 text-sm text.black/75 text-black/75">
          <div>• 5M+ views/mês no TikTok</div>
          <div>• 9.7k interações por post (média)</div>
          <div>• Conteúdo autoral com humor político e surreal</div>
        </div>
        <p className="mt-4 text-sm text-black/60">
          Aqui você aprende a <b>fazer</b> — não só “clicar em ferramenta”. Direção,
          consistência visual e conversão.
        </p>
      </div>
    </section>
  );
}

/* EXEMPLOS — grid 3×3, áudio só após gesto e pausa os outros */
function Examples({ videos }: { videos: { src: string; label: string }[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setAudioEnabled(true);
    window.addEventListener("pointerdown", enable, { once: true });
    window.addEventListener("keydown", enable, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
  }, []);

  const pauseOthers = (target: HTMLVideoElement) => {
    if (!gridRef.current) return;
    gridRef.current.querySelectorAll("video").forEach((v) => {
      if (v !== target) {
        try { v.pause(); } catch {}
      }
    });
  };

  return (
    <section id="exemplos" className="mx-auto max-w-7xl px-4 md:px-6 py-14 border-t border-black/10">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Exemplos reais</h2>
        <span className="text-sm text-black/50">Clique em “Ativar áudio” e dê play</span>
      </div>

      <div ref={gridRef} className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {videos.map((v, i) => (
          <figure key={i} className="group">
            <div className="relative w-full overflow-hidden rounded-xl border border-black/10 bg-black" style={{ aspectRatio: "9 / 16" }}>
              <video
                src={v.src}
                className="w-full h-full object-cover"
                playsInline
                loop
                controls
                preload="metadata"
                muted={!audioEnabled}
                onPlay={(e) => pauseOthers(e.currentTarget as HTMLVideoElement)}
                onError={(e) => {
                  try { (e.currentTarget as HTMLVideoElement).poster = "https://via.placeholder.com/480x854?text=Video"; } catch {}
                }}
              />
              {!audioEnabled && (
                <button
                  onClick={() => setAudioEnabled(true)}
                  className="absolute inset-x-4 bottom-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium border border-black hover:bg-[#0A68FF] hover:text-white transition"
                >
                  Ativar áudio
                </button>
              )}
            </div>
            <figcaption className="mt-3 text-sm text-black/60">{v.label}</figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-6 text-xs text-black/45">
        Uso responsável de IA. Conteúdo educacional. Não apoiamos usos indevidos.
      </p>
    </section>
  );
}

/* BENEFÍCIOS */
function Benefits() {
  const items: [string, string][] = [
    ["Pipeline completo", "Do ChatGPT/ideação à cena final: imagem → vídeo → voz → edição."],
    ["Deepfake & Lip-sync", "Sincronização limpa e ajustes finos que passam batido."],
    ["Assinatura visual", "Rosto, roupa e cenário consistentes pra escalar em série."],
    ["Viral e venda", "Ganchos, watch time, CTA e MÉTRICADEH pra converter."],
    ["Humanização", "Expressões sutis, acting pra câmera e texto on-screen que vende."],
    ["Entrega premium", "Fluxo rápido, limpo e replicável com estética cinematográfica."],
  ];
  return (
    <section id="beneficios" className="mx-auto max-w-7xl px-4 md:px-6 py-14 border-t border-black/10">
      <h2 className="text-2xl md:text-3xl font-semibold">O que você vai aprender</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(([t, d], i) => (
          <div key={i} className="p-5 rounded-xl border border-black/10">
            <h3 className="font-medium">{t}</h3>
            <p className="mt-2 text-sm text-black/70">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* OFERTA */
function Offer({ cta }: { cta: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-10 border-t border-black/10">
      <div className="rounded-xl border border-black/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold">Pré-venda especial</h3>
          <p className="text-sm text-black/70 mt-2">Acesso vitalício + atualizações • Bônus: prompts prontos e casos práticos</p>
          <p className="text-xs text-black/50 mt-1">Garantia de 7 dias</p>
        </div>
        <a
          href="#/checkout"
          className="inline-flex items-center rounded-full bg-[#0A68FF] text-white px-6 py-3 text-base font-semibold hover:brightness-110 transition"
        >
          Garantir minha vaga
        </a>
      </div>
    </section>
  );
}

/* FAQ */
function Faq() {
  const items = [
    { q: "Preciso de PC potente?", a: "Não. As ferramentas são online e rodam na nuvem. Um notebook comum resolve." },
    { q: "É só teoria?", a: "Não. Micro-aulas práticas com casos reais, arquivos e prompts prontos." },
    { q: "Tenho acesso vitalício?", a: "Sim. E você recebe atualizações conforme novas técnicas e ferramentas saem." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 md:px-6 py-14 border-t border-black/10">
      <h2 className="text-2xl md:text-3xl font-semibold">Perguntas frequentes</h2>
      <div className="mt-6 space-y-4">
        {items.map((it, i) => (
          <details key={i} className="rounded-xl border border-black/10 p-4">
            <summary className="cursor-pointer font-medium">{it.q}</summary>
            <p className="mt-2 text-sm text-black/70">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* AUTOR */
function Author({ img }: { img: string }) {
  return (
    <section id="autor" className="mx-auto max-w-7xl px-4 md:px-6 py-14 border-t border-black/10">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="rounded-2xl overflow-hidden border border-black/10">
          <img src={img} alt="Deh — Videos Craft IA" className="w-full h-[300px] object-cover" />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-2xl md:text-3xl font-semibold">Sobre o autor</h3>
          <p className="mt-4 text-sm md:text-base text-black/70">
            Deh (@euinelegivel) — criador de conteúdo com humor político e surreal, milhões de views no TikTok com peças feitas com IA.
            O curso entrega a prática real de quem faz: orquestração de ferramentas, direção visual e conversão.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href="https://www.tiktok.com/@euinelegivel" target="_blank" className="underline">TikTok: @euinelegivel</a>
            <span className="text-black/30">•</span>
            <a href="https://wa.me/5547996103720" target="_blank" className="underline">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CTA FINAL */
function FinalCTA({ cta }: { cta: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-14 border-t border-black/10 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold">Pronto pra fazer seus vídeos virarem realidade?</h2>
      <a
        href="#/checkout"
        className="mt-6 inline-flex items-center rounded-full bg-[#0A68FF] text-white px-8 py-3 text-base font-semibold hover:brightness-110 transition"
      >
        Garantir minha vaga
      </a>
    </section>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between text-sm text-black/60">
        <span>© 2025 Videos Craft IA</span>
        <a href="mailto:contato@videoscraft.online" className="underline">contato@videoscraft.online</a>
      </div>
    </footer>
  );
}

{/* Mobile quick access */}
<a href="#/aluno" className="md:hidden fixed bottom-4 right-4 rounded-full px-4 py-3 bg-black text-white shadow-lg">Área do aluno</a>
