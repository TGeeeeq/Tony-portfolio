import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, ArrowLeft } from 'lucide-react';
import { POSTS, BLOG_PAGE } from '../blog/posts';
import { useLang } from '../contexts/LanguageContext';

export default function BlogList() {
  const { lang } = useLang();
  const bp = BLOG_PAGE[lang];

  // Sort posts by date (newest first)
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="section pt-36 md:pt-44 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-40 w-[600px] h-[600px] rounded-full bg-[#d4a45a]/8 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-[#9ae66e]/4 blur-[140px]" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <span className="eyebrow">{bp.kicker}</span>
          </div>
          <h1 className="heading-xl mt-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {bp.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="gold-text italic">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="body-lg mt-7 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {bp.subtitle}
          </p>
        </div>

        <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-5">
          {sorted.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} lang={lang} bp={bp} />
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[#f1e9d8]/70 hover:text-[#d4a45a] transition-colors duration-300 mono text-[11px] tracking-[0.26em] uppercase"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {bp.back}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostCard({ post, index, lang, bp }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative block p-7 md:p-8 border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#d4a45a]/60 hover:-translate-y-1"
    >
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{ background: post.accent }}
      />

      <div className="relative flex items-center justify-between mb-6">
        <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#d4a45a]/80">
          0{index + 1} —
        </span>
        <span
          className="mono text-[10px] tracking-[0.22em] uppercase px-2.5 py-1 border"
          style={{ borderColor: `${post.accent}55`, color: post.accent }}
        >
          {post.category[lang]}
        </span>
      </div>

      <h2 className="relative serif text-2xl md:text-[1.9rem] leading-tight text-[#f1e9d8] group-hover:text-[#d4a45a] transition-colors duration-400">
        {post.title[lang]}
      </h2>

      <p className="relative mt-4 text-[#f1e9d8]/70 leading-relaxed text-[15px]">
        {post.excerpt[lang]}
      </p>

      <div className="relative mt-7 flex items-center justify-between flex-wrap gap-3 mono text-[10px] tracking-[0.24em] uppercase">
        <span className="text-[#f1e9d8]/45 flex items-center gap-3">
          <span>{formatDate(post.date, lang)}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} {bp.readTime}</span>
        </span>
        <span className="flex items-center gap-1.5 text-[#d4a45a] opacity-80 group-hover:opacity-100">
          {lang === 'cs' ? 'Číst' : lang === 'ru' ? 'Читать' : lang === 'es' ? 'Leer' : 'Read'}
          <ArrowUpRight size={13} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </span>
      </div>
    </Link>
  );
}

function formatDate(iso, lang) {
  try {
    const d = new Date(iso);
    const months = {
      cs: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      ru: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
      es: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.'],
    };
    const arr = months[lang] || months.en;
    return `${d.getDate()}. ${arr[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return iso;
  }
}
