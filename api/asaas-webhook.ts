// api/asaas-webhook.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

// Security: validate Asaas token header
const ASAAS_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  if (ASAAS_TOKEN) {
    const hdr = req.headers["asaas-access-token"];
    if (!hdr || hdr !== ASAAS_TOKEN) {
      return res.status(403).send("Forbidden");
    }
  }

  try {
    const event = req.body?.event;
    const payment = req.body?.payment;
    if (!event || !payment) {
      return res.status(400).send("Bad Request");
    }

    // We care about confirmed/received
    const okStatuses = new Set(["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"]);
    if (okStatuses.has(event)) {
      // Map payment.customer (string id) or payment.customerEmail to your user
      const email = payment?.customer?.email || payment?.customerEmail || payment?.billingEmail;
      const customerId = payment?.customer;

      // 1) Ensure a user exists for this email
      let userId: string | null = null;
      if (email) {
        const { data: maybeUser } = await supabase.auth.admin.listUsers({ email });
        if (maybeUser && maybeUser.users && maybeUser.users.length > 0) {
          userId = maybeUser.users[0].id;
        } else {
          // Create user without password; they sign-in via magic link later
          const created = await supabase.auth.admin.createUser({ email, email_confirm: true });
          userId = created.data.user?.id || null;
        }
      }

      // 2) Upsert enrollment
      if (userId) {
        await supabase.from("enrollments").upsert({
          user_id: userId,
          asaas_customer_id: customerId || null,
          last_payment_id: payment.id,
          status: "active",
          updated_at: new Date().toISOString()
        }, { onConflict: "user_id" });
      }
    }

    // Idempotency tip: you could store req.body.id in a table to ignore duplicates
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return res.status(500).send("Internal Error");
  }
}
