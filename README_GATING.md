# VideosCraft — Gating de Curso (Skeleton)

## Rotas (SPA com hash)
- `#/` — Landing de vendas (arquivo existente `LandingPremium.tsx`)
- `#/login` — Solicita e-mail (OTP/magic link via Supabase)
- `#/aluno` — Área do aluno (mostra status da assinatura e CTA para `#/checkout`)
- `#/curso` — Conteúdo do curso (protegido por assinatura ativa)
- `#/checkout` — Link externo do Asaas

## Infra
- Supabase Auth (magic link) + tabela `enrollments`
- Webhook do Asaas → `api/asaas-webhook.ts` (Vercel Function)
- Após `PAYMENT_CONFIRMED` ou `PAYMENT_RECEIVED`, marcamos `enrollments.status = 'active'`

## Variáveis `.env` (Vercel)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE` (apenas na Function)
- `ASAAS_WEBHOOK_TOKEN` (mesmo token configurado no painel do Asaas para o webhook)

No Vite (frontend), usar prefixo `VITE_`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Supabase (SQL)
Veja `supabase/enrollments.sql`. Execute no SQL editor do projeto.

## Webhook Asaas
- Configure no painel: Integrations > Webhooks.
- Selecione eventos de **Cobrança**. O código trata `PAYMENT_CONFIRMED` e `PAYMENT_RECEIVED`.
- Adicione o **Authentication Token**. O Asaas envia no header `asaas-access-token`.
- Aponte a URL para: `https://SEU_DOMINIO/api/asaas-webhook`.

## Teste local
- Rode o frontend: `npm run dev`
- Exponha um túnel para a function (ou deploy na Vercel) e cadastre a URL no Asaas sandbox.
- Faça um pagamento de teste; confirme que `enrollments.status` vira `active`.

## Próximos passos
- Trocar o link de `#/checkout` pelo seu Checkout real.
- Subir vídeos (YouTube não listado) e PDFs no Supabase Storage; listar em `Curso.tsx`.
- Layout: integrar o mesmo visual da landing nas páginas novas (Tailwind já usado).
