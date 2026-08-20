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

  '03-flexbox': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Flexbox</strong> (Flexible Box Layout) — одновимірна модель розкладки CSS для розміщення елементів у рядку або стовпці. Ідеальна для навігацій, карток, центрування вмісту та будь-яких компонентів, де потрібно розподілити простір між елементами.</p>
      <p>Ключова ідея: контейнер з <code>display: flex</code> керує розміщенням своїх прямих нащадків (flex-items).</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🚄</span> Аналогія з вагонами поїзда</div>
      <p>Уяви поїзд на рейках. Flex-контейнер — це рейки, flex-items — вагони. Ти можеш вирішити: рівномірно розставити вагони (<code>space-between</code>), зрушити всі до початку (<code>flex-start</code>), або до центру (<code>center</code>). Вагони можуть також «розтягуватись» щоб заповнити місце (<code>flex-grow</code>).</p>
    </section>

    <section>
      <h2>Основні властивості контейнера</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln">.container {</span>
<span class="ln">  display: flex;               <span class="cmt">/* вмикає flexbox */</span></span>
<span class="ln">  flex-direction: row;         <span class="cmt">/* row | column | row-reverse | column-reverse */</span></span>
<span class="ln">  justify-content: flex-start; <span class="cmt">/* вісь: start|center|end|space-between|space-around|space-evenly */</span></span>
<span class="ln">  align-items: stretch;        <span class="cmt">/* поперечна вісь: stretch|center|flex-start|flex-end|baseline */</span></span>
<span class="ln">  flex-wrap: nowrap;           <span class="cmt">/* nowrap | wrap | wrap-reverse */</span></span>
<span class="ln">  gap: 16px;                   <span class="cmt">/* відстань між елементами (row-gap column-gap) */</span></span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>Властивості flex-item</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln">.item {</span>
<span class="ln">  flex-grow: 0;    <span class="cmt">/* наскільки може розрости (0 — не росте) */</span></span>
<span class="ln">  flex-shrink: 1;  <span class="cmt">/* наскільки може стиснутись */</span></span>
<span class="ln">  flex-basis: auto;<span class="cmt">/* базовий розмір перед grow/shrink */</span></span>
<span class="ln">  flex: 1;         <span class="cmt">/* shorthand: grow=1, shrink=1, basis=0 */</span></span>
<span class="ln">  align-self: auto;<span class="cmt">/* перевизначає align-items для цього item */</span></span>
<span class="ln">  order: 0;        <span class="cmt">/* порядок (default 0, менше = першим) */</span></span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>Практичні патерни</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">/* Центрування по обох осях */</span>
<span class="ln">.centered { display: flex; justify-content: center; align-items: center; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Навігація: лого вліво, посилання вправо */</span>
<span class="ln">.nav { display: flex; align-items: center; }</span>
<span class="ln">.nav__logo { margin-right: auto; } <span class="cmt">/* auto «відштовхує» решту вправо */</span></span>
<span class="ln"></span>
<span class="ln cmt">/* Картки однакової висоти рядками */</span>
<span class="ln">.cards { display: flex; flex-wrap: wrap; gap: 16px; }</span>
<span class="ln">.card  { flex: 1 1 280px; } <span class="cmt">/* мін. 280px, розтягується */</span></span>
<span class="ln"></span>
<span class="ln cmt">/* Footer «прилипає» до низу */</span>
<span class="ln">body   { display: flex; flex-direction: column; min-height: 100vh; }</span>
<span class="ln">main   { flex: 1; } <span class="cmt">/* займає весь вільний простір */</span></span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout" target="_blank" rel="noopener noreferrer">CSS Flexbox — MDN</a></li>
          <li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer">A Complete Guide to Flexbox — CSS-Tricks</a></li>
          <li><a href="https://flexboxfroggy.com/#uk" target="_blank" rel="noopener noreferrer">Flexbox Froggy (гра для практики)</a></li>
        </ul>
      </div>
    </section>


    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Плутати main axis і cross axis</strong>: <code>justify-content</code> керує основною віссю (горизонтально за замовчуванням), <code>align-items</code> — поперечною.</li><li><strong>Не задавати висоту контейнеру</strong> для вертикального центрування: <code>align-items: center</code> не центрує якщо контейнер не має висоти.</li><li><strong>Плутати <code>flex: 1</code> з <code>width: 100%</code></strong>: <code>flex: 1</code> розтягує рівномірно між іншими flex-items, <code>width: 100%</code> ігнорує інші items.</li><li><strong>Забувати <code>flex-wrap: wrap</code></strong> — без нього всі items стискаються в один рядок і можуть вийти за межі.</li><li><strong>Зловживати <code>margin</code> замість <code>gap</code></strong>: <code>gap</code> додає відступ тільки між items, не на краях контейнера.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Відкрий <a href="https://codepen.io/pen/" target="_blank" rel="noopener">CodePen</a> або VS Code і виконай:</p>
      <ol>
        <li>Зроби навігацію: лого ліворуч, посилання праворуч через <code>margin-right: auto</code> на лого.</li><li>Зроби три картки однакової висоти в рядок, що переносяться на наступний рядок при малій ширині (<code>flex-wrap: wrap</code>).</li><li>Відцентруй елемент по горизонталі і вертикалі у блоці 400×300px.</li><li>Зроби <code>&lt;body&gt;</code> flex-колонкою так, щоб footer завжди «прилипав» до низу сторінки.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Яка різниця між <code>justify-content</code> і <code>align-items</code>?</li><li>Що означає <code>flex: 1 1 200px</code>?</li><li>Як зробити щоб flex-items переносились на наступний рядок?</li><li>Чим відрізняється <code>align-items</code> від <code>align-self</code>?</li><li>Як відцентрувати один елемент по вертикалі і горизонталі за допомогою flexbox?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Яка різниця між justify-content і align-items?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Обидва центрують елементи» — невірно без уточнення осей.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>justify-content</code> керує розподілом уздовж <em>основної осі</em> (за замовчуванням горизонтальна). <code>align-items</code> — уздовж <em>поперечної осі</em> (за замовчуванням вертикальна). При <code>flex-direction: column</code> осі міняються місцями.</p>
        </article><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Як зробити footer, що завжди внизу?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> <code>position: fixed; bottom: 0</code> — footer перекриє контент.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>body { display: flex; flex-direction: column; min-height: 100vh; }</code> та <code>main { flex: 1; }</code> — main займає весь вільний простір, footer залишається знизу.</p>
        </article><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке flex: 1?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Ширина 100%» — неточно.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>flex: 1</code> — скорочення для <code>flex-grow: 1; flex-shrink: 1; flex-basis: 0</code>. Елемент рівномірно ділить вільний простір з іншими items, що теж мають <code>flex: 1</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>gap</code> замість <code>margin</code> між flex-items — чистіший код: відступи не потрапляють на краї контейнера.</li><li><code>margin: auto</code> на flex-item «поглинає» весь вільний простір на цьому боці — класика для «відштовхування» елемента.</li><li><a href='https://flexboxfroggy.com/#uk' target='_blank' rel='noopener'>Flexbox Froggy</a> — гра для практики в браузері, 24 рівні за 30 хвилин.</li><li>Chrome DevTools → вкладка Elements → значок flex у Styles → візуальний редактор flexbox властивостей прямо в браузері.</li>
      </ul>
    </section>
`,
  '04-grid': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>CSS Grid</strong> — двовимірна система розкладки: одночасно керує рядками і стовпцями. Flexbox чудовий для одновимірних компонентів (рядки або стовпці), Grid — ідеальний для сторінкових лейаутів і складних двовимірних сіток.</p>
      <p>Думай про Grid як про «Excel-таблицю» для CSS: ти задаєш розміри рядків і стовпців, а потім розміщуєш елементи в конкретні клітинки.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🗺️</span> Аналогія з картою міста</div>
      <p>Уяви план міста: вулиці по горизонталі — це рядки, вулиці по вертикалі — стовпці. Будівля може займати одну «квартальну одиницю» або кілька (span). Grid Lines — це вулиці, Grid Areas — квартали.</p>
    </section>

    <section>
      <h2>Основні властивості контейнера</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln">.grid {</span>
<span class="ln">  display: grid;</span>
<span class="ln">  grid-template-columns: 1fr 2fr 1fr;    <span class="cmt">/* три стовпці: 25% 50% 25% */</span></span>
<span class="ln">  grid-template-rows: auto 1fr auto;     <span class="cmt">/* три рядки */</span></span>
<span class="ln">  gap: 16px;                              <span class="cmt">/* row-gap і column-gap */</span></span>
<span class="ln">  column-gap: 24px; row-gap: 16px;       <span class="cmt">/* окремо */</span></span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* auto-fill vs auto-fit — адаптивна сітка без media queries */</span>
<span class="ln">.cards {</span>
<span class="ln">  display: grid;</span>
<span class="ln">  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));</span>
<span class="ln">  gap: 16px;</span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>Розміщення елементів</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">/* Span — елемент займає кілька клітинок */</span>
<span class="ln">.item { grid-column: 1 / 3; }  <span class="cmt">/* від лінії 1 до лінії 3 (2 стовпці) */</span></span>
<span class="ln">.item { grid-column: span 2; } <span class="cmt">/* займає 2 стовпці */</span></span>
<span class="ln">.item { grid-row: 1 / -1; }   <span class="cmt">/* від першого до останнього рядка */</span></span>
<span class="ln"></span>
<span class="ln cmt">/* Named areas — для сторінкового лейауту */</span>
<span class="ln">.layout {</span>
<span class="ln">  display: grid;</span>
<span class="ln">  grid-template-areas:</span>
<span class="ln">    "header header"</span>
<span class="ln">    "sidebar main"</span>
<span class="ln">    "footer footer";</span>
<span class="ln">  grid-template-columns: 240px 1fr;</span>
<span class="ln">  grid-template-rows: auto 1fr auto;</span>
<span class="ln">  min-height: 100vh;</span>
<span class="ln">}</span>
<span class="ln">.header  { grid-area: header; }</span>
<span class="ln">.sidebar { grid-area: sidebar; }</span>
<span class="ln">.main    { grid-area: main; }</span>
<span class="ln">.footer  { grid-area: footer; }</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>fr — fractional unit</h4>
        <table class="params-table">
          <thead><tr><th>Запис</th><th>Результат</th></tr></thead>
          <tbody>
            <tr><td><code>1fr 1fr 1fr</code></td><td>Три рівні стовпці (по 33%)</td></tr>
            <tr><td><code>1fr 2fr</code></td><td>1:2 — другий вдвічі ширший</td></tr>
            <tr><td><code>200px 1fr</code></td><td>Фіксований сайдбар, решта — гнучка</td></tr>
            <tr><td><code>minmax(200px, 1fr)</code></td><td>Від 200px до 1fr</td></tr>
          </tbody>
        </table>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout" target="_blank" rel="noopener noreferrer">CSS Grid Layout — MDN</a></li>
          <li><a href="https://cssgridgarden.com/#uk" target="_blank" rel="noopener noreferrer">Grid Garden (гра для практики)</a></li>
          <li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener noreferrer">Complete Guide to Grid — CSS-Tricks</a></li>
        </ul>
      </div>
    </section>


    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul><li><strong>Плутати Grid і Flexbox</strong>: Grid — двовимірний (рядки + стовпці), Flexbox — одновимірний. Використовуй Grid для лейауту сторінки, Flexbox — для компонентів.</li><li><strong>Забувати про <code>minmax()</code></strong> в адаптивних сітках — <code>repeat(auto-fill, 200px)</code> не адаптується, <code>repeat(auto-fill, minmax(200px, 1fr))</code> — так.</li><li><strong>Плутати <code>auto-fill</code> і <code>auto-fit</code></strong>: <code>auto-fill</code> залишає порожні стовпці, <code>auto-fit</code> стискає їх — при малій кількості items вони займуть весь простір.</li><li><strong>Нумерація Grid Lines з 1</strong>, не з 0. <code>grid-column: 1 / 3</code> — від першої лінії до третьої (тобто 2 стовпці).</li><li><strong>Забувати <code>grid-template-areas</code></strong> при зміні лейауту — замість переписувати координати, просто змінюй ASCII-схему.</li></ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Відкрий <a href="https://codepen.io/pen/" target="_blank" rel="noopener">CodePen</a> або VS Code і виконай:</p>
      <ol><li>Зроби адаптивну сітку карток: мінімум 280px шириною, автоматична кількість стовпців через <code>auto-fill</code> + <code>minmax</code>.</li><li>Зроби класичний сторінковий лейаут: header, sidebar, main content, footer через <code>grid-template-areas</code>.</li><li>Зроби «featured» картку, що займає 2 стовпці через <code>grid-column: span 2</code>.</li><li>Порівняй результат <code>auto-fill</code> і <code>auto-fit</code> коли в сітці лише 2 картки.</li></ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol><li>В чому різниця між Grid і Flexbox? Коли використовувати кожен?</li><li>Що означає <code>1fr</code> і як воно рахується?</li><li>Яка різниця між <code>auto-fill</code> і <code>auto-fit</code>?</li><li>Як зробити елемент що займає всю ширину сітки (<code>span all columns</code>)?</li><li>Що таке <code>grid-template-areas</code> і яка перевага над координатами?</li></ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items"><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Grid чи Flexbox — що вибрати?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Grid завжди краще» або «Flexbox складніший» — спрощення.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Grid — для двовимірних лейаутів (сторінки, таблиці, галереї). Flexbox — для одновимірних компонентів (навігація, рядок кнопок, картка). Часто поєднують: Grid для сторінки, Flexbox всередині компонентів.</p>
        </article><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Як зробити адаптивну сітку без media queries?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Не знаю, завжди використовую media queries».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))</code> — автоматично визначає кількість стовпців залежно від ширини контейнера. Ніяких media queries не потрібно.</p>
        </article><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке fr?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це відсотки».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>fr</code> (fractional unit) — частка вільного простору після відрахування фіксованих розмірів. <code>1fr 2fr</code> ділить простір у відношенні 1:2. Відсотки не враховують gap, fr — враховує.</p>
        </article></div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul><li><a href='https://cssgridgarden.com/#uk' target='_blank' rel='noopener'>Grid Garden</a> — 28 рівнів практики Grid в браузері.</li><li>Chrome DevTools → Elements → іконка grid → візуальний оверлей що показує лінії і номери трек прямо на сторінці.</li><li><code>subgrid</code> (CSS 2023) — дозволяє вкладеним grid-items вирівнюватись по треках батька. Підтримується у всіх сучасних браузерах.</li><li><code>place-items: center</code> — скорочення для <code>align-items: center; justify-items: center</code>. Миттєве центрування всіх items у grid-клітинках.</li></ul>
    </section>
`,
  '05-responsive': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Адаптивна верстка</strong> (responsive design) — підхід, коли сторінка виглядає коректно на будь-якому розмірі екрана: від мобільного телефону до широкого монітора. Головні інструменти: media queries, відносні одиниці та сучасні функції <code>clamp()</code> і container queries.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">💧</span> Аналогія з рідиною</div>
      <p>Адаптивний дизайн — як вода: займає форму того контейнера, в який її наливають. Контент «тече» і перебудовується залежно від розміру екрана, а не просто масштабується.</p>
    </section>

    <section>
      <h2>Media Queries</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">/* Mobile-first: базовий стиль для мобільних, потім розширюємо */</span>
<span class="ln">.card { padding: 16px; font-size: 14px; }</span>
<span class="ln"></span>
<span class="ln">@media (min-width: 768px) {  <span class="cmt">/* tablet */</span></span>
<span class="ln">  .card { padding: 24px; font-size: 16px; }</span>
<span class="ln">}</span>
<span class="ln">@media (min-width: 1200px) { <span class="cmt">/* desktop */</span></span>
<span class="ln">  .card { padding: 32px; font-size: 18px; }</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* Інші умови */</span>
<span class="ln">@media (prefers-color-scheme: dark) { ... }   <span class="cmt">/* темна тема OS */</span></span>
<span class="ln">@media (prefers-reduced-motion: reduce) { ... } <span class="cmt">/* вимкнути анімації */</span></span>
<span class="ln">@media (orientation: landscape) { ... }        <span class="cmt">/* горизонтальна орієнтація */</span></span>
<span class="ln">@media print { ... }                            <span class="cmt">/* для друку */</span></span></code></pre>
      </div>

      <h2><code>clamp()</code> — fluid typography без media queries</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">/* clamp(мін, ідеал, макс) */</span>
<span class="ln">h1 { font-size: clamp(24px, 5vw, 48px); }  <span class="cmt">/* від 24px до 48px плавно */</span></span>
<span class="ln">.container { width: clamp(320px, 90%, 1200px); margin: 0 auto; }</span>
<span class="ln">.card { padding: clamp(16px, 3vw, 32px); }</span>
<span class="ln"></span>
<span class="ln cmt">/* min() і max() */</span>
<span class="ln">.sidebar { width: min(300px, 30vw); }  <span class="cmt">/* менше з двох */</span></span>
<span class="ln">.content  { width: max(200px, 60%); }  <span class="cmt">/* більше з двох */</span></span></code></pre>
      </div>

      <h2>Container Queries (CSS 2023)</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">/* Компонент адаптується до свого контейнера, а не вікна */</span>
<span class="ln">.card-wrapper { container-type: inline-size; }</span>
<span class="ln"></span>
<span class="ln">@container (min-width: 400px) {</span>
<span class="ln">  .card { display: flex; gap: 16px; }  <span class="cmt">/* горизонтальне розташування */</span></span>
<span class="ln">}</span>
<span class="ln">@container (max-width: 399px) {</span>
<span class="ln">  .card { display: block; }            <span class="cmt">/* вертикальне */</span></span>
<span class="ln">}</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Відносні одиниці</h4>
        <table class="params-table">
          <thead><tr><th>Одиниця</th><th>Відносно</th><th>Типове застосування</th></tr></thead>
          <tbody>
            <tr><td><code>%</code></td><td>батьківського елемента</td><td>ширини, відступи</td></tr>
            <tr><td><code>em</code></td><td>font-size поточного елемента</td><td>padding, margin</td></tr>
            <tr><td><code>rem</code></td><td>font-size кореневого елемента (html)</td><td>шрифти, розміри</td></tr>
            <tr><td><code>vw</code></td><td>ширини вікна (1% = 1vw)</td><td>fluid typography</td></tr>
            <tr><td><code>vh</code></td><td>висоти вікна (1% = 1vh)</td><td>hero sections</td></tr>
            <tr><td><code>dvh</code></td><td>динамічна висота вікна (враховує mobile UI)</td><td>замість vh на мобільних</td></tr>
          </tbody>
        </table>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries" target="_blank" rel="noopener noreferrer">CSS Media Queries — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp" target="_blank" rel="noopener noreferrer">clamp() — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries" target="_blank" rel="noopener noreferrer">Container Queries — MDN</a></li>
        </ul>
      </div>
    </section>


    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul><li><strong>Desktop-first замість mobile-first</strong>: <code>max-width</code> у media queries складніше підтримувати. Починай з мобільного базового стилю і розширюй через <code>min-width</code>.</li><li><strong>Використовувати <code>px</code> замість <code>rem</code></strong> для шрифтів — ламає налаштування розміру тексту в браузері, що важливо для accessibility.</li><li><strong>Забувати <code>meta viewport</code></strong> у <code>&lt;head&gt;</code> — без нього mobile viewport буде 980px, і media queries не спрацюють.</li><li><strong>Використовувати <code>vh</code> на мобільних</strong> — адресний рядок мобільного браузера змінює висоту. Замість <code>height: 100vh</code> використовуй <code>height: 100dvh</code>.</li><li><strong>Ігнорувати <code>prefers-reduced-motion</code></strong> — частина користувачів має вестибулярні порушення і важкі анімації викликають дискомфорт.</li></ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Відкрий <a href="https://codepen.io/pen/" target="_blank" rel="noopener">CodePen</a> або VS Code і виконай:</p>
      <ol><li>Зроби навігацію: на мобільному — стовпець, на планшеті та десктопі — рядок. Використовуй mobile-first підхід.</li><li>Задай заголовку <code>font-size: clamp(20px, 5vw, 48px)</code> — спостерігай як розмір плавно змінюється при ресайзі вікна.</li><li>Зроби картку що змінює вигляд (stack vs side-by-side) залежно від розміру <em>контейнера</em> (container queries).</li><li>Додай <code>@media (prefers-color-scheme: dark)</code> з темними кольорами для своєї сторінки.</li></ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol><li>Що таке mobile-first підхід і чому він кращий за desktop-first?</li><li>В чому різниця між <code>em</code> і <code>rem</code>?</li><li>Що робить <code>clamp(20px, 5vw, 48px)</code>?</li><li>Чим container queries відрізняються від media queries?</li><li>Чому <code>vh</code> може не працювати коректно на мобільних?</li></ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items"><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке responsive design?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це коли сайт виглядає добре на мобільному» — надто загально.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Responsive design — підхід, коли інтерфейс адаптується до будь-якого розміру екрана через fluid layouts (відносні одиниці, Grid/Flexbox), media/container queries та гнучкі зображення. Ключові принципи: mobile-first, breakpoints, відносні одиниці.</p>
        </article><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Яка різниця між em і rem?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Обидва відносні до шрифту» — без уточнення різниці.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>em</code> відносний до <code>font-size</code> поточного елемента — може накопичуватись при вкладенні. <code>rem</code> відносний до <code>font-size</code> кореневого <code>&lt;html&gt;</code> — стабільний і передбачуваний. Для шрифтів і відступів краще <code>rem</code>.</p>
        </article><article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке container queries?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Не знаю» або «те саме що media queries».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Container queries дозволяють елементу адаптуватись до розміру свого <em>контейнера</em>, а не вікна браузера. Корисно для компонентів, що використовуються в різних частинах сторінки (сайдбар vs main). Підтримується у всіх сучасних браузерах з 2023р.</p>
        </article></div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul><li><code>dvh</code> (dynamic viewport height) вирішує проблему адресного рядка мобільного браузера — завжди використовуй замість <code>vh</code> для full-screen секцій.</li><li>Breakpoints краще задавати в <code>rem</code>, а не <code>px</code>: якщо користувач збільшив розмір шрифту браузера — лейаут теж адаптується.</li><li><a href='https://utopia.fyi/' target='_blank' rel='noopener'>Utopia.fyi</a> — генератор fluid type scale та space scale через <code>clamp()</code>. Один раз задав — шрифти адаптуються без media queries.</li><li>Chrome DevTools → значок телефону → інструмент «Responsive» — одразу бачиш сайт при різних розмірах екрана та device presets.</li></ul>
    </section>
`,
  '06-variables': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>CSS Custom Properties</strong> (кастомні властивості, або CSS-змінні) — нативні змінні CSS. Оголошуються через <code>--name: value</code> і використовуються через <code>var(--name)</code>. На відміну від SCSS-змінних вони <em>живі</em>: змінюються через JavaScript у runtime і успадковуються в DOM.</p>
      <p><code>@property</code> (CSS Houdini) дозволяє оголосити тип змінної — тоді браузер знає як анімувати її через <code>transition</code> та <code>@keyframes</code>.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🎨</span> Аналогія з палітрою художника</div>
      <p>Кастомні властивості — як іменована палітра: замість щоразу змішувати той самий «brand-blue» ти називаєш його раз і використовуєш скрізь. Захотів змінити тон — міняєш лише в палітрі (<code>:root</code>), а не по всьому полотну.</p>
    </section>

    <section>
      <h2>Оголошення та використання</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* :root — глобальна область видимості */</span>
<span class="ln">:root {</span>
<span class="ln">  --color-primary:  #6366f1;</span>
<span class="ln">  --color-text:     #1e1e2e;</span>
<span class="ln">  --color-bg:       #f8f9fc;</span>
<span class="ln">  --spacing-sm:     8px;</span>
<span class="ln">  --spacing-md:     16px;</span>
<span class="ln">  --spacing-lg:     32px;</span>
<span class="ln">  --border-radius:  8px;</span>
<span class="ln">  --shadow:         0 2px 12px rgba(0,0,0,.08);</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* Використання */</span>
<span class="ln">.btn  { background: var(--color-primary); border-radius: var(--border-radius); }</span>
<span class="ln">.card { padding: var(--spacing-md); box-shadow: var(--shadow); }</span>
<span class="ln"></span>
<span class="ln cmt">/* Fallback — якщо змінна не визначена */</span>
<span class="ln">color: var(--color-accent, #ff6b6b);</span></code></pre>
      </div>

      <h2>Темна тема через кастомні властивості</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln">:root { --bg: #fff; --text: #111; --surface: #f5f5f5; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Варіант 1: data-атрибут на html — перемикається через JS */</span>
<span class="ln">[data-theme="dark"] { --bg: #0f0f1a; --text: #e2e8f0; --surface: #1a1a2e; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Варіант 2: системна перевага OS */</span>
<span class="ln">@media (prefers-color-scheme: dark) {</span>
<span class="ln">  :root { --bg: #0f0f1a; --text: #e2e8f0; }</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* Всі елементи адаптуються автоматично */</span>
<span class="ln">body { background: var(--bg); color: var(--text); }</span></code></pre>
      </div>

      <h2>Динамічне оновлення через JavaScript</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">// Читання</span>
<span class="ln">getComputedStyle(document.documentElement).getPropertyValue('--color-primary');</span>
<span class="ln"></span>
<span class="ln cmt">// Запис</span>
<span class="ln">document.documentElement.style.setProperty('--color-primary', '#ff6b6b');</span>
<span class="ln"></span>
<span class="ln cmt">// Перемикач теми</span>
<span class="ln">btn.addEventListener('click', () =></span>
<span class="ln">  document.documentElement.dataset.theme =</span>
<span class="ln">    document.documentElement.dataset.theme === 'dark' ? '' : 'dark'</span>
<span class="ln">);</span></code></pre>
      </div>

      <h2><code>@property</code> — типізовані змінні для анімацій</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* Без @property браузер не знає тип — не може інтерполювати */</span>
<span class="ln">@property --angle {</span>
<span class="ln">  syntax: '&lt;angle&gt;';</span>
<span class="ln">  inherits: false;</span>
<span class="ln">  initial-value: 0deg;</span>
<span class="ln">}</span>
<span class="ln">.gradient {</span>
<span class="ln">  background: conic-gradient(from var(--angle), #6366f1, #ec4899, #6366f1);</span>
<span class="ln">  animation: spin 4s linear infinite;</span>
<span class="ln">}</span>
<span class="ln">@keyframes spin { to { --angle: 360deg; } }</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" target="_blank" rel="noopener noreferrer">CSS Custom Properties — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@property" target="_blank" rel="noopener noreferrer">@property — MDN</a></li>
          <li><a href="https://open-props.style/" target="_blank" rel="noopener noreferrer">Open Props — готова бібліотека CSS-змінних</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Плутати CSS Variables і SCSS-змінні</strong>: SCSS-змінні — статичні, компілюються у значення. CSS-змінні — живі, доступні в runtime через JS.</li>
        <li><strong>Не вказувати fallback</strong>: якщо змінна не визначена — властивість стає <code>initial</code>. Завжди: <code>var(--color, #000)</code>.</li>
        <li><strong>Незрозумілі назви</strong>: <code>--c1</code>, <code>--x</code> — погано. Використовуй семантику: <code>--color-primary</code>, <code>--spacing-sm</code>.</li>
        <li><strong>Намагатись анімувати без <code>@property</code></strong>: без оголошення типу браузер не може інтерполювати числові значення.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Відкрий <a href="https://codepen.io/pen/" target="_blank" rel="noopener">CodePen</a> або VS Code і виконай:</p>
      <ol>
        <li>Створи design token систему у <code>:root</code>: кольори, відступи, радіуси. Застосуй до кількох компонентів.</li>
        <li>Реалізуй перемикач темної теми через <code>data-theme</code> атрибут і JavaScript.</li>
        <li>Зроби компонент кнопки що повністю стилізується через CSS-змінні — без жодного хардкодованого кольору.</li>
        <li>Спробуй <code>@property</code>: анімований gradient angle з прикладу вище.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>В чому різниця між CSS Custom Properties і SCSS-змінними?</li>
        <li>Що таке fallback у <code>var()</code> і коли він спрацьовує?</li>
        <li>Як реалізувати темну тему через кастомні властивості?</li>
        <li>Як прочитати і записати CSS-змінну через JavaScript?</li>
        <li>Навіщо потрібен <code>@property</code> і що він додає?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке CSS Custom Properties?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це те саме що SCSS змінні» — неточно.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> CSS Custom Properties — нативні змінні, оголошуються через <code>--name</code>, використовуються через <code>var()</code>. На відміну від SCSS — живі: змінюються через JS, наслідуються в DOM, доступні у runtime.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Як зробити темну тему?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Окремий CSS-файл для темного режиму».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> CSS Custom Properties + <code>[data-theme="dark"]</code>: у <code>:root</code> оголошуємо змінні, у <code>[data-theme="dark"]</code> перевизначаємо їх. JS тільки перемикає атрибут — стилі оновлюються автоматично.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>CSS-змінну можна задати на будь-якому елементі — вона буде доступна тільки всередині нього. Зручно для «тем» компонентів.</li>
        <li><code>color-mix(in oklch, var(--color) 50%, white)</code> — нативний спосіб освітлити колір без SCSS <code>lighten()</code>.</li>
        <li><a href="https://open-props.style/" target="_blank" rel="noopener">Open Props</a> — готова бібліотека CSS-змінних (кольори, тіні, анімації). Підключається одним рядком.</li>
        <li>Chrome DevTools → Elements → computed styles показує реальні значення CSS-змінних для обраного елемента.</li>
      </ul>
    </section>
`,
  '07-animations': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>CSS Transitions</strong> плавно змінюють одне значення властивості в інше при зміні стану (наприклад, <code>:hover</code>). <strong>CSS Animations</strong> (<code>@keyframes</code>) дозволяють створювати складні багатокрокові анімації що запускаються автоматично або за допомогою класу.</p>
      <p><code>will-change</code> підказує браузеру заздалегідь оптимізувати рендеринг елемента, що буде анімуватись — але зловживання ним шкодить продуктивності.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🎬</span> Аналогія з кіно</div>
      <p>Transition — це плавний перехід між двома кадрами (A → B). Animation (@keyframes) — це цілий фільм зі сценарієм: ключові кадри 0%, 50%, 100%, де на кожному щось відбувається.</p>
    </section>

    <section>
      <h2>transition — плавні переходи</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* transition: властивість тривалість функція затримка */</span>
<span class="ln">.btn {</span>
<span class="ln">  background: #6366f1;</span>
<span class="ln">  transform: translateY(0);</span>
<span class="ln">  box-shadow: 0 2px 8px rgba(0,0,0,.15);</span>
<span class="ln">  transition: background 0.2s ease,</span>
<span class="ln">              transform  0.2s ease,</span>
<span class="ln">              box-shadow 0.2s ease;</span>
<span class="ln">}</span>
<span class="ln">.btn:hover {</span>
<span class="ln">  background: #4f46e5;</span>
<span class="ln">  transform: translateY(-2px);</span>
<span class="ln">  box-shadow: 0 6px 20px rgba(99,102,241,.4);</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* Easing functions */</span>
<span class="ln">transition-timing-function: ease;              /* за замовч. */</span>
<span class="ln">transition-timing-function: ease-in-out;       /* плавніше */</span>
<span class="ln">transition-timing-function: cubic-bezier(.34,1.56,.64,1); /* spring */</span>
<span class="ln">transition-timing-function: linear(0,1);       /* CSS 2023 */</span></code></pre>
      </div>

      <h2>@keyframes — складні анімації</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* Оголошення keyframes */</span>
<span class="ln">@keyframes fadeInUp {</span>
<span class="ln">  from { opacity: 0; transform: translateY(24px); }</span>
<span class="ln">  to   { opacity: 1; transform: translateY(0); }</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln">@keyframes pulse {</span>
<span class="ln">  0%, 100% { transform: scale(1); }</span>
<span class="ln">  50%       { transform: scale(1.05); }</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* Застосування */</span>
<span class="ln">.card {</span>
<span class="ln">  animation: fadeInUp 0.4s ease both;   /* both = зберігає кінцевий стан */</span>
<span class="ln">}</span>
<span class="ln">.badge {</span>
<span class="ln">  animation: pulse 2s ease-in-out infinite;</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* animation shorthand */</span>
<span class="ln">/* name duration timing-fn delay iteration direction fill-mode */</span>
<span class="ln">animation: fadeInUp 0.4s ease 0.1s 1 normal both;</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Властивості animation</h4>
        <table class="params-table">
          <thead><tr><th>Властивість</th><th>Значення</th><th>Що робить</th></tr></thead>
          <tbody>
            <tr><td><code>animation-duration</code></td><td><code>0.3s</code>, <code>1s</code></td><td>Тривалість одного циклу</td></tr>
            <tr><td><code>animation-iteration-count</code></td><td><code>1</code>, <code>infinite</code></td><td>Кількість повторень</td></tr>
            <tr><td><code>animation-direction</code></td><td><code>normal</code>, <code>reverse</code>, <code>alternate</code></td><td>Напрямок відтворення</td></tr>
            <tr><td><code>animation-fill-mode</code></td><td><code>none</code>, <code>both</code>, <code>forwards</code></td><td>Стан до/після анімації</td></tr>
            <tr><td><code>animation-play-state</code></td><td><code>running</code>, <code>paused</code></td><td>Пауза через JS</td></tr>
          </tbody>
        </table>
      </div>

      <h2><code>will-change</code> та GPU-шар</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* will-change: підказує браузеру виділити GPU-шар заздалегідь */</span>
<span class="ln">.modal { will-change: transform, opacity; }</span>
<span class="ln"></span>
<span class="ln cmt">/* ⚠️ Не зловживай: GPU-шари займають VRAM */</span>
<span class="ln cmt">/* Додавай only перед анімацією, прибирай після */</span>
<span class="ln">el.addEventListener('mouseenter', () => el.style.willChange = 'transform');</span>
<span class="ln">el.addEventListener('animationend', () => el.style.willChange = 'auto');</span>
<span class="ln"></span>
<span class="ln cmt">/* Анімуй тільки: opacity, transform, filter — вони не тригерять reflow */</span>
<span class="ln cmt">/* Ніколи не анімуй: width, height, top, left — дорогий repaint */</span></code></pre>
      </div>

      <h2>Поважай налаштування користувача</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* Вимикай анімації якщо користувач вибрав "Зменшити рух" в OS */</span>
<span class="ln">@media (prefers-reduced-motion: reduce) {</span>
<span class="ln">  *, *::before, *::after {</span>
<span class="ln">    animation-duration: 0.01ms !important;</span>
<span class="ln">    animation-iteration-count: 1 !important;</span>
<span class="ln">    transition-duration: 0.01ms !important;</span>
<span class="ln">    scroll-behavior: auto !important;</span>
<span class="ln">  }</span>
<span class="ln">}</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація та інструменти</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations" target="_blank" rel="noopener noreferrer">CSS Animations — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition" target="_blank" rel="noopener noreferrer">transition — MDN</a></li>
          <li><a href="https://easings.net/" target="_blank" rel="noopener noreferrer">easings.net — каталог easing функцій з демо</a></li>
          <li><a href="https://cubic-bezier.com/" target="_blank" rel="noopener noreferrer">cubic-bezier.com — візуальний редактор кривих</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Анімувати властивості що тригерять reflow</strong>: <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code> — браузер перераховує весь лейаут. Завжди використовуй <code>transform</code> та <code>opacity</code>.</li>
        <li><strong>Забути <code>prefers-reduced-motion</code></strong>: частина користувачів має вестибулярні порушення, важкі анімації викликають фізичний дискомфорт.</li>
        <li><strong>Зловживати <code>will-change</code></strong>: додавання на всі елементи займає VRAM і може уповільнити рендеринг.</li>
        <li><strong>Не використовувати <code>animation-fill-mode: both</code></strong>: без нього елемент «стрибає» на початкову позицію після анімації.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Відкрий <a href="https://codepen.io/pen/" target="_blank" rel="noopener">CodePen</a> або VS Code і виконай:</p>
      <ol>
        <li>Зроби кнопку з 3 різними transition властивостями (колір, transform, box-shadow) при <code>:hover</code>.</li>
        <li>Анімуй появу картки через <code>@keyframes fadeInUp</code> з затримкою у 0.1s.</li>
        <li>Зроби безкінечно пульсуючу індикаторну крапку (як "typing..." у месенджері).</li>
        <li>Додай <code>@media (prefers-reduced-motion: reduce)</code> і перевір у DevTools → Rendering → Emulate CSS media feature.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Яка різниця між <code>transition</code> і <code>animation</code>?</li>
        <li>Чому варто анімувати <code>transform</code> замість <code>width/height</code>?</li>
        <li>Що таке <code>animation-fill-mode: both</code> і коли це потрібно?</li>
        <li>Навіщо <code>will-change</code> і чому не можна ставити його всюди?</li>
        <li>Що таке <code>prefers-reduced-motion</code> і хто ним користується?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Як зробити плавну анімацію без "стрибків"?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Збільшити duration» або «використати JavaScript».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Анімувати тільки <code>transform</code> та <code>opacity</code> — вони не тригерять reflow/repaint, виконуються на GPU. Для «стрибків» після анімації — <code>animation-fill-mode: both</code>. Для плавності — <code>will-change: transform</code> до початку анімації.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що перевіряєш після додавання анімацій?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Нічого, якщо виглядає добре — ОК».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> (1) <code>prefers-reduced-motion</code> — чи вимикається для тих хто чутливий. (2) Performance tab у DevTools — чи є jank (frames > 16ms). (3) Mobile — менш потужне залізо, складні анімації можуть гальмувати.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>linear()</code> (CSS 2023) — дозволяє задати довільну криву через набір точок, без <code>cubic-bezier</code>. Ідеально для spring-анімацій.</li>
        <li>Chrome DevTools → More tools → Animations — записує всі CSS-анімації на сторінці, дозволяє уповільнити і відтворити покадрово.</li>
        <li><code>animation-timeline: scroll()</code> (CSS Scroll-driven Animations, 2023) — анімація залежно від позиції скролу, без JavaScript.</li>
        <li><a href="https://easings.net/" target="_blank" rel="noopener">easings.net</a> — каталог кривих з копіпастним кодом і живим демо.</li>
      </ul>
    </section>
`,
  '08-modern': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Сучасний CSS</strong> — це потужні функції що з'явились в 2022–2024 роках і вже підтримуються у всіх сучасних браузерах. Вони суттєво спрощують код, усувають потребу в JavaScript та препроцесорах для багатьох задач.</p>
      <p>Ключові нові інструменти: <code>:has()</code>, <code>@layer</code>, <code>@scope</code>, нативний CSS nesting та container queries.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🚀</span> CSS 2024 — як нова версія мови</div>
      <p>Якщо CSS 2010 був як калькулятор, то CSS 2024 — як повноцінна мова програмування для стилів: умови, вкладеність, ізоляція областей видимості. Те що раніше вимагало SCSS або JavaScript тепер вбудовано нативно.</p>
    </section>

    <section>
      <h2><code>:has()</code> — «батьківський» селектор</h2>
      <p>До 2022 року CSS не мав батьківського селектора — це була найдовше очікувана фіча. <code>:has()</code> вибирає елемент <em>що містить</em> певних нащадків.</p>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* Картка що має зображення — без padding зверху */</span>
<span class="ln">.card:has(img) { padding-top: 0; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Форма з невалідним полем — показати повідомлення */</span>
<span class="ln">form:has(input:invalid) .error-msg { display: block; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Навігація що має відкрите меню */</span>
<span class="ln">nav:has(.menu:not([hidden])) { background: rgba(0,0,0,.5); }</span>
<span class="ln"></span>
<span class="ln cmt">/* li що НЕ є останнім і містить вкладений ul */</span>
<span class="ln">li:not(:last-child):has(ul) { border-bottom: 1px solid; }</span>
<span class="ln"></span>
<span class="ln cmt">/* Раніше це потребувало JavaScript! */</span></code></pre>
      </div>

      <h2><code>@layer</code> — каскадні шари</h2>
      <p><code>@layer</code> дозволяє явно керувати пріоритетом CSS-правил, не залежачи від специфічності. Стилі у пізнішому шарі перемагають ранніший незалежно від специфічності.</p>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* Оголошення порядку шарів (від найнижчого до найвищого) */</span>
<span class="ln">@layer reset, base, components, utilities;</span>
<span class="ln"></span>
<span class="ln">@layer reset {</span>
<span class="ln">  * { box-sizing: border-box; margin: 0; }</span>
<span class="ln">}</span>
<span class="ln">@layer base {</span>
<span class="ln">  body { font-family: Inter, sans-serif; }</span>
<span class="ln">}</span>
<span class="ln">@layer components {</span>
<span class="ln">  .btn { padding: 8px 16px; background: var(--color-primary); }</span>
<span class="ln">}</span>
<span class="ln">@layer utilities {</span>
<span class="ln">  /* utilities завжди перемагають components, навіть з нижчою специфічністю */</span>
<span class="ln">  .mt-4 { margin-top: 16px; }</span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>Нативний CSS Nesting</h2>
      <p>Тепер можна вкладати CSS-правила одне в одне — без SCSS!</p>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* Нативний nesting (без SCSS) */</span>
<span class="ln">.card {</span>
<span class="ln">  padding: 16px;</span>
<span class="ln">  border-radius: 8px;</span>
<span class="ln"></span>
<span class="ln">  & .title { font-size: 1.25rem; font-weight: 600; }</span>
<span class="ln">  & .body   { color: var(--text-muted); }</span>
<span class="ln"></span>
<span class="ln">  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,.12); }</span>
<span class="ln"></span>
<span class="ln">  @media (min-width: 768px) {</span>
<span class="ln">    display: grid;</span>
<span class="ln">    grid-template-columns: 1fr 2fr;</span>
<span class="ln">  }</span>
<span class="ln">}</span></code></pre>
      </div>

      <h2><code>@scope</code> — ізоляція стилів компонента</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">/* Стилі застосовуються тільки всередині .card */</span>
<span class="ln">@scope (.card) {</span>
<span class="ln">  .title { font-size: 1.25rem; }  /* тільки .title в .card */</span>
<span class="ln">  img    { border-radius: 8px; }  /* тільки img в .card */</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* @scope з виключенням вкладеного компонента */</span>
<span class="ln">@scope (.card) to (.nested-card) {</span>
<span class="ln">  /* не зачіпає .nested-card всередині .card */</span>
<span class="ln">  .title { color: var(--color-primary); }</span>
<span class="ln">}</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Підтримка браузерами (2024)</h4>
        <table class="params-table">
          <thead><tr><th>Функція</th><th>Chrome</th><th>Firefox</th><th>Safari</th></tr></thead>
          <tbody>
            <tr><td><code>:has()</code></td><td>105+</td><td>121+</td><td>15.4+</td></tr>
            <tr><td><code>@layer</code></td><td>99+</td><td>97+</td><td>15.4+</td></tr>
            <tr><td>CSS Nesting</td><td>112+</td><td>117+</td><td>17.2+</td></tr>
            <tr><td><code>@scope</code></td><td>118+</td><td>—</td><td>17.4+</td></tr>
            <tr><td>Container Queries</td><td>105+</td><td>110+</td><td>16+</td></tr>
          </tbody>
        </table>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has" target="_blank" rel="noopener noreferrer">:has() — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" target="_blank" rel="noopener noreferrer">@layer — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting" target="_blank" rel="noopener noreferrer">CSS Nesting — MDN</a></li>
          <li><a href="https://caniuse.com/" target="_blank" rel="noopener noreferrer">caniuse.com — перевірка підтримки браузерами</a></li>
          <li><a href="https://web.dev/blog/css-wrapped-2023" target="_blank" rel="noopener noreferrer">CSS Wrapped 2023 — web.dev</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Не перевіряти підтримку браузерами</strong>: <code>@scope</code> ще не підтримується Firefox. Для продакшену перевіряй <a href="https://caniuse.com/" target="_blank" rel="noopener">caniuse.com</a>.</li>
        <li><strong>Плутати <code>:has()</code> зі специфічністю <code>:is()</code></strong>: <code>:has(#id)</code> має специфічність 1-0-0 через аргумент.</li>
        <li><strong>Оголошення <code>@layer</code> без порядку</strong>: якщо не оголосити <code>@layer a, b, c</code> на початку, порядок визначається першим входженням — це може здивувати.</li>
        <li><strong>Вкладати медіа-запити в nesting на старих проектах</strong>: nesting підтримується з Chrome 112, перевіряй БД підтримки якщо потрібна сумісність зі старішими браузерами.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Відкрий <a href="https://codepen.io/pen/" target="_blank" rel="noopener">CodePen</a> або VS Code і виконай:</p>
      <ol>
        <li>Використай <code>:has()</code> щоб приховати порожній стан списку: <code>ul:not(:has(li)) + .empty-msg { display: block; }</code>.</li>
        <li>Перепиши будь-який вкладений SCSS (або довгі CSS-правила) в нативний CSS Nesting.</li>
        <li>Організуй стилі проекту в <code>@layer</code> шари: reset, base, components, utilities.</li>
        <li>Зроби компонент картки із <code>@scope</code> — стилі всередині не впливають на зовнішній документ.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Що таке <code>:has()</code> і наведи 3 практичних приклади де він замінює JavaScript.</li>
        <li>Як <code>@layer</code> вирішує проблему конфліктів специфічності?</li>
        <li>Яка різниця між CSS Nesting і SCSS nesting?</li>
        <li>Що таке <code>@scope</code> і яку проблему він вирішує?</li>
        <li>Як перевірити підтримку нової CSS-функції перед використанням у продакшені?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що нового в CSS за останні 2 роки?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Нічого нового» або «не слідкую».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>:has()</code> — батьківський селектор (замінює JS для умовних стилів). <code>@layer</code> — шари каскаду (вирішує проблему специфічності в design systems). Нативний CSS Nesting (без SCSS). Container Queries. <code>@scope</code>. CSS Scroll-driven Animations. <code>color-mix()</code>, <code>light-dark()</code>.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Як організувати CSS без конфліктів специфічності?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Ставлю <code>!important</code> коли не працює».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>@layer</code> вирішує це системно: оголошуємо порядок шарів <code>reset → base → components → utilities</code>. Utilities завжди перемагають components навіть з нижчою специфічністю. Ніяких <code>!important</code> та «гонки специфічностей».</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>light-dark(lightColor, darkColor)</code> (CSS 2024) — автоматично обирає колір залежно від теми. Замість медіа-запиту: просто <code>color: light-dark(#111, #eee)</code>.</li>
        <li><a href="https://web.dev/blog/css-wrapped-2023" target="_blank" rel="noopener">CSS Wrapped 2023</a> — щорічний підсумок web.dev: всі нові CSS-функції з прикладами. Читай щороку.</li>
        <li>CSS <code>@starting-style</code> (Chrome 117+) — анімація появи елемента від <code>display: none</code>. Нарешті можна анімувати відкриття <code>&lt;dialog&gt;</code> без JS!</li>
        <li>Архів <code>@layer</code> для третьостороннього CSS: <code>@import url("bootstrap.css") layer(vendor);</code> — Bootstrap тепер в ізольованому шарі з найнижчим пріоритетом.</li>
      </ul>
    </section>
`,
};
