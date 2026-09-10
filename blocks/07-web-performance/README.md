# Web Performance & Оптимізація

![Статус: Доступно](https://img.shields.io/badge/Статус-Доступно-10b981)
![Рівень: Середній → просунутий](https://img.shields.io/badge/Рівень-Середній_→_просунутий-f59e0b)
![Core Web Vitals: LCP · INP · CLS](https://img.shields.io/badge/Core_Web_Vitals-LCP_·_INP_·_CLS-3b82f6)

> Практичне керівництво з оптимізації швидкодії веб-додатків: Core Web Vitals (LCP, INP, CLS), профілювання у Chrome DevTools, стиснення AVIF/WebP, Code Splitting та стратегії кешування.

---

## 🧭 Програма підмодуля (8 уроків)

| # | Тема уроку | Ключові концепції | Рівень |
|---|------------|-------------------|--------|
| 01 | **[Core Web Vitals: LCP, INP, CLS](file:///Users/grabovsky/projects/frontend-camp/content/lessons/web-performance/01-core-web-vitals.mdx)** | LCP (до 2.5с) · INP (до 200мс) · CLS (&lt; 0.1) · TTFB | Легкий |
| 02 | **[Профілювання та аудит швидкодії](file:///Users/grabovsky/projects/frontend-camp/content/lessons/web-performance/02-devtools-profiling.mdx)** | Performance Panel · Lighthouse · Flame Chart · Long Tasks | Легкий |
| 03 | **[Оптимізація зображень та шрифтів](file:///Users/grabovsky/projects/frontend-camp/content/lessons/web-performance/03-media-optimization.mdx)** | AVIF/WebP · `<picture>` · `srcset` · `font-display: swap` | Середній |
| 04 | **[Code Splitting та оптимізація бандлу](file:///Users/grabovsky/projects/frontend-camp/content/lessons/web-performance/04-bundle-splitting.mdx)** | `dynamic import` · React.lazy · Tree Shaking · Bundle Analyzer | Середній |
| 05 | **Оптимізація рендерингу (CRP)** | Critical Rendering Path · Layout Thrashing · `will-change` | Середній |
| 06 | **Швидкодія React додатків** | `memo` · `useMemo` · `useCallback` · Virtualization lists | Середній |
| 07 | **Кешування та Service Workers** | `Cache-Control` · `ETag` · SWR · Stale-While-Revalidate | Просунутий |
| 08 | **Моніторинг Real User Metrics (RUM)** | `PerformanceObserver` · Beacon API · Web Vitals Library | Просунутий |

---

## ⚡ Шпаргалка: Ключові метрики Core Web Vitals

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CORE WEB VITALS 2026                           │
├──────────────┬─────────────────────────────┬─────────────┬──────────────┤
│ Метрика      │ Що вимірює                  │ Добре (Good)│ Потребує змін│
├──────────────┼─────────────────────────────┼─────────────┼──────────────┤
│ 🚀 LCP       │ Швидкість рендеру контенту  │ ≤ 2.5 с     │ 2.5 с - 4.0 с│
│ ⚡ INP       │ Чуйність до дій (заміна FID)│ ≤ 200 мс    │ 200 - 500 мс │
│ 📐 CLS       │ Візуальна стабільність макету│ ≤ 0.1       │ 0.1 - 0.25   │
└──────────────┴─────────────────────────────┴─────────────┴──────────────┘
```

### 1. Чекліст оптимізації LCP (Largest Contentful Paint)
- [ ] Перевести всі головні hero-зображення у формат **AVIF** або **WebP**.
- [ ] Додати `<link rel="preload" as="image" href="..." fetchpriority="high">` для головного банера.
- [ ] Використовувати CDN для скорочення **TTFB (Time to First Byte)** до `< 800ms`.
- [ ] Усунути блокуючі рендеринг скрипти в `<head>` (`defer` / `async`).

### 2. Чекліст оптимізації INP (Interaction to Next Paint)
- [ ] Розбивати важкі синхронні обчислення за допомогою `scheduler.yield()` або `setTimeout(fn, 0)`.
- [ ] Виносити важкий парсинг / маніпуляції великими даними у **Web Workers**.
- [ ] Уникати надмірного ре-рендерингу всього дерева компонентів при кожному натисканні клавіші.

### 3. Чекліст оптимізації CLS (Cumulative Layout Shift)
- [ ] Завжди вказувати явні `width` та `height` для тегів `<img>` та `<iframe>`.
- [ ] Резервувати фіксовану висоту для динамічних банерів та рекламних блоків.
- [ ] Використовувати `font-display: swap` разом із fallback-шрифтами схожих розмірів (через `@font-face size-adjust`).

---

[← Повернутися до Roadmap](../../README.md)
