# 6. Прототипи, класи та ООП у JavaScript

![Статус: Доступно](https://img.shields.io/badge/Статус-Доступно-10b981)
![Рівень: Середній → просунутий](https://img.shields.io/badge/Рівень-Середній_→_просунутий-f59e0b)
![Теми: ООП, Прототипи, ES6 Classes](https://img.shields.io/badge/Теми-ООП_·_Прототипи_·_ES6_Classes-7c6af7)

> Повний практичний довідник з об'єктно-орієнтованого програмування у JavaScript: прихована властивість `[[Prototype]]`, нативні прототипи, класи ES6, ключове слово `super`, інкапсуляція через приватні поля `#` та патерн Mixins.

---

## 🧭 Програма підмодуля (8 уроків)

| # | Тема уроку | Ключові концепції | Рівень |
|---|------------|-------------------|--------|
| 01 | **[Прототипне успадкування та __proto__](file:///Users/grabovsky/projects/frontend-camp/content/lessons/js-classes/01-prototypal-inheritance.mdx)** | `[[Prototype]]` · `__proto__` · `Object.create()` · пошук по ланцюжку | Середній |
| 02 | **Властивість F.prototype та конструктори** | `new Function()` · `F.prototype` · властивість `constructor` | Середній |
| 03 | **Нативні прототипи та поліфіли** | `Array.prototype` · `Object.prototype` · Monkey patching заборони | Середній |
| 04 | **[Синтаксис class: методи, конструктор, геттери](file:///Users/grabovsky/projects/frontend-camp/content/lessons/js-classes/04-class-syntax.mdx)** | `class` · `constructor` · `get/set` · методи екземпляра | Легкий |
| 05 | **Успадкування класів: extends та super** | `extends` · виклик `super()` · перевизначення методів | Середній |
| 06 | **Статичні методи та приватні поля (#private)** | `static` методи & властивості · приватні поля `#field` | Середній |
| 07 | **Перевірка типу: instanceof** | `instanceof` · ланцюжок прототипів · `Symbol.hasInstance` | Середній |
| 08 | **Домішки (Mixins) та патерни ООП** | `Object.assign` Mixin · EventMixin · Composition over Inheritance | Просунутий |

---

## ⚡ Шпаргалка: Ключові концепції та код

### 1. Прототипний ланцюжок (Prototype Chain)

```javascript
const animal = {
  eats: true,
  walk() {
    return `${this.name || 'Тварина'} рухається`;
  }
};

const rabbit = {
  name: "Кролик",
  jumps: true,
  __proto__: animal // rabbit делегує до animal
};

console.log(rabbit.jumps); // true (знайдено локально)
console.log(rabbit.eats);  // true (знайдено в прототипі animal)
console.log(rabbit.walk()); // "Кролик рухається" (this вказує на rabbit!)
```

### 2. Сучасні ES6 класи та інкапсуляція (`#`)

```javascript
class BankAccount {
  // 1. Публічне статичне поле (належить класу, а не екземпляру)
  static currency = "UAH";

  // 2. Справжнє приватне поле (недоступне ззовні)
  #balance = 0;

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  // Геттер
  get balance() {
    return `${this.#balance} ${BankAccount.currency}`;
  }

  // Публічний метод
  deposit(amount) {
    if (amount <= 0) throw new Error("Сума має бути більшою за 0");
    this.#balance += amount;
  }
}

const acc = new BankAccount("Іван", 1000);
acc.deposit(500);
console.log(acc.balance); // "1500 UAH"
// console.log(acc.#balance); // ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class
```

### 3. Успадкування через `extends` та `super()`

```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  getDetails() {
    return `${this.name} (ЗП: ${this.salary})`;
  }
}

class TechLead extends Employee {
  constructor(name, salary, teamSize) {
    // Обов'язковий виклик батьківського конструктора до звернення до this!
    super(name, salary);
    this.teamSize = teamSize;
  }

  // Перевизначення методу з викликом батьківської реалізації
  getDetails() {
    return `${super.getDetails()}, Лід команди з ${this.teamSize} інженерів`;
  }
}
```

---

## 🎯 Питання на співбесідах (Interview FAQ)

1. **У чому різниця між `__proto__` та `prototype`?**
   - `prototype` — це звичайна властивість **функції-конструктора** (або класу), яка призначається як `[[Prototype]]` для всіх об'єктів, створених через `new F()`.
   - `__proto__` — це гетер/сетер для отримання прихованої властивості `[[Prototype]]` конкретного екземпляра об'єкта.

2. **Що відбувається під час виклику `new User('Олег')`?**
   - 1) Створюється новий порожній об'єкт `{}`.
   - 2) Його `[[Prototype]]` встановлюється на `User.prototype`.
   - 3) Викликається функція-конструктор `User` із прив'язкою `this` до нового об'єкта.
   - 4) Повертається створений об'єкт `this`.

---

[← Повернутися до курсу JavaScript](../02-javascript-basics/README.md) · [Перейти до Roadmap](../../README.md)
