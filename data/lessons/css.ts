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

  '02-box-model': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Box model</strong> — фундаментальна концепція CSS: кожен HTML-елемент є прямокутною коробкою з чотирма шарами: content → padding → border → margin. Розуміння box model пояснює чому елементи мають несподіваний розмір і чому вони «розсуваються».</p>
      <p><strong>Позиціювання</strong> визначає де саме розміщується елемент на сторінці і як він взаємодіє з потоком документа.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📦</span> Аналогія з подарунком</div>
      <p><strong>Content</strong> — сам подарунок. <strong>Padding</strong> — захисна пінопластова обкладка всередині коробки. <strong>Border</strong> — стінки коробки. <strong>Margin</strong> — відстань між коробками на полиці.</p>
    </section>

    <section>
      <h2>Box Model — схема</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">/* Повний синтаксис */</span>
<span class="ln">.box {</span>
<span class="ln">  width: 200px;           /* ширина контенту */</span>
<span class="ln">  height: 100px;          /* висота контенту */</span>
<span class="ln">  padding: 16px 24px;     /* верх/низ | ліво/право */</span>
<span class="ln">  border: 2px solid #333; /* товщина стиль колір */</span>
<span class="ln">  margin: 0 auto;         /* верх/низ | auto = центрування */</span>
<span class="ln">}</span>
<span class="ln cmt">/* Реальна ширина без box-sizing: border-box */</span>
<span class="ln">/* = 200 + 24*2 + 2*2 = 252px */</span></code></pre>
      </div>

      <h2>box-sizing — найважливіша властивість</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">/* content-box (за замовчуванням) */</span>
<span class="ln">/* width = тільки контент. Padding і border додаються ЗВЕРХУ */</span>
<span class="ln">.box { width: 200px; padding: 20px; } /* фактично 240px */</span>
<span class="ln">
</span>
<span class="ln cmt">/* border-box (рекомендовано) */</span>
<span class="ln">/* width = контент + padding + border. ВСЕ в одному числі */</span>
<span class="ln">*, *::before, *::after { box-sizing: border-box; }</span>
<span class="ln">.box { width: 200px; padding: 20px; } /* завжди 200px */</span></code></pre>
      </div>

      <h2>Position: 5 значень</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Value</th><th>В потоці?</th><th>Зсув від</th><th>Типовий usecase</th></tr></thead>
          <tbody>
            <tr><td><code>static</code></td><td>✅ Так</td><td>—</td><td>За замовчуванням</td></tr>
            <tr><td><code>relative</code></td><td>✅ Так (місце збережено)</td><td>Власного місця</td><td>Контейнер для absolute дітей</td></tr>
            <tr><td><code>absolute</code></td><td>❌ Ні</td><td>Найближчого non-static предка</td><td>Tooltip, badge, dropdown</td></tr>
            <tr><td><code>fixed</code></td><td>❌ Ні</td><td>Viewport</td><td>Sticky header, cookie banner</td></tr>
            <tr><td><code>sticky</code></td><td>✅ Так (поки в межах предка)</td><td>Viewport (після порогу)</td><td>Sticky nav, table header</td></tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">/* Класичний паттерн: absolute всередині relative */</span>
<span class="ln">.card {</span>
<span class="ln">  position: relative; /* контейнер */</span>
<span class="ln">}</span>
<span class="ln">.badge {</span>
<span class="ln">  position: absolute;</span>
<span class="ln">  top: -8px;</span>
<span class="ln">  right: -8px;        /* кут картки */</span>
<span class="ln">}</span>
<span class="ln">
</span>
<span class="ln cmt">/* sticky: прилипає при скролі */</span>
<span class="ln">.nav {</span>
<span class="ln">  position: sticky;</span>
<span class="ln">  top: 0;             /* поріг прилипання */</span>
<span class="ln">  z-index: 100;</span>
<span class="ln">}</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model" target="_blank" rel="noopener">Box model — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/position" target="_blank" rel="noopener">position — MDN</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Забув <code>box-sizing: border-box</code></strong> — елемент більший ніж очікувано. Завжди додавай глобальний reset.</li>
        <li><strong><code>absolute</code> без <code>relative</code> предка</strong> — елемент позиціонується від <code>&lt;html&gt;</code>, не від батька.</li>
        <li><strong>Margin collapse</strong> — вертикальні margin сусідніх блоків зливаються (більший поглинає менший). Padding не зливається!</li>
        <li><strong><code>z-index</code> без position</strong> — z-index працює тільки на елементах з <code>position</code> ≠ static (або flex/grid дітях).</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>DevTools → Elements → вибери будь-який елемент → вкладка Computed → внизу діаграма Box Model. Перевір значення padding, border, margin.</li>
        <li>Створи <code>.box</code> шириною 200px, padding 20px. Порівняй фактичну ширину з <code>content-box</code> і <code>border-box</code>.</li>
        <li>Зроби картку з badge у правому верхньому куті через <code>position: absolute</code>.</li>
        <li>Додай sticky шапку: при скролі вона прилипає зверху.</li>
        <li>Поясни що станеться якщо двом блокам дати <code>margin-bottom: 20px</code> і <code>margin-top: 30px</code> — яка відстань між ними?</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Яка різниця між <code>content-box</code> і <code>border-box</code>?</li>
        <li>Що таке margin collapse і коли він не відбувається?</li>
        <li>Елемент <code>position: absolute</code> — від чого він позиціонується?</li>
        <li>Коли використовувати <code>fixed</code> vs <code>sticky</code>?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Поясни Box Model»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це padding, margin і border» — без пояснення порядку і взаємодії.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Чотири шари зсередини: content → padding (внутрішній відступ) → border (рамка) → margin (зовнішній відступ). За замовчуванням <code>width</code> задає тільки content. <code>border-box</code> включає padding і border — зручніше для верстки.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке position sticky?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це як fixed» — не розкрита ключова різниця.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Спочатку поводиться як <code>relative</code> (в потоці). При досягненні порогу (наприклад <code>top: 0</code>) прилипає як <code>fixed</code>. Але прокручується разом з батьком, коли той виходить з viewport — на відміну від <code>fixed</code>, який завжди у viewport.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>DevTools: наведи на елемент в Elements панелі — у viewport з'явиться кольорова overlay з box model (синій=content, зелений=padding, помаранчевий=margin).</li>
        <li><code>outline</code> на відміну від <code>border</code> не займає місця в box model — корисно для дебагу без зміщення.</li>
        <li>Margin collapse не відбувається у flex/grid контейнерах, при наявності padding/border у батька, або якщо батько має <code>overflow</code> ≠ visible.</li>
        <li><code>inset: 0</code> — shorthand для <code>top: 0; right: 0; bottom: 0; left: 0</code>. Зручно для absolute overlay.</li>
      </ul>
    </section>
  `,
};
