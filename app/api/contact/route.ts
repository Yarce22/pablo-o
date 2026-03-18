import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, whatsapp, ciudad, correo, servicio } = body;

    // Basic server-side validation
    if (!nombre || !whatsapp || !ciudad || !correo || !servicio) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos.' },
        { status: 400 }
      );
    }

    // TODO: Connect to Resend / SendGrid / WhatsApp Business API
    console.log('Contact form submission:', { nombre, whatsapp, ciudad, correo, servicio });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
