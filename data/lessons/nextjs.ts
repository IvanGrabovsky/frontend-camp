// Lesson HTML content for the "Next.js" course

export const LESSONS_HTML: Record<string, string> = {
  '01-what-is-nextjs': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Next.js</strong> — це React-фреймворк від Vercel, який додає до React все необхідне для production: маршрутизацію, рендеринг на сервері, оптимізацію зображень, збирання, деплой. Якщо React — це двигун, то Next.js — це повноцінний автомобіль.</p>
      <p>Він вирішує головні проблеми «голого» React: відсутність маршрутизації «з коробки», погана SEO через клієнтський рендеринг, складне налаштування збирання.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🏗️</span> Аналогія з будівництвом</div>
      <p>React — це будівельні матеріали (цегла, бетон, дерево). Next.js — це будівельна компанія, яка вже знає як з'єднувати ці матеріали, прокладати комунікації та здавати об'єкт «під ключ».</p>
    </section>

    <section>
      <h2>Режими рендерингу — ключова перевага</h2>
      <p>Next.js підтримує кілька стратегій рендерингу в межах одного проекту:</p>

      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Режим</th><th>Коли рендерить</th><th>Де виконується</th><th>Підходить для</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>CSR</strong><br/><em>Client-Side Rendering</em></td>
              <td>В браузері, після завантаження JS</td>
              <td>Клієнт</td>
              <td>SPA, дашборди, контент за авторизацією</td>
            </tr>
            <tr>
              <td><strong>SSR</strong><br/><em>Server-Side Rendering</em></td>
              <td>На кожен запит, на сервері</td>
              <td>Сервер</td>
              <td>Персоналізований контент, реальний час</td>
            </tr>
            <tr>
              <td><strong>SSG</strong><br/><em>Static Site Generation</em></td>
              <td>Під час збирання (build time)</td>
              <td>Сервер → CDN</td>
              <td>Блоги, документація, маркетинг</td>
            </tr>
            <tr>
              <td><strong>ISR</strong><br/><em>Incremental Static Regeneration</em></td>
              <td>При першому запиті + через N секунд</td>
              <td>Сервер → кеш</td>
              <td>E-commerce, новини (свіжий кеш)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// SSG — статична генерація (за замовчуванням у Next.js)</span>
<span class="ln">export default async function Page() {</span>
<span class="ln">  const data = await fetch('https://api.example.com/posts'); // кешується</span>
<span class="ln">  return &lt;PostList posts={await data.json()} /&gt;;</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// SSR — на кожен запит (динамічний)</span>
<span class="ln">export const dynamic = 'force-dynamic';</span>
<span class="ln">export default async function Page() { ... }</span>
<span class="ln"></span>
<span class="ln cmt">// ISR — оновлення кожні 60 секунд</span>
<span class="ln">const data = await fetch('...', { next: { revalidate: 60 } });</span></code></pre>
      </div>

      <h2>Що входить «з коробки»</h2>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
        </div>
        <pre><code><span class="ln cmt">// Структура Next.js App Router проекту</span>
<span class="ln">my-app/</span>
<span class="ln">├─ app/</span>
<span class="ln">│  ├─ layout.tsx        ← кореневий layout (html, body, шрифти)</span>
<span class="ln">│  ├─ page.tsx          ← головна сторінка "/"</span>
<span class="ln">│  ├─ about/</span>
<span class="ln">│  │  └─ page.tsx       ← сторінка "/about"</span>
<span class="ln">│  └─ blog/[slug]/</span>
<span class="ln">│     └─ page.tsx       ← динамічний маршрут "/blog/:slug"</span>
<span class="ln">├─ public/              ← статичні файли (зображення, fonts)</span>
<span class="ln">├─ components/          ← React-компоненти</span>
<span class="ln">└─ next.config.ts       ← конфігурація</span></code></pre>
      </div>

      <h2>Чому Next.js а не «голий» React?</h2>

      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Задача</th><th>Голий React</th><th>Next.js</th></tr></thead>
          <tbody>
            <tr><td>Маршрутизація</td><td>Треба React Router або інше</td><td>Файлова, вбудована</td></tr>
            <tr><td>SEO</td><td>Погане (CSR — порожній HTML)</td><td>Відмінне (SSR/SSG)</td></tr>
            <tr><td>Збирання</td><td>Webpack/Vite налаштовуй сам</td><td>Турбопак, вбудовано</td></tr>
            <tr><td>Зображення</td><td>Звичайний <code>&lt;img&gt;</code></td><td><code>&lt;Image&gt;</code> з lazy/webp/resize</td></tr>
            <tr><td>Шрифти</td><td>Вручну</td><td><code>next/font</code> — zero layout shift</td></tr>
            <tr><td>API</td><td>Окремий сервер</td><td>Route Handlers в тому ж репо</td></tr>
            <tr><td>Деплой</td><td>Налаштовуй сам</td><td>1 кліком на Vercel</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Швидкий старт</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt"># Створити новий проект</span>
<span class="ln">npx create-next-app@latest my-app</span>
<span class="ln">cd my-app</span>
<span class="ln">npm run dev   # http://localhost:3000</span>
<span class="ln"></span>
<span class="ln cmt"># Або з налаштуваннями без підказок</span>
<span class="ln">npx create-next-app@latest my-app \</span>
<span class="ln">  --typescript --tailwind --app --no-src-dir</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://nextjs.org/docs" target="_blank" rel="noopener">Next.js Docs (офіційна)</a></li>
          <li><a href="https://nextjs.org/learn" target="_blank" rel="noopener">Next.js Learn — інтерактивний курс</a></li>
          <li><a href="https://react.dev" target="_blank" rel="noopener">React Docs</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>«Next.js = React»</strong> — ні. Next.js є надбудовою над React. Без знання React Next.js незрозумілий.</li>
        <li><strong>«SSR завжди кращий»</strong> — ні. SSG і ISR швидші для контенту що рідко змінюється. SSR — тільки для справді динамічного контенту.</li>
        <li><strong>Плутати Pages Router і App Router</strong> — це дві різні системи. App Router (з Next.js 13+) — поточний стандарт. Pages Router — легасі, підтримується але не рекомендується для нових проектів.</li>
        <li><strong>«use client» скрізь</strong> — Server Components рендеряться на сервері і не надсилають JS клієнту. Маркуй як Client тільки те що реально потребує браузерних API або стану.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи новий Next.js проект: <code>npx create-next-app@latest my-first-nextjs</code>. Запусти <code>npm run dev</code>, відкрий http://localhost:3000.</li>
        <li>Відкрий <code>app/page.tsx</code> — змін текст заголовку. Перевір hot reload у браузері.</li>
        <li>Створи файл <code>app/about/page.tsx</code> з довільним вмістом. Перейди на <code>/about</code> — сторінка з'явилась без жодного роутера!</li>
        <li>Відкрий DevTools → Network → перезавантаж. Порівняй як виглядає HTML у Next.js (SSG) проти звичайного React CRA (CSR) — у Next.js текст вже в HTML-відповіді.</li>
        <li>Прочитай <code>next.config.ts</code> свого поточного проекту. Знайди <code>output: 'export'</code> — що це означає?</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Назви чотири режими рендерингу Next.js і коли кожен використовується.</li>
        <li>Чим App Router відрізняється від Pages Router?</li>
        <li>Що означає «Server Component»? Чим він відрізняється від Client Component?</li>
        <li>Навіщо <code>next/image</code> замість звичайного <code>&lt;img&gt;</code>?</li>
        <li>Що відбувається при <code>npm run build</code> в Next.js проекті з <code>output: 'export'</code>?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Навіщо Next.js якщо є React?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це те саме що React» або «Так прийнято».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Next.js додає маршрутизацію, SSR/SSG для SEO, оптимізацію зображень і шрифтів, Route Handlers для API, готовий CI/CD деплой на Vercel — все з коробки.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке SSR і чим він кращий за CSR?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «SSR рендерить на сервері» — правильно, але без розуміння трейдофів.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> SSR рендерить HTML на сервері для кожного запиту → Google отримує готовий HTML (SEO), користувач бачить контент до завантаження JS (FCP). Мінус — повільніший TTFB ніж у CDN-кешованого SSG.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Коли використовувати Server, а коли Client Component?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Не знаю різниці» або «use client скрізь».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Server — за замовчуванням, не надсилає JS клієнту, може читати БД/env, не має стану. Client (<code>"use client"</code>) — для useState, useEffect, обробників подій, браузерних API (localStorage, navigator). Правило: push to the leaves — Client якомога глибше в дереві.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><strong>Turbopack</strong> — наступник Webpack від Vercel, написаний на Rust. З Next.js 15 стабільний за замовчуванням — cold start в 10x швидший.</li>
        <li><code>next/font</code> автоматично завантажує шрифти з нульовим layout shift — ніяких FOUT/FOIT.</li>
        <li><code>next dev --turbopack</code> або просто <code>next dev</code> в Next.js 15 — Turbopack увімкнено за замовчуванням.</li>
        <li>Partial Prerendering (PPR) — нова фіча: статична оболонка + динамічні «дірки» стрімляться окремо. Найкраще з SSG і SSR.</li>
        <li>React Server Actions (<code>"use server"</code>) — функції що виконуються на сервері, викликаються з Client Component. Замінюють прості POST-запити без Route Handler.</li>
      </ul>
    </section>
  `,

  '02-app-router': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>App Router</strong> — сучасна система маршрутизації Next.js (з версії 13), де кожна папка в директорії <code>app/</code> відповідає сегменту URL. Файли зі спеціальними іменами (<code>page.tsx</code>, <code>layout.tsx</code>, <code>loading.tsx</code>, <code>error.tsx</code>) мають зарезервовані ролі.</p>
      <p>До App Router існував Pages Router (<code>pages/</code> директорія) — він досі підтримується, але App Router є рекомендованим підходом.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🗂️</span> Аналогія з файловою системою</div>
      <p>App Router — це як структура папок у провіднику: кожна папка = один сегмент URL. <code>app/blog/[id]/page.tsx</code> → <code>/blog/123</code>. Файл <code>layout.tsx</code> у папці — це «рамка» яка обгортає всі дочірні сторінки.</p>
    </section>

    <section>
      <h2>Структура app/ директорії</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln">app/</span>
<span class="ln">├── layout.tsx          ← root layout (обов'язковий)</span>
<span class="ln">├── page.tsx            ← /  (головна сторінка)</span>
<span class="ln">├── loading.tsx         ← UI завантаження для /</span>
<span class="ln">├── error.tsx           ← UI помилки для /</span>
<span class="ln">│</span>
<span class="ln">├── about/</span>
<span class="ln">│   └── page.tsx        ← /about</span>
<span class="ln">│</span>
<span class="ln">├── blog/</span>
<span class="ln">│   ├── page.tsx        ← /blog</span>
<span class="ln">│   ├── layout.tsx      ← layout для /blog і всіх підсторінок</span>
<span class="ln">│   └── [slug]/</span>
<span class="ln">│       └── page.tsx    ← /blog/my-post (динамічний)</span>
<span class="ln">│</span>
<span class="ln">└── (auth)/             ← Route Group (не впливає на URL)</span>
<span class="ln">    ├── login/page.tsx  ← /login</span>
<span class="ln">    └── register/page.tsx ← /register</span></code></pre>
      </div>

      <h2>Зарезервовані файли</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Файл</th><th>Роль</th><th>Ключова особливість</th></tr></thead>
          <tbody>
            <tr><td><code>page.tsx</code></td><td>Сторінка (унікальний UI)</td><td>Обов'язковий для публічного маршруту</td></tr>
            <tr><td><code>layout.tsx</code></td><td>Обгортка, що не ре-рендериться</td><td>Зберігає стан при навігації</td></tr>
            <tr><td><code>loading.tsx</code></td><td>Suspense fallback</td><td>Автоматично обгортає page у Suspense</td></tr>
            <tr><td><code>error.tsx</code></td><td>Error Boundary</td><td>Повинен бути Client Component</td></tr>
            <tr><td><code>not-found.tsx</code></td><td>404 сторінка</td><td>Викликати через <code>notFound()</code></td></tr>
            <tr><td><code>template.tsx</code></td><td>Як layout, але ре-рендериться</td><td>Корисно для анімацій переходу</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Root Layout — обов'язковий</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// app/layout.tsx — кореневий layout</span>
<span class="ln">import type { Metadata } from 'next';</span>
<span class="ln">
</span>
<span class="ln">export const metadata: Metadata = {</span>
<span class="ln">  title: 'My App',</span>
<span class="ln">  description: 'Generated by Next.js',</span>
<span class="ln">};</span>
<span class="ln">
</span>
<span class="ln">export default function RootLayout({</span>
<span class="ln">  children,</span>
<span class="ln">}: { children: React.ReactNode }) {</span>
<span class="ln">  return (</span>
<span class="ln">    &lt;html lang="uk"&gt;</span>
<span class="ln">      &lt;body&gt;{children}&lt;/body&gt;  {/* ← тут рендерится page.tsx */}</span>
<span class="ln">    &lt;/html&gt;</span>
<span class="ln">  );</span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>Route Groups і Parallel Routes</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// (group) — не впливає на URL, тільки організація</span>
<span class="ln">app/(marketing)/about/page.tsx  → /about</span>
<span class="ln">app/(dashboard)/settings/page.tsx → /settings</span>
<span class="ln cmt">// Різні layout для marketing і dashboard</span>
<span class="ln">
</span>
<span class="ln cmt">// @slot — Parallel Routes (одночасно кілька сторінок)</span>
<span class="ln">app/</span>
<span class="ln">├── layout.tsx         ← { children, @modal }</span>
<span class="ln">└── @modal/</span>
<span class="ln">    └── login/page.tsx ← /login відкривається в modal</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://nextjs.org/docs/app/building-your-application/routing" target="_blank" rel="noopener">App Router Routing — Next.js Docs</a></li>
          <li><a href="https://nextjs.org/docs/app/api-reference/file-conventions" target="_blank" rel="noopener">File Conventions — Next.js Docs</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Відсутній root layout</strong> — Next.js вимагає <code>app/layout.tsx</code> з <code>&lt;html&gt;</code> і <code>&lt;body&gt;</code>.</li>
        <li><strong>Плутанина pages/ і app/</strong> — не змішуй Pages Router і App Router в одному проекті без чіткого розуміння.</li>
        <li><strong><code>error.tsx</code> без <code>'use client'</code></strong> — Error Boundary повинен бути Client Component.</li>
        <li><strong>Route Group впливає на URL</strong> — ні! <code>(marketing)/about</code> → <code>/about</code>, а не <code>/marketing/about</code>.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи Next.js проект: <code>npx create-next-app@latest my-app --app --typescript</code>. Досліди структуру <code>app/</code>.</li>
        <li>Додай сторінки: <code>app/about/page.tsx</code> і <code>app/blog/page.tsx</code>. Відкрий <code>/about</code> і <code>/blog</code> у браузері.</li>
        <li>Створи <code>app/blog/layout.tsx</code> зі спільним sidebar для всіх blog сторінок.</li>
        <li>Додай <code>app/blog/[slug]/page.tsx</code>. Отримай <code>slug</code> через <code>params</code> і виведи на сторінку.</li>
        <li>Організуй файли через Route Groups: <code>(marketing)</code> і <code>(dashboard)</code> з різними layout.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Яка різниця між <code>layout.tsx</code> і <code>template.tsx</code>?</li>
        <li>Що таке Route Group і як він впливає на URL?</li>
        <li>Чому <code>error.tsx</code> повинен бути <code>'use client'</code>?</li>
        <li>Як передати динамічний параметр із URL у компонент сторінки?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як влаштована маршрутизація в Next.js?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Є файл routes.js де описуються маршрути» — це Pages Router або React Router, не App Router.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> App Router: кожна папка в <code>app/</code> = сегмент URL. Файл <code>page.tsx</code> робить маршрут публічним. <code>layout.tsx</code> — спільна обгортка для всіх дочірніх маршрутів. Динамічні сегменти через <code>[param]</code>.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Чим App Router відрізняється від Pages Router?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «App Router новіший» — без технічних відмінностей.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> App Router підтримує React Server Components (рендеринг на сервері за замовчуванням), вкладені layout, streaming через Suspense, Server Actions. Pages Router — тільки CSR компоненти з <code>getServerSideProps</code>/<code>getStaticProps</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li><code>app/(root)/page.tsx</code> — Route Group без впливу на URL. Корисно для організації без поломки existing URLs.</li>
        <li><code>app/api/route.ts</code> — Route Handler (API endpoint). <code>export async function GET() {...}</code> відповідає на GET запити.</li>
        <li>Intercepting Routes: <code>app/blog/(..)photo/page.tsx</code> — відкрити фото в modal без зміни поточного layout.</li>
        <li>Next.js 15: <code>params</code> і <code>searchParams</code> тепер Promises — потрібен <code>await params</code> в Server Component.</li>
      </ul>
    </section>
  `,

  '03-server-client': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p>В архітектурі <strong>Next.js App Router</strong> компоненти розділені на два типи: <strong>Server Components (RSC)</strong> та <strong>Client Components</strong>. За замовчуванням усі компоненти в Next.js є Server Components. Їхній код виконується виключно на сервері й не додає жодного байта JavaScript до клієнтського бандла.</p>
      <p>Директива <code>"use client"</code> на початку файлу оголошує межу переходу (boundary), де дозволено інтерактивність: хуки стану (<code>useState</code>), ефекти (<code>useEffect</code>) та обробники подій (<code>onClick</code>).</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🍽️</span> Аналогія з рестораном</div>
      <p><strong>Server Components</strong> — це закрита кухня ресторану. Шеф-кухар має прямий доступ до продуктів (бази даних) і важкої техніки (секретні API ключі, важкі парсери). Гостю подають уже готове гаряче блюдо (чистий HTML/RSC Payload). <strong>Client Components</strong> — це спеції, ніж та виделка на столі гостя, якими він взаємодіє зі стравою за власним бажанням (кліки, перемикачі, інтерактив).</p>
    </section>

    <section>
      <h2>Порівняльна таблиця: Server vs Client</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Можливість / Задача</th><th>Server Component (RSC)</th><th>Client Component ("use client")</th></tr></thead>
          <tbody>
            <tr><td>За замовчуванням?</td><td>✅ Так (всі файли в <code>app/</code>)</td><td>Ні (потрібна директива <code>"use client"</code>)</td></tr>
            <tr><td>Прямий доступ до БД / ORM</td><td>✅ Так (Prisma, Drizzle, PostgreSQL)</td><td>❌ Ні (потрібен API або Server Action)</td></tr>
            <tr><td>Секретні ключі (API Keys, Tokens)</td><td>✅ Безпечно (не потрапляють у браузер)</td><td>❌ Небезпечно (публічний клієнтський JS)</td></tr>
            <tr><td>Хуки стану (<code>useState</code>, <code>useReducer</code>)</td><td>❌ Недоступні</td><td>✅ Доступні</td></tr>
            <tr><td>Ефекти (<code>useEffect</code>, <code>useLayoutEffect</code>)</td><td>❌ Недоступні</td><td>✅ Доступні</td></tr>
            <tr><td>Обробники подій (<code>onClick</code>, <code>onChange</code>)</td><td>❌ Недоступні</td><td>✅ Доступні</td></tr>
            <tr><td>Браузерні API (<code>window</code>, <code>localStorage</code>)</td><td>❌ Недоступні</td><td>✅ Доступні після монтування</td></tr>
            <tr><td>Вплив на розмір JS-бандла</td><td>⚡ <strong>0 КБ</strong> клієнтського JS</td><td>📦 Додається до завантажуваного бандла</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Як правильно використовувати "use client"</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">// components/LikeButton.tsx — Client Component для інтерактивності</span>
<span class="ln">'use client';</span>
<span class="ln"></span>
<span class="ln">import { useState } from 'react';</span>
<span class="ln">import { Heart } from 'lucide-react';</span>
<span class="ln"></span>
<span class="ln">export function LikeButton({ initialLikes }: { initialLikes: number }) {</span>
<span class="ln">  const [likes, setLikes] = useState(initialLikes);</span>
<span class="ln"></span>
<span class="ln">  return (</span>
<span class="ln">    &lt;button onClick={() => setLikes(likes + 1)} className="like-btn"&gt;</span>
<span class="ln">      &lt;Heart /&gt; {likes}</span>
<span class="ln">    &lt;/button&gt;</span>
<span class="ln">  );</span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>Композиція: як вкладати Server Component у Client Component</h2>
      <p>Оскільки Client Component не може напряму імпортувати Server Component, використовуйте патерн <strong>Children (композиція через props)</strong>:</p>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">// 1. Modal.tsx ("use client" компонент-обгортка)</span>
<span class="ln">'use client';</span>
<span class="ln">import { useState, ReactNode } from 'react';</span>
<span class="ln"></span>
<span class="ln">export function Modal({ children }: { children: ReactNode }) {</span>
<span class="ln">  const [isOpen, setIsOpen] = useState(false);</span>
<span class="ln">  return (</span>
<span class="ln">    &lt;div&gt;</span>
<span class="ln">      &lt;button onClick={() => setIsOpen(true)}&gt;Відкрити&lt;/button&gt;</span>
<span class="ln">      {isOpen &amp;&amp; &lt;div className="modal"&gt;{children}&lt;/div&gt;}</span>
<span class="ln">    &lt;/div&gt;</span>
<span class="ln">  );</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// 2. app/page.tsx (Server Component — рендерить обидва!)</span>
<span class="ln">import { Modal } from '@/components/Modal';</span>
<span class="ln">import { HeavyServerList } from '@/components/HeavyServerList'; <span class="cmt">// RSC з базою даних</span></span>
<span class="ln"></span>
<span class="ln">export default function Page() {</span>
<span class="ln">  return (</span>
<span class="ln">    &lt;Modal&gt;</span>
<span class="ln">      &lt;HeavyServerList /&gt; <span class="cmt">&lt;!-- Передається як children, рендериться на сервері! --&gt;</span></span>
<span class="ln">    &lt;/Modal&gt;</span>
<span class="ln">  );</span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>Гідратація (Hydration) та помилки</h2>
      <p><strong>Гідратація</strong> — це процес, коли браузер завантажує JS і «оживляє» статичний HTML, прив'язуючи обробники подій до DOM-вузлів.</p>
      <p><strong>Hydration Mismatch Error</strong> виникає, коли початковий HTML із сервера відрізняється від того, що React згенерував у браузері під час першого рендеру (наприклад, перевірка <code>window !== undefined</code> або виклик <code>new Date().toLocaleTimeString()</code> без синхронізації).</p>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://nextjs.org/docs/app/building-your-application/rendering/server-components" target="_blank" rel="noopener">Server Components — Next.js Docs</a></li>
          <li><a href="https://nextjs.org/docs/app/building-your-application/rendering/client-components" target="_blank" rel="noopener">Client Components — Next.js Docs</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Ставити <code>"use client"</code> у кожному файлі</strong> — це зводить нанівець переваги Next.js, роздуває клієнтський JS бандл і сповільнює First Contentful Paint. Спускайте <code>"use client"</code> до найменших інтерактивних листків дерева (кнопка, інпут, перемикач).</li>
        <li><strong>Прямий імпорт Server Component у файл із <code>"use client"</code></strong> — якщо клієнтський файл імпортує серверний компонент, той автоматично перетворюється на Client Component і потрапляє в клієнтський JS!</li>
        <li><strong>Спроба використати <code>localStorage</code> напряму в тілі функції компонента</strong> — під час SSR на сервері об'єкта <code>localStorage</code> не існує. Звертайтеся до нього лише всередині <code>useEffect</code> або обробників подій.</li>
        <li><strong>Асинхронний Client Component (<code>export default async function</code>)</strong> — клієнтські компоненти не можуть бути <code>async</code> функціями (це дозволено лише для Server Components).</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи серверний компонент сторінки <code>app/profile/page.tsx</code>, що асинхронно отримує дані (RSC) без використання <code>useEffect</code>.</li>
        <li>Винеси інтерактивну кнопку перемикання теми або лайка в окремий файл <code>components/ThemeButton.tsx</code> з директивою <code>"use client"</code>.</li>
        <li>Імпортуй <code>ThemeButton</code> всередину серверної сторінки <code>app/profile/page.tsx</code> та передай у неї пропси.</li>
        <li>Перевір розмір бандла у збірці (<code>npm run build</code>) — зверни увагу на позначки <code>○ (Static)</code> та <code>ƒ (Dynamic)</code>.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Що насправді означає директива <code>"use client"</code>? Чи означає вона, що компонент не виконується на сервері під час SSR?</li>
        <li>Чому Server Components мають розмір 0 КБ у клієнтському JS бандлі?</li>
        <li>Як передати Server Component всередину Client Component без перетворення першого на клієнтський?</li>
        <li>Що таке Hydration Error і які дві найпоширеніші причини її виникнення?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«У чому різниця між Server Components та Client Components у Next.js App Router?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Server рендериться на сервері, а Client тільки в браузері».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Server Components (за замовчуванням) виконуються виключно на сервері під час збірки або запиту. Вони мають прямий доступ до бекенду/БД, безпечні для секретів і додають 0 КБ до JS бандла. Client Components (<code>"use client"</code>) також pre-рендеряться на сервері в статичний HTML під час SSR, але потім гідратуються в браузері, що дозволяє використовувати <code>useState</code>, <code>useEffect</code> та обробники подій.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як уникнути Hydration Mismatch при роботі з даними клієнта (наприклад, localStorage або Date)?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Вимкнути SSR або загорнути весь додаток у "use client"».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> (1) Зчитувати клієнтські значення всередині <code>useEffect</code> після завершення першої гідратації; (2) Використовувати динамічний імпорт з вимкненим SSR для специфічних віджетів: <code>dynamic(() =&gt; import('./ClientWidget'), { ssr: false })</code>; (3) Для окремих елементів тексту застосовувати атрибут <code>suppressHydrationWarning</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>Пакет <code>server-only</code> (<code>import 'server-only'</code>) викине помилку збірки, якщо хтось випадково імпортує серверний модуль з секретними ключами в Client Component.</li>
        <li>Server Components можуть бути асинхронними функціями: <code>export default async function Page() { const user = await db.user.findFirst(); return &lt;div&gt;{user.name}&lt;/div&gt;; }</code>.</li>
        <li>Streaming з Suspense: можна обгорнути повільний Server Component у <code>&lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;</code>, і Next.js миттєво віддасть сторінку, підвантаживши блок потоково (streamed chunk).</li>
      </ul>
    </section>
  `,
};

