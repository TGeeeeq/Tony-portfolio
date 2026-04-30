import React, { useState } from 'react';
import { Mail, Instagram, Send, Check } from 'lucide-react';
import { CONTACT } from '../mock';
import { useLang } from '../contexts/LanguageContext';
import { toast } from 'sonner';

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('—');
      return;
    }
    // Mock: persist to localStorage
    const list = JSON.parse(localStorage.getItem('af.messages') || '[]');
    list.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem('af.messages', JSON.stringify(list));
    setSent(true);
    toast.success(t.contact.sent);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 2400);
  };

  return (
    <section id="contact" className="section">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <span className="eyebrow">{t.contact.kicker}</span>
          <h2 className="heading-lg mt-5">{t.contact.title}</h2>
          <p className="body-lg mt-6">{t.contact.subtitle}</p>

          <div className="mt-10">
            <span className="label-mono">{t.contact.orReach}</span>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-3 p-4 border border-[#d4a45a]/20 hover:border-[#d4a45a]/60 hover:bg-[#d4a45a]/5 transition-all duration-400"
              >
                <span className="w-9 h-9 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] transition-all">
                  <Mail size={15} />
                </span>
                <span className="text-[#f1e9d8] text-sm tracking-wide group-hover:text-[#d4a45a] transition-colors">
                  {CONTACT.email}
                </span>
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 p-4 border border-[#d4a45a]/20 hover:border-[#d4a45a]/60 hover:bg-[#d4a45a]/5 transition-all duration-400"
              >
                <span className="w-9 h-9 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] transition-all">
                  <Instagram size={15} />
                </span>
                <span className="text-[#f1e9d8] text-sm tracking-wide group-hover:text-[#d4a45a] transition-colors">
                  @{CONTACT.instagram}
                </span>
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="lg:col-span-7 reveal relative p-8 md:p-10 border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm"
        >
          {/* corner accents */}
          {['top-0 left-0 border-l border-t', 'top-0 right-0 border-r border-t', 'bottom-0 left-0 border-l border-b', 'bottom-0 right-0 border-r border-b'].map((c, i) => (
            <span key={i} className={`absolute w-4 h-4 border-[#d4a45a] ${c}`} />
          ))}

          <div className="grid md:grid-cols-2 gap-5">
            <Field label={t.contact.name} value={form.name} onChange={onChange('name')} />
            <Field label={t.contact.email} type="email" value={form.email} onChange={onChange('email')} />
          </div>
          <Field
            label={t.contact.message}
            textarea
            value={form.message}
            onChange={onChange('message')}
            className="mt-5"
          />
          <button
            type="submit"
            className="btn-gold mt-7"
            disabled={sent}
          >
            {sent ? <><Check size={15} /> {t.contact.sent}</> : <><Send size={15} /> {t.contact.send}</>}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', textarea, className = '' }) {
  return (
    <label className={`block group ${className}`}>
      <span className="label-mono block mb-2">{label}</span>
      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-[#f1e9d8]/15 focus:border-[#d4a45a] outline-none py-2 text-[#f1e9d8] resize-none transition-colors duration-300"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-[#f1e9d8]/15 focus:border-[#d4a45a] outline-none py-2 text-[#f1e9d8] transition-colors duration-300"
        />
      )}
    </label>
  );
}
