// Mock data - all content & translations stored here
// This is the only place mock data lives so backend integration later is easy

export const ASSETS = {
  photo: 'https://customer-assets.emergentagent.com/job_b5e6a5d4-f26d-4f00-86df-da3b333b8463/artifacts/njglvfv8_FB_IMG_1777536000343.jpg',
  nechMeRustLogo: 'https://customer-assets.emergentagent.com/job_b5e6a5d4-f26d-4f00-86df-da3b333b8463/artifacts/boxl43il_logo%20plna%20verze%20%281%29%20%281%29.png',
  impactlyLogo: 'https://customer-assets.emergentagent.com/job_b5e6a5d4-f26d-4f00-86df-da3b333b8463/artifacts/lrfiivuj_1773400918362%20%281%29.png',
  csopLogo: 'https://customer-assets.emergentagent.com/job_b5e6a5d4-f26d-4f00-86df-da3b333b8463/artifacts/7kkqhnxa_1000045893_191943a6369e62429788cd6fc3782cc8-3.%2010.%202025%208_27_06_20260430_100207_0000.png',
};

export const CONTACT = {
  instagram: 'tony_figueroa_',
  instagramUrl: 'https://instagram.com/tony_figueroa_',
  email: 'antoninfigueroa@nechmerust.org',
};

export const PROJECTS = [
  {
    id: 'nechmerust',
    name: 'Nech mě růst',
    logo: ASSETS.nechMeRustLogo,
    website: 'https://www.nechmerust.org',
    instagram: '@nech_me_rust',
    instagramUrl: 'https://instagram.com/nech_me_rust',
    accent: '#d4a45a',
    year: '2021 — present',
    status: { cs: 'Aktivní', en: 'Active', ru: 'Активный' },
    title: {
      cs: 'Nech mě růst',
      en: 'Nech mě růst (Let Me Grow)',
      ru: 'Nech mě růst (Дай мне расти)',
    },
    tagline: {
      cs: 'Cesta vědomého růstu — propojení duše, přírody a moderní doby.',
      en: 'A path of conscious growth — bridging soul, nature, and the modern era.',
      ru: 'Путь осознанного роста — связь души, природы и современности.',
    },
    description: {
      cs: 'Azyl a komunita pro lidi hledající návrat ke kořenům, autentickému já a přirozenému rytmu života. Sdílíme inspiraci, rituály a praktické nástroje pro každodenní život.',
      en: 'Animal sanctuary and community for those seeking a return to roots, the authentic self, and the natural rhythm of life. We share inspiration, rituals, and practical tools for everyday life.',
      ru: 'Платформа и сообщество для тех, кто ищет возвращения к корням, подлинному я и естественному ритму жизни.',
    },
  },
  {
    id: 'impactly',
    name: 'Impactly',
    logo: ASSETS.impactlyLogo,
    website: null,
    instagram: 'impactly.app',
    instagramUrl: 'https://www.instagram.com/impactly.app',
    accent: '#7fb069',
    year: '2025 — soon',
    status: { cs: 'V přípravě', en: 'In preparation', ru: 'В подготовке' },
    title: {
      cs: 'Impactly',
      en: 'Impactly',
      ru: 'Impactly',
    },
    tagline: {
      cs: 'Akce · Komunita · Přínos · Země. Technologie, která dává smysl.',
      en: 'Action · Community · Benefit · Earth. Technology that makes sense.',
      ru: 'Действие · Сообщество · Польза · Земля. Технологии со смыслом.',
    },
    description: {
      cs: 'Připravovaný projekt propojující komunitní akce, blockchain a měřitelný dopad na planetu. Každý dobrý skutek má svůj otisk — a my ho děláme viditelným.',
      en: 'An upcoming project connecting community action, blockchain, and measurable impact on the planet. Every good deed leaves a trace — we make it visible.',
      ru: 'Готовящийся проект, соединяющий действия сообщества, блокчейн и измеримое влияние на планету.',
    },
  },
  {
    id: 'csop',
    name: 'ČSOP Trosečníci Ostrov',
    logo: ASSETS.csopLogo,
    website: 'https://trosecnici.vercel.app',
    instagram: 'csoptrosecnici',
    instagramUrl: 'https://www.instagram.com/csoptrosecnici',
    accent: '#6ea8c4',
    year: '2023 — present',
    status: { cs: 'Aktivní', en: 'Active', ru: 'Активный' },
    title: {
      cs: 'ČSOP Trosečníci Ostrov',
      en: 'Czech Union for Nature Conservation — Ostrov',
      ru: 'Чешский союз охраны природы — Остров',
    },
    tagline: {
      cs: 'Ochrana přírody v regionu Lanškroun — Ostrov u Lanškrouna.',
      en: 'Nature protection in the Lanškroun region — Ostrov u Lanškrouna.',
      ru: 'Охрана природы в регионе Ланшкроун — Остров у Ланшкроуна.',
    },
    description: {
      cs: 'Práce v terénu, péče o krajinu, mapování biotopů a propojení místní komunity s přírodou. Konkrétní činy v konkrétním místě.',
      en: 'Field work, landscape care, biotope mapping, and connecting the local community with nature. Real actions in a real place.',
      ru: 'Полевая работа, забота о ландшафте, картирование биотопов и связь местного сообщества с природой.',
    },
  },
];

