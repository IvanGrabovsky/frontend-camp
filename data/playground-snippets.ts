export interface PlaygroundSnippet {
  id: string;
  title: string;
  category: 'Масиви' | 'Основи JS' | 'Обʼєкти' | 'Асинхронність';
  methods: string;
  code: string;
}

export const PLAYGROUND_DEFAULT_CODE = `// 🧪 Vanilla JavaScript Пісочниця
// Пишіть будь-який JS код нижче та натискайте "Запустити" (або Ctrl+Enter)

const students = [
  { name: 'Олена', score: 95, active: true },
  { name: 'Андрій', score: 82, active: false },
  { name: 'Марія', score: 89, active: true },
  { name: 'Тарас', score: 74, active: true },
];

console.log('📋 Список студентів:', students);

// Фільтруємо відмінників
const honors = students
  .filter(s => s.active && s.score >= 85)
  .map(s => \`\${s.name} (\${s.score} балів)\`);

console.log('🏆 Відмінники курсу:', honors);

// Рахуємо середній бал
const avgScore = students.reduce((sum, s) => sum + s.score, 0) / students.length;
console.log('📊 Середній бал групи:', avgScore.toFixed(1));
`;

export const PLAYGROUND_SNIPPETS: PlaygroundSnippet[] = [
  {
    id: 'intro',
    category: 'Масиви',
    title: 'Що таке масив?',
    methods: '[] · .length · at()',
    code: `const products = ['молоко', 'хліб', 'яйця', 'сир'];

console.log('Всі товари:', products);
console.log('Перший товар:', products[0]);
console.log('Останній товар:', products.at(-1));
console.log('Кількість товарів:', products.length);`
  },
  {
    id: 'push-pop',
    category: 'Масиви',
    title: 'push / pop / shift / unshift',
    methods: 'push · pop · shift · unshift',
    code: `const queue = ['Аліна'];
queue.push('Богдан', 'Віктор');
console.log('Черга після push:', queue);

const last = queue.pop();
console.log('Вийшов останній (pop):', last);

queue.unshift('VIP Гість');
console.log('Додали на початок (unshift):', queue);

const first = queue.shift();
console.log('Обслуговано першого (shift):', first);
console.log('Залишилися в черзі:', queue);`
  },
  {
    id: 'map',
    category: 'Масиви',
    title: 'Метод map()',
    methods: 'map · трансформація',
    code: `const pricesUAH = [100, 250, 500, 1200];
const rate = 41.5;

const pricesUSD = pricesUAH.map(price => (price / rate).toFixed(2));
console.log('Ціни в грн:', pricesUAH);
console.log('Ціни в USD:', pricesUSD);

const items = ['яблуко', 'груша', 'слива'];
const upperItems = items.map((item, index) => \`\${index + 1}. \${item.toUpperCase()}\`);
console.log('Список:', upperItems);`
  },
  {
    id: 'filter',
    category: 'Масиви',
    title: 'Метод filter()',
    methods: 'filter · фільтрація',
    code: `const numbers = [12, 5, 8, 130, 44, 3, 9, 21];

const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Парні числа:', evenNumbers);

const bigNumbers = numbers.filter(n => n >= 10);
console.log('Числа >= 10:', bigNumbers);`
  },
  {
    id: 'find',
    category: 'Масиви',
    title: 'find() та findIndex()',
    methods: 'find · findIndex · includes',
    code: `const users = [
  { id: 101, name: 'Іван', role: 'admin' },
  { id: 102, name: 'Катерина', role: 'editor' },
  { id: 103, name: 'Петро', role: 'viewer' }
];

const admin = users.find(u => u.role === 'admin');
console.log('Знайдений адмін:', admin);

const editorIndex = users.findIndex(u => u.name === 'Катерина');
console.log('Індекс Катерини:', editorIndex);`
  },
  {
    id: 'reduce',
    category: 'Масиви',
    title: 'Метод reduce()',
    methods: 'reduce · акумуляція',
    code: `const cart = [
  { name: 'Ноутбук', price: 28000, count: 1 },
  { name: 'Мишка', price: 900, count: 2 },
  { name: 'Килимок', price: 400, count: 1 }
];

const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
console.log('Загальна сума кошика:', total, 'грн');

// Групування слів за довжиною
const words = ['яблуко', 'кіт', 'сонце', 'пес', 'ліс', 'хмара'];
const grouped = words.reduce((acc, word) => {
  const len = word.length;
  acc[len] = acc[len] || [];
  acc[len].push(word);
  return acc;
}, {});

console.log('Згруповано за довжиною:', grouped);`
  },
  {
    id: 'sort',
    category: 'Масиви',
    title: 'Метод sort() та toSorted()',
    methods: 'sort · toSorted · reverse',
    code: `const scores = [40, 100, 1, 5, 25, 10];

// Сортування чисел за зростанням
const ascending = [...scores].sort((a, b) => a - b);
console.log('За зростанням:', ascending);

// Сортування за спаданням
const descending = [...scores].sort((a, b) => b - a);
console.log('За спаданням:', descending);

const names = ['Оксана', 'Богдан', 'Анна', 'Ярослав', 'Ігор'];
names.sort((a, b) => a.localeCompare(b, 'uk'));
console.log('Імена за алфавітом (UA):', names);`
  },
  {
    id: 'objects',
    category: 'Обʼєкти',
    title: 'Деструктуризація та Spread',
    methods: 'Object.entries · spread ...',
    code: `const user = {
  name: 'Олексій',
  age: 28,
  skills: ['JavaScript', 'HTML', 'CSS'],
  city: 'Київ'
};

const { name, skills, ...rest } = user;
console.log('Імʼя:', name);
console.log('Навички:', skills);
console.log('Решта властивостей:', rest);

const updatedUser = { ...user, age: 29, role: 'Fullstack Dev' };
console.log('Оновлений користувач:', updatedUser);
console.log('Ключі та значення:', Object.entries(user));`
  },
  {
    id: 'async',
    category: 'Асинхронність',
    title: 'Async / Await та Promise',
    methods: 'async/await · Promise · setTimeout',
    code: `function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTasks() {
  console.log('⏳ Початок асинхронної задачі...');
  
  await wait(500);
  console.log('⚡ Крок 1: Дані завантажено');
  
  await wait(500);
  console.log('✨ Крок 2: Обробка завершена!');
  
  return { status: 'success', timestamp: new Date().toLocaleTimeString() };
}

runTasks().then(res => console.log('Результат:', res));`
  },
  {
    id: 'functions',
    category: 'Основи JS',
    title: 'Стрілкові функції та Closures',
    methods: 'closures · arrow functions',
    code: `// Створення замикання (Closure)
function createCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}

const counter = createCounter(10);
console.log('+1:', counter.increment());
console.log('+1:', counter.increment());
console.log('-1:', counter.decrement());
console.log('Поточне значення:', counter.get());`
  }
];
