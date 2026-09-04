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
  children?: RoadmapBlock[];
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

export const WEB_SECURITY_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-browser-security-model', title: 'Модель безпеки браузера', methods: 'SOP · CORS · CSP · Permissions API', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-permission-apis', title: 'APIs дозволів: Web Locks, Web Share, Clipboard', methods: 'DoS · Pastejacking · Соціальна інженерія', difficulty: 'medium', crystals: 0 },
  { num: '03', slug: '03-device-apis', title: 'Device APIs: Vibration, Wake Lock, EyeDropper, PiP', methods: 'Fingerprinting · UI Spoofing · Pixel Stealing', difficulty: 'hard', crystals: 0 },
  { num: '04', slug: '04-css-sidechannels', title: 'CSS та Side-channel атаки', methods: 'env() · lazy · scroll · CSS-only tracking', difficulty: 'hard', crystals: 0 },
];

export const JS_BASICS_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-variables',  title: 'Змінні та типи даних',         methods: 'let · const · typeof · template literals', difficulty: 'easy',   crystals: 0 },
  { num: '02', slug: '02-operators',  title: 'Оператори та вирази',          methods: '=== · ?? · ?. · && · ||',                  difficulty: 'easy',   crystals: 0 },
  { num: '03', slug: '03-conditions', title: 'Умовні оператори',             methods: 'if/else · тернарний · switch',              difficulty: 'easy',   crystals: 0 },
  { num: '04', slug: '04-loops',      title: 'Цикли',                        methods: 'for · while · for...of · for...in',          difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-functions',  title: 'Функції',                      methods: 'function · arrow => · closure · rest',       difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-objects',    title: "Об'єкти",                     methods: 'деструктуризація · spread · Object.entries',  difficulty: 'medium', crystals: 0 },
  { num: '07', slug: '07-dom',        title: 'DOM та події',                 methods: 'querySelector · classList · addEventListener', difficulty: 'medium', crystals: 0 },
  { num: '08', slug: '08-async',      title: 'Async/Await та Fetch',         methods: 'async/await · fetch · Promise · try/catch',  difficulty: 'hard',   crystals: 0 },
];

export const GIT_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-git-basics', title: 'Вступ до Git та життєвий цикл', methods: 'init · add · commit · status · log', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-branching', title: 'Гілкування та стратегії', methods: 'branch · checkout · switch · merge', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-conflicts', title: 'Вирішення конфліктів', methods: 'merge conflict · diff · 3-way merge', difficulty: 'medium', crystals: 0 },
  { num: '04', slug: '04-rebase-stash', title: 'Rebase, Stash та Cherry-pick', methods: 'rebase · stash · cherry-pick · reset', difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-github-workflow', title: 'GitHub: Remotes, PR & Code Review', methods: 'remote · push · pull · PR · fork', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-git-tools', title: 'Git Hooks, Husky та Commitlint', methods: 'pre-commit · commitlint · husky', difficulty: 'medium', crystals: 0 },
  { num: '07', slug: '07-ci-cd-actions', title: 'GitHub Actions: CI/CD автоматизація', methods: '.github/workflows · jobs · steps', difficulty: 'hard', crystals: 0 },
  { num: '08', slug: '08-advanced-git', title: 'Advanced: Reflog, Bisect та Submodules', methods: 'reflog · bisect · submodule · clean', difficulty: 'hard', crystals: 0 },
];

export const TYPESCRIPT_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-intro-types', title: 'Основи типізації та примітиви', methods: 'string · number · boolean · any · unknown', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-interfaces-types', title: 'Interfaces vs Type Aliases', methods: 'interface · type · union | · intersection &', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-functions', title: 'Типізація функцій та звуження типів', methods: 'type narrowing · typeof · instanceof · is', difficulty: 'medium', crystals: 0 },
  { num: '04', slug: '04-generics', title: 'Дженерики (Generics)', methods: '<T> · extends · keyof · default generic', difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-utility-types', title: 'Utility Types', methods: 'Partial · Pick · Omit · Record · ReturnType', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-dom-events', title: 'TypeScript з DOM та Web APIs', methods: 'HTMLElement · HTMLInputElement · Event', difficulty: 'medium', crystals: 0 },
  { num: '07', slug: '07-react-typescript', title: 'TypeScript у React', methods: 'FC · PropsWithChildren · SyntheticEvent · Hooks', difficulty: 'hard', crystals: 0 },
  { num: '08', slug: '08-advanced-ts', title: 'Strict Config, Mapped & Conditional Types', methods: 'infer · template literals · tsconfig strict', difficulty: 'hard', crystals: 0 },
];

