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

export const ROADMAP_BLOCKS: RoadmapBlock[] = [
  {
    slug: 'html-css',
    order: 1,
    title: 'HTML & CSS',
    subtitle: 'Структура сторінки, стилі, адаптивність',
    status: 'planned',
    level: 'Початківець',
    readmePath: 'blocks/01-html-css/README.md',
    topics: ['Семантичний HTML', 'Flexbox & Grid', 'Адаптивна верстка', 'Доступність'],
  },
  {
    slug: 'javascript-basics',
    order: 2,
    title: 'JavaScript основи',
    subtitle: 'Змінні, типи, функції, DOM',
    status: 'planned',
    level: 'Початківець',
    readmePath: 'blocks/02-javascript-basics/README.md',
    topics: ['Синтаксис ES6+', 'Умови та цикли', 'Функції', 'Робота з DOM'],
  },
  {
    slug: 'js-arrays',
    order: 3,
    title: 'JavaScript масиви',
    subtitle: '21 інтерактивний урок з пісочницею',
    status: 'active',
    level: 'Початківець → середній',
    readmePath: 'blocks/03-js-arrays/README.md',
    lessons: ARRAYS_LESSONS,
    startHref: '/courses/js-arrays/01-intro/',
  },
  {
    slug: 'nextjs',
    order: 4,
    title: 'Next.js',
    subtitle: 'React, маршрутизація, деплой',
    status: 'planned',
    level: 'Середній',
    readmePath: 'blocks/04-nextjs/README.md',
    topics: ['App Router', 'Server & Client Components', 'Data fetching', 'Deploy на Vercel'],
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
