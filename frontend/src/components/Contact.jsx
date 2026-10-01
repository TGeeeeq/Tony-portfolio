import React, { useState } from 'react';
import { Mail, Instagram, Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { CONTACT } from '../mock';
import { useLang } from '../contexts/LanguageContext';
import Split from './Split';

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
          from_name: 'antoninfigueroa.cz',
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
    'w-full rounded-xl bg-[#07110c]/70 border border-[#f1e9d8]/12 px-4 py-3 text-[15px] text-[#f1e9d8] placeholder:text-[#f1e9d8]/35 focus:outline-none focus:border-[#86c35a]/70 focus:ring-2 focus:ring-[#86c35a]/15 transition-all duration-300';

  // Zlom dlouhého e-mailu jen u @, ať se na mobilu neláme uprostřed slova
  const [emailLocal, emailDomain] = CONTACT.email.split('@');

  return (
    <section id="contact" className="section">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="eyebrow">{t.contact.kicker}</span>
            <span className="move-tag"><span className="glyph">♕</span> 5. Qxf7#</span>
          </div>
          <h2 className="heading-lg mt-6"><Split text={t.contact.title} /></h2>
          <p className="body-lg mt-6">{t.contact.subtitle}</p>
        </div>

        <div className="lg:col-span-7 reveal r-right relative min-w-0">
          <div className="relative rounded-[1.5rem] border border-[#f1e9d8]/10 bg-[#0c1912]/85 backdrop-blur-md overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            {/* terminal bar — ship's computer online */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[#f1e9d8]/8 bg-[#07110c]/70">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e4483c]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e8b04a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#86c35a]" />
              </span>
              <span className="mono text-[10px] tracking-[0.18em] text-[#f1e9d8]/45 truncate min-w-0">holly@red-dwarf:~$ ./message --to tony</span>
              <span className="ml-auto mono text-[9px] tracking-[0.22em] uppercase text-[#86c35a]/80 hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86c35a] animate-blink-soft" /> IQ 6000
              </span>
            </div>
            <div className="relative p-7 md:p-10">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#86c35a]/10 blur-3xl pointer-events-none" />

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

            <div className="relative mt-10 pt-8 border-t border-[#f1e9d8]/8">
              <span className="label-mono">{t.contact.orReach}</span>

              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-[#f1e9d8]/10 hover:border-[#e8b04a]/60 hover:bg-[#e8b04a]/5 transition-all duration-400"
                >
                  <span className="w-9 h-9 rounded-full bg-[#e8b04a]/12 flex items-center justify-center text-[#e8b04a] group-hover:bg-[#e8b04a] group-hover:text-[#07110c] transition-all">
                    <Mail size={15} />
                  </span>
                  <span className="block text-[#f1e9d8] text-[12px] sm:text-[13px] leading-snug tracking-wide group-hover:text-[#e8b04a] transition-colors break-words">
                    {emailLocal}<wbr />@{emailDomain}
                  </span>
                </a>

                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-xl border border-[#f1e9d8]/10 hover:border-[#e8b04a]/60 hover:bg-[#e8b04a]/5 transition-all duration-400"
                >
                  <span className="w-9 h-9 rounded-full bg-[#e8b04a]/12 flex items-center justify-center text-[#e8b04a] group-hover:bg-[#e8b04a] group-hover:text-[#07110c] transition-all">
                    <Instagram size={15} />
                  </span>
                  <span className="block text-[#f1e9d8] text-[12px] sm:text-[13px] leading-snug tracking-wide group-hover:text-[#e8b04a] transition-colors break-words">
                    @{CONTACT.instagram}
                  </span>
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