export const WEB_PERFORMANCE_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-core-web-vitals', title: 'Core Web Vitals: LCP, INP, CLS', methods: 'LCP · INP · CLS · TTFB · FCP', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-devtools-profiling', title: 'Профілювання та аудит швидкодії', methods: 'Performance Panel · Lighthouse · DevTools', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-media-optimization', title: 'Оптимізація зображень та шрифтів', methods: 'AVIF/WebP · srcset · font-display · SVG', difficulty: 'medium', crystals: 0 },
  { num: '04', slug: '04-bundle-splitting', title: 'Code Splitting та оптимізація бандлу', methods: 'Dynamic Import · Tree Shaking · Analyzer', difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-rendering-optimization', title: 'Оптимізація рендерингу (CRP)', methods: 'Layout Thrashing · will-change · subgrid', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-react-performance', title: 'Швидкодія React додатків', methods: 'memo · useMemo · useCallback · Virtualization', difficulty: 'medium', crystals: 0 },
  { num: '07', slug: '07-caching-service-worker', title: 'Кешування та Service Workers', methods: 'Cache-Control · ETag · SWR · PWA Cache', difficulty: 'hard', crystals: 0 },
  { num: '08', slug: '08-production-monitoring', title: 'Моніторинг Real User Metrics (RUM)', methods: 'PerformanceObserver · Beacon API · Sentry', difficulty: 'hard', crystals: 0 },
];

