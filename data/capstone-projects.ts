export interface CapstoneProject {
  id: string;
  icon: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  portfolioHighlight: string;
  difficulty: 'Junior+' | 'Middle' | 'Advanced';
}

export const CAPSTONE_PROJECTS: CapstoneProject[] = [
  {
    id: 'devsnippet-hub',
    icon: '🚀',
    title: 'DevSnippet Hub',
    category: 'Developer Tools / SaaS',
    subtitle: 'Менеджер та шеринг сніпетів коду для розробників',
    description: 'Хмарний сервіс для збереження, версіонування, організації та публічного шарингу фрагментів коду з AI-поясненнями та гнучким тегуванням.',
    features: [
      'Вбудований редактор коду (Monaco Editor або CodeMirror) із синтаксисом для 20+ мов',
      'Теги, повнотекстовий пошук та персональні колекції сніпетів',
      'Публічні сторінки з динамічними Open Graph превʼю картками (generateMetadata)',
      'GitHub OAuth авторизація та керування приватністю (public/private)'
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'Supabase / PostgreSQL'],
    portfolioHighlight: 'Демонструє інтеграцію складних веб-редакторів коду, динамічне генерування SEO-карток та надійну авторизацію.',
    difficulty: 'Middle'
  },
  {
    id: 'flowcraft-kanban',
    icon: '⚡',
    title: 'FlowCraft',
    category: 'Productivity / Real-time',
    subtitle: 'Linear/Trello-подібний Kanban та трекер задач',
    description: 'Інтерактивна система управління проектами з плавним drag-and-drop, оптимістичним оновленням інтерфейсу та real-time синхронізацією.',
    features: [
      'Перетягування карток і колонок (dnd-kit або @hello-pangea/dnd)',
      'Фільтрація за пріоритетами, мітками, дедлайнами та виконавцями',
      'Оптимістичні оновлення (Optimistic UI) для миттєвого відгуку без очікування сервера',
      'Real-time міжвкладочна/міжсесійна синхронізація через Supabase Realtime або WebSockets',
      'Повна підтримка клавіатурних шорткатів та темної теми'
    ],
    techStack: ['Next.js 15', 'Zustand', 'dnd-kit', 'Tailwind CSS', 'Supabase Realtime'],
    portfolioHighlight: 'Показує майстерність у складній взаємодії з користувачем (Drag & Drop), локальному стейті та синхронізації реального часу.',
    difficulty: 'Middle'
  },
  {
    id: 'nova-store',
    icon: '🛍️',
    title: 'Nova Store',
    category: 'E-Commerce / Performance',
    subtitle: 'Headless E-Commerce маркетплейс товарів',
    description: 'Сучасний швидкісний інтернет-магазин з багатовимірною фільтрацією, персистентним кошиком та інтеграцією онлайн-оплати.',
    features: [
      'Каталог товарів з фільтрами за ціною, категоріями та тегами через URL search params',
      'Персистентний кошик покупця (LocalStorage + збереження в БД при логіні)',
      'Інтеграція тестової оплати (Stripe Sandbox)',
      'Оптимізація Core Web Vitals (LCP < 1.5s, progressive image loading через next/image)',
      'Адмін-панель для додавання/редагування товарів та перегляду замовлень'
    ],
    techStack: ['Next.js 15 App Router', 'TypeScript', 'Stripe API', 'PostgreSQL', 'Prisma ORM'],
    portfolioHighlight: 'Ідеальний комерційний кейс: платіжні шлюзи, кешування та найвища оцінка Core Web Vitals у Google Lighthouse.',
    difficulty: 'Middle'
  },
  {
    id: 'skillforge-lms',
    icon: '📚',
    title: 'SkillForge',
    category: 'EdTech / Interactive Content',
    subtitle: 'Інтерактивна навчальна платформа / LMS',
    description: 'Платформа для проходження курсів з інтерактивними завданнями, живим виконанням коду, системою кристалів та гейміфікацією.',
    features: [
      'MDX-рендеринг уроків із вбудованими інтерактивними пісочницями коду',
      'Відстеження прогресу (Completion Rate, нарахування кристалів та бейджів)',
      'Інтерактивні квізи та тести з миттєвою валідацією відповідей',
      'Особистий кабінет студента зі статистикою активності та фінальним сертифікатом'
    ],
    techStack: ['Next.js 15', 'MDX Remote', 'Tailwind CSS', 'PostgreSQL', 'Shadcn UI'],
    portfolioHighlight: 'Демонструє вміння проектувати архітектуру для контентних та EdTech платформ з гейміфікацією.',
    difficulty: 'Junior+'
  },
  {
    id: 'apex-analytics',
    icon: '📊',
    title: 'Apex Analytics',
    category: 'FinTech / Data Visualization',
    subtitle: 'Real-time фінансовий та крипто-дашборд',
    description: 'Аналітична панель моніторингу фінансових активів з інтерактивними графіками, живими котируваннями та калькулятором портфеля.',
    features: [
      'Інтерактивні свічкові та лінійні графіки динаміки цін (Recharts / Lightweight Charts)',
      'Live WebSocket оновлення курсів з біржових API (CoinGecko / Binance)',
      'Трекер особистого портфеля (розрахунок прибутку/збитку P&L, середньої ціни входу)',
      'Експорт фінансових звітів у CSV та PDF'
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Recharts', 'WebSockets', 'Tailwind CSS'],
    portfolioHighlight: 'Показує високу компетенцію у роботі з великими масивами даних, складними графіками та стрімінговими потоками.',
    difficulty: 'Advanced'
  },
  {
    id: 'wavestream-audio',
    icon: '🎧',
    title: 'WaveStream',
    category: 'Media / Web APIs',
    subtitle: 'Музичний веб-плеєр та подкаст-хаб',
    description: 'Повнофункціональний стрімінговий веб-плеєр аудіо з візуалізацією звуку, чергою відтворення та створенням плейлистів.',
    features: [
      'Глобальний аудіоплеєр, що грає безперервно під час переходів між сторінками',
      'Аудіо-візуалізатор хвиль у реальному часі через Web Audio API',
      'Керування чергою, таймер сну та регулювання швидкості (0.75x - 2x)',
      'Створення та збереження користувацьких плейлистів'
    ],
    techStack: ['Next.js 15', 'Web Audio API', 'Zustand', 'Tailwind CSS', 'IndexedDB / Cloud'],
    portfolioHighlight: 'Демонструє вміння працювати з браузерними Web APIs (Web Audio, Canvas), фоновими процесами та глобальним стейтом.',
    difficulty: 'Middle'
  }
];

export const CAPSTONE_CRITERIA = [
  { label: 'Frontend стек', desc: 'Next.js 15 (App Router), TypeScript у Strict Mode, Tailwind CSS' },
  { label: 'Архітектура стану', desc: 'Server Components для завантаження, Zustand / TanStack Query для клієнта' },
  { label: 'База даних & Auth', desc: 'PostgreSQL (Supabase / Neon), ORM (Prisma / Drizzle), безпечна автентифікація' },
  { label: 'Тестування', desc: 'Unit / Integration тести (Vitest) + обовʼязкові E2E тести (Playwright)' },
  { label: 'CI/CD & Деплой', desc: 'GitHub Actions пайплайн (тести, лінт, typecheck) + Production Vercel деплой' },
  { label: 'Lighthouse аудит', desc: 'Оцінка 90+ за показниками Performance, Accessibility, Best Practices та SEO' }
];
