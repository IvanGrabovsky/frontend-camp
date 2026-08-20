// Lesson HTML content for the "js-basics" course

export const LESSONS_HTML: Record<string, string> = {
  '01-variables': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Змінна</strong> — це іменоване місце в пам'яті, де зберігається значення. JavaScript має три способи оголосити змінну: <code>var</code> (застарілий), <code>let</code> (для значень що змінюються) і <code>const</code> (для констант).</p>
      <p><strong>Тип даних</strong> визначає що може зберігатись у змінній: число, рядок, булеве значення, <code>null</code>, <code>undefined</code>, об'єкт, або <code>Symbol</code>.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📦</span> Аналогія: коробки з підписами</div>
      <p>Змінна — як підписана коробка. <code>const</code> — запаяна коробка (не можна змінити вміст). <code>let</code> — відкрита коробка (вміст можна замінити). Тип даних — це те що всередині: число, текст, або «нічого» (<code>null</code>).</p>
    </section>

    <section>
      <h2>let та const</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">// const — значення не змінюється (рекомендований за замовчуванням)</span>
<span class="ln">const name = 'Іван';</span>
<span class="ln">const age  = 25;</span>
<span class="ln">const PI   = 3.14159;</span>
<span class="ln"></span>
<span class="ln cmt">// let — значення може змінитись</span>
<span class="ln">let score = 0;</span>
<span class="ln">score = 10;   // OK</span>
<span class="ln">score += 5;   // OK → 15</span>
<span class="ln"></span>
<span class="ln cmt">// ❌ const — не можна перевизначити</span>
<span class="ln">const MAX = 100;</span>
<span class="ln">MAX = 200; // TypeError: Assignment to constant variable</span></code></pre>
      </div>

      <h2>Типи даних</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати код"></button></div>
        <pre><code><span class="ln cmt">// Примітивні типи</span>
<span class="ln">const str  = 'Привіт, світе!';   // string</span>
<span class="ln">const num  = 42;                  // number</span>
<span class="ln">const big  = 9007199254740993n;   // bigint</span>
<span class="ln">const bool = true;                // boolean</span>
<span class="ln">const empty = null;               // null — навмисна відсутність</span>
<span class="ln">let notSet;                       // undefined — ще не задано</span>
<span class="ln">const id = Symbol('unique');      // symbol</span>
<span class="ln"></span>
<span class="ln cmt">// typeof — визначити тип</span>
<span class="ln">typeof 'text'   // 'string'</span>
<span class="ln">typeof 42       // 'number'</span>
<span class="ln">typeof true     // 'boolean'</span>
<span class="ln">typeof null     // 'object' ← відома помилка JS!</span>
<span class="ln">typeof undefined // 'undefined'</span>
<span class="ln"></span>
<span class="ln cmt">// Template literals — рядки з виразами</span>
<span class="ln">const greeting = \`Привіт, ${name}! Тобі ${age} років.\`;</span>
<span class="ln">const multiline = \`</span>
<span class="ln">  Рядок перший</span>
<span class="ln">  Рядок другий</span>
<span class="ln">\`;</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Порівняння let / const / var</h4>
        <table class="params-table">
          <thead><tr><th></th><th>const</th><th>let</th><th>var</th></tr></thead>
          <tbody>
            <tr><td>Перевизначення</td><td>❌</td><td>✅</td><td>✅</td></tr>
            <tr><td>Область видимості</td><td>block</td><td>block</td><td>function</td></tr>
            <tr><td>Hoisting</td><td>TDZ</td><td>TDZ</td><td>undefined</td></tr>
            <tr><td>Рекомендований</td><td>✅ завжди</td><td>✅ якщо змінюється</td><td>❌ не використовуй</td></tr>
          </tbody>
        </table>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures" target="_blank" rel="noopener noreferrer">JavaScript data types — MDN</a></li>
          <li><a href="https://javascript.info/variables" target="_blank" rel="noopener noreferrer">Variables — javascript.info</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Використовувати <code>var</code></strong>: function-scope і hoisting створюють несподівані баги. Завжди використовуй <code>const</code>/<code>let</code>.</li>
        <li><strong>Плутати <code>null</code> і <code>undefined</code></strong>: <code>null</code> — ти навмисно встановив «нічого». <code>undefined</code> — значення ще не задано.</li>
        <li><strong><code>typeof null === 'object'</code></strong>: відома помилка JS з 1995 року. Для перевірки null використовуй <code>=== null</code>.</li>
        <li><strong>Перевизначати <code>const</code> об'єкти</strong>: <code>const arr = []</code> — не можна змінити <em>посилання</em> на масив, але можна змінювати його <em>вміст</em>: <code>arr.push(1)</code> — це OK.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Відкрий консоль браузера (F12) або <a href="https://codepen.io/pen/" target="_blank" rel="noopener">CodePen</a>:</p>
      <ol>
        <li>Оголоси <code>const</code> для свого імені та року народження. Обрахуй вік через <code>new Date().getFullYear()</code>.</li>
        <li>Виведи <code>typeof</code> для 5 різних значень. Перевір <code>typeof null</code> — це сюрприз!</li>
        <li>Створи template literal з привітанням: «Привіт, [ім'я]! Тобі [вік] років.»</li>
        <li>Спробуй перевизначити <code>const</code> і подивись на помилку в консолі.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Яка різниця між <code>let</code> і <code>const</code>?</li>
        <li>Чому не варто використовувати <code>var</code>?</li>
        <li>Що поверне <code>typeof null</code> і чому це дивно?</li>
        <li>Як написати багаторядковий рядок без конкатенації?</li>
        <li>Чи можна додати елемент до <code>const arr = []</code>?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «В чому різниця між let, const та var?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «const — для констант, let — для змінних, var — застарілий» — поверхнево.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>const</code>/<code>let</code> — block scope (видимі тільки в межах блоку <code>{}</code>). <code>var</code> — function scope і hoisting (підіймається на початок функції зі значенням <code>undefined</code>). <code>const</code> не дозволяє перевизначення (але мутацію об'єктів — дозволяє). TDZ (Temporal Dead Zone) — звернення до <code>let</code>/<code>const</code> до їх оголошення кидає <code>ReferenceError</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>Правило: <strong>завжди починай з <code>const</code></strong>. Якщо потрібно перевизначити — зміни на <code>let</code>. Це мінімізує мутації і робить код передбачуваним.</li>
        <li><code>Number.isNaN()</code> — надійніший спосіб перевірити NaN ніж <code>isNaN()</code>: <code>isNaN('text') === true</code>, а <code>Number.isNaN('text') === false</code>.</li>
        <li>Nullish coalescing: <code>const val = input ?? 'default'</code> — повертає <code>'default'</code> тільки якщо <code>input</code> є <code>null</code> або <code>undefined</code> (не <code>0</code> або <code>''</code>).</li>
      </ul>
    </section>
`,
  '02-operators': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Оператори</strong> — символи або ключові слова що виконують дії над значеннями. JS має арифметичні, порівняльні, логічні, присвоювання та спеціальні оператори. Розуміння <strong>суворого порівняння</strong> (<code>===</code> vs <code>==</code>) та <strong>короткого замикання</strong> є ключовим для уникнення типових багів.</p>
    </article>
    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">⚖️</span> Аналогія: операторові як правила гри</div>
      <p>Уяви гру де є правила: «+» додає очки, «===» — суворий суддя що перевіряє і значення і тип, «==» — ліберальний суддя що спочатку конвертує типи. Логічний <code>&&</code> — як «і те, і це», <code>||</code> — «або те, або це».</p>
    </section>
    <section>
      <h2>Арифметичні та присвоювання</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln">let x = 10;</span>
<span class="ln">x + 3   // 13    x - 3  // 7</span>
<span class="ln">x * 2   // 20    x / 4  // 2.5</span>
<span class="ln">x % 3   // 1  ← залишок від ділення</span>
<span class="ln">x ** 2  // 100 ← степінь</span>
<span class="ln"></span>
<span class="ln cmt">// Скорочені присвоювання</span>
<span class="ln">x += 5;  // x = x + 5 = 15</span>
<span class="ln">x -= 3;  // x = 12</span>
<span class="ln">x++;     // x = 13 (після виразу)</span>
<span class="ln">++x;     // x = 14 (до виразу)</span></code></pre>
      </div>

      <h2>Порівняння: === vs ==</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// === суворе — перевіряє значення І тип</span>
<span class="ln">1 === 1     // true</span>
<span class="ln">1 === '1'   // false ← різні типи</span>
<span class="ln">0 === false // false</span>
<span class="ln"></span>
<span class="ln cmt">// == нестрогe — конвертує типи (не рекомендоване)</span>
<span class="ln">1 == '1'   // true  ← JavaScript зробив '1' → 1</span>
<span class="ln">0 == false // true  ← false → 0</span>
<span class="ln">null == undefined // true  ← особливий випадок</span>
<span class="ln"></span>
<span class="ln cmt">// ЗАВЖДИ використовуй === і !== </span></code></pre>
      </div>

      <h2>Логічні оператори та коротке замикання</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// && — AND: повертає перше falsy або останнє значення</span>
<span class="ln">true && 'hello'   // 'hello'</span>
<span class="ln">false && 'hello'  // false  ← зупинився на false</span>
<span class="ln">const user = { name: 'Іван' };</span>
<span class="ln">user && user.name  // 'Іван'  ← безпечний доступ</span>
<span class="ln"></span>
<span class="ln cmt">// || — OR: повертає перше truthy або останнє значення</span>
<span class="ln">null || 'default'   // 'default'</span>
<span class="ln">'value' || 'default' // 'value'</span>
<span class="ln"></span>
<span class="ln cmt">// ?? — Nullish Coalescing: тільки null/undefined</span>
<span class="ln">0 || 'default'  // 'default' ← 0 falsy!</span>
<span class="ln">0 ?? 'default'  // 0         ← 0 не null/undefined</span>
<span class="ln"></span>
<span class="ln cmt">// ?. — Optional Chaining</span>
<span class="ln">const city = user?.address?.city; // undefined замість помилки</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://javascript.info/operators" target="_blank" rel="noopener noreferrer">Оператори — javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators" target="_blank" rel="noopener noreferrer">Operators — MDN</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Використовувати <code>==</code> замість <code>===</code></strong>: неявна конверсія типів — джерело важко відловлюваних багів.</li>
        <li><strong>Плутати <code>||</code> і <code>??</code></strong>: <code>||</code> вважає <code>0</code>, <code>''</code>, <code>false</code> falsy-значеннями. <code>??</code> — тільки <code>null</code>/<code>undefined</code>.</li>
        <li><strong>Не використовувати <code>?.</code></strong>: доступ до властивості без перевірки (<code>user.address.city</code>) кидає помилку якщо <code>address</code> є <code>undefined</code>.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Перевір в консолі: <code>0 == false</code>, <code>0 === false</code>, <code>'' == false</code>, <code>null == undefined</code>.</li>
        <li>Напиши вираз що повертає ім'я користувача або <code>'Гість'</code> якщо ім'я не задане (використай <code>??</code>).</li>
        <li>Створи об'єкт <code>user</code> без поля <code>address</code>. Безпечно отримай <code>user?.address?.city</code>.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Що поверне <code>null == undefined</code> і <code>null === undefined</code>?</li>
        <li>Яка різниця між <code>||</code> і <code>??</code>?</li>
        <li>Що таке «коротке замикання» в логічних операторах?</li>
        <li>Навіщо <code>?.</code> і яку помилку він запобігає?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Яка різниця між == і ===?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «== швидший, тому я його і використовую».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>===</code> — суворе рівність: перевіряє і значення і тип без конверсії. <code>==</code> виконує type coercion перед порівнянням (<code>'1' == 1 → true</code>). Завжди використовуй <code>===</code> — поведінка передбачувана і явна.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>Оператор <code>!</code> (NOT) конвертує значення в boolean: <code>!!'text' === true</code>, <code>!!'' === false</code>. Подвійний <code>!!</code> — швидкий спосіб перетворити на boolean.</li>
        <li><code>??=</code> (Logical Nullish Assignment): <code>x ??= 'default'</code> — присвоює тільки якщо <code>x</code> є <code>null</code>/<code>undefined</code>.</li>
        <li><code>x ||= y</code> та <code>x &&= y</code> — логічне присвоювання (ES2021).</li>
      </ul>
    </section>
`,
  '03-conditions': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Умовні оператори</strong> дозволяють виконувати різний код залежно від умови. Основні інструменти: <code>if/else</code>, тернарний оператор <code>?:</code>, та <code>switch</code> для множинного вибору.</p>
    </article>
    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🚦</span> Аналогія: світлофор</div>
      <p>Умовні оператори — як світлофор: «якщо (if) горить зелений — іди, якщо (else if) жовтий — готуйся, інакше (else) — стій». <code>switch</code> — як меню в ресторані: перевіряєш кожен пункт і виконуєш відповідну дію.</p>
    </section>
    <section>
      <h2>if / else if / else</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln">const score = 75;</span>
<span class="ln"></span>
<span class="ln">if (score >= 90) {</span>
<span class="ln">  console.log('Відмінно');</span>
<span class="ln">} else if (score >= 70) {</span>
<span class="ln">  console.log('Добре');    // ← виконається</span>
<span class="ln">} else if (score >= 50) {</span>
<span class="ln">  console.log('Задовільно');</span>
<span class="ln">} else {</span>
<span class="ln">  console.log('Незадовільно');</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// Falsy значення в умові: false, 0, '', null, undefined, NaN</span>
<span class="ln">if (0)         { /* не виконається */ }</span>
<span class="ln">if ('')        { /* не виконається */ }</span>
<span class="ln">if (null)      { /* не виконається */ }</span>
<span class="ln">if ([])        { /* виконається — порожній масив truthy! */ }</span></code></pre>
      </div>

      <h2>Тернарний оператор</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// умова ? якщо_true : якщо_false</span>
<span class="ln">const grade = score >= 90 ? 'A' : score >= 70 ? 'B' : 'C';</span>
<span class="ln"></span>
<span class="ln cmt">// Зручно в JSX/шаблонах</span>
<span class="ln">const label = isLoggedIn ? 'Вийти' : 'Увійти';</span>
<span class="ln">const color = theme === 'dark' ? '#fff' : '#000';</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Не вкладай більше 2 рівнів — стає нечитабельним</span></code></pre>
      </div>

      <h2>switch</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln">const day = 'Monday';</span>
<span class="ln">switch (day) {</span>
<span class="ln">  case 'Monday':</span>
<span class="ln">  case 'Tuesday':    // fall-through — два кейси разом</span>
<span class="ln">    console.log('Початок тижня'); break;</span>
<span class="ln">  case 'Friday':</span>
<span class="ln">    console.log('П'ятниця!'); break;</span>
<span class="ln">  default:</span>
<span class="ln">    console.log('Середина тижня');</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// Сучасна альтернатива — об'єкт-словник</span>
<span class="ln">const labels = { en: 'Hello', uk: 'Привіт', de: 'Hallo' };</span>
<span class="ln">const greeting = labels[lang] ?? labels.en;</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://javascript.info/ifelse" target="_blank" rel="noopener noreferrer">if/else — javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch" target="_blank" rel="noopener noreferrer">switch — MDN</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Забути <code>break</code> у <code>switch</code></strong>: без нього виконання «проваліться» (fall-through) у наступний case.</li>
        <li><strong>Покладатись на truthy/falsy без розуміння</strong>: <code>[]</code> і <code>{}</code> — truthy, навіть якщо «порожні».</li>
        <li><strong>Надміру вкладати тернарні оператори</strong>: більше 2 рівнів — використовуй <code>if/else</code>.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Напиши функцію <code>getGrade(score)</code> що повертає 'A'/'B'/'C'/'D'/'F' залежно від балу.</li>
        <li>Перепиши цю функцію через тернарний оператор.</li>
        <li>Зроби <code>switch</code> що повертає назву місяця по числу (1 → 'Січень' і т.д.).</li>
        <li>Перепиши <code>switch</code> через об'єкт-словник — яке рішення читабельніше?</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Які значення є falsy в JavaScript?</li>
        <li>Що відбудеться якщо не написати <code>break</code> у <code>switch</code>?</li>
        <li>Коли краще використовувати об'єкт-словник замість <code>switch</code>?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Коли використовувати switch замість if/else?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «switch швидший» — майже ніколи не вірно в JS.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>switch</code> зручний для множинного порівняння однієї змінної з кількома константами. Але сучасна альтернатива — об'єкт-словник: <code>const map = { key: value }; map[key]</code> — чистіше, без fall-through ризиків, легко розширити.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>Early return pattern: замість вкладених if/else повертай раніше — код стає плоскішим і читабельнішим.</li>
        <li>Guard clauses: перевіряй некоректні стани на початку функції і повертай одразу — основна логіка залишається без вкладеності.</li>
      </ul>
    </section>
`,
  '04-loops': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Цикли</strong> дозволяють виконувати код декілька разів. JavaScript має: <code>for</code>, <code>while</code>, <code>do...while</code>, <code>for...of</code> (для ітерабельних), <code>for...in</code> (для властивостей об'єкта).</p>
    </article>
    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🔁</span> Аналогія: конвеєр</div>
      <p>Цикл — як конвеєр на заводі: кожен елемент (ітерація) проходить однакову обробку доки є умова продовжувати. <code>break</code> — аварійна зупинка конвеєра, <code>continue</code> — пропустити один елемент.</p>
    </section>
    <section>
      <h2>for та while</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// for — коли знаєш кількість ітерацій</span>
<span class="ln">for (let i = 0; i < 5; i++) {</span>
<span class="ln">  console.log(i); // 0 1 2 3 4</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// while — коли умова невідома наперед</span>
<span class="ln">let count = 0;</span>
<span class="ln">while (count < 5) { count++; }</span>
<span class="ln"></span>
<span class="ln cmt">// break та continue</span>
<span class="ln">for (let i = 0; i < 10; i++) {</span>
<span class="ln">  if (i === 3) continue; // пропустити 3</span>
<span class="ln">  if (i === 7) break;    // зупинитись на 7</span>
<span class="ln">  console.log(i); // 0 1 2 4 5 6</span>
<span class="ln">}</span></code></pre>
      </div>

      <h2>for...of та for...in</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// for...of — перебір елементів масиву/рядка</span>
<span class="ln">const fruits = ['яблуко', 'банан', 'вишня'];</span>
<span class="ln">for (const fruit of fruits) {</span>
<span class="ln">  console.log(fruit);</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// З індексом через entries()</span>
<span class="ln">for (const [i, fruit] of fruits.entries()) {</span>
<span class="ln">  console.log(\`${i}: ${fruit}\`);</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// for...in — перебір ключів об'єкта (обережно!)</span>
<span class="ln">const obj = { a: 1, b: 2, c: 3 };</span>
<span class="ln">for (const key in obj) {</span>
<span class="ln">  console.log(key, obj[key]);</span>
<span class="ln">}</span>
<span class="ln cmt">// ⚠️ for...in перебирає і успадковані властивості!</span>
<span class="ln cmt">// Краще: Object.keys(obj).forEach(key => ...)</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://javascript.info/while-for" target="_blank" rel="noopener noreferrer">Цикли — javascript.info</a></li>
        </ul>
      </div>
    </section>
    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Нескінченний цикл</strong>: умова завжди <code>true</code> — браузер зависне. Завжди перевіряй що умова рано чи пізно стане <code>false</code>.</li>
        <li><strong>Використовувати <code>for...in</code> для масивів</strong>: він перебирає і прототипні властивості. Для масивів — <code>for...of</code> або <code>.forEach()</code>.</li>
        <li><strong>Мутувати масив під час перебору</strong>: непередбачувана поведінка. Якщо потрібно — перебирай копію <code>[...arr]</code>.</li>
      </ul>
    </section>
    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Напиши цикл що виводить числа від 1 до 100. Замість кратних 3 виводь «Fizz», кратних 5 — «Buzz», обох — «FizzBuzz».</li>
        <li>Перебери масив імен через <code>for...of</code> з індексом через <code>entries()</code>.</li>
        <li>Перебери об'єкт через <code>Object.entries()</code> і виведи пари ключ-значення.</li>
      </ol>
    </section>
    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>В чому різниця між <code>for...of</code> і <code>for...in</code>?</li>
        <li>Коли використовувати <code>while</code> замість <code>for</code>?</li>
        <li>Що робить <code>break</code> і <code>continue</code>?</li>
      </ol>
    </section>
    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>Для масивів — майже завжди краще використовувати функціональні методи: <code>.map()</code>, <code>.filter()</code>, <code>.reduce()</code> замість циклів — код декларативніший і читабельніший.</li>
        <li><code>for...of</code> працює з будь-яким ітерабельним: масив, рядок, Set, Map, Generator.</li>
      </ul>
    </section>
`,
  '05-functions': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Функція</strong> — іменований блок коду що виконує певну задачу. JavaScript має кілька синтаксисів: function declaration, function expression, та <strong>arrow functions</strong> (ES6). Концепція <strong>замикання</strong> (closure) — одна з найважливіших в JS.</p>
    </article>
    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">⚙️</span> Аналогія: рецепт</div>
      <p>Функція — як рецепт: приймає інгредієнти (параметри), виконує кроки (тіло) і повертає результат. Замикання — як кухар що «пам'ятає» секретний інгредієнт навіть коли виходить з кухні.</p>
    </section>
    <section>
      <h2>Синтаксис функцій</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// Function declaration (hoisting — можна викликати до оголошення)</span>
<span class="ln">function greet(name) {</span>
<span class="ln">  return \`Привіт, ${name}!\`;</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// Function expression (змінна — немає hoisting)</span>
<span class="ln">const greet = function(name) { return \`Привіт, ${name}!\`; };</span>
<span class="ln"></span>
<span class="ln cmt">// Arrow function (ES6) — коротший синтаксис</span>
<span class="ln">const greet = (name) => \`Привіт, ${name}!\`;</span>
<span class="ln">const add = (a, b) => a + b;   // неявний return</span>
<span class="ln">const double = n => n * 2;      // один параметр — без дужок</span></code></pre>
      </div>

      <h2>Параметри та значення за замовчуванням</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// Default parameters</span>
<span class="ln">function createUser(name, role = 'user', active = true) {</span>
<span class="ln">  return { name, role, active };</span>
<span class="ln">}</span>
<span class="ln">createUser('Іван');          // { name:'Іван', role:'user', active:true }</span>
<span class="ln">createUser('Марія', 'admin'); // { name:'Марія', role:'admin', active:true }</span>
<span class="ln"></span>
<span class="ln cmt">// Rest параметри — збирають залишкові аргументи</span>
<span class="ln">function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }</span>
<span class="ln">sum(1, 2, 3, 4, 5); // 15</span></code></pre>
      </div>

      <h2>Замикання (Closure)</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// Внутрішня функція "пам'ятає" зовнішні змінні</span>
<span class="ln">function createCounter(start = 0) {</span>
<span class="ln">  let count = start;           // приватна змінна</span>
<span class="ln">  return {</span>
<span class="ln">    increment: () => ++count,</span>
<span class="ln">    decrement: () => --count,</span>
<span class="ln">    value:     () => count,</span>
<span class="ln">  };</span>
<span class="ln">}</span>
<span class="ln">const counter = createCounter(10);</span>
<span class="ln">counter.increment(); // 11</span>
<span class="ln">counter.increment(); // 12</span>
<span class="ln">counter.value();     // 12</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://javascript.info/function-basics" target="_blank" rel="noopener noreferrer">Functions — javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" target="_blank" rel="noopener noreferrer">Closures — MDN</a></li>
        </ul>
      </div>
    </section>
    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Arrow functions і <code>this</code></strong>: стрілочні функції не мають власного <code>this</code> — вони беруть <code>this</code> з оточуючого контексту. У методах об'єкта — використовуй звичайну функцію.</li>
        <li><strong>Забути <code>return</code></strong>: функція без <code>return</code> повертає <code>undefined</code>.</li>
        <li><strong>Побічні ефекти в «чистих» функціях</strong>: функція що мутує зовнішні дані важко тестується. Прагни до чистих функцій.</li>
      </ul>
    </section>
    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Напиши arrow function <code>multiply(a, b)</code> і протестуй у консолі.</li>
        <li>Створи функцію <code>createMultiplier(factor)</code> що повертає функцію-множник (замикання).</li>
        <li>Напиши <code>debounce(fn, delay)</code> — функцію що відкладає виклик <code>fn</code> на <code>delay</code>ms.</li>
      </ol>
    </section>
    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>В чому різниця між function declaration і arrow function щодо <code>this</code>?</li>
        <li>Що таке замикання (closure)?</li>
        <li>Що таке «чиста функція» і чому це важливо?</li>
        <li>Що таке hoisting функцій?</li>
      </ol>
    </section>
    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>IIFE (Immediately Invoked Function Expression): <code>((x) => x * 2)(5)</code> — функція що одразу виконується.</li>
        <li>Currying: <code>const add = a => b => a + b</code>. Тепер <code>add(2)(3)</code> → 5. Дозволяє часткове застосування.</li>
        <li>Функції першого класу в JS: функції можна передавати як аргументи, повертати як значення, зберігати в змінних.</li>
      </ul>
    </section>
`,
  '06-objects': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Об'єкт</strong> — колекція пар ключ-значення. <strong>Деструктуризація</strong> дозволяє зручно витягувати значення. <strong>Spread</strong> (<code>...</code>) копіює та об'єднує об'єкти. Є також прототипна модель та класи (ES6).</p>
    </article>
    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📋</span> Аналогія: анкета</div>
      <p>Об'єкт — як заповнена анкета: ім'я, вік, адреса — кожне поле (ключ) має відповідне значення. Деструктуризація — як «вирвати» конкретне поле з анкети в окрему змінну.</p>
    </section>
    <section>
      <h2>Створення та доступ</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln">const user = {</span>
<span class="ln">  name:  'Іван',</span>
<span class="ln">  age:   25,</span>
<span class="ln">  email: 'ivan@example.com',</span>
<span class="ln">  address: { city: 'Київ', zip: '01001' },</span>
<span class="ln">  greet() { return \`Привіт, ${this.name}!\`; },</span>
<span class="ln">};</span>
<span class="ln"></span>
<span class="ln cmt">// Доступ</span>
<span class="ln">user.name;          // 'Іван' — dot notation</span>
<span class="ln">user['email'];      // 'ivan@example.com' — bracket notation</span>
<span class="ln">user.address.city;  // 'Київ'</span>
<span class="ln">user.phone;         // undefined (не помилка!)</span>
<span class="ln"></span>
<span class="ln cmt">// Shorthand properties (ES6)</span>
<span class="ln">const name = 'Марія'; const age = 30;</span>
<span class="ln">const person = { name, age }; // { name: 'Марія', age: 30 }</span></code></pre>
      </div>

      <h2>Деструктуризація та spread</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// Деструктуризація об'єкта</span>
<span class="ln">const { name, age, address: { city } } = user;</span>
<span class="ln">console.log(name, age, city); // 'Іван' 25 'Київ'</span>
<span class="ln"></span>
<span class="ln cmt">// З перейменуванням та значенням за замовчуванням</span>
<span class="ln">const { name: userName, role = 'user' } = user;</span>
<span class="ln"></span>
<span class="ln cmt">// Spread — копія об'єкта (shallow copy)</span>
<span class="ln">const updated = { ...user, age: 26 };   // оновлення поля</span>
<span class="ln">const merged  = { ...defaults, ...user }; // об'єднання</span>
<span class="ln"></span>
<span class="ln cmt">// Object.keys / values / entries</span>
<span class="ln">Object.keys(user);    // ['name', 'age', 'email', 'address']</span>
<span class="ln">Object.values(user);  // ['Іван', 25, ...]</span>
<span class="ln">Object.entries(user); // [['name','Іван'], ['age',25], ...]</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://javascript.info/object" target="_blank" rel="noopener noreferrer">Objects — javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target="_blank" rel="noopener noreferrer">Destructuring — MDN</a></li>
        </ul>
      </div>
    </section>
    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Spread робить shallow copy</strong>: вкладені об'єкти копіюються по посиланню. <code>const copy = {...obj}</code> — зміна <code>copy.address.city</code> змінить і оригінал!</li>
        <li><strong>Перевіряти властивість через <code>obj.prop === undefined</code></strong>: краще <code>'prop' in obj</code> — повертає <code>true</code> навіть якщо значення <code>undefined</code>.</li>
        <li><strong>Мутувати об'єкти напряму</strong>: особливо в React/Next.js. Завжди створюй нову копію через spread.</li>
      </ul>
    </section>
    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи об'єкт <code>product</code> з полями name, price, category. Деструктуруй з перейменуванням та дефолтом.</li>
        <li>Зроби функцію <code>updateUser(user, changes)</code> що повертає новий об'єкт зі змінами (без мутації оригіналу).</li>
        <li>Перебери <code>Object.entries(product)</code> і виведи всі пари ключ-значення.</li>
      </ol>
    </section>
    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Що таке shallow copy і чому це проблема при вкладених об'єктах?</li>
        <li>Яка різниця між dot notation і bracket notation?</li>
        <li>Що повертає <code>Object.entries()</code>?</li>
      </ol>
    </section>
    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>structuredClone(obj)</code> (2022) — нативний deep clone без <code>JSON.parse(JSON.stringify())</code>. Підтримує Date, RegExp, Map, Set.</li>
        <li>Computed property names: <code>const key = 'name'; const obj = { [key]: 'Іван' }</code>.</li>
        <li><code>Object.freeze(obj)</code> — робить об'єкт незмінним (shallow). Корисно для конфігурацій.</li>
      </ul>
    </section>
`,
  '07-dom': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>DOM</strong> (Document Object Model) — об'єктне представлення HTML-документа. JavaScript взаємодіє з ним через API: знаходить елементи, змінює їх, реагує на події. Розуміння DOM — ключ до будь-якої інтерактивності на сторінці.</p>
    </article>
    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🌳</span> Аналогія: дерево з гілками</div>
      <p>DOM — дерево: <code>&lt;html&gt;</code> — корінь, <code>&lt;body&gt;</code>, <code>&lt;head&gt;</code> — гілки, теги — листя. JavaScript — садівник: може знайти будь-який лист, змінити його, додати новий або видалити.</p>
    </section>
    <section>
      <h2>Вибірка елементів</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// Сучасні методи (рекомендовані)</span>
<span class="ln">document.querySelector('.btn');         // перший елемент</span>
<span class="ln">document.querySelectorAll('.card');      // NodeList всіх</span>
<span class="ln">document.querySelector('#header');       // за ID</span>
<span class="ln">document.querySelector('input[type=text]'); // за атрибутом</span>
<span class="ln"></span>
<span class="ln cmt">// Старіші (але й досі швидші для ID/tag)</span>
<span class="ln">document.getElementById('header');       // HTMLElement | null</span>
<span class="ln">document.getElementsByClassName('card'); // HTMLCollection (live)</span></code></pre>
      </div>

      <h2>Маніпуляції з DOM</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln">const btn = document.querySelector('.btn');</span>
<span class="ln"></span>
<span class="ln cmt">// Зміна вмісту</span>
<span class="ln">btn.textContent = 'Натисни';      // текст (безпечно)</span>
<span class="ln">btn.innerHTML = '&lt;b&gt;Натисни&lt;/b&gt;'; // HTML (небезпечно з даними!)</span>
<span class="ln"></span>
<span class="ln cmt">// Стилі та класи</span>
<span class="ln">btn.style.backgroundColor = '#6366f1';</span>
<span class="ln">btn.classList.add('active');     // додати</span>
<span class="ln">btn.classList.remove('hidden');  // видалити</span>
<span class="ln">btn.classList.toggle('open');    // перемкнути</span>
<span class="ln">btn.classList.contains('active');// перевірити</span>
<span class="ln"></span>
<span class="ln cmt">// Атрибути</span>
<span class="ln">btn.setAttribute('disabled', '');</span>
<span class="ln">btn.getAttribute('href');</span>
<span class="ln">btn.removeAttribute('disabled');</span>
<span class="ln"></span>
<span class="ln cmt">// Створення та вставка</span>
<span class="ln">const li = document.createElement('li');</span>
<span class="ln">li.textContent = 'Новий елемент';</span>
<span class="ln">list.append(li);      // в кінець</span>
<span class="ln">list.prepend(li);     // на початок</span>
<span class="ln">li.remove();          // видалити</span></code></pre>
      </div>

      <h2>Події (Events)</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// addEventListener — рекомендований спосіб</span>
<span class="ln">btn.addEventListener('click', (event) => {</span>
<span class="ln">  console.log(event.target);  // елемент що спричинив подію</span>
<span class="ln">  event.preventDefault();     // скасувати стандартну поведінку</span>
<span class="ln">  event.stopPropagation();    // зупинити bubbling</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln cmt">// Event delegation — один обробник для кількох елементів</span>
<span class="ln">document.querySelector('.list').addEventListener('click', (e) => {</span>
<span class="ln">  if (e.target.matches('.list-item')) {</span>
<span class="ln">    console.log('Клікнуто на:', e.target.textContent);</span>
<span class="ln">  }</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln cmt">// Популярні події</span>
<span class="ln cmt">// click, dblclick, mouseover, mouseout, keydown, keyup</span>
<span class="ln cmt">// input, change, submit, focus, blur, scroll, resize</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://javascript.info/dom-nodes" target="_blank" rel="noopener noreferrer">DOM — javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" target="_blank" rel="noopener noreferrer">DOM API — MDN</a></li>
        </ul>
      </div>
    </section>
    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Використовувати <code>innerHTML</code> з даними користувача</strong>: XSS-атака. Використовуй <code>textContent</code> або <code>createElement</code>.</li>
        <li><strong>Не перевіряти що елемент існує</strong>: <code>querySelector()</code> повертає <code>null</code> — наступний <code>.addEventListener()</code> кине помилку.</li>
        <li><strong>Додавати обробники в цикл</strong>: замість цього використовуй event delegation — один обробник на батьківський елемент.</li>
      </ul>
    </section>
    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Зроби список задач (todo list): додавання через форму, видалення по кліку.</li>
        <li>Реалізуй перемикач темної теми через <code>classList.toggle()</code>.</li>
        <li>Зроби лічильник з кнопками +/- що оновлює текст на сторінці.</li>
        <li>Використай event delegation для таблиці: один обробник виділяє рядок що клікнули.</li>
      </ol>
    </section>
    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Що таке event delegation і навіщо він?</li>
        <li>Яка різниця між <code>textContent</code> і <code>innerHTML</code>?</li>
        <li>Що таке bubbling подій?</li>
        <li>Навіщо <code>event.preventDefault()</code>?</li>
      </ol>
    </section>
    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>element.closest('.parent')</code> — шукає найближчого предка що відповідає селектору. Зручно в event delegation.</li>
        <li><code>IntersectionObserver</code> — відстежує коли елемент входить у viewport без scroll-listener. Для lazy loading і анімацій.</li>
        <li><code>MutationObserver</code> — відстежує зміни в DOM. Корисно для спостереження за динамічним контентом.</li>
      </ul>
    </section>
`,
  '08-async': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Асинхронний JavaScript</strong> дозволяє виконувати тривалі операції (запити до API, читання файлів) не блокуючи основний потік. Сучасний підхід — <code>async/await</code> поверх Promise. <code>fetch()</code> — нативний API для HTTP-запитів.</p>
    </article>
    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">☕</span> Аналогія: замовлення у кав'ярні</div>
      <p>Асинхронність — як замовлення кави: ти замовляєш (fetch), не стоїш у заморожованому стані чекаючи (не блокуєш потік), займаєшся іншими справами (Event Loop), і тебе кличуть коли кава готова (Promise resolved → await).</p>
    </section>
    <section>
      <h2>Promise</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// Promise — обіцянка що буде значення у майбутньому</span>
<span class="ln">const promise = new Promise((resolve, reject) => {</span>
<span class="ln">  setTimeout(() => resolve('готово!'), 1000);</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln">promise</span>
<span class="ln">  .then(result => console.log(result))  // 'готово!'</span>
<span class="ln">  .catch(err => console.error(err))     // якщо reject</span>
<span class="ln">  .finally(() => console.log('done')); // завжди</span>
<span class="ln"></span>
<span class="ln cmt">// Promise.all — паралельно</span>
<span class="ln">const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);</span></code></pre>
      </div>

      <h2>async/await та fetch</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy></button></div>
        <pre><code><span class="ln cmt">// async функція завжди повертає Promise</span>
<span class="ln">async function getUsers() {</span>
<span class="ln">  try {</span>
<span class="ln">    const response = await fetch('https://jsonplaceholder.typicode.com/users');</span>
<span class="ln"></span>
<span class="ln">    if (!response.ok) {</span>
<span class="ln">      throw new Error(\`HTTP ${response.status}\`);</span>
<span class="ln">    }</span>
<span class="ln"></span>
<span class="ln">    const users = await response.json();</span>
<span class="ln">    return users;</span>
<span class="ln">  } catch (error) {</span>
<span class="ln">    console.error('Помилка:', error.message);</span>
<span class="ln">    throw error;  // пробросити далі</span>
<span class="ln">  }</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">// POST запит</span>
<span class="ln">async function createPost(data) {</span>
<span class="ln">  const res = await fetch('https://api.example.com/posts', {</span>
<span class="ln">    method: 'POST',</span>
<span class="ln">    headers: { 'Content-Type': 'application/json' },</span>
<span class="ln">    body: JSON.stringify(data),</span>
<span class="ln">  });</span>
<span class="ln">  return res.json();</span>
<span class="ln">}</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://javascript.info/async-await" target="_blank" rel="noopener noreferrer">async/await — javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" target="_blank" rel="noopener noreferrer">Fetch API — MDN</a></li>
          <li><a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer">JSONPlaceholder — тестовий API для практики</a></li>
        </ul>
      </div>
    </section>
    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Не перевіряти <code>response.ok</code></strong>: <code>fetch()</code> не кидає помилку при статусах 4xx/5xx! Обов'язково: <code>if (!response.ok) throw new Error(...)</code>.</li>
        <li><strong>Забути <code>await</code></strong>: <code>const data = response.json()</code> без <code>await</code> — ти отримаєш Promise, а не дані.</li>
        <li><strong>Не обробляти помилки</strong>: <code>async/await</code> без <code>try/catch</code> — необроблений rejection може «впасти» мовчки.</li>
        <li><strong>Послідовні await замість паралельних</strong>: якщо два запити незалежні — використовуй <code>Promise.all()</code> а не два окремих <code>await</code>.</li>
      </ul>
    </section>
    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Завантаж список користувачів з <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noopener">jsonplaceholder.typicode.com/users</a> і виведи їхні імена на сторінку.</li>
        <li>Додай кнопку «Завантажити». Відображай стан завантаження (loading spinner) і обробляй помилки.</li>
        <li>Завантаж паралельно users і posts через <code>Promise.all()</code> і виміряй різницю у часі.</li>
        <li>Зроби пошук GitHub-юзера через <code>https://api.github.com/users/{username}</code>.</li>
      </ol>
    </section>
    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Чому <code>fetch()</code> не кидає помилку при 404?</li>
        <li>Що повертає <code>async</code> функція якщо в ній <code>return 42</code>?</li>
        <li>Яка різниця між <code>Promise.all()</code> і послідовними <code>await</code>?</li>
        <li>Що таке Event Loop?</li>
      </ol>
    </section>
    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>Promise.allSettled()</code> — як <code>Promise.all()</code> але не зупиняється при першій помилці. Повертає масив результатів з полем <code>status: 'fulfilled'|'rejected'</code>.</li>
        <li><code>AbortController</code> — дозволяє скасувати fetch-запит. Корисно для debounced пошуку.</li>
        <li><a href="https://tanstack.com/query" target="_blank" rel="noopener">TanStack Query</a> — популярна бібліотека для серверного стану: кешування, фонові оновлення, оптимістичні апдейти.</li>
      </ul>
    </section>
`,
};
