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
};