export const TESTING_LESSONS: LessonMeta[] = [
  { num: '01', slug: '01-testing-pyramid', title: 'Філософія та піраміда тестування', methods: 'Unit · Integration · E2E · AAA Pattern', difficulty: 'easy', crystals: 0 },
  { num: '02', slug: '02-unit-vitest', title: 'Unit-тести з Vitest / Jest', methods: 'describe · it · expect · toBe · toEqual', difficulty: 'easy', crystals: 0 },
  { num: '03', slug: '03-mocking-spies', title: 'Моки, шпигуни та таймери', methods: 'vi.fn() · vi.spyOn() · vi.mock() · timers', difficulty: 'medium', crystals: 0 },
  { num: '04', slug: '04-react-testing-library', title: 'React Testing Library: основи', methods: 'render · screen · getByRole · userEvent', difficulty: 'medium', crystals: 0 },
  { num: '05', slug: '05-msw-api-mocking', title: 'Мокування API з MSW', methods: 'http.get() · http.post() · HttpResponse', difficulty: 'medium', crystals: 0 },
  { num: '06', slug: '06-testing-hooks-context', title: 'Тестування кастомних хуків', methods: 'renderHook · act · Provider wrapper', difficulty: 'medium', crystals: 0 },
  { num: '07', slug: '07-e2e-playwright', title: 'End-to-End тестування з Playwright', methods: 'page.goto() · locator · expect(page)', difficulty: 'hard', crystals: 0 },
  { num: '08', slug: '08-a11y-ci', title: 'A11y тести та автоматизація в CI', methods: 'axe-core · Vitest in CI · GitHub Actions', difficulty: 'hard', crystals: 0 },
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
    readmePath: 'blocks/01-html-css/README.md',
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
    readmePath: 'blocks/01-html-css/README.md',
    courseSlug: 'css',
    lessons: CSS_LESSONS,
    startHref: '/courses/css/01-selectors/',
  },
  {
    slug: 'git-workflow',
    order: 3,
    title: 'Git & Командна розробка',
    subtitle: 'Контроль версій, гілкування, Pull Requests, вирішення конфліктів та CI/CD — 8 уроків',
    status: 'active',
    level: 'Початківець → середній',
    readmePath: 'blocks/02-git/README.md',
    courseSlug: 'git',
    lessons: GIT_LESSONS,
    startHref: '/courses/git/01-git-basics/',
    topics: [
      'Основи Git: життєвий цикл файлів, комміти, хеші, staging area (git status, diff, log)',
      'Стратегії гілкування: Feature Branching, Git Flow та Trunk-Based Development',
      'Злиття гілок: Merge vs Rebase, fast-forward та аналіз історії коммітів',
      'Вирішення конфліктів злиття (merge conflicts) та робота з git stash, cherry-pick',
      'Командна робота на GitHub: Fork, Pull Requests, Code Review, захищені гілки',
      'Автоматизація якості коду: Git Hooks, Husky, lint-staged та Conventional Commits',
      'GitHub Actions: налаштування CI/CD пайплайнів, автоматичний лінтинг і тести',
    ],
  },
  {
    slug: 'javascript-basics',
    order: 4,
    title: 'JavaScript основи',
    subtitle: 'Змінні, функції, DOM, async/await — 8 уроків',
    status: 'active',
    level: 'Початківець',
    readmePath: 'blocks/02-javascript-basics/README.md',
    courseSlug: 'js-basics',
    lessons: JS_BASICS_LESSONS,
    startHref: '/courses/js-basics/01-variables/',
    topics: ['Змінні та типи даних (let, const, typeof)', 'Оператори: ===, ??, ?., &&, ||', 'Умовні оператори та switch', 'Цикли: for, while, for...of', 'Функції, arrow functions та замикання', "Об'єкти, деструктуризація та spread", 'DOM: querySelector, classList, addEventListener', 'Async/Await, Fetch API та Promise'],
    children: [
      {
        slug: 'js-arrays',
        order: 5,
        title: 'JavaScript — Масиви',
        subtitle: 'Всі 21 метод масивів з інтерактивними пісочницями',
        status: 'active',
        level: 'Початківець → середній',
        readmePath: 'blocks/03-js-arrays/README.md',
        courseSlug: 'js-arrays',
        lessons: ARRAYS_LESSONS,
        startHref: '/courses/js-arrays/01-intro/',
        topics: ['push · pop · shift · unshift', 'map · filter · reduce · forEach', 'find · findIndex · includes', 'sort · reverse · flat · flatMap', 'spread · деструктуризація · every · some'],
      }
    ]
  },
  {
    slug: 'typescript',
    order: 6,
    title: 'TypeScript',
    subtitle: 'Статична типізація, інтерфейси, generics, utility types та типізація React — 8 уроків',
    status: 'active',
    level: 'Середній',
    readmePath: 'blocks/05-typescript/README.md',
    courseSlug: 'typescript',
    lessons: TYPESCRIPT_LESSONS,
    startHref: '/courses/typescript/01-intro-types/',
    topics: [
      'Основи типізації: примітиви, type inference, any vs unknown vs never, union & intersection types',
      'Інтерфейси (Interfaces) vs Type Aliases: розширення, merging, readonly та optional поля',
      'Дженерики (Generics): типізація універсальних функцій, інтерфейсів та generic constraints',
      'Utility Types: Partial, Required, Readonly, Record, Pick, Omit, ReturnType, Parameters',
      'Типізація функцій, callback-ів, Promise/async та написання кастомних Type Guards (is)',
      'TypeScript з DOM API, обробниками подій (SyntheticEvent) та типізація бібліотек (@types)',
      'TypeScript у React: типізація Props, State, кастомних хуків та Context API',
      'Конфігурація tsconfig.json, Strict Mode та архітектура великих типізованих проектів',
    ],
  },
  {
    slug: 'nextjs',
    order: 7,
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
    slug: 'web-security',
    order: 8,
    title: 'Безпека браузера',
    subtitle: 'Приховані вразливості сучасних API: fingerprinting, DoS, UI spoofing, CSS-only attacks — 4 уроки',
    status: 'active',
    level: 'Середній → просунутий',
    readmePath: 'blocks/06-web-security/README.md',
    courseSlug: 'web-security',
    lessons: WEB_SECURITY_LESSONS,
    startHref: '/courses/web-security/01-browser-security-model/',
    topics: [
      'Модель безпеки браузера: SOP, CORS, CSP та Permissions API',
      'Web Locks API: клієнтський DoS та Cross-Origin Tracking',
      'Web Share API: розповсюдження шкідливих файлів через Clickjacking',
      'Clipboard API: Pastejacking — підміна скопійованого тексту',
      'Vibration API: апаратний fingerprinting і Scareware',
      'Screen Wake Lock: фізична безпека та ресурсний DoS',
      'EyeDropper API: Cross-Origin Pixel Stealing',
      'Picture-in-Picture: UI Spoofing і фішинг без адресного рядка',
      'CSS env() для JS-free fingerprinting та Viewport Segments',
      'Lazy Loading + CSS :visited: History Sniffing без JavaScript',
      'Smooth Scroll Timing Attacks та Scroll-jacking',
    ],
  },
  {
    slug: 'web-performance',
    order: 9,
    title: 'Web Performance & Оптимізація',
    subtitle: 'Core Web Vitals (LCP, CLS, INP), аналіз бандлу, ледаче завантаження та кешування — 8 уроків',
    status: 'active',
    level: 'Середній → просунутий',
    readmePath: 'blocks/07-web-performance/README.md',
    courseSlug: 'web-performance',
    lessons: WEB_PERFORMANCE_LESSONS,
    startHref: '/courses/web-performance/01-core-web-vitals/',
    topics: [
      'Core Web Vitals: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift)',
      'Профілювання швидкодії: Chrome DevTools Performance Panel, Lighthouse та вимірювання в production',
      'Оптимізація медіа та ресурсів: сучасні формати (AVIF/WebP), responsive images, font-display, SVG',
      'Code Splitting, Dynamic Imports, Tree Shaking та оптимізація розміру JS/CSS бандлу',
      'Оптимізація рендерингу в React: memo, useMemo, useCallback, віртуалізація довгих списків',
      'Критичний шлях рендерингу (CRP), preload, prefetch, dns-prefetch та resource hints',
      'Кешування на клієнті та CDN: Cache-Control, ETag, Stale-While-Revalidate, Service Workers',
    ],
  },
  {
    slug: 'frontend-testing',
    order: 10,
    title: 'Тестування Frontend',
    subtitle: 'Unit, інтеграційні та E2E тести: Vitest, React Testing Library, Playwright — 8 уроків',
    status: 'active',
    level: 'Середній → просунутий',
    readmePath: 'blocks/08-testing/README.md',
    courseSlug: 'testing',
    lessons: TESTING_LESSONS,
    startHref: '/courses/testing/01-testing-pyramid/',
    topics: [
      'Піраміда тестування: Unit vs Integration vs E2E — як правильно балансувати та обирати інструменти',
      'Unit-тестування логіки та утиліт: Vitest / Jest, матчери, spy та mock функції',
      'React Testing Library: філософія тестування UI очима користувача (user-event, accessibility queries)',
      'Мокування мережевих запитів та API: MSW (Mock Service Worker)',
      'Тестування асинхронного коду, кастомних хуків (renderHook) та Context API',
      'End-to-End (E2E) тестування реальних користувацьких сценаріїв з Playwright',
      'Автоматизоване тестування доступності (Accessibility / a11y testing з axe-core)',
      'Visual Regression Testing та інтеграція тестів у CI/CD пайплайн',
    ],
  },
  {
    slug: 'capstone',
    order: 11,
    title: 'Фінальний проект',
    subtitle: 'Повноцінний додаток з усіма блоками',
    status: 'planned',
    level: 'Середній → просунутий',
    readmePath: 'blocks/07-capstone/README.md',
    topics: ['Архітектура', 'API інтеграція', 'Тестування', 'Production deploy'],
  },
];

export function getBlock(slug: string): RoadmapBlock | undefined {
  for (const block of ROADMAP_BLOCKS) {
    if (block.slug === slug) return block;
    if (block.children) {
      const found = block.children.find((b) => b.slug === slug);
      if (found) return found;
    }
  }
  return undefined;
}

export function lessonPath(slug: string, basePath = ''): string {
  return `${basePath}/courses/js-arrays/${slug}/`;
}

export function staticCoursePath(basePath = ''): string {
  return `${basePath}/courses/js-arrays/`;
}
