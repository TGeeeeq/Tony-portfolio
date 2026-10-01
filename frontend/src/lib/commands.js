import { fx } from './fx';
import { riddim, sfx } from './riddim';

// Terminal command table. Each command returns lines to print
// (string or { t, c } with c = colour class) and may fire visual effects.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HOLLY = [
  'Holly: “I’ve got an IQ of 6000 — same IQ as 6000 PE teachers.”',
  'Holly: “Emergency. There’s an emergency going on. It’s still going on.”',
  'Holly: “They’re dead, Dave. Everybody’s dead.”',
  'Holly: “Space is big. Really big. And there’s no toilets.”',
];
const KRYTEN = [
  'Kryten: “Oh, sir — I’ve ironed your socks and alphabetised your vegetables.”',
  'Kryten: “Smeg! I’m so sorry, sir — I’ve learnt a new word.”',
];
const RIMMER = [
  'Rimmer: “Step up to Red Alert!” — Kryten: “Sir, are you absolutely sure? It does mean changing the bulb.”',
  'Rimmer: “I’m a hologram, Lister. I don’t do washing up.”',
];
const LISTER = ['Lister: “Everybody’s dead, Dave? Dave who? I’m Dave!”', 'Lister: “Curry. Lager. Repeat.”'];
const CAT = ['Cat: “Stick a bandage on it. It’s a cute look.”', 'Cat: “What is it? Is it food? Can I eat it?”', 'Cat: “Aaaow! Looking good!”'];

const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function dealHand() {
  const deck = [];
  RANKS.forEach((r, ri) => SUITS.forEach((s) => deck.push({ r, ri, s })));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const hand = deck.slice(0, 5);
  const counts = {};
  hand.forEach((c) => (counts[c.r] = (counts[c.r] || 0) + 1));
  const groups = Object.values(counts).sort((a, b) => b - a);
  const flush = hand.every((c) => c.s === hand[0].s);
  const idx = hand.map((c) => c.ri).sort((a, b) => a - b);
  const straight = new Set(idx).size === 5 && (idx[4] - idx[0] === 4 || idx.join() === '0,1,2,3,12');
  const name =
    straight && flush ? 'STRAIGHT FLUSH 🤯' :
    groups[0] === 4 ? 'Four of a kind' :
    groups[0] === 3 && groups[1] === 2 ? 'Full house' :
    flush ? 'Flush' : straight ? 'Straight' :
    groups[0] === 3 ? 'Three of a kind' :
    groups[0] === 2 && groups[1] === 2 ? 'Two pair' :
    groups[0] === 2 ? 'One pair' : 'High card — bluff it.';
  return [hand.map((c) => `${c.r}${c.s}`).join('  '), { t: `→ ${name}`, c: 'gold' }];
}

function stardate() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 1);
  const frac = (d - start) / (365.25 * 864e5);
  return `Stardate ${((d.getFullYear() - 1946) * 1000 + frac * 1000).toFixed(1)}`;
}

export const QUICK = ['help', 'nox', 'lumos', 'warp', 'smeg', 'matrix', 'leviosa', 'deal', 'riddim'];

