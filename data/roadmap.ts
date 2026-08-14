export type BlockStatus = 'active' | 'planned';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface LessonMeta {
  num: string;
  slug: string;
  title: string;
  methods: string;
  difficulty: Difficulty;
  crystals: number;
}

export interface RoadmapBlock {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  status: BlockStatus;
  level: string;
  readmePath: string;
  lessons?: LessonMeta[];
  courseSlug?: string;
  startHref?: string;
  topics?: string[];
}

export const ARRAYS_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-intro', title: 'Що таке масив?', methods: '[] · .length', difficulty: 'easy', crystals: 80 },
  { num: '02', slug: '02-create-access', title: 'Створення та доступ', methods: 'arr[i] · at()', difficulty: 'easy', crystals: 80 },
  { num: '03', slug: '03-push-pop', title: 'Кінець масиву', methods: 'push() · pop()', difficulty: 'easy', crystals: 80 },
  { num: '04', slug: '04-shift-unshift', title: 'Початок масиву', methods: 'shift() · unshift()', difficulty: 'easy', crystals: 80 },
  { num: '05', slug: '05-splice', title: 'Видалення та вставка', methods: 'splice() · toSpliced()', difficulty: 'easy', crystals: 80 },
  { num: '06', slug: '06-slice', title: 'Копіювання частини', methods: 'slice()', difficulty: 'easy', crystals: 80 },
  { num: '07', slug: '07-concat', title: 'Обʼєднання масивів', methods: 'concat() · spread', difficulty: 'medium', crystals: 80 },
  { num: '08', slug: '08-indexOf-includes', title: 'Пошук значення', methods: 'indexOf() · includes()', difficulty: 'medium', crystals: 80 },
  { num: '09', slug: '09-find-findIndex', title: 'Пошук за умовою', methods: 'find() · findIndex()', difficulty: 'medium', crystals: 80 },
  { num: '10', slug: '10-filter', title: 'Фільтрація', methods: 'filter()', difficulty: 'medium', crystals: 80 },
  { num: '11', slug: '11-map', title: 'Трансформація', methods: 'map()', difficulty: 'medium', crystals: 80 },
  { num: '12', slug: '12-reduce', title: 'Агрегація', methods: 'reduce()', difficulty: 'medium', crystals: 80 },
  { num: '13', slug: '13-forEach', title: 'Перебір', methods: 'forEach()', difficulty: 'medium', crystals: 80 },
  { num: '14', slug: '14-sort', title: 'Сортування', methods: 'sort() · toSorted()', difficulty: 'medium', crystals: 80 },
  { num: '15', slug: '15-reverse', title: 'Розворот', methods: 'reverse() · toReversed()', difficulty: 'medium', crystals: 80 },
  { num: '16', slug: '16-flat-flatMap', title: 'Розгортання вкладених', methods: 'flat() · flatMap()', difficulty: 'hard', crystals: 80 },
  { num: '17', slug: '17-every-some', title: 'Перевірка умов', methods: 'every() · some()', difficulty: 'hard', crystals: 80 },
  { num: '18', slug: '18-fill', title: 'Заповнення та генерація', methods: 'fill() · Array.from() · isArray', difficulty: 'hard', crystals: 80 },
  { num: '19', slug: '19-join-split', title: 'Масив ⇄ рядок', methods: 'join() · split()', difficulty: 'hard', crystals: 80 },
  { num: '20', slug: '20-spread-destructuring', title: 'Spread та деструктуризація', methods: '... · [a, b] · with()', difficulty: 'hard', crystals: 80 },
  { num: '21', slug: '21-review-project', title: 'Підсумковий проект', methods: 'усі методи разом', difficulty: 'hard', crystals: 80 },
];
export const INTERNET_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-what-happens', title: 'Що відбувається коли вводиш URL', methods: 'DNS · TCP · HTTP · Render', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-dns', title: 'DNS: домен → IP-адреса', methods: 'A · AAAA · CNAME · TTL', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-tcp-ip', title: 'TCP/IP та модель OSI', methods: 'SYN · ACK · порти · пакети', difficulty: 'medium', crystals: 0 },
  { num: '04', slug: '04-http', title: 'HTTP/HTTPS: запит і відповідь', methods: 'GET · POST · статус-коди', difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-tls', title: 'TLS/SSL: шифрування', methods: 'сертифікати · handshake', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-rendering', title: 'Rendering pipeline браузера', methods: 'DOM · CSSOM · Layout · Paint', difficulty: 'hard', crystals: 0 },
  { num: '07', slug: '07-caching', title: 'CDN, кешування та оптимізація', methods: 'Cache-Control · ETag · CDN', difficulty: 'hard', crystals: 0 },
  { num: '08', slug: '08-realtime', title: 'Real-time комунікація', methods: 'WebSocket · SSE · HTTP/2', difficulty: 'hard', crystals: 0 },
];

