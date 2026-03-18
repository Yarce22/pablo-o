import type { Metadata } from 'next';
import { ContactForm } from '../components/ContactForm';
import { contactData } from '../lib/mock-data';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá a Pablo Orozco para cotizar fotografía, video, animación 3D y más.',
};

export default function ContactPage() {
  return (
    <>
      {/* Mobile + Tablet: single column */}
      <div className="xl:hidden" style={{ padding: '32px 16px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
          }}
        >
          {contactData.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--text-secondary)',
            marginTop: 8,
            marginBottom: 24,
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

      {/* Tablet centered (handled by padding, not this block) */}

      {/* Desktop: centered form */}
      <div
        className="hidden xl:flex flex-col items-center"
        style={{ padding: '64px 420px' }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: '-2px',
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          {contactData.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginBottom: 32,
            maxWidth: 520,
          }}
        >
          {contactData.subtitle}
        </p>
        <div style={{ width: '100%' }}>
          <ContactForm
            serviceOptions={contactData.serviceOptions}
            submitText={contactData.submitButtonText}
            successMessage={contactData.successMessage}
          />
        </div>
      </div>
    </>
  );
}
