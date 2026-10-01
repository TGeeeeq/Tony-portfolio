import React from 'react';

// Splits a heading into masked words that rise in one by one.
// Lines come from "\n"; `accent` = index of the line styled with `accentClass`.
// Inside a .reveal it animates when revealed; with `auto` it plays on mount.
export default function Split({ text, accent = -1, accentClass = '', auto = false, delay }) {
  let i = 0;
  const lines = String(text).split('\n');
  return (
    <span className={auto ? 'sw-auto' : undefined} style={delay != null ? { '--d0': typeof delay === 'number' ? `${delay}ms` : delay } : undefined}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((w, wi, arr) => (
            <React.Fragment key={wi}>
              <span className="sw">
                <span className={li === accent ? accentClass : undefined} style={{ '--i': i++ }}>{w}</span>
              </span>
              {wi < arr.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </span>
      ))}
    </span>
  );
}