export const HTML_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-structure', title: 'Структура HTML-документа', methods: '<!DOCTYPE> · <html> · <head> · <body>', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-semantic', title: 'Семантичні теги', methods: 'header · main · article · section · nav', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-text', title: 'Текстові елементи', methods: 'h1–h6 · p · ul · ol · strong · em', difficulty: 'easy', crystals: 0 },
  { num: '04', slug: '04-links-images', title: 'Посилання та зображення', methods: '<a> · <img> · srcset · loading', difficulty: 'easy', crystals: 0 },
  { num: '05', slug: '05-forms', title: 'Форми та інпути', methods: 'form · input · label · select · textarea', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-validation', title: 'Валідація форм', methods: 'required · pattern · type · novalidate', difficulty: 'medium', crystals: 0 },
  { num: '07', slug: '07-accessibility', title: 'Доступність (a11y) та ARIA', methods: 'role · aria-label · tabindex · alt', difficulty: 'medium', crystals: 0 },
  { num: '08', slug: '08-seo-meta', title: 'SEO та мета-теги', methods: 'title · meta · og: · canonical', difficulty: 'hard', crystals: 0 },
];

export const CSS_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-selectors', title: 'Селектори та специфічність', methods: 'class · id · attr · pseudo · :is()', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-box-model', title: 'Box model та позиціювання', methods: 'margin · padding · border · position', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-flexbox', title: 'Flexbox', methods: 'flex · justify-content · align-items · gap', difficulty: 'medium', crystals: 0 },
  { num: '04', slug: '04-grid', title: 'CSS Grid', methods: 'grid-template · fr · auto-fill · subgrid', difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-responsive', title: 'Адаптивна верстка', methods: 'media queries · clamp() · container queries', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-variables', title: 'Кастомні властивості', methods: '--var · var() · @property · fallback', difficulty: 'medium', crystals: 0 },
  { num: '07', slug: '07-animations', title: 'Анімації та transitions', methods: 'transition · @keyframes · animation · will-change', difficulty: 'hard', crystals: 0 },
  { num: '08', slug: '08-modern', title: 'Сучасний CSS', methods: ':has() · @layer · @scope · nesting', difficulty: 'hard', crystals: 0 },
];

export const NEXTJS_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-what-is-nextjs', title: 'Що таке Next.js і навіщо він', methods: 'CSR · SSR · SSG · ISR', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-app-router', title: 'App Router: файлова маршрутизація', methods: 'page · layout · loading · error', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-server-client', title: 'Server та Client Components', methods: '"use client" · RSC · hydration', difficulty: 'medium', crystals: 0 },
  { num: '04', slug: '04-data-fetching', title: 'Data Fetching', methods: 'fetch · cache · revalidate · Suspense', difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-routing', title: 'Динамічні маршрути та навігація', methods: '[slug] · Link · useRouter · params', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-api-routes', title: 'Route Handlers (API)', methods: 'GET · POST · NextRequest · NextResponse', difficulty: 'hard', crystals: 0 },
  { num: '07', slug: '07-metadata-seo', title: 'Metadata та SEO', methods: 'generateMetadata · opengraph · robots', difficulty: 'hard', crystals: 0 },
  { num: '08', slug: '08-deploy', title: 'Deploy: Vercel та GitHub Pages', methods: 'output:export · basePath · CI/CD', difficulty: 'hard', crystals: 0 },
];

