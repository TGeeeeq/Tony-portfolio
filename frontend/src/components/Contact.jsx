import React, { useState } from 'react';
import { Mail, Instagram, Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { CONTACT } from '../mock';
import { useLang } from '../contexts/LanguageContext';

const WEB3FORMS_KEY = 'c30dca56-d092-4037-a141-7609bcaf9bd2';

export default function Contact() {
  const { t } = useLang();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `Web — ${name || 'nová zpráva'}`,
          from_name: 'antoninfigueroa.vercel.app',
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (data && data.success) {
        setStatus('sent');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-transparent border border-[#d4a45a]/25 px-4 py-3 text-[15px] text-[#f1e9d8] placeholder:text-[#f1e9d8]/35 focus:outline-none focus:border-[#d4a45a]/70 transition-colors duration-300';

  return (
    <section id="contact" className="section">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <span className="eyebrow">{t.contact.kicker}</span>
          <h2 className="heading-lg mt-5">{t.contact.title}</h2>
          <p className="body-lg mt-6">{t.contact.subtitle}</p>
        </div>

        <div className="lg:col-span-7 reveal relative">
          <div className="relative p-8 md:p-12 border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm overflow-hidden">
            {['top-0 left-0 border-l border-t', 'top-0 right-0 border-r border-t', 'bottom-0 left-0 border-l border-b', 'bottom-0 right-0 border-r border-b'].map((c, i) => (
              <span key={i} className={`absolute w-4 h-4 border-[#d4a45a] ${c}`} />
            ))}

            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#d4a45a]/10 blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative space-y-5" noValidate>
              {/* Honeypot for bots */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex="-1"
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="label-mono mb-2 block">{t.contact.name}</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === 'sending'}
                    className={inputClass}
                    autoComplete="name"
                  />
                </label>
                <label className="block">
                  <span className="label-mono mb-2 block">{t.contact.email}</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'sending'}
                    className={inputClass}
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className="block">
                <span className="label-mono mb-2 block">{t.contact.message}</span>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'sending'}
                  className={`${inputClass} resize-y min-h-[140px]`}
                />
              </label>

              <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold inline-flex disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send size={15} /> {t.contact.send}
                    </>
                  )}
                </button>

                {status === 'sent' && (
                  <span className="flex items-center gap-2 text-[#9ae66e] mono text-[11px] tracking-[0.22em] uppercase">
                    <Check size={14} /> {t.contact.sent}
                  </span>
                )}
                {status === 'error' && (
                  <span className="flex items-center gap-2 text-[#e6786e] mono text-[11px] tracking-[0.22em] uppercase">
                    <AlertCircle size={14} /> {t.contact.error}
                  </span>
                )}
              </div>
            </form>

            <div className="relative mt-10 pt-8 border-t border-[#d4a45a]/15">
              <span className="label-mono">{t.contact.orReach}</span>

              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 p-4 border border-[#d4a45a]/25 hover:border-[#d4a45a]/70 hover:bg-[#d4a45a]/5 transition-all duration-400"
                >
                  <span className="w-9 h-9 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] transition-all">
                    <Mail size={15} />
                  </span>
                  <span className="block text-[#f1e9d8] text-[13px] tracking-wide group-hover:text-[#d4a45a] transition-colors break-all">
                    {CONTACT.email}
                  </span>
                </a>

                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-4 border border-[#d4a45a]/25 hover:border-[#d4a45a]/70 hover:bg-[#d4a45a]/5 transition-all duration-400"
                >
                  <span className="w-9 h-9 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] transition-all">
                    <Instagram size={15} />
                  </span>
                  <span className="block text-[#f1e9d8] text-[13px] tracking-wide group-hover:text-[#d4a45a] transition-colors">
                    @{CONTACT.instagram}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