export const TRANSLATIONS = {
  cs: {
    nav: { about: 'O mně', projects: 'Projekty', mission: 'Poslání', tools: 'Nástroje', blog: 'Blog', contact: 'Kontakt' },
    hero: {
      eyebrow: 'Antonín Figueroa',
      title: 'Tam, kde se kořeny\npotkávají s kódem.',
      subtitle: 'Propojuji přírodu a duchovní cestu s moderní technologií — od AI po blockchain.',
      cta1: 'Prozkoumat projekty',
      cta2: 'Spojit se',
      scanLabel: 'SCAN ACTIVE',
      coords: 'LAT 49°47'41 N · LON 15°23'25 E',
      sigBlock: 'SIGNATURE: A.F. // ID 0xAF-1988',
    },
    about: {
      kicker: 'Kdo jsem',
      title: 'Most mezi prastarým a budoucím.',
      p1: 'Jmenuji se Antonín Figueroa. Žiji s nohama v hlíně a očima v kódu. Věřím, že technologie nemá přírodu nahradit — má jí pomoci být slyšet.',
      p2: 'Pracuji na projektech, které propojují vědomé žití, ochranu krajiny a otevřené nástroje moderní doby — umělou inteligenci, blockchain, distribuované sítě.',
      p3: 'Pokud máš nápad, projekt nebo otázku — nebo mě naopak chceš inspirovat — neváhej se ozvat.',
    },
    mission: {
      kicker: 'Poslání',
      title: 'Příroda a spiritualita.\nKód a vědomí.',
      body: 'Spojuji přirozenou duchovní cestu s nástroji moderní doby. AI nám může pomoci poslouchat les. Blockchain může učinit dobré skutky viditelnými. Tělo a dech nás vrací domů.',
      pillars: [
        { title: 'Příroda', text: 'Krajina, půda, voda, divoká místa — to, co tu bylo dřív než my.' },
        { title: 'Duch', text: 'Vědomé žití, ticho, rituál, vnitřní přírodní cesta.' },
        { title: 'Technologie', text: 'AI, blockchain a otevřené nástroje ve službě životu.' },
      ],
    },
    projects: {
      kicker: 'Co tvořím',
      title: 'Projekty',
      visit: 'Navštívit',
      ig: 'Instagram',
      soon: 'Brzy',
    },
    contact: {
      kicker: 'Spojení',
      title: 'Máš otázku?\nChceš mě kontaktovat?',
      subtitle: 'Zeptej se mě. Ať jde o radu, spolupráci nebo jen o sdílení toho, co tě těší.',
      name: 'Tvé jméno',
      email: 'E-mail',
      message: 'Tvá zpráva',
      send: 'Odeslat',
      sent: 'Odesláno — ozvu se ti.',
      orReach: 'Nebo přímo:',
    },
    footer: {
      tagline: 'Kořeny v zemi. Vědomí v kódu.',
      rights: 'Všechna práva vyhrazena.',
    },
  },
  en: {
    nav: { about: 'About', projects: 'Projects', mission: 'Mission', tools: 'Tools', blog: 'Blog', contact: 'Contact' },
    hero: {
      eyebrow: 'Antonín Figueroa',
      title: 'Where roots\nmeet the code.',
      subtitle: 'Bridging nature and the spiritual path with modern technology — from AI to blockchain.',
      cta1: 'Explore projects',
      cta2: 'Get in touch',
      scanLabel: 'SCAN ACTIVE',
      coords: 'LAT 49°47'41 N · LON 15°23'25 E',
      sigBlock: 'SIGNATURE: A.F. // ID 0xAF-1988',
    },
    about: {
      kicker: 'Who I am',
      title: 'A bridge between the ancient and the becoming.',
      p1: 'My name is Antonín Figueroa. I live with my feet in the soil and my eyes in the code. I believe technology should not replace nature — it should help her be heard.',
      p2: 'I work on projects that connect conscious living, landscape stewardship, and the open tools of our era — AI, blockchain, distributed networks.',
      p3: 'If you have an idea, a project, or a question — or you simply want to inspire me — please reach out.',
    },
    mission: {
      kicker: 'Mission',
      title: 'Nature and spirit.\nCode and consciousness.',
      body: 'I weave a natural spiritual path together with the tools of the modern age. AI can help us listen to the forest. Blockchain can make good deeds visible. Body and breath bring us home.',
      pillars: [
        { title: 'Nature', text: 'Landscape, soil, water, wild places — what was here before us.' },
        { title: 'Spirit', text: 'Conscious living, silence, ritual, inner natural path.' },
        { title: 'Technology', text: 'AI, blockchain and open tools in service of life.' },
      ],
    },
    projects: {
      kicker: 'What I build',
      title: 'Projects',
      visit: 'Visit',
      ig: 'Instagram',
      soon: 'Soon',
    },
    contact: {
      kicker: 'Connection',
      title: 'Have a question?\nWant to reach out?',
      subtitle: 'Ask me. Whether for advice, collaboration, or simply to share what delights you.',
      name: 'Your name',
      email: 'Email',
      message: 'Your message',
      send: 'Send',
      sent: 'Sent — I will reply.',
      orReach: 'Or directly:',
    },
    footer: {
      tagline: 'Roots in the earth. Awareness in the code.',
      rights: 'All rights reserved.',
    },
  },
  ru: {
    nav: { about: 'Обо мне', projects: 'Проекты', mission: 'Миссия', tools: 'Инструменты', blog: 'Блог', contact: 'Контакт' },
    hero: {
      eyebrow: 'Антонин Фигероа',
      title: 'Там, где корни\nвстречают код.',
      subtitle: 'Соединяю природу и духовный путь с современными технологиями — от ИИ до блокчейна.',
      cta1: 'К проектам',
      cta2: 'Связаться',
      scanLabel: 'СКАН АКТИВЕН',
      coords: 'ШИР 49°47'41 С · ДОЛ 15°23'25 В',
      sigBlock: 'ПОДПИСЬ: A.F. // ID 0xAF-1988',
    },
    about: {
      kicker: 'Кто я',
      title: 'Мост между древним и становящимся.',
      p1: 'Меня зовут Антонин Фигероа. Я живу с ногами в земле и глазами в коде. Верю, что технологии не должны заменять природу — они должны помочь ей быть услышанной.',
      p2: 'Работаю над проектами, соединяющими осознанную жизнь, заботу о ландшафте и открытые инструменты эпохи — ИИ, блокчейн, распределённые сети.',
      p3: 'Если у тебя есть идея, проект или вопрос — или ты хочешь меня вдохновить — напиши мне.',
    },
    mission: {
      kicker: 'Миссия',
      title: 'Природа и дух.\nКод и сознание.',
      body: 'Я сплетаю естественный духовный путь с инструментами современной эпохи. ИИ может помочь нам слышать лес. Блокчейн может сделать добрые дела видимыми. Тело и дыхание возвращают нас домой.',
      pillars: [
        { title: 'Природа', text: 'Ландшафт, почва, вода, дикие места — то, что было до нас.' },
        { title: 'Дух', text: 'Осознанная жизнь, тишина, ритуал, внутренний путь.' },
        { title: 'Технологии', text: 'ИИ, блокчейн и открытые инструменты на службе жизни.' },
      ],
    },
    projects: {
      kicker: 'Что я создаю',
      title: 'Проекты',
      visit: 'Посетить',
      ig: 'Instagram',
      soon: 'Скоро',
    },
    contact: {
      kicker: 'Связь',
      title: 'Есть вопрос?\nХочешь связаться?',
      subtitle: 'Спроси меня. Совет, сотрудничество или просто поделиться тем, что тебя радует.',
      name: 'Имя',
      email: 'Email',
      message: 'Сообщение',
      send: 'Отправить',
      sent: 'Отправлено — отвечу.',
      orReach: 'Или напрямую:',
    },
    footer: {
      tagline: 'Корни в земле. Сознание в коде.',
      rights: 'Все права защищены.',
    },
  },
};

