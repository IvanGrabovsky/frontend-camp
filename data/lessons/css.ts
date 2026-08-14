// Lesson HTML content for the "CSS" course

export const LESSONS_HTML: Record<string, string> = {
  '01-selectors': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Селектор</strong> — шаблон, яким CSS вибирає HTML-елементи. <strong>Специфічність</strong> — система підрахунку «ваги» правил. При конфлікті двох правил виграє те з вищою специфічністю. Розуміння позбавляє від хаотичних <code>!important</code>.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🎯</span> Аналогія зі знижками</div>
      <p>Кожне правило — знижкова картка. Специфічність — рівень: золота бʼє срібну, срібна — бронзову. При однаковому рівні виграє <em>пізніша</em> в файлі (каскад). <code>!important</code> — VIP-картка.</p>
    </section>

    <section>
      <h2>Типи селекторів</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">/* Тег — 0-0-1 */</span>
<span class="ln">p { color: gray; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Клас — 0-1-0 */</span>
<span class="ln">.btn { padding: 8px 16px; }</span>
<span class="ln"></span>
<span class="ln cmt">/* ID — 1-0-0 */</span>
<span class="ln">#header { position: sticky; top: 0; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Атрибут — 0-1-0 */</span>
<span class="ln">input[type="text"] { border: 1px solid #ccc; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Псевдоклас — 0-1-0 */</span>
<span class="ln">a:hover { text-decoration: underline; }</span>
<span class="ln">li:first-child { font-weight: bold; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Псевдоелемент — 0-0-1 */</span>
<span class="ln">.btn::after { content: " →"; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Комбінатори (не додають специфічності) */</span>
<span class="ln">.nav > li   { display: inline-block; }  /* прямий нащадок */</span>
<span class="ln">.card + .card { margin-top: 1rem; }    /* суміжний брат */</span></code></pre>
      </div>

      <h2>Специфічність — (A, B, C)</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Тип</th><th>A</th><th>B</th><th>C</th></tr></thead>
          <tbody>
            <tr><td>Inline style</td><td>1</td><td>0</td><td>0</td></tr>
            <tr><td>ID</td><td>0</td><td>1</td><td>0</td></tr>
            <tr><td>Клас / псевдоклас / атрибут</td><td>0</td><td>0</td><td>1</td></tr>
            <tr><td>Тег / псевдоелемент</td><td>0</td><td>0</td><td>1</td></tr>
            <tr><td><code>*</code> / комбінатори</td><td>0</td><td>0</td><td>0</td></tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">/* Порахуй специфічність */</span>
<span class="ln">p              /* 0-0-1 */</span>
<span class="ln">.text          /* 0-1-0 — перемагає над p */</span>
<span class="ln">#main p        /* 1-0-1 */</span>
<span class="ln">#main .link    /* 1-1-0 — перемагає над #main p */</span></code></pre>
      </div>

      <h2>Сучасні інструменти</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">/* :is() — групування, бере специфічність найважчого аргументу */</span>
<span class="ln">:is(header, main, footer) a { color: blue; }</span>
<span class="ln"></span>
<span class="ln cmt">/* :where() — те саме, але специфічність 0-0-0 */</span>
<span class="ln">:where(h1, h2, h3) { margin-top: 0; }</span>
<span class="ln"></span>
<span class="ln cmt">/* :not() — виключення */</span>
<span class="ln">.list li:not(:last-child) { border-bottom: 1px solid #eee; }</span>
<span class="ln"></span>
<span class="ln cmt">/* :has() — «батьківський» селектор (CSS 2023) */</span>
<span class="ln">.card:has(img) { padding: 0; }</span>
<span class="ln">form:has(input:invalid) { border-color: red; }</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity" target="_blank" rel="noopener">Specificity — MDN</a></li>
          <li><a href="https://specificity.keegan.st/" target="_blank" rel="noopener">Specificity Calculator</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Зловживання ID</strong> — 1-0-0 дуже важко перебити. Для стилів — завжди класи.</li>
        <li><strong><code>!important</code> як «рішення»</strong> — симптом, не ліки. Веде до більших конфліктів.</li>
        <li><strong>Довгі селектори</strong> — <code>.sidebar .nav ul li a.active</code> важко перебити. Дай елементу власний клас.</li>
        <li><strong><code>:is(#id, p)</code> має специфічність 1-0-0</strong> — навіть коли застосовується до <code>p</code>.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Є <code>&lt;button class="btn" id="submit"&gt;</code>. Три правила: для тегу, класу, ID — різні кольори. Яке перемагає? Чи змінить порядок результат?</li>
        <li>Напиши <code>p { color: blue; }</code> і <code>.text { color: red; }</code>. Елемент <code>&lt;p class="text"&gt;</code> — якого кольору? Тепер додай <code>!important</code> до <code>p</code>.</li>
        <li>Перепиши <code>header a, main a, footer a</code> через <code>:is()</code>.</li>
        <li>Стилізуй всі <code>&lt;li&gt;</code> крім останнього через <code>:not(:last-child)</code>.</li>
        <li>Порахуй специфічність: <code>div.wrapper > p:first-child::before</code>. Перевір на <a href="https://specificity.keegan.st/" target="_blank" rel="noopener">specificity.keegan.st</a>.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Яка специфічність у <code>.nav ul li.active a</code>?</li>
        <li>Що таке каскад і як вирішуються конфлікти при однаковій специфічності?</li>
        <li>Різниця між <code>:is()</code> і <code>:where()</code>?</li>
        <li>Навіщо уникати ID в CSS?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке специфічність CSS?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «ID важливіший за клас» — без механізму.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Три числа (A, B, C): A — ID, B — клас/псевдоклас/атрибут, C — тег/псевдоелемент. При конфлікті — порівнюємо зліва. Inline style: (1,0,0,0).</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що нового в CSS-селекторах?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> Мовчання.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>:is()</code> і <code>:where()</code> для групування (різна специфічність), <code>:has()</code> — батьківський селектор (CSS 2023), нативний CSS Nesting.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>DevTools → Elements → Styles: Chrome 121+ показує специфічність при наведенні на селектор.</li>
        <li>CSS Nesting нативно: <code>.card { &amp; .title { color: red; } }</code> — без SCSS.</li>
        <li><code>:where()</code> з нульовою специфічністю ідеальний для reset-стилів.</li>
        <li><code>:focus-visible</code> — outline тільки при навігації клавіатурою, не при кліку.</li>
      </ul>
    </section>
  `,
};