export function makeCommands({ setLang, navigate, close, clear }) {
  const cmds = {
    help: () => [
      { t: 'Commands — magic, sci-fi & other mischief:', c: 'gold' },
      'nox · lumos · wingardium leviosa · accio <section> · alohomora · expelliarmus · mischief managed',
      'smeg · red alert · holly · kryten · rimmer · lister · cat · talkie · starbug · ace',
      'warp · engage · beam me up · matrix · red pill · blue pill · crawl · hal · 42 · 88mph',
      'tardis · exterminate · hello there · i\'ll be back · barrel roll · konami · stardate',
      'deal (poker) · e4 (chess) · roll · riddim · stop · lang <cs|en|ru|es> · whoami · ls · sudo · clear · exit',
    ],
    '?': () => cmds.help(),
    whoami: () => ['guest@louka — but Holly thinks you look like a smeghead. Affectionately.'],
    ls: () => ['about.txt  projects/  services/  blog/  contact.sh  .secret_curry_recipe'],
    'cat .secret_curry_recipe': () => ['Permission denied. Lister has eaten it. Again.'],
    'cat about.txt': () => ['Antonín Figueroa — roots in the soil, mind in the code. Chess, poker, ska & reggae, Hogwarts, Red Dwarf.'],
    pwd: () => ['/home/louka/~ — 3 million years from Earth'],
    date: () => [new Date().toString()],
    stardate: () => [stardate()],
    sudo: () => [{ t: 'Nice try. This incident will be reported to Holly.', c: 'red' }],
    'sudo make me a sandwich': () => ['Okay. 🥪 (Kryten made it. With love.)'],
    'rm -rf /': () => { fx('glitch'); return [{ t: 'Deleting the universe…', c: 'red' }, 'Just kidding. Everything is fine. Probably.']; },
    xyzzy: () => ['Nothing happens.'],
    coffee: () => ['418 I’m a teapot. Try tea. Earl Grey, hot.'],
    'tea, earl grey, hot': () => ['Replicating… ☕ Make it so.'],

    // Harry Potter
    nox: () => { fx('nox'); return ['Nox. Lights out — only your wand glows.']; },
    lumos: () => { fx('lumos'); return ['Lumos! ✨']; },
    'lumos maxima': () => { fx('lumos'); fx('flash'); return ['LUMOS MAXIMA!']; },
    'wingardium leviosa': () => { fx('leviosa'); return ['It’s Levi-O-sa, not Levio-SA. 🪶']; },
    leviosa: () => cmds['wingardium leviosa'](),
    alohomora: () => { setTimeout(() => navigate('/sluzby'), 600); close(); return ['🔓 Unlocking the services wing…']; },
    expelliarmus: () => { fx('expelliarmus'); return ['Expelliarmus! Your cursor has been disarmed. (for 3 seconds)']; },
    'mischief managed': () => { fx('lumos'); setTimeout(close, 700); return ['The map wipes itself clean…']; },
    'i solemnly swear that i am up to no good': () => ['The Marauder’s Map unfolds at the bottom of the page. 👣'],
    accio: (arg) => {
      const map = { about: 'about', projects: 'projects', projekty: 'projects', mission: 'mission', contact: 'contact', kontakt: 'contact', services: 'services' };
      const id = map[(arg || '').trim()];
      if (!id) return ['Accio what? Try: accio projects · accio contact · accio about'];
      close();
      setTimeout(() => {
        if (window.location.pathname !== '/') navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 200);
      }, 200);
      return [`Accio ${arg}! 🧹`];
    },

    // Red Dwarf
    smeg: () => { fx('redalert'); sfx('alert'); return [{ t: 'RED ALERT. 🔴', c: 'red' }, 'Smoke me a kipper, I’ll be back for breakfast!']; },
    'red alert': () => { fx('redalert'); sfx('alert'); return [{ t: 'RED ALERT. Changing the bulb…', c: 'red' }]; },
    holly: () => [pick(HOLLY)],
    kryten: () => [pick(KRYTEN)],
    rimmer: () => [pick(RIMMER)],
    lister: () => [pick(LISTER)],
    cat: () => [pick(CAT)],
    ace: () => ['Ace Rimmer: “Smoke me a kipper, I’ll be back for breakfast.” What a guy!'],
    talkie: () => ['Talkie Toaster: “Would you like some toast?” … “No.” … “A muffin?” … “NO!” … “Ah, so you’re a waffle man!”'],
    toast: () => cmds.talkie(),
    starbug: () => { fx('starbug'); return ['Starbug 1 launching from the mid-section… 🛸']; },
    'boys from the dwarf': () => ['🎸 It’s cold outside, there’s no kind of atmosphere…'],
    'jmc': () => ['Jupiter Mining Corporation — crew status: 1 human, 1 hologram, 1 cat, 1 mechanoid.'],

    // Sci-fi
    warp: () => { fx('warp'); sfx('warp'); return ['Engaging warp drive… 🌌']; },
    engage: () => cmds.warp(),
    'make it so': () => cmds.warp(),
    'beam me up': () => { fx('beam'); sfx('beam'); return ['Energize! ✨']; },
    'beam me up, scotty': () => cmds['beam me up'](),
    matrix: () => { fx('matrix'); setTimeout(close, 300); return ['Wake up, Neo… 🐇']; },
    'red pill': () => cmds.matrix(),
    'blue pill': () => ['The story ends. You wake up in your bed and believe whatever you want to believe.'],
    crawl: () => { fx('crawl'); setTimeout(close, 300); return ['A long time ago in a meadow far, far away…']; },
    'star wars': () => cmds.crawl(),
    'may the force be with you': () => ['…and also with you. 🌟'],
    'hello there': () => ['General Kenobi! 🗡️'],
    hal: () => [{ t: 'I’m sorry, Dave. I’m afraid I can’t do that.', c: 'red' }],
    'open the pod bay doors': () => cmds.hal(),
    'open the pod bay doors, hal': () => cmds.hal(),
    '42': () => ['The answer to life, the universe and everything. Now — what was the question?'],
    "don't panic": () => ['DON’T PANIC — and always know where your towel is. 🧣'],
    '88mph': () => { fx('flux'); return ['Great Scott! 1.21 gigawatts! ⚡']; },
    'great scott': () => cmds['88mph'](),
    tardis: () => { fx('tardis'); return ['Vworp vworp… It’s bigger on the inside. 🟦']; },
    exterminate: () => [{ t: 'EX-TER-MI-NATE!', c: 'red' }, '…but the Doctor is already here.'],
    "i'll be back": () => ['🤖 Hasta la vista, baby.'],
    'barrel roll': () => { fx('barrelroll'); return ['Do a barrel roll! 🛩️']; },
    'do a barrel roll': () => cmds['barrel roll'](),
    konami: () => { fx('konami'); return ['↑↑↓↓←→←→BA — Achievement unlocked: +30 lives 🍄']; },

    // Games & music
    deal: () => dealHand(),
    poker: () => dealHand(),
    e4: () => ['…e5. Your move. ♞ (I play the Ruy Lopez, just so you know.)'],
    chess: () => cmds.e4(),
    checkmate: () => ['♚ Resigns. GG.'],
    roll: () => [`🎲 ${1 + Math.floor(Math.random() * 20)} (d20)`],
    riddim: () => { riddim.play(); return ['🎶 Skank it up — ska riddim on. (stop = stop)']; },
    play: () => cmds.riddim(),
    music: () => cmds.riddim(),
    stop: () => { riddim.stop(); return ['🔇 Riddim off.']; },
    lang: (arg) => {
      const l = (arg || '').trim();
      if (!['cs', 'en', 'ru', 'es'].includes(l)) return ['Usage: lang cs | en | ru | es'];
      setLang(l);
      return [`Language → ${l.toUpperCase()}`];
    },
    clear: () => { clear(); return null; },
    exit: () => { close(); return null; },
    quit: () => cmds.exit(),
  };
  return cmds;
}

export function runCommand(cmds, raw) {
  const input = raw.trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ');
  if (!input) return [];
  if (cmds[input]) return cmds[input]('');
  const [head, ...rest] = input.split(' ');
  if (['accio', 'lang'].includes(head)) return cmds[head](rest.join(' '));
  if (head === 'sudo') return cmds.sudo();
  if (head === 'cat') return [`cat: ${rest.join(' ')}: No such file. Try ls.`];
  return [{ t: `smeg: command not found: ${input}`, c: 'red' }, 'Type help for the full list.'];
}