// ---------------------------------------------------------------------------
// TOOLS PAGE
// ---------------------------------------------------------------------------

export const TOOLS_PAGE = {
  cs: {
    kicker: 'Digitální dílna',
    title: 'Nástroje,\nkteré mám rád.',
    subtitle:
      'Moderní technika je jako dobré nářadí — nejlepší, když je ostrá, upřímná a nepřekáží. Tady je moje současná sbírka. Každý kousek mi uvolňuje ruce a čas pro to, na čem skutečně záleží.',
    usedLabel: 'Používám pro',
    visit: 'Navštívit',
    back: '← Zpět na úvod',
  },
  en: {
    kicker: 'Digital workshop',
    title: 'Tools\nI love.',
    subtitle:
      'Modern tech is like a good tool — best when it is sharp, honest and out of the way. Here is my current kit. Each piece frees my hands and time for what truly matters.',
    usedLabel: 'I use it for',
    visit: 'Visit',
    back: '← Back home',
  },
  ru: {
    kicker: 'Цифровая мастерская',
    title: 'Инструменты,\nкоторые я люблю.',
    subtitle:
      'Современные технологии — как хорошее ремесленное орудие: лучше всего, когда остры, честны и не мешают. Вот мой текущий набор. Каждый пункт освобождает руки и время для того, что действительно важно.',
    usedLabel: 'Использую для',
    visit: 'Открыть',
    back: '← На главную',
  },
};

