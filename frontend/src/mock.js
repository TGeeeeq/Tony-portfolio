// Mock data - all content & translations stored here
// This is the only place mock data lives so backend integration later is easy

export const ASSETS = {
  photo: '/media/tf.webp',
  nechMeRustLogo: '/media/nechmerust-logo.webp',
  impactlyLogo: '/media/impactly-logo.webp',
  csopLogo: '/media/csop-ostrov-logo.webp',
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
    status: { cs: 'Aktivní', en: 'Active', ru: 'Активный', es: 'Activo' },
    title: {
      cs: 'Nech mě růst',
      en: 'Nech mě růst (Let Me Grow)',
      ru: 'Nech mě růst (Дай мне расти)',
      es: 'Nech mě růst (Déjame Crecer)',
    },
    tagline: {
      cs: 'Cesta vědomého růstu — propojení duše, přírody a moderní doby.',
      en: 'A path of conscious growth — bridging soul, nature, and the modern era.',
      ru: 'Путь осознанного роста — связь души, природы и современности.',
      es: 'Un camino de crecimiento consciente — uniendo alma, naturaleza y era moderna.',
    },
    description: {
      cs: 'Azyl a místo pro bytosti hledající návrat ke kořenům, autentickému já a přirozenému rytmu života. Sdílíme inspiraci, rituály a praktické nástroje pro každodenní život.',
      en: 'Animal sanctuary and community for those seeking a return to roots, the authentic self, and the natural rhythm of life. We share inspiration, rituals, and practical tools for everyday life.',
      ru: 'Платформа и сообщество для тех, кто ищет возвращения к корням, подлинному я и естественному ритму жизни.',
      es: 'Santuario animal y comunidad para quienes buscan el regreso a las raíces, al yo auténtico y al ritmo natural de la vida. Compartimos inspiración, rituales y herramientas prácticas para el día a día.',
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
    status: { cs: 'V přípravě', en: 'In preparation', ru: 'В подготовке', es: 'En preparación' },
    title: {
      cs: 'Impactly',
      en: 'Impactly',
      ru: 'Impactly',
      es: 'Impactly',
    },
    tagline: {
      cs: 'Akce · Komunita · Přínos · Země. Technologie, která dává smysl.',
      en: 'Action · Community · Benefit · Earth. Technology that makes sense.',
      ru: 'Действие · Сообщество · Польза · Земля. Технологии со смыслом.',
      es: 'Acción · Comunidad · Beneficio · Tierra. Tecnología con sentido.',
    },
    description: {
      cs: 'Připravovaný projekt propojující komunitní akce, blockchain a měřitelný dopad na planetu. Každý dobrý skutek má svůj otisk — a my ho děláme viditelným.',
      en: 'An upcoming project connecting community action, blockchain, and measurable impact on the planet. Every good deed leaves a trace — we make it visible.',
      ru: 'Готовящийся проект, соединяющий действия сообщества, блокчейн и измеримое влияние на планету.',
      es: 'Un proyecto en preparación que conecta la acción comunitaria, blockchain y el impacto medible sobre el planeta. Cada buena acción deja una huella — nosotros la hacemos visible.',
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
    year: '2024 — present',
    status: { cs: 'Aktivní', en: 'Active', ru: 'Активный', es: 'Activo' },
    title: {
      cs: 'ČSOP Trosečníci Ostrov',
      en: 'Czech Union for Nature Conservation — Ostrov',
      ru: 'Чешский союз охраны природы — Остров',
      es: 'Unión Checa para la Conservación de la Naturaleza — Ostrov',
    },
    tagline: {
      cs: 'Ochrana přírody v regionu Lanškroun — Ostrov u Lanškrouna.',
      en: 'Nature protection in the Lanškroun region — Ostrov u Lanškrouna.',
      ru: 'Охрана природы в регионе Ланшкроун — Остров у Ланшкроуна.',
      es: 'Protección de la naturaleza en la región de Lanškroun — Ostrov u Lanškrouna.',
    },
    description: {
      cs: 'Práce v terénu, péče o krajinu, mapování biotopů a propojení místní komunity s přírodou. Konkrétní činy v konkrétním místě.',
      en: 'Field work, landscape care, biotope mapping, and connecting the local community with nature. Real actions in a real place.',
      ru: 'Полевая работа, забота о ландшафте, картирование биотопов и связь местного сообщества с природой.',
      es: 'Trabajo de campo, cuidado del paisaje, mapeo de biotopos y conexión de la comunidad local con la naturaleza. Acciones concretas en un lugar concreto.',
    },
  },
];

export const TRANSLATIONS = {
  cs: {
    nav: { about: 'O mně', projects: 'Projekty', services: 'Služby', mission: 'Poslání', tools: 'Nástroje', blog: 'Blog', contact: 'Kontakt' },
    hero: {
      eyebrow: 'Antonín Figueroa',
      title: 'Tam, kde se kořeny\npotkávají s kódem.',
      subtitle: 'Jsem vývojář a spolutvůrce neziskovky, který věří, že kód i kořeny patří do jedné půdy. Vyvíjím projekty na průsečíku AI, blockchainu a ochrany přírody.',
      cta1: 'Prozkoumat projekty',
      cta2: 'Spojit se',
      scanLabel: 'SCAN ACTIVE',
      coords: "LAT 49°47'41 N · LON 15°23'25 E",
      sigBlock: 'SIGNATURE: A.F. // ID 0xAF-1988',
    },
    about: {
      kicker: 'Kdo jsem',
      title: 'Most mezi prastarým a budoucím.',
      p1: 'Jsem Antonín Figueroa — vývojář, spolutvůrce platformy Nech mě růst a terénní ochránce přírody v ČSOP Trosečníci Ostrov. Žiji na rozhraní dvou světů: s rukama v hlíně a myslí v kódu.',
      p2: 'Vyvíjím projekty na průsečíku přírody a technologie — od Impactly, aplikace využívající blockchain ke zviditelnění dobrých skutků, přes ochranu biotopů v regionu Lanškroun, až po AI nástroje pro vědomé žití.',
      p3: 'Nápad bez spojení zůstane snem. Pokud cítíš, že naše cesty mohou jít kousek spolu — napiš mi.',
    },
    mission: {
      kicker: 'Poslání',
      title: 'Příroda a spiritualita.\nKód a vědomí.',
      body: 'Přesvědčení je jednoduché: moderní nástroje musí sloužit životu, ne ho nahradit. AI nám může pomoci naslouchat lesu. Blockchain může učinit dobré skutky viditelnými. A tělo v přírodě nás vrací k tomu podstatnému.',
      pillars: [
        { title: 'Příroda', text: 'Krajina, půda, voda, divoká místa — péče o to, co tu bylo dřív než my.' },
        { title: 'Duch', text: 'Vědomé žití, ticho, rituál a autentická vnitřní cesta.' },
        { title: 'Technologie', text: 'AI, blockchain a otevřené nástroje ve službě životu a planetě.' },
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
      sending: 'Odesílám…',
      sent: 'Odesláno — ozvu se ti.',
      error: 'Chyba při odesílání. Zkus to znovu nebo napiš přímo e-mailem.',
      orReach: 'Nebo přímo:',
    },
    cookies: {
      text: 'Tento web používá cookies pro anonymní statistiku návštěvnosti. Měřit začnu až s tvým souhlasem.',
      accept: 'Přijmout',
      decline: 'Odmítnout',
    },
    footer: {
      tagline: 'Kořeny v zemi. Vědomí v kódu.',
      rights: 'Všechna práva vyhrazena.',
    },
    pricing: {
      kicker: 'Služby',
      title: 'Postarám se\no celý váš web.',
      subtitle:
        'Web, hosting, doména, e-mail i obsah — všechno na jednom místě. Bez agentury, za ceny dostupné malým spolkům a neziskovkám.',
      statement:
        'Nejsem agentura. Jsem jeden člověk, který udrží pohromadě web, hosting, doménu, e-mail i obsah — a ví, co dělá.',
      forWhom:
        'Pracuji s moderními nástroji včetně AI. Výsledek: zlomek ceny agentury při zachované kvalitě. Pro malé spolky, neziskovky a každého, kdo nechce řešit techniku.',
      fromLabel: 'od',
      perMonth: '/ měsíc',
      perHour: '/ hodina',
      freeConsult: 'První konzultace zdarma',
      vatNote: 'Ceny jsou uvedeny bez DPH.',
      highlightBadge: 'Vše v jednom',
      refsLabel: 'Kde to běží',
      back: '← Zpět na úvod',
      kindPausal: 'Měsíční paušál',
      kindProject: 'Jednorázově',
      kindHourly: 'Hodinová sazba',
      ctaHeading: 'Máte zájem nebo otázku?',
      ctaText:
        'Napište mi a domluvíme se. Nezavazujete se k ničemu — první konzultace je zdarma.',
      ctaButton: 'Napsat zprávu',
      services: {
        'sprava-webu': {
          title: 'Správa webu',
          description:
            'Pravidelná péče o web — aktualizace, zálohy, bezpečnost, monitoring. Bez starostí.',
          tiers: {
            zakladni: {
              name: 'Základní',
              includes: [
                'Aktualizace WordPressu, šablony a pluginů',
                'Týdenní zálohy',
                'Monitoring dostupnosti',
                'Bezpečnostní kontrola',
              ],
            },
            standard: {
              name: 'Standard',
              includes: [
                'Vše ze základního',
                'Až 1 hodina drobných úprav v ceně',
                'Měsíční report',
                'Reakce do 48 hodin',
              ],
            },
            kompletni: {
              name: 'Kompletní péče',
              includes: [
                'Vše ze standardu',
                'Až 2 hodiny úprav v ceně',
                'Doména a hosting v ceně',
                'Pravidelná komunikace',
                'Reakce do 24 hodin',
              ],
            },
          },
        },
        'tvorba-webu': {
          title: 'Tvorba webu',
          description:
            'Nový web od návrhu po spuštění. Funkční, rychlý, přizpůsobený vašim potřebám.',
          items: {
            landing: {
              name: 'Landing page / jednoduchý web',
              note: 'Prezentační stránka, web spolku, osobní web.',
            },
            redesign: {
              name: 'Redesign existujícího webu',
              note: 'Nový vzhled a struktura na stávajícím obsahu.',
            },
            firemni: {
              name: 'Firemní nebo organizační web',
              note: 'Větší web s více sekcemi, formuláři a správou obsahu.',
            },
          },
        },
        'technicke-prace': {
          title: 'Technické práce',
          description:
            'Jednorázové technické úkony — nastavení, migrace, integrace, konzultace.',
          examples: [
            'Nastavení domény, DNS, SSL',
            'Migrace webu na nový hosting',
            'Nastavení Google Workspace nebo firemního e-mailu',
            'Organizace Google Drive',
            'Technická konzultace',
          ],
          note: 'Minimální fakturovaný čas: 1 hodina. První konzultace zdarma.',
        },
      },
    },
  },
  en: {
    nav: { about: 'About', projects: 'Projects', services: 'Services', mission: 'Mission', tools: 'Tools', blog: 'Blog', contact: 'Contact' },
    hero: {
      eyebrow: 'Antonín Figueroa',
      title: 'Where roots\nmeet the code.',
      subtitle: 'Developer and nonprofit co-creator who believes code and roots grow from the same soil. I build projects at the intersection of AI, blockchain, and nature conservation.',
      cta1: 'Explore projects',
      cta2: 'Get in touch',
      scanLabel: 'SCAN ACTIVE',
      coords: "LAT 49°47'41 N · LON 15°23'25 E",
      sigBlock: 'SIGNATURE: A.F. // ID 0xAF-1988',
    },
    about: {
      kicker: 'Who I am',
      title: 'A bridge between the ancient and the becoming.',
      p1: "I'm Antonín Figueroa — developer, co-creator of the platform Nech mě růst, and field conservationist with ČSOP Trosečníci Ostrov. I live on the boundary of two worlds: hands in the soil, mind in the code.",
      p2: 'I develop projects at the crossroads of nature and technology — from Impactly, an app using blockchain to make good deeds visible, to habitat conservation in the Lanškroun region, and AI tools for conscious living.',
      p3: 'An idea without connection remains a dream. If you feel our paths could cross for a while — reach out.',
    },
    mission: {
      kicker: 'Mission',
      title: 'Nature and spirit.\nCode and consciousness.',
      body: 'The conviction is simple: modern tools must serve life, not replace it. AI can help us listen to the forest. Blockchain can make good deeds visible. And a body in nature returns us to what truly matters.',
      pillars: [
        { title: 'Nature', text: 'Landscape, soil, water, wild places — stewardship of what was here before us.' },
        { title: 'Spirit', text: 'Conscious living, silence, ritual, and an authentic inner path.' },
        { title: 'Technology', text: 'AI, blockchain and open tools in service of life and the planet.' },
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
      sending: 'Sending…',
      sent: 'Sent — I will reply.',
      error: 'Sending failed. Try again or write me directly by email.',
      orReach: 'Or directly:',
    },
    cookies: {
      text: 'This site uses cookies for anonymous visit statistics. Measuring starts only with your consent.',
      accept: 'Accept',
      decline: 'Decline',
    },
    footer: {
      tagline: 'Roots in the earth. Awareness in the code.',
      rights: 'All rights reserved.',
    },
    pricing: {
      kicker: 'Services',
      title: 'I take care\nof your whole site.',
      subtitle:
        'Website, hosting, domain, email and content — all in one place. No agency, at prices small clubs and nonprofits can afford.',
      statement:
        "I'm not an agency. I'm one person who keeps your website, hosting, domain, email and content together — and knows what he's doing.",
      forWhom:
        "I work with modern tools, including AI. The result: a fraction of an agency's price, with the quality kept. For small clubs, nonprofits and anyone who'd rather not deal with the tech.",
      fromLabel: 'from',
      perMonth: '/ month',
      perHour: '/ hour',
      freeConsult: 'First consultation free',
      vatNote: 'Prices are listed without VAT.',
      highlightBadge: 'All in one',
      refsLabel: 'Where it runs',
      back: '← Back home',
      kindPausal: 'Monthly retainer',
      kindProject: 'One-off project',
      kindHourly: 'Hourly rate',
      ctaHeading: 'Interested, or have a question?',
      ctaText:
        "Write to me and we'll figure it out. No commitment — the first consultation is free.",
      ctaButton: 'Send a message',
      services: {
        'sprava-webu': {
          title: 'Website care',
          description:
            'Regular care for your site — updates, backups, security, monitoring. Worry-free.',
          tiers: {
            zakladni: {
              name: 'Basic',
              includes: [
                'WordPress, theme & plugin updates',
                'Weekly backups',
                'Uptime monitoring',
                'Security check',
              ],
            },
            standard: {
              name: 'Standard',
              includes: [
                'Everything in Basic',
                'Up to 1 hour of small edits included',
                'Monthly report',
                'Response within 48 hours',
              ],
            },
            kompletni: {
              name: 'Complete care',
              includes: [
                'Everything in Standard',
                'Up to 2 hours of edits included',
                'Domain & hosting included',
                'Regular communication',
                'Response within 24 hours',
              ],
            },
          },
        },
        'tvorba-webu': {
          title: 'Web creation',
          description:
            'A new site from design to launch. Functional, fast, tailored to your needs.',
          items: {
            landing: {
              name: 'Landing page / simple site',
              note: 'A presentation page, club site, personal site.',
            },
            redesign: {
              name: 'Redesign of an existing site',
              note: 'New look and structure on your existing content.',
            },
            firemni: {
              name: 'Company or organisation site',
              note: 'A larger site with more sections, forms and content management.',
            },
          },
        },
        'technicke-prace': {
          title: 'Technical work',
          description:
            'One-off technical tasks — setup, migration, integration, consulting.',
          examples: [
            'Domain, DNS and SSL setup',
            'Website migration to new hosting',
            'Google Workspace or company email setup',
            'Google Drive organisation',
            'Technical consultation',
          ],
          note: 'Minimum billed time: 1 hour. First consultation free.',
        },
      },
    },
  },
  ru: {
    nav: { about: 'Обо мне', projects: 'Проекты', services: 'Услуги', mission: 'Миссия', tools: 'Инструменты', blog: 'Блог', contact: 'Контакт' },
    hero: {
      eyebrow: 'Антонин Фигероа',
      title: 'Там, где корни\nвстречают код.',
      subtitle: 'Разработчик и соавтор некоммерческой организации, убеждённый, что код и корни растут из одной почвы. Создаю проекты на пересечении ИИ, блокчейна и защиты природы.',
      cta1: 'К проектам',
      cta2: 'Связаться',
      scanLabel: 'СКАН АКТИВЕН',
      coords: "ШИР 49°47'41 С · ДОЛ 15°23'25 В",
      sigBlock: 'ПОДПИСЬ: A.F. // ID 0xAF-1988',
    },
    about: {
      kicker: 'Кто я',
      title: 'Мост между древним и становящимся.',
      p1: 'Я — Антонин Фигероа: разработчик, соавтор платформы Nech mě růst и полевой защитник природы в ČSOP Trosečníci Ostrov. Живу на границе двух миров: руки в земле, разум в коде.',
      p2: 'Создаю проекты на стыке природы и технологий — от Impactly, приложения на блокчейне для видимого воздействия на мир, до охраны биотопов в регионе Ланшкроун и ИИ-инструментов для осознанной жизни.',
      p3: 'Идея без связи остаётся мечтой. Если чувствуешь, что наши пути могут пересечься — напиши мне.',
    },
    mission: {
      kicker: 'Миссия',
      title: 'Природа и дух.\nКод и сознание.',
      body: 'Убеждение простое: современные инструменты должны служить жизни, а не заменять её. ИИ может помочь нам слышать лес. Блокчейн может сделать добрые дела видимыми. А тело в природе возвращает нас к главному.',
      pillars: [
        { title: 'Природа', text: 'Ландшафт, почва, вода, дикие места — забота о том, что было до нас.' },
        { title: 'Дух', text: 'Осознанная жизнь, тишина, ритуал и подлинный внутренний путь.' },
        { title: 'Технологии', text: 'ИИ, блокчейн и открытые инструменты на службе жизни и планеты.' },
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
      sending: 'Отправка…',
      sent: 'Отправлено — отвечу.',
      error: 'Не удалось отправить. Попробуй ещё раз или напиши напрямую.',
      orReach: 'Или напрямую:',
    },
    cookies: {
      text: 'Этот сайт использует cookies для анонимной статистики посещений. Сбор начнётся только с твоего согласия.',
      accept: 'Принять',
      decline: 'Отклонить',
    },
    footer: {
      tagline: 'Корни в земле. Сознание в коде.',
      rights: 'Все права защищены.',
    },
    pricing: {
      kicker: 'Услуги',
      title: 'Беру на себя\nвесь ваш сайт.',
      subtitle:
        'Сайт, хостинг, домен, почта и контент — всё в одном месте. Без агентства, по ценам, доступным небольшим объединениям и НКО.',
      statement:
        'Я не агентство. Я один человек, который держит вместе сайт, хостинг, домен, почту и контент — и знает своё дело.',
      forWhom:
        'Работаю с современными инструментами, включая ИИ. Результат — доля цены агентства при сохранённом качестве. Для небольших объединений, НКО и всех, кто не хочет возиться с техникой.',
      fromLabel: 'от',
      perMonth: '/ месяц',
      perHour: '/ час',
      freeConsult: 'Первая консультация бесплатно',
      vatNote: 'Цены указаны без НДС.',
      highlightBadge: 'Всё включено',
      refsLabel: 'Где это работает',
      back: '← На главную',
      kindPausal: 'Ежемесячно',
      kindProject: 'Разовый проект',
      kindHourly: 'Почасовая ставка',
      ctaHeading: 'Интересно или есть вопрос?',
      ctaText:
        'Напишите мне, и договоримся. Без обязательств — первая консультация бесплатно.',
      ctaButton: 'Написать',
      services: {
        'sprava-webu': {
          title: 'Поддержка сайта',
          description:
            'Регулярная забота о сайте — обновления, резервные копии, безопасность, мониторинг. Без забот.',
          tiers: {
            zakladni: {
              name: 'Базовый',
              includes: [
                'Обновления WordPress, темы и плагинов',
                'Еженедельные бэкапы',
                'Мониторинг доступности',
                'Проверка безопасности',
              ],
            },
            standard: {
              name: 'Стандарт',
              includes: [
                'Всё из базового',
                'До 1 часа мелких правок включено',
                'Ежемесячный отчёт',
                'Ответ в течение 48 часов',
              ],
            },
            kompletni: {
              name: 'Полная забота',
              includes: [
                'Всё из стандарта',
                'До 2 часов правок включено',
                'Домен и хостинг включены',
                'Регулярная коммуникация',
                'Ответ в течение 24 часов',
              ],
            },
          },
        },
        'tvorba-webu': {
          title: 'Создание сайта',
          description:
            'Новый сайт от дизайна до запуска. Функциональный, быстрый, под ваши задачи.',
          items: {
            landing: {
              name: 'Лендинг / простой сайт',
              note: 'Презентационная страница, сайт объединения, личный сайт.',
            },
            redesign: {
              name: 'Редизайн существующего сайта',
              note: 'Новый вид и структура на существующем контенте.',
            },
            firemni: {
              name: 'Корпоративный сайт',
              note: 'Более крупный сайт с разделами, формами и управлением контентом.',
            },
          },
        },
        'technicke-prace': {
          title: 'Технические работы',
          description:
            'Разовые технические задачи — настройка, миграция, интеграция, консультации.',
          examples: [
            'Настройка домена, DNS, SSL',
            'Миграция сайта на новый хостинг',
            'Настройка Google Workspace или корпоративной почты',
            'Организация Google Drive',
            'Техническая консультация',
          ],
          note: 'Минимальное оплачиваемое время: 1 час. Первая консультация бесплатно.',
        },
      },
    },
  },
  es: {
    nav: { about: 'Sobre mí', projects: 'Proyectos', services: 'Servicios', mission: 'Misión', tools: 'Herramientas', blog: 'Blog', contact: 'Contacto' },
    hero: {
      eyebrow: 'Antonín Figueroa',
      title: 'Donde las raíces\nse encuentran con el código.',
      subtitle: 'Desarrollador y cofundador de una ONG que cree que el código y las raíces crecen del mismo suelo. Creo proyectos en la intersección de la IA, blockchain y la conservación de la naturaleza.',
      cta1: 'Explorar proyectos',
      cta2: 'Ponerse en contacto',
      scanLabel: 'ESCANEO ACTIVO',
      coords: "LAT 49°47'41 N · LON 15°23'25 E",
      sigBlock: 'FIRMA: A.F. // ID 0xAF-1988',
    },
    about: {
      kicker: 'Quién soy',
      title: 'Un puente entre lo ancestral y lo que está por venir.',
      p1: 'Soy Antonín Figueroa — desarrollador, cofundador de la plataforma Nech mě růst y conservacionista de campo en ČSOP Trosečníci Ostrov. Vivo en la frontera de dos mundos: manos en la tierra, mente en el código.',
      p2: 'Desarrollo proyectos en la intersección de la naturaleza y la tecnología — desde Impactly, una app que usa blockchain para hacer visibles las buenas acciones, hasta la conservación de hábitats en la región de Lanškroun y herramientas de IA para la vida consciente.',
      p3: 'Una idea sin conexión sigue siendo un sueño. Si sientes que nuestros caminos podrían cruzarse un trecho — escríbeme.',
    },
    mission: {
      kicker: 'Misión',
      title: 'Naturaleza y espíritu.\nCódigo y consciencia.',
      body: 'La convicción es sencilla: las herramientas modernas deben servir a la vida, no reemplazarla. La IA puede ayudarnos a escuchar el bosque. Blockchain puede hacer visibles las buenas acciones. Y un cuerpo en la naturaleza nos devuelve a lo esencial.',
      pillars: [
        { title: 'Naturaleza', text: 'Paisaje, tierra, agua, lugares salvajes — el cuidado de lo que estaba aquí antes que nosotros.' },
        { title: 'Espíritu', text: 'Vida consciente, silencio, ritual y un camino interior auténtico.' },
        { title: 'Tecnología', text: 'IA, blockchain y herramientas abiertas al servicio de la vida y el planeta.' },
      ],
    },
    projects: {
      kicker: 'Lo que creo',
      title: 'Proyectos',
      visit: 'Visitar',
      ig: 'Instagram',
      soon: 'Pronto',
    },
    contact: {
      kicker: 'Conexión',
      title: '¿Tienes una pregunta?\n¿Quieres contactarme?',
      subtitle: 'Pregúntame. Ya sea por consejo, colaboración, o simplemente para compartir lo que te alegra.',
      name: 'Tu nombre',
      email: 'Email',
      message: 'Tu mensaje',
      send: 'Enviar',
      sending: 'Enviando…',
      sent: 'Enviado — te responderé.',
      error: 'Error al enviar. Inténtalo de nuevo o escríbeme directamente por email.',
      orReach: 'O directamente:',
    },
    cookies: {
      text: 'Esta web usa cookies para estadísticas anónimas de visitas. La medición empieza solo con tu consentimiento.',
      accept: 'Aceptar',
      decline: 'Rechazar',
    },
    footer: {
      tagline: 'Raíces en la tierra. Conciencia en el código.',
      rights: 'Todos los derechos reservados.',
    },
    pricing: {
      kicker: 'Servicios',
      title: 'Me ocupo\nde toda tu web.',
      subtitle:
        'Web, hosting, dominio, correo y contenido — todo en un solo lugar. Sin agencia, a precios al alcance de pequeñas asociaciones y ONG.',
      statement:
        'No soy una agencia. Soy una persona que mantiene unidos la web, el hosting, el dominio, el correo y el contenido — y sabe lo que hace.',
      forWhom:
        'Trabajo con herramientas modernas, incluida la IA. El resultado: una fracción del precio de una agencia, manteniendo la calidad. Para pequeñas asociaciones, ONG y cualquiera que prefiera no lidiar con la técnica.',
      fromLabel: 'desde',
      perMonth: '/ mes',
      perHour: '/ hora',
      freeConsult: 'Primera consulta gratis',
      vatNote: 'Precios sin IVA.',
      highlightBadge: 'Todo en uno',
      refsLabel: 'Dónde funciona',
      back: '← Volver al inicio',
      kindPausal: 'Cuota mensual',
      kindProject: 'Proyecto puntual',
      kindHourly: 'Tarifa por horas',
      ctaHeading: '¿Te interesa o tienes una pregunta?',
      ctaText:
        'Escríbeme y lo vemos. Sin compromiso — la primera consulta es gratis.',
      ctaButton: 'Enviar mensaje',
      services: {
        'sprava-webu': {
          title: 'Mantenimiento web',
          description:
            'Cuidado regular de tu web — actualizaciones, copias, seguridad, monitorización. Sin preocupaciones.',
          tiers: {
            zakladni: {
              name: 'Básico',
              includes: [
                'Actualizaciones de WordPress, plantilla y plugins',
                'Copias semanales',
                'Monitorización de disponibilidad',
                'Revisión de seguridad',
              ],
            },
            standard: {
              name: 'Estándar',
              includes: [
                'Todo lo del Básico',
                'Hasta 1 hora de pequeños ajustes incluida',
                'Informe mensual',
                'Respuesta en 48 horas',
              ],
            },
            kompletni: {
              name: 'Cuidado completo',
              includes: [
                'Todo lo del Estándar',
                'Hasta 2 horas de ajustes incluidas',
                'Dominio y hosting incluidos',
                'Comunicación regular',
                'Respuesta en 24 horas',
              ],
            },
          },
        },
        'tvorba-webu': {
          title: 'Creación web',
          description:
            'Una web nueva del diseño al lanzamiento. Funcional, rápida, adaptada a tus necesidades.',
          items: {
            landing: {
              name: 'Landing / web sencilla',
              note: 'Página de presentación, web de asociación, web personal.',
            },
            redesign: {
              name: 'Rediseño de una web existente',
              note: 'Nuevo aspecto y estructura sobre tu contenido actual.',
            },
            firemni: {
              name: 'Web de empresa u organización',
              note: 'Una web mayor con más secciones, formularios y gestión de contenido.',
            },
          },
        },
        'technicke-prace': {
          title: 'Trabajos técnicos',
          description:
            'Tareas técnicas puntuales — configuración, migración, integración, consultoría.',
          examples: [
            'Configuración de dominio, DNS y SSL',
            'Migración de la web a un nuevo hosting',
            'Configuración de Google Workspace o correo corporativo',
            'Organización de Google Drive',
            'Consultoría técnica',
          ],
          note: 'Tiempo mínimo facturado: 1 hora. Primera consulta gratis.',
        },
      },
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
  es: {
    kicker: 'Taller digital',
    title: 'Herramientas\nque amo.',
    subtitle:
      'La tecnología moderna es como una buena herramienta: mejor cuando es afilada, honesta y no estorba. Esta es mi colección actual. Cada pieza me libera las manos y el tiempo para lo que realmente importa.',
    usedLabel: 'La uso para',
    visit: 'Visitar',
    back: '← Volver al inicio',
  },
};

export const TOOLS = [
  {
    id: 'emergent',
    url: 'https://app.emergent.sh/register?ref=tony375739',
    initials: 'E',
    accent: '#9ae66e', // fresh green — like new shoots
    name: { cs: 'Emergent', en: 'Emergent', ru: 'Emergent', es: 'Emergent' },
    category: {
      cs: 'AI Stavitel',
      en: 'AI Builder',
      ru: 'ИИ-конструктор',
      es: 'Constructor IA',
    },
    description: {
      cs: 'Platforma, kde v dialogu s AI vzniká celá aplikace — od první skici po nasazení. Jako bys diktoval les a on rostl sám.',
      en: 'A platform where a full app grows from a conversation with AI — from first sketch to deploy. Like dictating a forest and watching it rise on its own.',
      ru: 'Платформа, где в диалоге с ИИ рождается целое приложение — от наброска до деплоя. Как будто надиктовываешь лес, и он растёт сам.',
      es: 'Una plataforma donde, en diálogo con la IA, nace una aplicación entera — desde el primer boceto hasta el despliegue. Como dictar un bosque y verlo crecer solo.',
    },
    personal: {
      cs: 'Tento web stavím tady. Od prvního nápadu po nasazení na Vercel — všechno v jednom okně.',
      en: 'This website is being built here. From first idea to Vercel deploy — all in one window.',
      ru: 'Этот сайт строю именно здесь. От первой идеи до деплоя на Vercel — всё в одном окне.',
      es: 'Esta web la construyo aquí. Desde la primera idea hasta el despliegue en Vercel — todo en una sola ventana.',
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
      es: 'Google AI Studio',
    },
    category: {
      cs: 'Model Playground',
      en: 'Model Playground',
      ru: 'Площадка моделей',
      es: 'Playground de modelos',
    },
    description: {
      cs: 'Hřiště pro Gemini modely. Obrovský kontext, rychlé experimenty, ladění promptů. Místo, kde nápady dostávají první tvar.',
      en: 'A playground for Gemini models. Huge context, quick experiments, prompt tuning. Where ideas take their first shape.',
      ru: 'Площадка для моделей Gemini. Огромный контекст, быстрые эксперименты, настройка промптов. Место, где идеи обретают форму.',
      es: 'Un patio de juegos para los modelos Gemini. Contexto enorme, experimentos rápidos, ajuste de prompts. Donde las ideas toman su primera forma.',
    },
    personal: {
      cs: 'Ladím zde prompty a zkouším nápady dřív, než putují do produkce.',
      en: 'I tune prompts here and try ideas before they go to production.',
      ru: 'Здесь я настраиваю промпты и проверяю идеи перед тем, как они уходят в продакшн.',
      es: 'Aquí afino prompts y pruebo ideas antes de que pasen a producción.',
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
      es: 'Google NotebookLM',
    },
    category: {
      cs: 'Tichý výzkumník',
      en: 'Quiet researcher',
      ru: 'Тихий исследователь',
      es: 'Investigador silencioso',
    },
    description: {
      cs: 'Nahraješ mu knihy, studie, poznámky — a on se stane tvým osobním výzkumníkem. Odpovídá s citacemi z tvých vlastních zdrojů.',
      en: 'Feed it books, studies, notes — and it becomes your personal researcher. Answers with citations from your own sources.',
      ru: 'Скармливаешь ему книги, статьи, заметки — и он становится твоим личным исследователем. Отвечает со ссылками на твои источники.',
      es: 'Le subes libros, estudios, notas — y se convierte en tu investigador personal. Responde con citas de tus propias fuentes.',
    },
    personal: {
      cs: 'Procházím s ním knihy o šamanismu, permakultuře i blockchainu — ptám se a ono odpovídá z mých zdrojů.',
      en: 'I walk through books on shamanism, permaculture and blockchain — I ask, and it answers from my own library.',
      ru: 'Прохожу с ним книги о шаманизме, пермакультуре и блокчейне — спрашиваю, и он отвечает из моей библиотеки.',
      es: 'Recorro con él libros sobre chamanismo, permacultura y blockchain — pregunto y me responde desde mi propia biblioteca.',
    },
  },
  {
    id: 'claude',
    url: 'https://claude.ai',
    initials: 'C',
    accent: '#d97757', // anthropic warm terracotta
    name: { cs: 'Claude', en: 'Claude', ru: 'Claude', es: 'Claude' },
    category: {
      cs: 'Parťák na myšlení',
      en: 'Thinking partner',
      ru: 'Партнёр для мышления',
      es: 'Compañero para pensar',
    },
    description: {
      cs: 'Nejlepší společník pro dlouhé texty, reflexi a přemýšlení nahlas. Cítíš v něm klid, empatii a preciznost — jako v dobrém rozhovoru u ohně.',
      en: 'The best companion for long texts, reflection and thinking aloud. Calm, empathetic and precise — like a good talk by the fire.',
      ru: 'Лучший собеседник для длинных текстов, рефлексии и размышлений вслух. Спокойный, чуткий и точный — как разговор у костра.',
      es: 'El mejor compañero para textos largos, reflexión y pensar en voz alta. Calmado, empático y preciso — como una buena conversación junto al fuego.',
    },
    personal: {
      cs: 'Pomáhá mi s psaním, reflexí a rozhodováním, když je třeba klidná hlava.',
      en: 'Helps me with writing, reflection and decisions when a calm mind is needed.',
      ru: 'Помогает с текстами, рефлексией и решениями, когда нужен ясный ум.',
      es: 'Me ayuda con la escritura, la reflexión y las decisiones cuando hace falta una mente serena.',
    },
  },
  {
    id: 'chatgpt',
    url: 'https://chatgpt.com',
    initials: 'GPT',
    accent: '#10a37f', // openai green
    name: { cs: 'ChatGPT', en: 'ChatGPT', ru: 'ChatGPT', es: 'ChatGPT' },
    category: {
      cs: 'Švýcarský nůž',
      en: 'Swiss knife',
      ru: 'Швейцарский нож',
      es: 'Navaja suiza',
    },
    description: {
      cs: 'Rychlý a univerzální. Překladatel, rešeršér, malý programátor i brainstorm partner v jednom. Tam, kde potřebuješ odpověď hned.',
      en: 'Fast and universal. Translator, researcher, junior coder and brainstorm partner in one. When you need an answer right now.',
      ru: 'Быстрый и универсальный. Переводчик, исследователь, младший программист и брейнсторм-партнёр в одном. Когда ответ нужен сразу.',
      es: 'Rápido y universal. Traductor, investigador, programador júnior y compañero de brainstorming en uno. Cuando necesitas una respuesta ya.',
    },
    personal: {
      cs: 'Ranní sparring partner pro nápady a urychlovač všech rutin, které bych jinak dělal pomalu.',
      en: 'Morning sparring partner for ideas and accelerator of all the routines I would otherwise do slowly.',
      ru: 'Утренний спарринг-партнёр для идей и ускоритель всей рутины, которую иначе делал бы медленно.',
      es: 'Sparring matutino para ideas y acelerador de todas las rutinas que de otro modo haría lento.',
    },
  },
  {
    id: 'v0',
    url: 'https://v0.app/ref/9D44E8',
    initials: 'V0',
    accent: '#f1e9d8', // cream — v0 is minimal black/white
    name: { cs: 'V0 by Vercel', en: 'V0 by Vercel', ru: 'V0 от Vercel', es: 'V0 de Vercel' },
    category: {
      cs: 'UI Generátor',
      en: 'UI Generator',
      ru: 'UI-генератор',
      es: 'Generador de UI',
    },
    description: {
      cs: 'Popíšeš, jak má stránka vypadat — a v několika sekundách máš hotové React + Tailwind komponenty připravené k použití.',
      en: 'Describe how a page should look — and in seconds you have React + Tailwind components ready to use.',
      ru: 'Опиши, как должна выглядеть страница — и за секунды получаешь готовые React + Tailwind компоненты.',
      es: 'Describe cómo debe lucir una página — y en segundos tienes componentes React + Tailwind listos para usar.',
    },
    personal: {
      cs: 'Skicuji zde rychlé UI koncepty, které pak ručně dotahuji do finální podoby.',
      en: 'I sketch quick UI concepts here, then finish them by hand.',
      ru: 'Набрасываю здесь быстрые UI-концепты, затем довожу их руками.',
      es: 'Aquí esbozo conceptos rápidos de UI, que luego pulo a mano hasta la forma final.',
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
  es: {
    kicker: 'Taller',
    title: 'Mi taller digital',
    subtitle:
      'Seis herramientas que me dan más tiempo para lo importante. IA, generadores de UI, un investigador silencioso. Pásate a echar un vistazo.',
    cta: 'Entrar al taller',
  },
};

// ---------------------------------------------------------------------------
// PRICING / SLUŽBY
// Numbers + structure live here once; all display text is in TRANSLATIONS[lang].pricing,
// keyed by the same id / tier-key. Components merge the two.
// ---------------------------------------------------------------------------

export const PRICING = {
  currency: 'Kč',
  hourlyRate: 500,
  services: [
    {
      id: 'sprava-webu',
      kind: 'pausal',
      tiers: [
        { key: 'zakladni', price: 750 },
        { key: 'standard', price: 1250 },
        { key: 'kompletni', price: 2000, highlighted: true },
      ],
    },
    {
      id: 'tvorba-webu',
      kind: 'project',
      items: [
        { key: 'landing', priceFrom: 5000 },
        { key: 'redesign', priceFrom: 9000 },
        { key: 'firemni', priceFrom: 15000 },
      ],
    },
    {
      id: 'technicke-prace',
      kind: 'hourly',
    },
  ],
};

// Teaser banner shown on the home page (Projekty → Služby → Nástroje)
export const SERVICES_TEASER = {
  cs: {
    kicker: 'Služby',
    title: 'Postarám se o váš web',
    subtitle:
      'Správa, tvorba i jednorázové technické práce — za zlomek ceny agentury. Pro malé spolky a neziskovky.',
    cta: 'Zobrazit ceník',
  },
  en: {
    kicker: 'Services',
    title: 'I take care of your website',
    subtitle:
      "Care, creation and one-off technical work — at a fraction of an agency's price. For small clubs and nonprofits.",
    cta: 'See pricing',
  },
  ru: {
    kicker: 'Услуги',
    title: 'Позабочусь о вашем сайте',
    subtitle:
      'Поддержка, создание и разовые технические работы — за долю цены агентства. Для небольших объединений и НКО.',
    cta: 'Смотреть цены',
  },
  es: {
    kicker: 'Servicios',
    title: 'Me ocupo de tu web',
    subtitle:
      'Mantenimiento, creación y trabajos técnicos puntuales — a una fracción del precio de una agencia. Para pequeñas asociaciones y ONG.',
    cta: 'Ver precios',
  },
};