export const ROADMAP_BLOCKS: RoadmapBlock[] = [
  {
    slug: 'how-internet-works',
    order: 0,
    title: 'Як працює інтернет',
    subtitle: 'Від URL у браузері до протоколів, рендерингу та безпеки',
    status: 'active',
    level: 'Початківець',
    readmePath: 'blocks/00-how-internet-works/README.md',
    courseSlug: 'how-internet-works',
    lessons: INTERNET_LESSONS,
    startHref: '/courses/how-internet-works/01-what-happens/',
    topics: [
      'Що відбувається коли вводиш URL у браузер — повний шлях від натискання Enter до рендеру сторінки',
      'DNS: як доменне ім\'я перетворюється на IP-адресу (резолвер → root → TLD → authoritative)',
      'TCP/IP: трьохстороннє рукостискання, порти, пакети та модель OSI',
      'HTTP/HTTPS: методи запитів, статус-коди, заголовки, cookies та кеш',
      'TLS/SSL: симетричне vs асиметричне шифрування, сертифікати, handshake',
      'Браузер: парсинг HTML → CSSOM → DOM → render tree → layout → paint → composite',
      'CDN, кешування (browser cache, service worker, CDN edge) та оптимізація завантаження',
      'WebSocket, SSE та HTTP/2 push: real-time комунікація у веб-додатках',
    ],
  },
  {
    slug: 'html',
    order: 1,
    title: 'HTML',
    subtitle: 'Семантична розмітка, доступність, форми — 8 уроків',
    status: 'active',
    level: 'Початківець',
    readmePath: 'blocks/01-html/README.md',
    courseSlug: 'html',
    lessons: HTML_LESSONS,
    startHref: '/courses/html/01-structure/',
  },
  {
    slug: 'css',
    order: 2,
    title: 'CSS',
    subtitle: 'Стилі, лейаут, адаптивність, анімації — 8 уроків',
    status: 'active',
    level: 'Початківець',
    readmePath: 'blocks/02-css/README.md',
    courseSlug: 'css',
    lessons: CSS_LESSONS,
    startHref: '/courses/css/01-selectors/',
  },
  {
    slug: 'javascript-basics',
    order: 3,
    title: 'JavaScript',
    subtitle: 'Основи мови, DOM, масиви — 21 інтерактивний урок',
    status: 'active',
    level: 'Початківець → середній',
    readmePath: 'blocks/03-javascript/README.md',
    courseSlug: 'js-arrays',
    lessons: ARRAYS_LESSONS,
    startHref: '/courses/js-arrays/01-intro/',
    topics: ['Синтаксис ES6+', 'Умови та цикли', 'Функції', 'Робота з DOM', 'Масиви — 21 урок з пісочницею'],
  },
  {
    slug: 'nextjs',
    order: 4,
    title: 'Next.js',
    subtitle: 'React, App Router, Server Components, deploy — 8 уроків',
    status: 'active',
    level: 'Середній',
    readmePath: 'blocks/04-nextjs/README.md',
    courseSlug: 'nextjs',
    lessons: NEXTJS_LESSONS,
    startHref: '/courses/nextjs/01-what-is-nextjs/',
  },
  {
    slug: 'capstone',
    order: 5,
    title: 'Фінальний проект',
    subtitle: 'Повноцінний додаток з усіма блоками',
    status: 'planned',
    level: 'Середній → просунутий',
    readmePath: 'blocks/05-capstone/README.md',
    topics: ['Архітектура', 'API інтеграція', 'Тестування', 'Production deploy'],
  },
];

export function getBlock(slug: string): RoadmapBlock | undefined {
  return ROADMAP_BLOCKS.find((b) => b.slug === slug);
}

export function lessonPath(slug: string, basePath = ''): string {
  return `${basePath}/courses/js-arrays/${slug}/`;
}

export function staticCoursePath(basePath = ''): string {
  return `${basePath}/courses/js-arrays/`;
}