export const TOOLS = [
  {
    id: 'emergent',
    url: 'https://app.emergent.sh/register?ref=tony375739',
    initials: 'E',
    accent: '#9ae66e', // fresh green — like new shoots
    name: { cs: 'Emergent', en: 'Emergent', ru: 'Emergent' },
    category: {
      cs: 'AI Stavitel',
      en: 'AI Builder',
      ru: 'ИИ-конструктор',
    },
    description: {
      cs: 'Platforma, kde v dialogu s AI vzniká celá aplikace — od první skici po nasazení. Jako bys diktoval les a on rostl sám.',
      en: 'A platform where a full app grows from a conversation with AI — from first sketch to deploy. Like dictating a forest and watching it rise on its own.',
      ru: 'Платформа, где в диалоге с ИИ рождается целое приложение — от наброска до деплоя. Как будто надиктовываешь лес, и он растёт сам.',
    },
    personal: {
      cs: 'Tento web stavím tady. Od prvního nápadu po nasazení na Vercel — všechno v jednom okně.',
      en: 'This website is being built here. From first idea to Vercel deploy — all in one window.',
      ru: 'Этот сайт строю именно здесь. От первой идеи до деплоя на Vercel — всё в одном окне.',
    },
  },
  {
    id: 'google-ai-studio',
    url: 'https://aistudio.google.com',
    initials: 'AI',
    accent: '#f0b35e', // warm gold
    name: {
      cs: 'Google AI Studio',
      en: 'Google AI Studio',
      ru: 'Google AI Studio',
    },
    category: {
      cs: 'Model Playground',
      en: 'Model Playground',
      ru: 'Площадка моделей',
    },
    description: {
      cs: 'Hřiště pro Gemini modely. Obrovský kontext, rychlé experimenty, ladění promptů. Místo, kde nápady dostávají první tvar.',
      en: 'A playground for Gemini models. Huge context, quick experiments, prompt tuning. Where ideas take their first shape.',
      ru: 'Площадка для моделей Gemini. Огромный контекст, быстрые эксперименты, настройка промптов. Место, где идеи обретают форму.',
    },
    personal: {
      cs: 'Ladím zde prompty a zkouším nápady dřív, než putují do produkce.',
      en: 'I tune prompts here and try ideas before they go to production.',
      ru: 'Здесь я настраиваю промпты и проверяю идеи перед тем, как они уходят в продакшн.',
    },
  },
  {
    id: 'notebooklm',
    url: 'https://notebooklm.google.com',
    initials: 'NB',
    accent: '#c48bf5', // soft lavender
    name: {
      cs: 'Google NotebookLM',
      en: 'Google NotebookLM',
      ru: 'Google NotebookLM',
    },
    category: {
      cs: 'Tichý výzkumník',
      en: 'Quiet researcher',
      ru: 'Тихий исследователь',
    },
    description: {
      cs: 'Nahraješ mu knihy, studie, poznámky — a on se stane tvým osobním výzkumníkem. Odpovídá s citacemi z tvých vlastních zdrojů.',
      en: 'Feed it books, studies, notes — and it becomes your personal researcher. Answers with citations from your own sources.',
      ru: 'Скармливаешь ему книги, статьи, заметки — и он становится твоим личным исследователем. Отвечает со ссылками на твои источники.',
    },
    personal: {
      cs: 'Procházím s ním knihy o šamanismu, permakultuře i blockchainu — ptám se a ono odpovídá z mých zdrojů.',
      en: 'I walk through books on shamanism, permaculture and blockchain — I ask, and it answers from my own library.',
      ru: 'Прохожу с ним книги о шаманизме, пермакультуре и блокчейне — спрашиваю, и он отвечает из моей библиотеки.',
    },
  },
  {
    id: 'claude',
    url: 'https://claude.ai',
    initials: 'C',
    accent: '#d97757', // anthropic warm terracotta
    name: { cs: 'Claude', en: 'Claude', ru: 'Claude' },
    category: {
      cs: 'Parťák na myšlení',
      en: 'Thinking partner',
      ru: 'Партнёр для мышления',
    },
    description: {
      cs: 'Nejlepší společník pro dlouhé texty, reflexi a přemýšlení nahlas. Cítíš v něm klid, empatii a preciznost — jako v dobrém rozhovoru u ohně.',
      en: 'The best companion for long texts, reflection and thinking aloud. Calm, empathetic and precise — like a good talk by the fire.',
      ru: 'Лучший собеседник для длинных текстов, рефлексии и размышлений вслух. Спокойный, чуткий и точный — как разговор у костра.',
    },
    personal: {
      cs: 'Pomáhá mi s psaním, reflexí a rozhodováním, když je třeba klidná hlava.',
      en: 'Helps me with writing, reflection and decisions when a calm mind is needed.',
      ru: 'Помогает с текстами, рефлексией и решениями, когда нужен ясный ум.',
    },
  },
  {
    id: 'chatgpt',
    url: 'https://chatgpt.com',
    initials: 'GPT',
    accent: '#10a37f', // openai green
    name: { cs: 'ChatGPT', en: 'ChatGPT', ru: 'ChatGPT' },
    category: {
      cs: 'Švýcarský nůž',
      en: 'Swiss knife',
      ru: 'Швейцарский нож',
    },
    description: {
      cs: 'Rychlý a univerzální. Překladatel, rešeršér, malý programátor i brainstorm partner v jednom. Tam, kde potřebuješ odpověď hned.',
      en: 'Fast and universal. Translator, researcher, junior coder and brainstorm partner in one. When you need an answer right now.',
      ru: 'Быстрый и универсальный. Переводчик, исследователь, младший программист и брейнсторм-партнёр в одном. Когда ответ нужен сразу.',
    },
    personal: {
      cs: 'Ranní sparring partner pro nápady a urychlovač všech rutin, které bych jinak dělal pomalu.',
      en: 'Morning sparring partner for ideas and accelerator of all the routines I would otherwise do slowly.',
      ru: 'Утренний спарринг-партнёр для идей и ускоритель всей рутины, которую иначе делал бы медленно.',
    },
  },
  {
    id: 'v0',
    url: 'https://v0.dev',
    initials: 'V0',
    accent: '#f1e9d8', // cream — v0 is minimal black/white
    name: { cs: 'V0 by Vercel', en: 'V0 by Vercel', ru: 'V0 от Vercel' },
    category: {
      cs: 'UI Generátor',
      en: 'UI Generator',
      ru: 'UI-генератор',
    },
    description: {
      cs: 'Popíšeš, jak má stránka vypadat — a v několika vteřinách máš hotové React + Tailwind komponenty připravené k použití.',
      en: 'Describe how a page should look — and in seconds you have React + Tailwind components ready to use.',
      ru: 'Опиши, как должна выглядеть страница — и за секунды получаешь готовые React + Tailwind компоненты.',
    },
    personal: {
      cs: 'Skicuji zde rychlé UI koncepty, které pak ručně dotahuji do finální podoby.',
      en: 'I sketch quick UI concepts here, then finish them by hand.',
      ru: 'Набрасываю здесь быстрые UI-концепты, затем довожу их руками.',
    },
  },
];

// Teaser banner shown on the home page (Projekty → Nástroje → Kontakt)
export const TOOLS_TEASER = {
  cs: {
    kicker: 'Dílna',
    title: 'Moje digitální dílna',
    subtitle:
      'Šest nástrojů, které mi dávají víc času na to, co má smysl. AI, generátory UI, tichý výzkumník. Pojď se podívat.',
    cta: 'Otevřít dílnu',
  },
  en: {
    kicker: 'Workshop',
    title: 'My digital workshop',
    subtitle:
      'Six tools that give me more time for what matters. AI, UI generators, a quiet researcher. Take a look.',
    cta: 'Enter the workshop',
  },
  ru: {
    kicker: 'Мастерская',
    title: 'Моя цифровая мастерская',
    subtitle:
      'Шесть инструментов, которые дают мне больше времени для важного. ИИ, генераторы UI, тихий исследователь. Загляни.',
    cta: 'Открыть мастерскую',
  },
};
