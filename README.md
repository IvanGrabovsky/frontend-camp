# Frontend Learning Hub

![Next.js](https://img.shields.io/badge/Next.js-15-000000)
![Статус: Roadmap](https://img.shields.io/badge/Roadmap-11_блоків-7c6af7)
![Тільки для некомерційного використання](https://img.shields.io/badge/Ліцензія-Некомерційна-ff69b4)

> Повний навчальний шлях: **Інтернет → HTML/CSS → Git → JS/TS → Next.js → Безпека, Perf & Тести → Фінальний проект**.

## Швидкий старт

```bash
git clone https://github.com/IvanGrabovsky/js-arrays-course.git
cd js-arrays-course
npm install
npm run dev
```

Відкрий [http://localhost:3000](http://localhost:3000) — hub з roadmap.

**Production build:**

```bash
npm run build    # статичний export у out/
```

## Блоки курсу

| # | Блок | Статус | README |
|---|------|--------|--------|
| 00 | [Як працює інтернет](blocks/00-how-internet-works/) | **Доступно** | [README](blocks/00-how-internet-works/README.md) |
| 01 | [HTML](blocks/01-html-css/) | **Доступно** | [README](blocks/01-html-css/README.md) |
| 02 | [CSS](blocks/01-html-css/) | **Доступно** | [README](blocks/01-html-css/README.md) |
| 03 | [Git & Командна розробка](blocks/02-git/) | Скоро | [README](blocks/02-git/README.md) |
| 04 | [JavaScript основи](blocks/02-javascript-basics/) | **Доступно** | [README](blocks/02-javascript-basics/README.md) |
| 05 | [JavaScript масиви](blocks/03-js-arrays/) | **Доступно** | [README](blocks/03-js-arrays/README.md) |
| 06 | [TypeScript](blocks/05-typescript/) | Скоро | [README](blocks/05-typescript/README.md) |
| 07 | [Next.js](blocks/04-nextjs/) | **Доступно** | [README](blocks/04-nextjs/README.md) |
| 08 | [Безпека браузера](blocks/06-web-security/) | **Доступно** | [README](blocks/06-web-security/README.md) |
| 09 | [Web Performance & Оптимізація](blocks/07-web-performance/) | Скоро | [README](blocks/07-web-performance/README.md) |
| 10 | [Тестування Frontend](blocks/08-testing/) | Скоро | [README](blocks/08-testing/README.md) |
| 11 | [Фінальний проект](blocks/07-capstone/) | Скоро | [README](blocks/07-capstone/README.md) |

## Активний контент — масиви

- **Hub блоку:** `/blocks/js-arrays/`
- **Урок 01:** `/courses/js-arrays/01-intro/` (статичні HTML-уроки)
- **Пісочниця:** `/courses/js-arrays/playground/`
- **Кристали:** `/courses/js-arrays/crystals/`

### Сучасні API в курсі

Курс покриває не лише класичні методи, а й актуальні з ES2022+: `at()`, `findLast`, `toSorted` / `toReversed` / `toSpliced` / `with()` (change by copy), `Array.fromAsync`, `Error.isError()`. Повний довідник — у [уроці 21](/courses/js-arrays/21-review-project/) та [README блоку](blocks/03-js-arrays/README.md).

## Структура репозиторію

```
app/              Next.js hub (roadmap, landing блоків)
blocks/           README для GitHub (по одному на блок)
data/roadmap.ts   Метадані блоків і уроків
public/courses/js-arrays/   21 урок + assets (контент без змін)
```

**Стилі зараз:** кастомний CSS (`public/courses/js-arrays/assets/css/style.css` + inline-стилі hub-компонентів). Див. [TODO](#todo).

## TODO

Планові зміни в репозиторії (без термінів):

- [ ] **Tailwind CSS** — перевести стилі hub (Next.js: `app/`, `components/`) та статичних уроків (`public/courses/js-arrays/`) з кастомного CSS на Tailwind; зберегти light/dark theme та читабельність code blocks.

## Деплой

- **Vercel:** підключити репозиторій, `npm run build`
- **GitHub Pages:** workflow `.github/workflows/deploy.yml`, `NEXT_PUBLIC_BASE_PATH=/repo-name`

## Про автора

**[Іван Грабовський](https://github.com/IvanGrabovsky)** — frontend розробник · 2026 · Тільки для некомерційного використання
