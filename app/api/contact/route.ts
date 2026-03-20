import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { nombre, whatsapp, ciudad, correo, servicio } = await request.json();

  if (!nombre || !whatsapp || !ciudad || !correo || !servicio) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Portafolio Pablo Orozco <onboarding@resend.dev>',
    to: 'orozcocastropablo99@gmail.com',
    replyTo: correo,
    subject: `Nuevo mensaje de ${nombre} — ${servicio}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="margin-bottom: 24px;">Nuevo mensaje desde el portafolio</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #666; width: 120px;">Nombre</td>
            <td style="padding: 10px 0; font-weight: 600;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">WhatsApp</td>
            <td style="padding: 10px 0; font-weight: 600;">${whatsapp}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Ciudad</td>
            <td style="padding: 10px 0; font-weight: 600;">${ciudad}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Correo</td>
            <td style="padding: 10px 0; font-weight: 600;"><a href="mailto:${correo}">${correo}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Servicio</td>
            <td style="padding: 10px 0; font-weight: 600;">${servicio}</td>
          </tr>
        </table>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
