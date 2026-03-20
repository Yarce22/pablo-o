import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactForm } from '../components/ContactForm';
import { contactData, aboutData } from '../lib/mock-data';
import { getAboutPage } from '../lib/contentful-api';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá a Pablo Orozco para cotizar fotografía, video, animación 3D y más.',
};

export default async function ContactPage() {
  const about = await getAboutPage().catch(() => null);
  const profilePhoto = about?.profilePhotoUrl ?? aboutData.profilePhoto;
  const profilePhotoAlt = about?.profilePhotoAlt ?? aboutData.profilePhotoAlt;

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Foto — oculta en mobile, visible en tablet+ */}
      <div
        className="hidden md:block"
        style={{
          flex: '0 0 40%',
          position: 'relative',
          minHeight: 600,
        }}
      >
        <Image
          src={profilePhoto}
          alt={profilePhotoAlt}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          sizes="40vw"
          priority
        />
        {/* Overlay gradiente derecha */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, transparent 70%, var(--bg) 100%)',
          }}
        />
      </div>

      {/* Formulario */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(32px, 5vw, 64px) clamp(16px, 5vw, 64px)',
          maxWidth: 560,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 900,
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}
        >
          {contactData.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: 'var(--text-secondary)',
            marginBottom: 32,
          }}
        >
          {contactData.subtitle}
        </p>
        <ContactForm
          serviceOptions={contactData.serviceOptions}
          submitText={contactData.submitButtonText}
          successMessage={contactData.successMessage}
        />
      </div>
    </div>
  );
}