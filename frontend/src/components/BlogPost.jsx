import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, ExternalLink } from 'lucide-react';
import { POSTS, BLOG_PAGE } from '../blog/posts';
import { useLang } from '../contexts/LanguageContext';

export default function BlogPost() {
  const { lang } = useLang();
  const { slug } = useParams();
  const bp = BLOG_PAGE[lang];
  const post = POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const blocks = post.body[lang] || post.body.cs || [];

  return (
    <article className="section pt-36 md:pt-44 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-40 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: `${post.accent}14` }} />

      <div className="container-x relative max-w-3xl">
        {/* Top meta */}
        <div className="flex items-center gap-3 flex-wrap mono text-[10px] tracking-[0.26em] uppercase text-[#f1e9d8]/55">
          <span
            className="px-2.5 py-1 border"
            style={{ borderColor: `${post.accent}55`, color: post.accent }}
          >
            {post.category[lang]}
          </span>
          <span>{formatDate(post.date, lang)}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} {bp.readTime}</span>
        </div>

        {/* Title + excerpt */}
        <h1 className="heading-xl mt-7 animate-fade-up" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)' }}>
          {post.title[lang]}
        </h1>
        <p className="body-lg mt-6 italic serif text-xl md:text-2xl text-[#f1e9d8]/85 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {post.excerpt[lang]}
        </p>

        <div className="divider-rune my-10" />

        {/* Body blocks */}
        <div className="space-y-6">
          {blocks.map((b, i) => (
            <Block key={i} block={b} accent={post.accent} />
          ))}
        </div>

        {/* Footer nav */}
        <div className="divider-rune my-12" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-[#f1e9d8]/70 hover:text-[#d4a45a] transition-colors duration-300 mono text-[11px] tracking-[0.26em] uppercase"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {bp.backToList}
          </Link>
          <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#f1e9d8]/40">
            A.F. // {new Date(post.date).getFullYear()}
          </span>
        </div>
      </div>
    </article>
  );
}

function Block({ block, accent }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="serif text-3xl md:text-4xl mt-10 mb-2 text-[#f1e9d8]" style={{ fontWeight: 500 }}>
          {block.text}
        </h2>
      );
    case 'p':
      return (
        <p className="text-[17px] md:text-[18px] leading-[1.8] text-[#f1e9d8]/80">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul className="space-y-3 my-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[16px] md:text-[17px] leading-[1.7] text-[#f1e9d8]/80">
              <span className="select-none mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div
          className="relative my-6 p-6 md:p-8 border-l-2 bg-[#1a1715]/60"
          style={{ borderColor: accent }}
        >
          <div className="absolute -top-3 left-6 px-2 mono text-[10px] tracking-[0.3em] uppercase bg-[#0a0908]" style={{ color: accent }}>
            //
          </div>
          <p className="serif italic text-xl md:text-2xl leading-relaxed text-[#f1e9d8]">
            {block.text}
          </p>
        </div>
      );
    case 'quote':
      return (
        <p className="serif italic text-xl text-[#d4a45a] mt-8">
          {block.text}
        </p>
      );
    case 'cta':
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noreferrer"
          className="btn-gold mt-6 inline-flex"
        >
          {block.text} <ExternalLink size={14} />
        </a>
      );
    case 'video':
      return (
        <figure className="my-8">
          <video
            src={block.src}
            poster={block.poster}
            controls
            preload="metadata"
            playsInline
            className="w-full rounded-sm border"
            style={{ borderColor: `${accent}40`, background: '#0a0908' }}
          />
          {block.caption && (
            <figcaption className="mono text-[10px] tracking-[0.26em] uppercase text-[#f1e9d8]/55 mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

function formatDate(iso, lang) {
  try {
    const d = new Date(iso);
    const months = {
      cs: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      ru: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
    };
    const arr = months[lang] || months.en;
    return `${d.getDate()}. ${arr[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return iso;
  }
}
