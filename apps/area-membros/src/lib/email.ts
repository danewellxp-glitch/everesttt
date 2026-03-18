import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailParams {
  to: string;
  name: string;
  password: string;
}

export async function sendWelcomeEmail({
  to,
  name,
  password,
}: WelcomeEmailParams) {
  const membrosUrl =
    process.env.NEXT_PUBLIC_AREA_MEMBROS_URL || "http://localhost:3001";

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bem-vindo ao EVEREST</title>
    </head>
    <body style="margin:0;padding:0;background-color:#0A0A0A;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;min-height:100vh;">
        <tr>
          <td align="center" style="padding:40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
              <!-- Header -->
              <tr>
                <td style="background-color:#111318;border:1px solid #1C2028;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
                  <h1 style="color:#E6EDF3;font-size:28px;margin:0;letter-spacing:-0.5px;">⛰ EVEREST</h1>
                  <p style="color:#8B949E;font-size:14px;margin:8px 0 0;">Sua escalada começa agora</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="background-color:#111318;border-left:1px solid #1C2028;border-right:1px solid #1C2028;padding:32px;">
                  <h2 style="color:#E6EDF3;font-size:22px;margin:0 0 16px;">
                    Bem-vindo ao EVEREST, ${name}!
                  </h2>
                  <p style="color:#8B949E;font-size:16px;line-height:1.6;margin:0 0 24px;">
                    Sua compra foi confirmada e seu acesso está liberado. Abaixo estão suas credenciais de acesso:
                  </p>
                  <!-- Credenciais -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;border:1px solid #1C2028;border-radius:12px;padding:24px;margin-bottom:24px;">
                    <tr>
                      <td>
                        <p style="color:#8B949E;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px;">Email de acesso</p>
                        <p style="color:#E6EDF3;font-size:16px;font-weight:600;margin:0 0 16px;font-family:monospace;">${to}</p>
                        <p style="color:#8B949E;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px;">Senha temporária</p>
                        <p style="color:#E3B341;font-size:18px;font-weight:700;margin:0;font-family:monospace;">${password}</p>
                      </td>
                    </tr>
                  </table>
                  <p style="color:#8B949E;font-size:14px;margin:0 0 24px;">
                    ⚠️ Por segurança, recomendamos que você troque sua senha no primeiro acesso.
                  </p>
                  <!-- CTA -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <a href="${membrosUrl}/login"
                           style="display:inline-block;background:linear-gradient(135deg,#E03E3E,#B91C1C);color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 32px;border-radius:10px;">
                          Acessar minha área de membros →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color:#0A0A0A;border:1px solid #1C2028;border-top:none;border-radius:0 0 16px 16px;padding:24px;text-align:center;">
                  <p style="color:#8B949E;font-size:12px;margin:0;">
                    © ${new Date().getFullYear()} EVEREST. Todos os direitos reservados.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "noreply@everest.com.br",
    to,
    subject: "⛰ Bem-vindo ao EVEREST — Suas credenciais de acesso",
    html,
  });
}
