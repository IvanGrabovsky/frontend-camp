/* Приклади коду з усіх 21 уроків — для сторінки playground */
window.PLAYGROUND_EXAMPLES = [
  {
    id: '01',
    title: 'Що таке масив?',
    methods: '[] · .length',
    lessonUrl: '../01-intro/index.html',
    code: `const products = ['молоко', 'хліб', 'яйця'];
console.log(products);
console.log('Перший:', products[0]);
console.log('Всього товарів:', products.length);`,
  },
  {
    id: '02',
    title: 'Створення та доступ',
    methods: 'arr[i]',
    lessonUrl: '../02-create-access/index.html',
    code: `const group = ['Аня', 'Борис', 'Вася', 'Галя', 'Діма'];
console.log('Перший студент:', group[0]);
console.log('Останній студент:', group[group.length - 1]);

group[2] = 'Валентин';
console.log('Оновлений список:', group);`,
  },
  {
    id: '03',
    title: 'push / pop',
    methods: 'push() · pop()',
    lessonUrl: '../03-push-pop/index.html',
    code: `const queue = ['Аліна'];
queue.push('Богдан');
queue.push('Віктор', 'Галина');
console.log('Черга:', queue);
console.log('Довжина черги:', queue.length);

const last = queue.pop();
console.log('Пішов останній:', last);
console.log('Черга тепер:', queue);`,
  },
  {
    id: '04',
    title: 'shift / unshift',
    methods: 'shift() · unshift()',
    lessonUrl: '../04-shift-unshift/index.html',
    code: `const queue = [];
queue.push('Аліна');
queue.push('Богдан');
queue.push('Віктор');
console.log('Черга:', queue);

const served = queue.shift();
console.log('Обслужили:', served);
console.log('Залишились:', queue);

queue.unshift('Директор');
console.log('Після VIP:', queue);`,
  },
  {
    id: '05',
    title: 'splice',
    methods: 'splice()',
    lessonUrl: '../05-splice/index.html',
    code: `const students = ['Аня', 'Борис', 'Вася', 'Галя', 'Діма', 'Женя'];

students.splice(2, 1);
console.log('Після видалення:', students);

students.splice(2, 0, 'Новенький');
console.log('Після вставки:', students);

students.splice(0, 1, 'Аліна');
console.log('Після заміни:', students);`,
  },
  {
    id: '06',
    title: 'slice',
    methods: 'slice()',
    lessonUrl: '../06-slice/index.html',
    code: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('З 3-го по 7-й:', nums.slice(2, 7));
console.log('Останні 3:', nums.slice(-3));

const copy = nums.slice();
copy[0] = 999;
console.log('Копія:', copy);
console.log('Оригінал не змінився:', nums);`,
  },
  {
    id: '07',
    title: 'concat',
    methods: 'concat() · spread',
    lessonUrl: '../07-concat/index.html',
    code: `const week1 = ['пн', 'вт'];
const week2 = ['ср', 'чт'];
const week3 = ['пт'];

const all = week1.concat(week2, week3);
console.log('concat:', all);

const spread = [...week1, ...week2, ...week3, 'сб', 'нд'];
console.log('spread:', spread);

console.log('Оригінал week1 не змінився:', week1);`,
  },
  {
    id: '08',
    title: 'indexOf / includes',
    methods: 'indexOf() · includes()',
    lessonUrl: '../08-indexOf-includes/index.html',
    code: `const cart = ['молоко', 'хліб', 'сир', 'хліб'];

console.log('Чи є сир?', cart.includes('сир'));
console.log('Перший хліб на індексі:', cart.indexOf('хліб'));
console.log('Останній хліб на індексі:', cart.lastIndexOf('хліб'));

function isInStock(arr, item) {
  return arr.includes(item);
}
console.log('Кава в наявності?', isInStock(cart, 'кава'));`,
  },
  {
    id: '09',
    title: 'find / findIndex',
    methods: 'find() · findIndex()',
    lessonUrl: '../09-find-findIndex/index.html',
    code: `const products = [
  { name: 'Ручка', price: 25 },
  { name: 'Зошит', price: 45 },
  { name: 'Рюкзак', price: 850 },
  { name: 'Пенал', price: 120 },
];

const expensive = products.find(p => p.price > 100);
console.log('Перший дорожче 100:', expensive);

const idx = products.findIndex(p => p.name === 'Рюкзак');
console.log('Індекс рюкзака:', idx);`,
  },
  {
    id: '10',
    title: 'filter',
    methods: 'filter()',
    lessonUrl: '../10-filter/index.html',
    code: `const grades = [45, 78, 92, 55, 63, 100, 30];

const passed = grades.filter(g => g >= 60);
console.log('Склали (>= 60):', passed);

const failed = grades.filter(g => g < 60);
console.log('Не склали:', failed);

const words = ['код', 'функція', 'ok', 'масив', 'JS'];
const long = words.filter(w => w.length > 3);
console.log('Довші за 3 символи:', long);`,
  },
  {
    id: '11',
    title: 'map',
    methods: 'map()',
    lessonUrl: '../11-map/index.html',
    code: `const celsius = [0, 25, 37, 100];
const fahrenheit = celsius.map(c => c * 9 / 5 + 32);
console.log('У Фаренгейтах:', fahrenheit);

const names = ['аня', 'борис', 'вася'];
const capitalized = names.map(n => n[0].toUpperCase() + n.slice(1));
console.log('З великої літери:', capitalized);

const nums = [1, 2, 3, 4, 5, 6];
const result = nums.filter(n => n % 2 === 0).map(n => n * 10);
console.log('Парні × 10:', result);`,
  },
  {
    id: '12',
    title: 'reduce',
    methods: 'reduce()',
    lessonUrl: '../12-reduce/index.html',
    code: `const order = [
  { name: 'Кава', price: 45, qty: 2 },
  { name: 'Тістечко', price: 60, qty: 1 },
  { name: 'Сік', price: 30, qty: 3 },
];

const total = order.reduce((acc, item) => acc + item.price * item.qty, 0);
console.log('Разом до сплати:', total, 'грн');

const nums = [7, 2, 9, 4, 11, 3];
const max = nums.reduce((acc, n) => (n > acc ? n : acc), nums[0]);
console.log('Максимум:', max);`,
  },
  {
    id: '13',
    title: 'forEach',
    methods: 'forEach()',
    lessonUrl: '../13-forEach/index.html',
    code: `const tasks = ['Зробити ДЗ', 'Почитати книгу', 'Тренування'];
tasks.forEach((task, i) => {
  console.log(\`\${i + 1}. \${task}\`);
});

let sum = 0;
[10, 20, 30, 40].forEach(n => { sum += n; });
console.log('Сума:', sum);

const result = tasks.forEach(t => t.toUpperCase());
console.log('forEach повертає:', result);`,
  },
  {
    id: '14',
    title: 'sort',
    methods: 'sort() · toSorted()',
    lessonUrl: '../14-sort/index.html',
    code: `const prices = [450, 120, 890, 35, 1200];
const asc = prices.toSorted((a, b) => a - b);
const desc = prices.toSorted((a, b) => b - a);
console.log('Оригінал не змінився:', prices);
console.log('Зростання:', asc);
console.log('Спадання:', desc);

const items = [
  { name: 'Кава', rating: 4.8 },
  { name: 'Чай', rating: 4.2 },
  { name: 'Сік', rating: 4.5 },
];
const byRating = items.toSorted((a, b) => b.rating - a.rating);
console.log('За рейтингом:', byRating);`,
  },
  {
    id: '15',
    title: 'reverse',
    methods: 'reverse() · toReversed()',
    lessonUrl: '../15-reverse/index.html',
    code: `const nums = [10, 20, 30, 40];
const reversed = [...nums].reverse();
console.log('Оригінал:', nums);
console.log('Розвернутий:', reversed);

function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/\\s/g, '');
  return clean === clean.split('').reverse().join('');
}
console.log('радар — паліндром?', isPalindrome('радар'));
console.log('привіт — паліндром?', isPalindrome('привіт'));`,
  },
  {
    id: '16',
    title: 'flat / flatMap',
    methods: 'flat() · flatMap()',
    lessonUrl: '../16-flat-flatMap/index.html',
    code: `const categories = [
  ['ноутбук', 'мишка'],
  ['клавіатура', 'монітор'],
  ['навушники'],
];
const allProducts = categories.flat();
console.log('Усі товари:', allProducts);

const sentences = ['JS масиви', 'JS функції', 'JS обʼєкти'];
const words = sentences.flatMap(s => s.split(' '));
const unique = [...new Set(words)];
console.log('Унікальні слова:', unique);`,
  },
  {
    id: '17',
    title: 'every / some',
    methods: 'every() · some()',
    lessonUrl: '../17-every-some/index.html',
    code: `const nums = [5, 12, 8, 20, -3];
console.log('Усі додатні?', nums.every(n => n > 0));
console.log('Є відʼємне?', nums.some(n => n < 0));

const passwords = ['abc12345', 'longpassword', 'secure99'];
console.log('Усі > 8 символів?', passwords.every(p => p.length > 8));`,
  },
  {
    id: '18',
    title: 'fill / Array.from',
    methods: 'fill() · Array.from() · isArray',
    lessonUrl: '../18-fill/index.html',
    code: `const evens = Array.from({ length: 10 }, (_, i) => (i + 1) * 2);
console.log('Парні 2–20:', evens);

console.log('Array.isArray([]):', Array.isArray([]));
console.log('Array.isArray({}):', Array.isArray({}));

try {
  throw new TypeError('тест');
} catch (err) {
  console.log('Error.isError(err):', Error.isError(err));
}

const arr = [1, 2, 3, 4, 5];
arr.fill(0, 2, 5);
console.log('Після fill(0, 2, 5):', arr);`,
  },
  {
    id: '19',
    title: 'join / split',
    methods: 'join() · split()',
    lessonUrl: '../19-join-split/index.html',
    code: `const csv = 'Аня,85,Група А\\nБорис,72,Група Б';
const rows = csv.split('\\n');
rows.forEach(row => {
  const [name, score, group] = row.split(',');
  console.log(\`\${name}: \${score} (\${group})\`);
});

const title = 'Hello World';
const slug = title.toLowerCase().split(' ').join('-');
console.log('Slug:', slug);`,
  },
  {
    id: '20',
    title: 'Spread / деструктуризація',
    methods: '... · [a, b]',
    lessonUrl: '../20-spread-destructuring/index.html',
    code: `const nested = [[1, 2], [3, 4]];
const shallow = [...nested];
shallow[0][0] = 99;
console.log('Оригінал теж змінився (поверхнева копія):', nested);

const menu = ['Головна', 'Про нас', 'Контакти', 'Блог', 'FAQ'];
const [title, ...items] = menu;
console.log('Заголовок:', title);
console.log('Пункти меню:', items);

let a = 'перший', b = 'другий';
[a, b] = [b, a];
console.log('Після swap:', a, b);`,
  },
  {
    id: '21',
    title: 'Підсумковий проект',
    methods: 'усі методи',
    lessonUrl: '../21-review-project/index.html',
    code: `const students = [
  { id: 1, name: 'Аня', grades: [90, 85, 92], group: 'A' },
  { id: 2, name: 'Борис', grades: [70, 75, 68], group: 'B' },
  { id: 3, name: 'Вася', grades: [95, 88, 91], group: 'A' },
];

const getAverage = (grades) =>
  grades.reduce((sum, g) => sum + g, 0) / grades.length;

const groupA = students.filter(s => s.group === 'A');
console.log('Група A:', groupA.map(s => s.name));

const sorted = [...students].sort(
  (a, b) => getAverage(b.grades) - getAverage(a.grades)
);
console.log('За балом:', sorted.map(s => s.name));

const allPassed = students.every(s => getAverage(s.grades) >= 60);
console.log('Усі склали?', allPassed);`,
  },
];

window.PLAYGROUND_DEFAULT = `// Вільна пісочниця — пиши будь-який код з масивами
const arr = [1, 2, 3, 4, 5];
console.log('Мій масив:', arr);

// Або обери приклад зліва одним кліком ←`;
