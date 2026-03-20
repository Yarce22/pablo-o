'use client';

import { useState } from 'react';

interface ContactFormProps {
  serviceOptions: string[];
  submitText: string;
  successMessage: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  height: 48,
  padding: '0 16px',
  background: 'var(--surface)',
  border: '1px solid transparent',
  borderRadius: 4,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
};

export function ContactForm({ serviceOptions, submitText, successMessage }: ContactFormProps) {
  const [form, setForm] = useState({
    nombre: '',
    whatsapp: '',
    ciudad: '',
    correo: '',
    servicio: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.nombre.trim()) e.nombre = 'Campo requerido';
    if (!form.whatsapp.trim()) e.whatsapp = 'Campo requerido';
    if (!form.ciudad.trim()) e.ciudad = 'Campo requerido';
    if (!form.correo.trim()) e.correo = 'Campo requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      e.correo = 'Correo inválido';
    if (!form.servicio) e.servicio = 'Selecciona un servicio';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ nombre: '', whatsapp: '', ciudad: '', correo: '', servicio: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(235,37,37,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}
        >
          ✓
        </div>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          {successMessage}
        </p>
      </div>
    );
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 11,
    color: 'var(--red)',
    marginTop: 4,
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* 2-column layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Row 1: Nombre + WhatsApp */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Nombre">
            <input
              style={{ ...inputStyle, borderColor: errors.nombre ? 'var(--red)' : 'transparent' }}
              type="text"
              name="nombre"
              placeholder="Tu nombre completo"
              value={form.nombre}
              onChange={handleChange}
              aria-required="true"
            />
            {errors.nombre && <p style={errorStyle}>{errors.nombre}</p>}
          </Field>
          <Field label="WhatsApp">
            <input
              style={{ ...inputStyle, borderColor: errors.whatsapp ? 'var(--red)' : 'transparent' }}
              type="tel"
              name="whatsapp"
              placeholder="+52 ..."
              value={form.whatsapp}
              onChange={handleChange}
              aria-required="true"
            />
            {errors.whatsapp && <p style={errorStyle}>{errors.whatsapp}</p>}
          </Field>
        </div>

        {/* Row 2: Ciudad + Correo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Ciudad">
            <input
              style={{ ...inputStyle, borderColor: errors.ciudad ? 'var(--red)' : 'transparent' }}
              type="text"
              name="ciudad"
              placeholder="Tu ciudad"
              value={form.ciudad}
              onChange={handleChange}
              aria-required="true"
            />
            {errors.ciudad && <p style={errorStyle}>{errors.ciudad}</p>}
          </Field>
          <Field label="Correo">
            <input
              style={{ ...inputStyle, borderColor: errors.correo ? 'var(--red)' : 'transparent' }}
              type="email"
              name="correo"
              placeholder="tu@email.com"
              value={form.correo}
              onChange={handleChange}
              aria-required="true"
            />
            {errors.correo && <p style={errorStyle}>{errors.correo}</p>}
          </Field>
        </div>

        {/* Row 3: Servicio full-width */}
        <Field label="Servicio">
          <select
            style={{
              ...inputStyle,
              borderColor: errors.servicio ? 'var(--red)' : 'transparent',
              cursor: 'pointer',
              appearance: 'none',
            }}
            name="servicio"
            value={form.servicio}
            onChange={handleChange}
            aria-required="true"
          >
            <option value="">Selecciona un servicio</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.servicio && <p style={errorStyle}>{errors.servicio}</p>}
        </Field>
      </div>

      {/* Submit */}
      <div style={{ marginTop: 24 }}>
        {status === 'error' && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--red)',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            Hubo un error al enviar. Intenta de nuevo.
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            width: '100%',
            height: 52,
            background: status === 'loading' ? 'var(--surface)' : 'var(--red)',
            color: '#ffffff',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '1px',
            borderRadius: 4,
            border: 'none',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s, opacity 0.2s',
            opacity: status === 'loading' ? 0.7 : 1,
          }}
        >
          {status === 'loading' ? 'Enviando...' : submitText}
        </button>
      </div>
    </form>
  );
}
