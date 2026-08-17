// Lesson HTML content for the "JavaScript / JS Arrays" course

export const LESSONS_HTML: Record<string, string> = {
  '01-intro': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Масив</strong> — це впорядкований список значень, які зберігаються під однією назвою. Замість того щоб створювати десять окремих змінних для десяти товарів, ми складаємо їх в один масив.</p>
      <p>Кожен елемент масиву має свій <strong>індекс</strong> — порядковий номер, за яким до нього можна звернутися. Масив може містити будь-який тип даних: рядки, числа, булеві значення, обʼєкти й навіть інші масиви.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🛒</span> Аналогія з життя</div>
      <p>Масив — це як <strong>список покупок</strong> у супермаркеті. Ти пишеш на аркуші: молоко, хліб, яйця. Список має порядок, і кожен товар займає свою позицію: молоко — перше, хліб — друге, яйця — третє. Саме так працює масив, тільки рахунок позицій починається з нуля.</p>
    </section>

    <section>
      <h2>Синтаксис</h2>
      <p>Найчастіше масив створюють через квадратні дужки (літеральний синтаксис):</p>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Літеральний масив — найпоширеніший спосіб</span>
<span class="ln">const fruits = ['яблуко', 'банан', 'апельсин'];</span>
<span class="ln"></span>
<span class="ln cmt">// Порожній масив, який заповнимо пізніше</span>
<span class="ln">const empty = [];</span>
<span class="ln"></span>
<span class="ln cmt">// Через конструктор (використовується рідше)</span>
<span class="ln">const nums = new Array(1, 2, 3);</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Параметри та властивості</h4>
        <table class="params-table">
          <thead><tr><th>Елемент</th><th>Тип</th><th>Опис</th></tr></thead>
          <tbody>
            <tr><td><code>[]</code></td><td>літерал</td><td>Основний спосіб створення масиву (порожнього або з елементами)</td></tr>
            <tr><td><code>new Array(...)</code></td><td>конструктор</td><td>Альтернатива; аргументи необовʼязкові, але без них рідко використовують</td></tr>
            <tr><td><code>.length</code></td><td>властивість</td><td>Кількість елементів — не параметр методу</td></tr>
          </tbody>
        </table>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація (MDN)</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" rel="noopener noreferrer">Array — MDN</a></li>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/length" target="_blank" rel="noopener noreferrer">Array.length — MDN</a></li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Як це працює</h2>
      <ol class="steps">
        <li>Ти оголошуєш масив і кладеш у нього значення через кому.</li>
        <li>JavaScript автоматично присвоює кожному елементу індекс: першому — <code>0</code>, другому — <code>1</code> і так далі.</li>
        <li>Щоб дізнатися, скільки елементів у масиві, використовуй властивість <code>.length</code>.</li>
        <li>Останній елемент завжди має індекс <code>length - 1</code>.</li>
      </ol>

      <h3>Чому індексація з 0?</h3>
      <p>Індекс — це насправді «відступ від початку». Перший елемент стоїть на самому початку, тому його відступ дорівнює <code>0</code>. Спочатку це незвично, але швидко стає природним.</p>
    </section>

    <section>
      <h2>Приклади</h2>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Масиви різних типів</span>
<span class="ln">const fruits = ['яблуко', 'банан', 'апельсин'];</span>
<span class="ln">const numbers = [1, 2, 3, 4, 5];</span>
<span class="ln">const mixed = ['текст', 42, true, null];</span>
<span class="ln">console.log(fruits, numbers, mixed);</span></code></pre>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Доступ за індексом та довжина</span>
<span class="ln">const fruits = ['яблуко', 'банан', 'апельсин'];</span>
<span class="ln">console.log(fruits[0]);              // 'яблуко' — перший</span>
<span class="ln">console.log(fruits[2]);              // 'апельсин' — третій</span>
<span class="ln">console.log(fruits.length);          // 3 — кількість елементів</span>
<span class="ln">console.log(fruits[fruits.length - 1]); // 'апельсин' — останній</span></code></pre>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Масив може містити інші масиви</span>
<span class="ln">const board = [['X', 'O'], ['O', 'X']];</span>
<span class="ln">console.log(board[0]);     // ['X', 'O']</span>
<span class="ln">console.log(board.length); // 2 (два рядки)</span></code></pre>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li>Звернення до неіснуючого індексу повертає <code>undefined</code>, а не помилку: <code>fruits[99]</code> → <code>undefined</code>.</li>
        <li>Плутанина «довжина vs останній індекс»: якщо <code>length</code> дорівнює 3, то останній індекс — <code>2</code>, а не 3.</li>
        <li>Індексація <em>завжди</em> з нуля. <code>fruits[1]</code> — це <strong>другий</strong> елемент, а не перший.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Виконай у консолі DevTools або будь-якому JS-середовищі:</p>
      <ol>
        <li>Створи масив <code>fruits = ['яблуко', 'банан', 'апельсин', 'груша']</code> і виведи його в консоль. <span class="crystal-reward">💎 10</span></li>
        <li>Для <code>fruits</code> виведи перший елемент і значення <code>fruits.length</code>. <span class="crystal-reward">💎 10</span></li>
        <li>Створи порожній масив <code>cart = []</code> — виведи його і перевір <code>cart.length</code>. <span class="crystal-reward">💎 10</span></li>
        <li>Створи <code>mixed = ['текст', 42, true]</code> — виведи <code>typeof</code> для кожного елемента. <span class="crystal-reward">💎 10</span></li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Домашнє завдання</div>
      <ol>
        <li>Створи масив <code>films</code> із 5 улюблених фільмів і виведи його в консоль. <span class="crystal-reward">💎 15</span></li>
        <li>Для цього масиву виведи перший елемент і останній — останній знайди через індекс <code>length - 1</code>. <span class="crystal-reward">💎 15</span></li>
        <li>Виведи, скільки фільмів у списку, використовуючи властивість <code>length</code>. <span class="crystal-reward">💎 10</span></li>
      </ol>
      <p class="crystal-total">Разом за ДЗ: <strong>💎 40</strong></p>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір ДЗ — типові помилки</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Завдання 1 — масив <code>films</code></h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> Пишуть <code>films = [...]</code> без <code>const</code>/<code>let</code> або забувають вивести масив у консоль.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>const films = ['Inception', 'Interstellar', ...]; console.log(films);</code> — перевір, що в масиві рівно 5 рядків.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Завдання 2 — перший і останній елемент</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> Останній елемент через <code>films[5]</code> (індекс «за межами») або <code>films[films.length]</code> (завжди <code>undefined</code>).</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Перший: <code>films[0]</code>. Останній: <code>films[films.length - 1]</code> — індекси від 0 до length−1.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Завдання 3 — <code>length</code></h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> Рахують елементи циклом або пишуть <code>length()</code> як функцію.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>console.log(films.length)</code> — для масиву з 5 фільмів має бути <code>5</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>Порожній масив <code>[]</code> уже має <code>length === 0</code> — не потрібно нічого додавати.</li>
        <li>У DevTools можна розгорнути масив у консолі й побачити індекси поруч із значеннями — зручно для перевірки ДЗ.</li>
        <li>Рядки в масиві завжди в лапках; числа — без. Змішані типи в одному масиві JS дозволяє, але на старті краще один тип.</li>
      </ul>
    </section>
  `,

  '02-create-access': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p>Ти вже знаєш що масив — це список. Тепер навчимось його створювати різними способами і звертатись до конкретних елементів. JavaScript надає кілька способів створення масивів і два способи доступу до елементів: класичний через індекс <code>arr[i]</code> і сучасний через <code>arr.at(i)</code>.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🏢</span> Аналогія з ліфтом</div>
      <p>Масив — багатоповерховий будинок. Перший поверх — індекс 0, другий — індекс 1... Останній поверх — <code>at(-1)</code>. Аби зайти в квартиру, треба знати поверх (індекс). Неіснуючий поверх — <code>undefined</code>.</p>
    </section>

    <section>
      <h2>Способи створення масиву</h2>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// 1. Літеральний — найпоширеніший спосіб</span>
<span class="ln">const fruits = ['яблуко', 'банан', 'апельсин'];</span>
<span class="ln">
</span>
<span class="ln cmt">// 2. Array.from() — з будь-якого ітерабельного</span>
<span class="ln">const letters = Array.from('abc');    // ['a', 'b', 'c']</span>
<span class="ln">const nums    = Array.from({length: 5}, (_, i) => i); // [0,1,2,3,4]</span>
<span class="ln">
</span>
<span class="ln cmt">// 3. Array.of() — масив з аргументів</span>
<span class="ln">const three = Array.of(7);  // [7] (не [,,,,,,]!)</span>
<span class="ln">
</span>
<span class="ln cmt">// 4. Spread — клонування і злиття</span>
<span class="ln">const copy  = [...fruits];</span>
<span class="ln">const merged = [...fruits, ...letters];</span></code></pre>
      </div>

      <h2>Доступ до елементів: arr[i] і arr.at(i)</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln">const arr = ['a', 'b', 'c', 'd', 'e'];</span>
<span class="ln cmt">//           0     1     2     3     4</span>
<span class="ln cmt">//          -5    -4    -3    -2    -1  (для .at())</span>
<span class="ln">
</span>
<span class="ln cmt">// Класичний доступ</span>
<span class="ln">arr[0];           // 'a'  — перший</span>
<span class="ln">arr[4];           // 'e'  — останній (якщо знаємо довжину)</span>
<span class="ln">arr[arr.length-1]; // 'e' — останній (стара формула)</span>
<span class="ln">
</span>
<span class="ln cmt">// .at() — сучасний спосіб (ES2022)</span>
<span class="ln">arr.at(0);   // 'a'  — перший</span>
<span class="ln">arr.at(-1);  // 'e'  — останній ✅ елегантно</span>
<span class="ln">arr.at(-2);  // 'd'  — передостанній</span>
<span class="ln">
</span>
<span class="ln cmt">// Неіснуючий індекс</span>
<span class="ln">arr[99];   // undefined (не помилка!)</span>
<span class="ln">arr.at(99); // undefined</span></code></pre>
      </div>

      <h2>length — кількість елементів</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln">const arr = ['a', 'b', 'c'];</span>
<span class="ln">arr.length;       // 3</span>
<span class="ln">
</span>
<span class="ln cmt">// length — це жива властивість, не метод</span>
<span class="ln">arr.length = 2;   // обрізає масив: ['a', 'b']</span>
<span class="ln">arr.length = 5;   // розтягує: ['a', 'b', ,,, ] (розріджений)</span>
<span class="ln">
</span>
<span class="ln cmt">// Перевірка чи масив порожній</span>
<span class="ln">arr.length === 0; // true якщо порожній</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/at" target="_blank" rel="noopener">Array.prototype.at() — MDN</a></li>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/from" target="_blank" rel="noopener">Array.from() — MDN</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Починати рахувати з 1</strong> — перший елемент завжди індекс <code>0</code>. «Off by one» — найпоширеніша помилка початківців.</li>
        <li><strong><code>new Array(5)</code></strong> — не масив з п'яти п'ятірок! Це масив із 5 порожніх слотів. Для п'яти п'ятірок: <code>Array(5).fill(5)</code> або <code>Array.from({length:5}, ()=>5)</code>.</li>
        <li><strong>Мутувати length напряму</strong> — небезпечно в продакшені. Краще використовувати <code>push/pop/splice</code>.</li>
        <li><strong>Порівнювати масиви через <code>===</code></strong> — <code>[] === []</code> це <code>false</code> (різні об'єкти в пам'яті).</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика в пісочниці</div>
      <ol>
        <li>Створи масив із 5 своїх улюблених фільмів. Виведи перший і останній через <code>.at()</code>.</li>
        <li>Через <code>Array.from({length: 10}, (_, i) => i * 2)</code> створи масив парних чисел від 0 до 18.</li>
        <li>Дано масив <code>const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']</code>. Виведи останній день через <code>.at(-1)</code>, і підрахуй кількість через <code>.length</code>.</li>
        <li>Що виведе <code>console.log([1,2,3][5])</code>? Чому?</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Чим <code>arr.at(-1)</code> кращий за <code>arr[arr.length-1]</code>?</li>
        <li>Що поверне <code>new Array(3)</code>? Як правильно створити <code>[0, 0, 0]</code>?</li>
        <li>Яке значення <code>arr.length</code> якщо <code>arr = ['a', , 'c']</code> (розріджений масив)?</li>
        <li>Як клонувати масив не мутуючи оригінал?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як отримати останній елемент масиву?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> Тільки <code>arr[arr.length-1]</code> — не знає новий метод.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Два способи: класичний <code>arr[arr.length-1]</code> і сучасний <code>arr.at(-1)</code> (ES2022, читабельніший, підтримка у всіх сучасних браузерах).</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як створити масив з N елементів?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> <code>new Array(N)</code> — розріджений масив, не те що очікується.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>Array.from({length: N}, (_, i) => i)</code> або <code>Array(N).fill(0)</code> залежно від задачі. <code>new Array(N)</code> створює розріджений масив — обачно з методами типу <code>map</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>Array.isArray([])</code> → <code>true</code>. <code>typeof []</code> → <code>'object'</code>. Завжди перевіряй масив через <code>Array.isArray</code>, не <code>typeof</code>.</li>
        <li>Масиви в JS — це просто об'єкти з числовими ключами і магічним <code>length</code>. <code>arr['0']</code> і <code>arr[0]</code> — одне і те ж.</li>
        <li><code>const arr = [,,]</code> — масив довжиною 2 (не 3!) з двома порожніми слотами. Кома після останнього елемента ігнорується.</li>
        <li>DevTools: <code>copy(arr)</code> у консолі — копіює масив у буфер обміну як JSON.</li>
      </ul>
    </section>
  `,
};
