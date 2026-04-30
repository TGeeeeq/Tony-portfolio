import React from 'react';
import { Mail, Instagram, Send } from 'lucide-react';
import { CONTACT } from '../mock';
import { useLang } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLang();

  // Prefill mailto subject + body in chosen language
  const subject = encodeURIComponent(
    t.contact.kicker + ' \u2014 ' + t.contact.title.replace('\n', ' ')
  );
  const body = encodeURIComponent('\n\n\u2014\n' + t.contact.subtitle);
  const mailto = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

  return (
    <section id="contact" className="section">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <span className="eyebrow">{t.contact.kicker}</span>
          <h2 className="heading-lg mt-5">{t.contact.title}</h2>
          <p className="body-lg mt-6">{t.contact.subtitle}</p>
        </div>

        <div className="lg:col-span-7 reveal relative">
          {/* Decorative panel */}
          <div className="relative p-8 md:p-12 border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm overflow-hidden">
            {/* corner accents */}
            {['top-0 left-0 border-l border-t', 'top-0 right-0 border-r border-t', 'bottom-0 left-0 border-l border-b', 'bottom-0 right-0 border-r border-b'].map((c, i) => (
              <span key={i} className={`absolute w-4 h-4 border-[#d4a45a] ${c}`} />
            ))}

            {/* glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#d4a45a]/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <span className="label-mono">{t.contact.orReach}</span>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={mailto}
                  className="group flex items-center gap-4 p-5 border border-[#d4a45a]/25 hover:border-[#d4a45a]/70 hover:bg-[#d4a45a]/5 transition-all duration-400"
                >
                  <span className="w-11 h-11 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] transition-all">
                    <Mail size={17} />
                  </span>
                  <span className="flex-1">
                    <span className="block label-mono mb-1">E-mail</span>
                    <span className="block text-[#f1e9d8] text-[15px] tracking-wide group-hover:text-[#d4a45a] transition-colors break-all">
                      {CONTACT.email}
                    </span>
                  </span>
                </a>

                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 p-5 border border-[#d4a45a]/25 hover:border-[#d4a45a]/70 hover:bg-[#d4a45a]/5 transition-all duration-400"
                >
                  <span className="w-11 h-11 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] transition-all">
                    <Instagram size={17} />
                  </span>
                  <span className="flex-1">
                    <span className="block label-mono mb-1">Instagram</span>
                    <span className="block text-[#f1e9d8] text-[15px] tracking-wide group-hover:text-[#d4a45a] transition-colors">
                      @{CONTACT.instagram}
                    </span>
                  </span>
                </a>
              </div>

              <a href={mailto} className="btn-gold mt-8 inline-flex">
                <Send size={15} /> {t.contact.send}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
