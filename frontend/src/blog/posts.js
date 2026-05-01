// ---------------------------------------------------------------------------
// BLOG — posts and translations
// All content for /blog and /blog/:slug lives here.
// Edit titles, excerpts and body blocks freely. Body blocks support:
//   { type: 'p', text: '...' }            — paragraph
//   { type: 'h2', text: '...' }           — section heading
//   { type: 'list', items: ['..', '..'] } — bullet list
//   { type: 'callout', text: '...' }      — highlighted box (gold)
//   { type: 'quote', text: '...' }        — italic quote / signature
//   { type: 'cta', text: '...', href: '...' } — gold CTA button
// ---------------------------------------------------------------------------

// ⚠️ Replace this with your real Emergent affiliate link
export const EMERGENT_AFFILIATE = 'https://app.emergent.sh/?ref=ANTONIN';

export const BLOG_PAGE = {
  cs: {
    kicker: 'Zápisky',
    title: 'Co píšu,\nco žiju.',
    subtitle:
      'Pomalé poznámky z místa, kde se kořeny potkávají s kódem. Texty o nástrojích, o životě se zvířaty, o spojení toho zdánlivě nespojitelného.',
    readTime: 'min čtení',
    back: '← Zpět na úvod',
    backToList: '← Zpět na všechny zápisky',
    publishedOn: 'Publikováno',
    share: 'Sdílet',
  },
  en: {
    kicker: 'Notes',
    title: 'What I write,\nwhat I live.',
    subtitle:
      'Slow notes from a place where roots meet code. On tools, life with animals, and joining the seemingly unjoinable.',
    readTime: 'min read',
    back: '← Back home',
    backToList: '← Back to all notes',
    publishedOn: 'Published',
    share: 'Share',
  },
  ru: {
    kicker: 'Заметки',
    title: 'Что пишу,\nчем живу.',
    subtitle:
      'Медленные заметки оттуда, где корни встречают код. О инструментах, о жизни с животными и о соединении того, что кажется несоединимым.',
    readTime: 'мин чтения',
    back: '← На главную',
    backToList: '← Ко всем заметкам',
    publishedOn: 'Опубликовано',
    share: 'Поделиться',
  },
};

export const POSTS = [
  {
    id: 'emergent-prompting',
    slug: 'emergent-jak-spravne-promptovat',
    date: '2026-04-15',
    accent: '#9ae66e',
    readTime: 6,
    category: { cs: 'Nástroje', en: 'Tooling', ru: 'Инструменты' },
    title: {
      cs: 'Jak (skutečně) promptovat v Emergentu',
      en: 'How to (actually) prompt in Emergent',
      ru: 'Как (по-настоящему) промптить в Emergent',
    },
    excerpt: {
      cs: 'Emergent staví aplikace přímo z dialogu. Když mu mluvíš jako řemeslníkovi, postaví ti dílo. Tady je můj postup — a proč teď stojí jen dolar.',
      en: 'Emergent builds apps from conversation. Speak to it like a craftsman, and it will craft. Here is my way — and why it now costs just a dollar.',
      ru: 'Emergent строит приложения из диалога. Говори с ним как с мастером — и он построит. Вот мой способ — и почему он сейчас стоит всего доллар.',
    },
    body: {
      cs: [
        { type: 'p', text: 'Emergent je platforma, kde se v rozhovoru s AI rodí celé webové i mobilní aplikace. Já tady stavím tenhle web — a postavil bych si tu i ten příští. Není to magie. Je to pořádný řemeslník, který umí poslouchat.' },
        { type: 'h2', text: 'Co Emergent reálně umí' },
        { type: 'list', items: [
          'Frontend i backend v jedné konverzaci — React, FastAPI, MongoDB',
          'Deploy na Vercel nebo Netlify v podstatě jedním klikem',
          'Pamatuje si kontext celého projektu',
          'Refaktoruje, opravuje chyby, testuje',
          'Píše dokumentaci, README a deploy konfiguraci',
        ]},
        { type: 'h2', text: 'Jak s ním mluvit' },
        { type: 'p', text: 'Nech ho dělat to, v čem je dobrý — myslet samostatně. Tvoje práce není psát kód. Tvoje práce je vědět, co chceš. Pak to řekneš jasně, prostě a klidně. Jako řemeslníkovi, kterému věříš.' },
        { type: 'list', items: [
          'Začni vizí, ne detaily — řekni co a proč, ne jak',
          'Jeden záměr na zprávu — nemíchej tři přání dohromady',
          'Když něco selže, popiš co vidíš a co jsi čekal',
          'Schvaluj postup po krocích, ne po stovkách řádků',
          'Říkej "ne" často — AI si ráda přidá víc, než potřebuješ',
        ]},
        { type: 'h2', text: 'Cena, která dává smysl' },
        { type: 'callout', text: 'Aktuálně 1 $ / měsíc. Ano, doslova jeden dolar. Pro mě to znamená: zkus, co tě napadne. Postav. Pokus. Zahoď. Stavební papír je levný.' },
        { type: 'h2', text: 'Pojď to zkusit' },
        { type: 'p', text: 'Pokud chceš dát Emergentu šanci, použij odkaz níže — pomůžeš mi tím držet můj malý workflow naživu a sám si zahraješ s nástrojem, který opravdu staví.' },
        { type: 'cta', text: 'Otevřít Emergent', href: EMERGENT_AFFILIATE },
      ],
      en: [
        { type: 'p', text: 'Emergent is a platform where full web and mobile apps are born from a conversation with AI. I am building this site here — and I would build the next one here too. It is not magic. It is a proper craftsman who knows how to listen.' },
        { type: 'h2', text: 'What Emergent really does' },
        { type: 'list', items: [
          'Frontend and backend in one conversation — React, FastAPI, MongoDB',
          'Deploy to Vercel or Netlify in basically one click',
          'Remembers the entire project context',
          'Refactors, fixes bugs, tests',
          'Writes documentation, README and deploy config',
        ]},
        { type: 'h2', text: 'How to speak with it' },
        { type: 'p', text: 'Let it do what it is good at — thinking on its own. Your job is not to write code. Your job is to know what you want. Then say it clearly, simply, calmly. Like to a craftsman you trust.' },
        { type: 'list', items: [
          'Start with the vision, not the details — say what and why, not how',
          'One intent per message — do not mix three wishes together',
          'When something fails, describe what you see and what you expected',
          'Approve step by step, not hundreds of lines at once',
          'Say "no" often — AI loves to add more than you need',
        ]},
        { type: 'h2', text: 'A price that makes sense' },
        { type: 'callout', text: 'Currently 1 USD / month. Yes, literally one dollar. For me that means: try whatever crosses your mind. Build. Try. Throw away. The building paper is cheap.' },
        { type: 'h2', text: 'Come and try it' },
        { type: 'p', text: 'If you want to give Emergent a chance, use the link below — it helps me keep my little workflow alive and lets you play with a tool that really builds.' },
        { type: 'cta', text: 'Open Emergent', href: EMERGENT_AFFILIATE },
      ],
      ru: [
        { type: 'p', text: 'Emergent — платформа, где целые веб- и мобильные приложения рождаются из разговора с ИИ. Я строю этот сайт именно здесь — и следующий построил бы здесь же. Это не магия. Это настоящий мастер, умеющий слушать.' },
        { type: 'h2', text: 'Что Emergent реально умеет' },
        { type: 'list', items: [
          'Фронтенд и бэкенд в одном диалоге — React, FastAPI, MongoDB',
          'Деплой на Vercel или Netlify буквально в один клик',
          'Помнит контекст всего проекта',
          'Рефакторит, чинит ошибки, тестирует',
          'Пишет документацию, README и конфигурацию деплоя',
        ]},
        { type: 'h2', text: 'Как с ним говорить' },
        { type: 'p', text: 'Дай ему делать то, что он умеет — думать самостоятельно. Твоё дело не писать код. Твоё дело — знать, чего ты хочешь. И сказать это ясно, просто, спокойно. Как мастеру, которому доверяешь.' },
        { type: 'list', items: [
          'Начни с виденья, не с деталей — что и зачем, а не как',
          'Одно намерение на сообщение — не смешивай три желания',
          'Если что-то ломается, опиши что видишь и что ожидал',
          'Одобряй шаг за шагом, а не по сотням строк',
          'Говори "нет" часто — ИИ любит добавить больше, чем нужно',
        ]},
        { type: 'h2', text: 'Цена, в которой есть смысл' },
        { type: 'callout', text: 'Сейчас 1 $ / месяц. Да, буквально один доллар. Для меня это значит: пробуй всё, что приходит в голову. Строй. Пробуй. Выбрасывай. Строительная бумага дешёвая.' },
        { type: 'h2', text: 'Попробуй' },
        { type: 'p', text: 'Если хочешь дать Emergent шанс — пройди по ссылке ниже. Мне это поможет сохранить мой маленький рабочий поток, а ты поиграешь с инструментом, который действительно строит.' },
        { type: 'cta', text: 'Открыть Emergent', href: EMERGENT_AFFILIATE },
      ],
    },
  },
  {
    id: 'life-on-meadow',
    slug: 'zivot-na-louce-sto-dusi-ai-a-klid',
    date: '2026-04-22',
    accent: '#d4a45a',
    readTime: 5,
    category: { cs: 'Život', en: 'Life', ru: 'Жизнь' },
    title: {
      cs: 'Život na louce: sto duší, AI a klid',
      en: 'Life on a meadow: a hundred souls, AI, and stillness',
      ru: 'Жизнь на лугу: сто душ, ИИ и тишина',
    },
    excerpt: {
      cs: 'Žiju na louce s více než stovkou zvířat. Každý den je celodenní. A přesto mi technologie konečně začínají uvolňovat ruce.',
      en: 'I live on a meadow with more than a hundred animals. Every day is a full day. And yet, technology is finally freeing my hands.',
      ru: 'Живу на лугу с более чем сотней животных. Каждый день — на целый день. И всё-таки технологии наконец-то освобождают мои руки.',
    },
    body: {
      cs: [
        { type: 'p', text: 'Když ráno vstanu, první věc, kterou udělám, je obejít stáje. Více než sto duší — koně, ovce, kozy, slepice, husy, psi, kočky, krávy. Každá s vlastním jménem, charakterem a každodenní potřebou.' },
        { type: 'h2', text: 'Celý den krmení, voda, hlína' },
        { type: 'p', text: 'Žijeme v krajině, kterou jsme zdědili. Není to zoo, ani farma — je to společenství. Někteří jsou tady na konci své cesty, jiní teprve začínají. Společně neseme zodpovědnost. Voda, krmení, čištění, péče. Ráno, poledne, večer. Každý den.' },
        { type: 'p', text: 'K tomu se přidává starost o samotnou louku — sečení, vysazování, péče o stromy, ploty, dřevo. Není to romantika z Instagramu. Je to ohromná fyzická a soustavná práce.' },
        { type: 'h2', text: 'Sociální sítě a AI mezi stájemi' },
        { type: 'p', text: 'A přesto — nebo právě proto — řeším taky AI a digitální nástroje. Sociální sítě, web, projekty jako Nech mě růst, Impactly, ČSOP. Často mezi vyhazováním hnoje a šálkem čaje.' },
        { type: 'p', text: 'Dlouho mi přišlo, že mám dva životy. Jeden se zaprášenými botami a druhý před monitorem. Snažím se je uzavřít do jednoho dechu — louka i klávesnice ze stejné lásky.' },
        { type: 'h2', text: 'AI nám konečně uvolňuje ruce' },
        { type: 'callout', text: 'Konečně se dostáváme do fáze, kdy nám AI může opravdu pomoct. Nemluvím o náhradě člověka. Mluvím o tom, že mi to po deseti letech vrací několik hodin denně.' },
        { type: 'p', text: 'AI mi pomáhá psát příspěvky, plánovat, udržovat web v běhu, odpovídat na zprávy, ladit detaily. Ne místo mě — vedle mě, na pozadí. A já zatím můžu jít obejít koně.' },
        { type: 'p', text: 'Tohle je pro mě skutečný smysl technologií: ne připoutat člověka k obrazovce, ale uvolnit mu ruce pro to, co opravdu žije. Aby se mohl vrátit do trávy.' },
        { type: 'quote', text: '— Tony' },
      ],
      en: [
        { type: 'p', text: 'When I wake in the morning, the first thing I do is walk the stables. More than a hundred souls — horses, sheep, goats, hens, geese, dogs, cats, cows. Each with its own name, its own temperament, its own daily need.' },
        { type: 'h2', text: 'All day: feed, water, soil' },
        { type: 'p', text: 'We live in a landscape we have inherited. Not a zoo, not a farm — a community. Some are at the end of their journey, others just beginning. Together we carry the responsibility. Water, feed, cleaning, care. Morning, noon, evening. Every day.' },
        { type: 'p', text: 'On top of that comes the meadow itself — mowing, planting, caring for trees, fences, wood. It is not Instagram romance. It is enormous, continuous physical work.' },
        { type: 'h2', text: 'Social media and AI between the stables' },
        { type: 'p', text: 'And yet — or precisely because of it — I also work with AI and digital tools. Social media, the website, projects like Nech mě růst, Impactly, ČSOP. Often between shovelling manure and a cup of tea.' },
        { type: 'p', text: 'For a long time it felt like I had two lives. One with dusty boots, one in front of a monitor. I am trying to close them into one breath — the meadow and the keyboard from the same love.' },
        { type: 'h2', text: 'AI is finally freeing our hands' },
        { type: 'callout', text: 'We are finally entering a phase where AI can truly help. I am not talking about replacing a human. I am talking about it returning to me, after ten years, several hours a day.' },
        { type: 'p', text: 'AI helps me write posts, plan, keep the site running, answer messages, fine-tune details. Not instead of me — beside me, in the background. And meanwhile I can go and check on the horses.' },
        { type: 'p', text: 'This, to me, is the real meaning of technology: not to chain a person to a screen, but to free their hands for what truly lives. So they can return to the grass.' },
        { type: 'quote', text: '— Tony' },
      ],
      ru: [
        { type: 'p', text: 'Когда я утром встаю, первое, что я делаю, — обхожу конюшни. Более ста душ: лошади, овцы, козы, куры, гуси, собаки, кошки, коровы. У каждого своё имя, свой характер, своя ежедневная нужда.' },
        { type: 'h2', text: 'Весь день: корм, вода, земля' },
        { type: 'p', text: 'Мы живём в ландшафте, который нам достался. Это не зоопарк и не ферма — это сообщество. Кто-то в конце своего пути, кто-то только начал. Вместе мы несём ответственность. Вода, корм, уборка, забота. Утро, полдень, вечер. Каждый день.' },
        { type: 'p', text: 'Ко всему этому — сам луг: косьба, посадки, уход за деревьями, заборами, дровами. Это не романтика из Instagram. Это огромная и постоянная физическая работа.' },
        { type: 'h2', text: 'Соцсети и ИИ между конюшнями' },
        { type: 'p', text: 'И всё же — или именно поэтому — я ещё занимаюсь ИИ и цифровыми инструментами. Соцсети, сайт, проекты вроде Nech mě růst, Impactly, ČSOP. Часто между уборкой навоза и чашкой чая.' },
        { type: 'p', text: 'Долго мне казалось, что у меня две жизни. Одна — в пыльных ботинках, другая — перед монитором. Я пытаюсь свести их в один вдох: луг и клавиатура из одной любви.' },
        { type: 'h2', text: 'ИИ наконец-то освобождает руки' },
        { type: 'callout', text: 'Мы наконец входим в фазу, где ИИ реально помогает. Я не говорю о замене человека. Я говорю о том, что он возвращает мне после десяти лет несколько часов в день.' },
        { type: 'p', text: 'ИИ помогает мне писать посты, планировать, поддерживать сайт, отвечать на сообщения, шлифовать детали. Не вместо меня — рядом, на фоне. А я тем временем иду проведать лошадей.' },
        { type: 'p', text: 'Для меня в этом и есть смысл технологий: не приковать человека к экрану, а освободить руки для того, что действительно живёт. Чтобы он мог вернуться в траву.' },
        { type: 'quote', text: '— Tony' },
      ],
    },
  },
];
