// Lesson HTML content for the "HTML" course

export const LESSONS_HTML: Record<string, string> = {
  '01-structure': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>HTML (HyperText Markup Language)</strong> — мова розмітки, якою описується структура і зміст веб-сторінки. Кожен HTML-документ має обов'язкову базову структуру. Відхилення не завжди помилка (браузери толерантні), але це погана практика.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🏠</span> Аналогія з будинком</div>
      <p><strong>DOCTYPE</strong> — дозвіл на будівництво. <strong><code>&lt;html&gt;</code></strong> — сам будинок. <strong><code>&lt;head&gt;</code></strong> — комунікації всередині стін (невидимі зовні). <strong><code>&lt;body&gt;</code></strong> — все що видно мешканцям.</p>
    </section>

    <section>
      <h2>Мінімальна правильна структура</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln">&lt;!DOCTYPE html&gt;</span>
<span class="ln">&lt;html lang="uk"&gt;</span>
<span class="ln">  &lt;head&gt;</span>
<span class="ln">    &lt;meta charset="UTF-8" /&gt;</span>
<span class="ln">    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;</span>
<span class="ln">    &lt;title&gt;Моя перша сторінка&lt;/title&gt;</span>
<span class="ln">  &lt;/head&gt;</span>
<span class="ln">  &lt;body&gt;</span>
<span class="ln">    &lt;h1&gt;Привіт, світ!&lt;/h1&gt;</span>
<span class="ln">    &lt;p&gt;Це мій перший HTML-документ.&lt;/p&gt;</span>
<span class="ln">  &lt;/body&gt;</span>
<span class="ln">&lt;/html&gt;</span></code></pre>
      </div>

      <h2>Кожна частина — детально</h2>

      <h3><code>&lt;!DOCTYPE html&gt;</code></h3>
      <p>Не тег — <strong>декларація</strong>, яка вмикає Standards mode замість Quirks mode. Завжди перший рядок файлу.</p>

      <h3><code>&lt;html lang="uk"&gt;</code></h3>
      <p>Кореневий елемент. Атрибут <code>lang</code> обов'язковий для скрін-рідерів, пошукових систем і CSS-властивостей типу <code>quotes</code>.</p>

      <h3><code>&lt;head&gt;</code> — мета-інформація</h3>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Тег</th><th>Призначення</th><th>Обов'язковий?</th></tr></thead>
          <tbody>
            <tr><td><code>&lt;meta charset="UTF-8"&gt;</code></td><td>Кодування. Без нього кирилиця — «кракозябри».</td><td>Так</td></tr>
            <tr><td><code>&lt;meta name="viewport"&gt;</code></td><td>Реальна ширина пристрою на мобільних.</td><td>Так</td></tr>
            <tr><td><code>&lt;title&gt;</code></td><td>Назва вкладки і сніпет у Google.</td><td>Так</td></tr>
            <tr><td><code>&lt;link rel="stylesheet"&gt;</code></td><td>Підключення CSS.</td><td>Ні</td></tr>
            <tr><td><code>&lt;meta name="description"&gt;</code></td><td>Опис для пошукових систем.</td><td>Рекомендовано</td></tr>
          </tbody>
        </table>
      </div>

      <h3>DOM-дерево</h3>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// DOM-дерево для прикладу вище</span>
<span class="ln">Document</span>
<span class="ln">└─ html[lang="uk"]</span>
<span class="ln">   ├─ head</span>
<span class="ln">   │  ├─ meta[charset="UTF-8"]</span>
<span class="ln">   │  ├─ meta[name="viewport"]</span>
<span class="ln">   │  └─ title "Моя перша сторінка"</span>
<span class="ln">   └─ body</span>
<span class="ln">      ├─ h1 "Привіт, світ!"</span>
<span class="ln">      └─ p "Це мій перший HTML-документ."</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/HTML/Reference/Elements/html" target="_blank" rel="noopener">html — MDN</a></li>
          <li><a href="https://validator.w3.org/" target="_blank" rel="noopener">W3C Validator</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Без DOCTYPE</strong> — Quirks mode, CSS поводиться інакше (box model!).</li>
        <li><strong>Без charset</strong> — кирилиця відображається «кракозябрами».</li>
        <li><strong>Без viewport</strong> — мобільний браузер симулює ширину 980px.</li>
        <li><strong>Без lang</strong> — скрін-рідери читають неправильною мовою.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи файл <code>index.html</code> з мінімальною структурою. В <code>&lt;body&gt;</code> — <code>&lt;h1&gt;</code> зі своїм ім'ям.</li>
        <li>Навмисно видали DOCTYPE. Чи щось змінилось у браузері? Перевір DevTools → Console.</li>
        <li>Перевір файл на <a href="https://validator.w3.org/#validate_by_input" target="_blank" rel="noopener">W3C Validator</a>. Виправ всі помилки.</li>
        <li>Введи <code>!</code> + Tab у VS Code — Emmet вставить базову структуру.</li>
        <li>DevTools → Elements: знайди <code>&lt;html&gt;</code> → <code>&lt;head&gt;</code> → <code>&lt;body&gt;</code>.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Навіщо <code>&lt;!DOCTYPE html&gt;</code>? Що без нього?</li>
        <li>Чому <code>lang</code> важливий для доступності?</li>
        <li>Яка різниця між <code>&lt;head&gt;</code> і <code>&lt;body&gt;</code>?</li>
        <li>Що таке DOM і як він пов'язаний з HTML?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке DOCTYPE?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Перший рядок в HTML» — без пояснення навіщо.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Вмикає Standards mode замість Quirks mode. Без нього CSS box model поводиться по-іншому.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Навіщо meta viewport?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Для мобільних» — занадто розмито.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Без нього мобільний браузер симулює 980px і зменшує сторінку. <code>width=device-width</code> — реальна ширина. <code>initial-scale=1</code> — без масштабування.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li><code>!</code> + Tab у VS Code — Emmet вставляє мінімальну структуру.</li>
        <li>Браузери додають <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code> автоматично, навіть якщо їх немає в коді.</li>
        <li><code>&lt;meta charset&gt;</code> має бути в перших 1024 байтах файлу.</li>
        <li><code>lang</code> можна ставити на будь-який елемент: <code>&lt;span lang="en"&gt;Hello&lt;/span&gt;</code>.</li>
      </ul>
    </section>
  `,

  '02-semantic': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Семантичні теги</strong> — HTML-елементи, назва яких несе змістове навантаження: <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>. На відміну від <code>&lt;div&gt;</code>, вони повідомляють браузерам, пошуковикам і скрін-рідерам що саме знаходиться в цій частині сторінки.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🏛️</span> Аналогія з газетою</div>
      <p><code>&lt;header&gt;</code> — шапка з логотипом і датою. <code>&lt;nav&gt;</code> — зміст. <code>&lt;main&gt;</code> — головна стаття. <code>&lt;aside&gt;</code> — бокова колонка з рекламою. <code>&lt;footer&gt;</code> — адреса редакції. Без семантики — суцільне море тексту без орієнтирів.</p>
    </section>

    <section>
      <h2>Основні семантичні теги</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln">&lt;!DOCTYPE html&gt;</span>
<span class="ln">&lt;html lang="uk"&gt;</span>
<span class="ln">&lt;body&gt;</span>
<span class="ln">
</span>
<span class="ln">  &lt;header&gt;                  &lt;!-- шапка сайту --&gt;</span>
<span class="ln">    &lt;nav&gt;                   &lt;!-- навігація --&gt;</span>
<span class="ln">      &lt;a href="/"&gt;Головна&lt;/a&gt;</span>
<span class="ln">    &lt;/nav&gt;</span>
<span class="ln">  &lt;/header&gt;</span>
<span class="ln">
</span>
<span class="ln">  &lt;main&gt;                    &lt;!-- основний унікальний контент --&gt;</span>
<span class="ln">    &lt;article&gt;               &lt;!-- самодостатня одиниця: пост, стаття --&gt;</span>
<span class="ln">      &lt;h1&gt;Заголовок статті&lt;/h1&gt;</span>
<span class="ln">      &lt;section&gt;             &lt;!-- тематична секція всередині --&gt;</span>
<span class="ln">        &lt;h2&gt;Підрозділ&lt;/h2&gt;</span>
<span class="ln">        &lt;p&gt;Текст&lt;/p&gt;</span>
<span class="ln">      &lt;/section&gt;</span>
<span class="ln">    &lt;/article&gt;</span>
<span class="ln">
</span>
<span class="ln">    &lt;aside&gt;                 &lt;!-- бічний контент: реклама, посилання --&gt;</span>
<span class="ln">      &lt;p&gt;Схожі статті&lt;/p&gt;</span>
<span class="ln">    &lt;/aside&gt;</span>
<span class="ln">  &lt;/main&gt;</span>
<span class="ln">
</span>
<span class="ln">  &lt;footer&gt;                  &lt;!-- підвал сайту --&gt;</span>
<span class="ln">    &lt;p&gt;&copy; 2026&lt;/p&gt;</span>
<span class="ln">  &lt;/footer&gt;</span>
<span class="ln">
</span>
<span class="ln">&lt;/body&gt;&lt;/html&gt;</span></code></pre>
      </div>

      <h2>Порівняння семантичних тегів</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Тег</th><th>Призначення</th><th>Скільки на сторінці?</th></tr></thead>
          <tbody>
            <tr><td><code>&lt;header&gt;</code></td><td>Шапка сайту або розділу</td><td>1 або більше (в кожному article)</td></tr>
            <tr><td><code>&lt;nav&gt;</code></td><td>Навігаційні посилання</td><td>1–2 (основна + хлібні крихти)</td></tr>
            <tr><td><code>&lt;main&gt;</code></td><td>Основний контент сторінки</td><td>Рівно 1</td></tr>
            <tr><td><code>&lt;article&gt;</code></td><td>Самодостатня публікація (пост, картка)</td><td>Скільки завгодно</td></tr>
            <tr><td><code>&lt;section&gt;</code></td><td>Тематична секція з заголовком</td><td>Скільки завгодно</td></tr>
            <tr><td><code>&lt;aside&gt;</code></td><td>Другорядний контент (сайдбар, реклама)</td><td>1–2</td></tr>
            <tr><td><code>&lt;footer&gt;</code></td><td>Підвал сайту або розділу</td><td>1 або більше</td></tr>
          </tbody>
        </table>
      </div>

      <h2>article vs section vs div</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt"><!-- article — можна вирвати з контексту і зміст збережеться --></span>
<span class="ln">&lt;article&gt;Рецепт борщу&lt;/article&gt;</span>
<span class="ln">
</span>
<span class="ln cmt"><!-- section — логічна частина з заголовком, але не самостійна --></span>
<span class="ln">&lt;section&gt;&lt;h2&gt;Інгредієнти&lt;/h2&gt;...&lt;/section&gt;</span>
<span class="ln">
</span>
<span class="ln cmt"><!-- div — суто стилізація, без семантики. Останній варіант --></span>
<span class="ln">&lt;div class="wrapper"&gt;...&lt;/div&gt;</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements#content_sectioning" target="_blank" rel="noopener">Content sectioning — MDN</a></li>
          <li><a href="https://html5doctor.com/" target="_blank" rel="noopener">HTML5 Doctor — семантика</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>«div soup»</strong> — вся розмітка в <code>&lt;div&gt;</code>. Пошукові системи і скрін-рідери не розуміють структуру.</li>
        <li><strong><code>&lt;section&gt;</code> без заголовка</strong> — кожна секція повинна мати <code>&lt;h2&gt;</code>–<code>&lt;h6&gt;</code>, інакше це <code>&lt;div&gt;</code>.</li>
        <li><strong>Кілька <code>&lt;main&gt;</code></strong> — на сторінці тільки один <code>&lt;main&gt;</code>.</li>
        <li><strong><code>&lt;article&gt;</code> для будь-якого блоку</strong> — тільки для самодостатнього контенту.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Відкрий улюблений сайт → DevTools → Elements. Скільки семантичних тегів? Скільки <code>&lt;div&gt;</code>?</li>
        <li>Перемалюй макет улюбленого сайту, замінивши всі <code>&lt;div&gt;</code> семантичними тегами де можливо.</li>
        <li>Встанови розширення «Accessibility Insights» і запусти «Fast Pass» — скільки проблем пов'язано зі структурою?</li>
        <li>Напиши HTML-сторінку блогу з одним постом, використовуючи лише семантичні теги.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Яка різниця між <code>&lt;article&gt;</code> і <code>&lt;section&gt;</code>?</li>
        <li>Скільки разів можна використати <code>&lt;main&gt;</code> на сторінці?</li>
        <li>Чому семантика важлива для SEO і доступності?</li>
        <li>Коли використовувати <code>&lt;div&gt;</code>?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке семантична розмітка і навіщо?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це теги типу header і footer» — без пояснення навіщо.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Семантика передає зміст розмітки — пошукові системи краще індексують, скрін-рідери правильно озвучують, код легше читати. Наприклад, <code>&lt;nav&gt;</code> сигналізує: тут навігація — доступна з клавіатури і через accessibility дерево.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Коли використовувати article vs section vs div?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> Плутанина між ними або «це одне і те ж».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>&lt;article&gt;</code> — самодостатній (пост, продукт, коментар). <code>&lt;section&gt;</code> — тематична частина з заголовком. <code>&lt;div&gt;</code> — лише стилізація без семантики.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>DevTools → Accessibility tree (вкладка у Elements) — побачиш як скрін-рідер «бачить» сторінку.</li>
        <li><code>&lt;header&gt;</code> і <code>&lt;footer&gt;</code> можуть бути всередині <code>&lt;article&gt;</code> — це заголовок/підвал статті, а не сайту.</li>
        <li>Google Search Console використовує семантику для featured snippets. <code>&lt;article&gt;</code> + <code>&lt;h1&gt;</code> + мета-теги = краще ранжування.</li>
        <li><code>&lt;main&gt;</code> з <code>id="main"</code> — стандарт для «skip to main content» посилання доступності.</li>
      </ul>
    </section>
  `,

  '03-text': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Текстові елементи в HTML</strong> — це будівельні блоки для контенту: заголовки, параграфи, списки, цитати та інлайнове виділення. Кожен тег надає тексту специфічне семантичне значення, яке скрін-рідери озвучують з правильною інтонацією, а пошукові роботи використовують для аналізу структури матеріалу.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📰</span> Аналогія з друкованою книгою</div>
      <p><code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code> — це назва книги, розділів та підрозділів. <code>&lt;p&gt;</code> — абзаци. <code>&lt;strong&gt;</code> — важливі терміни, що рятують життя або несуть ключову суть. <code>&lt;em&gt;</code> — авторський наголос на слові. <code>&lt;blockquote&gt;</code> — виділена цитата з іншого джерела.</p>
    </section>

    <section>
      <h2>Ієрархія заголовків (h1–h6)</h2>
      <p>Заголовки формують логічний каркас документа (outline). На кожній сторінці має бути рівно один <code>&lt;h1&gt;</code>, а рівні не можна перескакувати (наприклад, з <code>&lt;h2&gt;</code> одразу на <code>&lt;h4&gt;</code>).</p>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln">&lt;h1&gt;Frontend Roadmap 2026&lt;/h1&gt;       &lt;!-- Головний заголовок сторінки --&gt;</span>
<span class="ln">  &lt;h2&gt;Блок 1: Основи HTML&lt;/h2&gt;       &lt;!-- Розділ першого рівня --&gt;</span>
<span class="ln">    &lt;h3&gt;Текстова розмітка&lt;/h3&gt;       &lt;!-- Підрозділ --&gt;</span>
<span class="ln">      &lt;h4&gt;Форматування коду&lt;/h4&gt;     &lt;!-- Деталізація --&gt;</span></code></pre>
      </div>

      <h2>Параграфи, цитати та розділювачі</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Тег</th><th>Тип</th><th>Призначення та правила</th></tr></thead>
          <tbody>
            <tr><td><code>&lt;p&gt;</code></td><td>Блочний</td><td>Абзац тексту. Не можна вкладати блочні елементи всередину <code>&lt;p&gt;</code>.</td></tr>
            <tr><td><code>&lt;blockquote&gt;</code></td><td>Блочний</td><td>Розгорнута цитата з атрибутом <code>cite="URL"</code>.</td></tr>
            <tr><td><code>&lt;q&gt;</code></td><td>Рядковий</td><td>Коротка вбудована цитата — автоматично додає лапки згідно з <code>lang</code>.</td></tr>
            <tr><td><code>&lt;cite&gt;</code></td><td>Рядковий</td><td>Назва твору, книги, статті або автора цитати.</td></tr>
            <tr><td><code>&lt;hr&gt;</code></td><td>Блочний</td><td>Тематичний розрив / зміна теми між параграфами (не просто лінія!).</td></tr>
            <tr><td><code>&lt;br&gt;</code></td><td>Рядковий</td><td>Примусовий перенос рядка (лише для віршів або фізичних адрес).</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Семантичне виділення тексту</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Семантичний тег</th><th>Візуальний аналог</th><th>Різниця та призначення</th></tr></thead>
          <tbody>
            <tr><td><code>&lt;strong&gt;</code></td><td><code>&lt;b&gt;</code></td><td><code>&lt;strong&gt;</code> означає високу важливість (скрін-рідер змінює тон). <code>&lt;b&gt;</code> — суто жирний текст без семантики (наприклад, ключові слова в резюме).</td></tr>
            <tr><td><code>&lt;em&gt;</code></td><td><code>&lt;i&gt;</code></td><td><code>&lt;em&gt;</code> додає смисловий наголос на слові («Я <em>це</em> зробив»). <code>&lt;i&gt;</code> — технічний термін, думка персонажа чи латинська назва.</td></tr>
            <tr><td><code>&lt;mark&gt;</code></td><td>—</td><td>Виділення тексту маркером (наприклад, підсвічування знайденого пошукового запиту).</td></tr>
            <tr><td><code>&lt;small&gt;</code></td><td>—</td><td>Дрібний шрифт: копірайт, юридичні застереження, примітки ліцензії.</td></tr>
            <tr><td><code>&lt;del&gt;</code> / <code>&lt;ins&gt;</code></td><td><code>&lt;s&gt;</code></td><td><code>&lt;del&gt;</code> — видалений текст, <code>&lt;ins&gt;</code> — доданий текст (для історії правок/цін). <code>&lt;s&gt;</code> — неактуальна інформація.</td></tr>
            <tr><td><code>&lt;code&gt;</code>, <code>&lt;pre&gt;</code>, <code>&lt;kbd&gt;</code></td><td>—</td><td><code>&lt;code&gt;</code> — фрагмент коду. <code>&lt;pre&gt;</code> — збереження пробілів та переносів. <code>&lt;kbd&gt;</code> — клавіші клавіатури (<kbd>Ctrl</kbd> + <kbd>C</kbd>).</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Списки: ul, ol, dl</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">&lt;!-- 1. Маркований список (порядок не важливий) --&gt;</span>
<span class="ln">&lt;ul&gt;</span>
<span class="ln">  &lt;li&gt;HTML5&lt;/li&gt;</span>
<span class="ln">  &lt;li&gt;CSS3&lt;/li&gt;</span>
<span class="ln">&lt;/ul&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 2. Нумерований список (хронологія або пріоритет) --&gt;</span>
<span class="ln">&lt;ol start="1" type="1"&gt;</span>
<span class="ln">  &lt;li&gt;Встановити редактор&lt;/li&gt;</span>
<span class="ln">  &lt;li&gt;Створити index.html&lt;/li&gt;</span>
<span class="ln">&lt;/ol&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 3. Список описів / визначень (термін + пояснення, ключ + значення) --&gt;</span>
<span class="ln">&lt;dl&gt;</span>
<span class="ln">  &lt;dt&gt;DNS&lt;/dt&gt;</span>
<span class="ln">  &lt;dd&gt;Система доменних імен для резолвінгу IP-адрес.&lt;/dd&gt;</span>
<span class="ln">  &lt;dt&gt;HTTP&lt;/dt&gt;</span>
<span class="ln">  &lt;dd&gt;Протокол передачі гіпертексту.&lt;/dd&gt;</span>
<span class="ln">&lt;/dl&gt;</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/HTML/Element/Heading_Elements" target="_blank" rel="noopener">Headings h1-h6 — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl" target="_blank" rel="noopener">Description List (dl, dt, dd) — MDN</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Кілька <code>&lt;h1&gt;</code> на сторінці</strong> — погіршує SEO та ламає навігацію скрін-рідерів. Завжди рівно один <code>&lt;h1&gt;</code>.</li>
        <li><strong>Вибір заголовка заради розміру шрифту</strong> — ніколи не ставте <code>&lt;h4&gt;</code> замість <code>&lt;h2&gt;</code> лише тому, що він «менший». Розмір задається в CSS!</li>
        <li><strong>Використання <code>&lt;br&gt;</code> для відступів</strong> — <code>&lt;br&gt;&lt;br&gt;</code> між блоками — табу. Відступи робляться виключно через CSS <code>margin</code> / <code>gap</code>.</li>
        <li><strong>Прямий текст або теги всередині <code>&lt;ul&gt;</code> / <code>&lt;ol&gt;</code></strong> — єдиним прямим дочірнім елементом списку може бути лише <code>&lt;li&gt;</code>.</li>
        <li><strong>Вкладання блочних елементів у <code>&lt;p&gt;</code></strong> — розміщення <code>&lt;div&gt;</code> або <code>&lt;ul&gt;</code> всередині <code>&lt;p&gt;</code> змусить браузер автозакрити параграф і зламати верстку.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи статтю з правильним деревом заголовків: <code>&lt;h1&gt;</code> → два <code>&lt;h2&gt;</code>, всередині кожного по два <code>&lt;h3&gt;</code>.</li>
        <li>Опиши глосарій із 3 веб-термінів за допомогою списку <code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>.</li>
        <li>Створи блок цитати: <code>&lt;blockquote&gt;</code> з цитатою, посиланням в <code>cite</code> та автором у <code>&lt;cite&gt;</code>.</li>
        <li>Оформи інструкцію з гарячими клавішами за допомогою <code>&lt;kbd&gt;</code> та фрагментом коду всередині <code>&lt;pre&gt;&lt;code&gt;</code>.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>У чому різниця між <code>&lt;strong&gt;</code> та <code>&lt;b&gt;</code>? Як це впливає на accessibility?</li>
        <li>Коли доречно використовувати <code>&lt;dl&gt;</code> замість <code>&lt;ul&gt;</code>? Наведи 2 приклади з практики.</li>
        <li>Чому перескакування рівнів заголовків (наприклад, h1 → h3) шкодить доступності?</li>
        <li>Яке семантичне призначення має тег <code>&lt;hr&gt;</code> в HTML5?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«У чому різниця між b і strong, i та em?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Ніякої різниці, вони однаково виглядають у браузері».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>&lt;b&gt;</code> та <code>&lt;i&gt;</code> — це суто презентаційні (стилістичні) теги без смислового навантаження. <code>&lt;strong&gt;</code> несе семантичну важливість або терміновість (озвучується скрін-рідером з акцентом), а <code>&lt;em&gt;</code> передає змістовний наголос (stress emphasis), змінюючи сенс речення.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як правильно організувати структуру заголовків на сторінці?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Вибирати заголовок під потрібний розмір тексту в дизайні».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Заголовки будують суворе деревоподібне зміст документа (Outline). Сторінка містить рівно один <code>&lt;h1&gt;</code>, далі йдуть <code>&lt;h2&gt;</code> для головних секцій, <code>&lt;h3&gt;</code> для підсекцій. Рівні не перескакуються. Візуальний розмір налаштовується виключно через CSS.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>Тег <code>&lt;wbr&gt;</code> вказує браузеру місце, де довге нерозривне слово (наприклад, URL) можна перенести на новий рядок без дефіса.</li>
        <li>Атрибут <code>reversed</code> для <code>&lt;ol reversed&gt;</code> автоматично нумерує список у зворотньому порядку (10, 9, 8...).</li>
        <li>Тег <code>&lt;time datetime="2026-08-24T18:00"&gt;</code> робить дати машиночитаними для пошукових роботів та календаря.</li>
        <li>Комбінація <code>&lt;pre&gt;&lt;code&gt;</code> — стандартний патерн для багаторядкового підсвічування коду з фіксацією пробілів.</li>
      </ul>
    </section>
  `,

  '04-links-images': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Посилання (<code>&lt;a&gt;</code>) та зображення (<code>&lt;img&gt;</code>, <code>&lt;picture&gt;</code>)</strong> — основа Всесвітньої павутини. Посилання з'єднують документи у гіпертекстову мережу, а оптимізовані зображення забезпечують швидке завантаження та візуальний контакт без шкоди для швидкодії сайту.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🚪</span> Аналогія з порталами та вікнами</div>
      <p>Посилання (<code>&lt;a&gt;</code>) — це двері й портали у будь-яку кімнату інтернету або іншу частину цієї ж кімнати (якір). Зображення (<code>&lt;img&gt;</code>) — це вікно, розміри якого треба заздалегідь підготувати будівельникам (width/height), щоб стіна не стрибала перед очима мешканця під час доставки рами.</p>
    </section>

    <section>
      <h2>Анатомія посилання (тег <code>&lt;a&gt;</code>)</h2>
      <p>Атрибут <code>href</code> визначає призначення переходу. Без <code>href</code> елемент <code>&lt;a&gt;</code> є лише плейсхолдером і не фокусується з клавіатури.</p>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">&lt;!-- 1. Зовнішнє посилання у новій вкладці (БЕЗПЕЧНО) --&gt;</span>
<span class="ln">&lt;a href="https://google.com" target="_blank" rel="noopener noreferrer"&gt;Google&lt;/a&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 2. Внутрішній якір на ідентифікатор секції --&gt;</span>
<span class="ln">&lt;a href="#contacts"&gt;Перейти до контактів&lt;/a&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 3. Спеціальні протоколи: email, телефон, завантаження файлу --&gt;</span>
<span class="ln">&lt;a href="mailto:support@example.com?subject=Питання"&gt;Написати листа&lt;/a&gt;</span>
<span class="ln">&lt;a href="tel:+380991234567"&gt;Зателефонувати&lt;/a&gt;</span>
<span class="ln">&lt;a href="/files/roadmap.pdf" download="frontend-roadmap-2026.pdf"&gt;Завантажити PDF&lt;/a&gt;</span></code></pre>
      </div>

      <h2>Безпека та SEO для посилань (атрибут <code>rel</code>)</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Значення rel</th><th>Призначення та ефект</th></tr></thead>
          <tbody>
            <tr><td><code>noopener</code></td><td>Запобігає вразливості tabnabbing: нова вкладка не отримує доступ до <code>window.opener</code>.</td></tr>
            <tr><td><code>noreferrer</code></td><td>Приховує Referer заголовок — цільовий сайт не знає, звідки прийшов користувач. Включає в себе noopener.</td></tr>
            <tr><td><code>nofollow</code></td><td>Вказує пошуковим роботам не передавати PageRank і не асоціювати сайт з цільовим посиланням.</td></tr>
            <tr><td><code>sponsored</code> / <code>ugc</code></td><td>Для платних/рекламних посилань (sponsored) та посилань користувачів у коментарях (ugc).</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Зображення (тег <code>&lt;img&gt;</code>) та запобігання CLS</h2>
      <p>Тег <code>&lt;img&gt;</code> — це порожній самозакривний рядково-блочний елемент. Завжди вказуйте <code>width</code>, <code>height</code> та <code>alt</code>!</p>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln">&lt;img</span>
<span class="ln">  src="/images/hero-banner.webp"</span>
<span class="ln">  alt="Студенти вивчають фронтенд на лекції"</span>
<span class="ln">  width="1200"</span>
<span class="ln">  height="630"</span>
<span class="ln">  loading="lazy"</span>
<span class="ln">  decoding="async"</span>
<span class="ln">/&gt;</span></code></pre>
      </div>

      <h2>Атрибути тегу img</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Атрибут</th><th>Обов'язковий?</th><th>Опис і найкращі практики</th></tr></thead>
          <tbody>
            <tr><td><code>src</code></td><td>Так</td><td>Шлях до файлу зображення (відносний або абсолютний URL).</td></tr>
            <tr><td><code>alt</code></td><td>Так</td><td>Текстовий опис для скрін-рідерів та при збої завантаження. Для декоративних іконок ставте <code>alt=""</code>.</td></tr>
            <tr><td><code>width</code> / <code>height</code></td><td>Рекомендовано</td><td>Оригінальні розміри в пікселях. Браузер резервує місце (aspect-ratio) і уникає зсуву макета (CLS = 0).</td></tr>
            <tr><td><code>loading="lazy"</code></td><td>Ні</td><td>Відкладає завантаження картинки до наближення до viewport. Не ставте на Hero зображення!</td></tr>
            <tr><td><code>decoding="async"</code></td><td>Ні</td><td>Декодує графіку поза головним потоком браузера, запобігаючи лагам інтерфейсу.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Адаптивні зображення: srcset, sizes та тег picture</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">&lt;!-- 1. Роздільна здатність під різні екрани (Retina 1x vs 2x) --&gt;</span>
<span class="ln">&lt;img src="logo.png" srcset="logo.png 1x, logo@2x.png 2x" alt="Логотип компанії" /&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 2. Розміри під ширину в'юпорту браузера --&gt;</span>
<span class="ln">&lt;img</span>
<span class="ln">  src="photo-800.jpg"</span>
<span class="ln">  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"</span>
<span class="ln">  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"</span>
<span class="ln">  alt="Гірський пейзаж на сході сонця"</span>
<span class="ln">/&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 3. Сучасні формати (AVIF/WebP) з фолбеком через &lt;picture&gt; --&gt;</span>
<span class="ln">&lt;picture&gt;</span>
<span class="ln">  &lt;source srcset="photo.avif" type="image/avif" /&gt;</span>
<span class="ln">  &lt;source srcset="photo.webp" type="image/webp" /&gt;</span>
<span class="ln">  &lt;img src="photo.jpg" alt="Панорама міста" width="800" height="500" loading="lazy" /&gt;</span>
<span class="ln">&lt;/picture&gt;</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/HTML/Element/a" target="_blank" rel="noopener">Anchor element &lt;a&gt; — MDN</a></li>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/HTML/Element/img" target="_blank" rel="noopener">Image element &lt;img&gt; — MDN</a></li>
          <li><a href="https://web.dev/articles/serve-responsive-images" target="_blank" rel="noopener">Responsive Images Guide — web.dev</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Відсутність <code>alt</code> у <code>&lt;img&gt;</code></strong> — скрін-рідери прочитають повний шлях до файлу (наприклад, «IMG_2026_08_final_v2.png»), що повністю ламає a11y.</li>
        <li><strong>Текст «зображення» або «фото» всередині <code>alt</code></strong> — скрін-рідер і так повідомляє «графіка/зображення», пишіть суто опис змісту.</li>
        <li><strong>Відсутність <code>width</code> і <code>height</code></strong> — призводить до зсуву контенту при завантаженні (Layout Shift / поганий показник CLS у Web Vitals).</li>
        <li><strong><code>target="_blank"</code> без захисту</strong> — стара вразливість дозволяє сторонній сторінці перенаправити вихідну вкладку через <code>window.opener.location</code>.</li>
        <li><strong><code>loading="lazy"</code> для зображень у першому екрані (Hero/LCP)</strong> — це відкладає завантаження головного банера і погіршує швидкість LCP!</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи навігаційне меню з якірними посиланнями (<code>#about</code>, <code>#services</code>, <code>#footer</code>) з плавним скролом (<code>scroll-behavior: smooth</code>).</li>
        <li>Оформи посилання на соціальні мережі, що відкриваються у новій вкладці з правильними <code>rel</code> атрибутами.</li>
        <li>Створи адаптивний блок з <code>&lt;picture&gt;</code>, який завантажує AVIF для сучасних браузерів та JPG як fallback.</li>
        <li>Перевір у DevTools → Network (вкладка Img), яке саме зображення вибирає браузер при зміні ширини вікна з <code>srcset</code> та <code>sizes</code>.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Чому важливо вказувати <code>width</code> та <code>height</code> в HTML для <code>&lt;img&gt;</code> навіть якщо CSS перезаписує ширину (<code>width: 100%; height: auto</code>)?</li>
        <li>Яка різниця між <code>alt=""</code> та повною відсутністю атрибута <code>alt</code>?</li>
        <li>Як <code>rel="noopener noreferrer"</code> захищає від атаки tabnabbing?</li>
        <li>У яких випадках слід використовувати <code>&lt;picture&gt;</code>, а в яких достатньо <code>srcset</code> на <code>&lt;img&gt;</code>?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як оптимізувати завантаження зображень на веб-сторінці?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Стиснути в фотошопі і все».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Комплексний підхід: сучасні формати (AVIF/WebP), адаптивні розміри через <code>srcset</code>/<code>sizes</code>, вказування <code>width</code>/<code>height</code> для усунення CLS, <code>loading="lazy"</code> для зображень нижче першого екрана та пріоритет (<code>fetchpriority="high"</code>) для LCP зображення.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«У чому небезпека target="_blank" і як її усунути?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Ніякої небезпеки немає, це просто відкриття нової вкладки».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Сторінка, що відкрилася, отримує доступ до об'єкта <code>window.opener</code> оригінальної сторінки і може виконати фішингове перенаправлення на шкідливий сайт. Захист — атрибут <code>rel="noopener noreferrer"</code>. Сучасні браузери роблять це за замовчуванням, але явне вказування обов'язкове для стабільнішої сумісності.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>Атрибут <code>fetchpriority="high"</code> на <code>&lt;img&gt;</code> дає сигнал браузеру завантажити банер найпершим серед усіх ресурсів.</li>
        <li>SVG можна вставляти через <code>&lt;img src="icon.svg"&gt;</code> (ізольований) або напряму інлайн <code>&lt;svg&gt;</code> для зміни кольорів через CSS <code>currentColor</code>.</li>
        <li>Для телефонних номерів використовуйте міжнародний формат у <code>href="tel:+380..."</code>, навіть якщо на екрані текст відформатований з дужками та пробілами.</li>
        <li>CSS властивість <code>aspect-ratio</code> автоматично обчислюється браузером з атрибутів <code>width</code> та <code>height</code> в HTML.</li>
      </ul>
    </section>
  `,

  '05-forms': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>HTML-форми (<code>&lt;form&gt;</code>)</strong> — це фундамент інтерактивності вебу: авторизація, реєстрація, пошукові рядки, фільтри товарів, оформлення замовлень та зворотний зв'язок. Вони збирають дані користувача і відправляють їх на сервер або передають у JavaScript.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📋</span> Аналогія з бланком анкети</div>
      <p><code>&lt;form&gt;</code> — це паперова папка з анкетою. <code>&lt;label&gt;</code> — це надрукований підпис поля («Введіть ваше ім'я:»). <code>&lt;input&gt;</code> — пусте поле для запису. <code>&lt;select&gt;</code> — список варіантів із галочкою. <code>&lt;button type="submit"&gt;</code> — кнопка «Здати анкету адміністратору».</p>
    </section>

    <section>
      <h2>Анатомія форми (тег <code>&lt;form&gt;</code>)</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln">&lt;form action="/api/login" method="POST" autocomplete="on"&gt;</span>
<span class="ln">  &lt;!-- 1. Явний зв'язок label та input через id і for --&gt;</span>
<span class="ln">  &lt;div class="form-group"&gt;</span>
<span class="ln">    &lt;label for="user-email"&gt;Електронна пошта:&lt;/label&gt;</span>
<span class="ln">    &lt;input type="email" id="user-email" name="email" required placeholder="name@example.com" /&gt;</span>
<span class="ln">  &lt;/div&gt;</span>
<span class="ln"></span>
<span class="ln">  &lt;div class="form-group"&gt;</span>
<span class="ln">    &lt;label for="user-pass"&gt;Пароль:&lt;/label&gt;</span>
<span class="ln">    &lt;input type="password" id="user-pass" name="password" required minlength="8" /&gt;</span>
<span class="ln">  &lt;/div&gt;</span>
<span class="ln"></span>
<span class="ln">  &lt;button type="submit"&gt;Увійти в кабінет&lt;/button&gt;</span>
<span class="ln">&lt;/form&gt;</span></code></pre>
      </div>

      <h2>Головні атрибути форми</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Атрибут</th><th>Значення</th><th>Призначення</th></tr></thead>
          <tbody>
            <tr><td><code>action</code></td><td>URL ендпоінту</td><td>Куди надсилати дані форми. У React/Next.js часто опускається або замінюється на Server Actions.</td></tr>
            <tr><td><code>method</code></td><td><code>GET</code> або <code>POST</code></td><td><code>GET</code> — додає поля у рядок URL (пошук, фільтри). <code>POST</code> — надсилає дані в тілі запиту (паролі, реєстрація).</td></tr>
            <tr><td><code>enctype</code></td><td><code>multipart/form-data</code></td><td><strong>Обов'язковий</strong> при завантаженні файлів через <code>&lt;input type="file"&gt;</code>. За замовчуванням: <code>application/x-www-form-urlencoded</code>.</td></tr>
            <tr><td><code>name</code></td><td>Рядок ідентифікатора</td><td>Ключ, під яким значення інпуту надсилається на сервер (<code>email=ivan%40dev.ua</code>).</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Типи інпутів (HTML5 Input Types)</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>type</th><th>Вигляд і поведінка</th><th>Мобільна клавіатура / Валідація</th></tr></thead>
          <tbody>
            <tr><td><code>text</code></td><td>Звичайний однорядковий текст</td><td>Стандартна буквена клавіатура</td></tr>
            <tr><td><code>email</code></td><td>Пошта з перевіркою @ і домену</td><td>Клавіатура зі знаками <code>@</code> та <code>.</code></td></tr>
            <tr><td><code>password</code></td><td>Приховані символи (крапки/зірочки)</td><td>Безпечний режим введення</td></tr>
            <tr><td><code>number</code></td><td>Числове поле (зі стрілками min/max/step)</td><td>Цифрова клавіатура</td></tr>
            <tr><td><code>tel</code></td><td>Телефонний номер</td><td>Клавіатура набору номера телефону (NumPad)</td></tr>
            <tr><td><code>checkbox</code></td><td>Прапорець незалежного вибору [v]</td><td>Кілька одночасно активних опцій</td></tr>
            <tr><td><code>radio</code></td><td>Перемикач єдиного вибору (•)</td><td>Лише одна опція в групі з однаковим <code>name</code></td></tr>
            <tr><td><code>file</code></td><td>Діалог завантаження файлу</td><td>Атрибути <code>accept="image/*"</code> та <code>multiple</code></td></tr>
            <tr><td><code>range</code></td><td>Повзунок вибору значення</td><td>Атрибути <code>min="0" max="100" step="5"</code></td></tr>
            <tr><td><code>hidden</code></td><td>Приховане поле</td><td>Передача службових токенів (CSRF token, user_id)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Інші ключові елементи форми</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">&lt;!-- 1. Багаторядкове поле (textarea) --&gt;</span>
<span class="ln">&lt;label for="bio"&gt;Про себе:&lt;/label&gt;</span>
<span class="ln">&lt;textarea id="bio" name="bio" rows="4" cols="50" placeholder="Розкажіть про свій досвід..."&gt;&lt;/textarea&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 2. Випадаючий список (select + option + optgroup) --&gt;</span>
<span class="ln">&lt;label for="country"&gt;Країна:&lt;/label&gt;</span>
<span class="ln">&lt;select id="country" name="country"&gt;</span>
<span class="ln">  &lt;optgroup label="Європа"&gt;</span>
<span class="ln">    &lt;option value="ua" selected&gt;Україна&lt;/option&gt;</span>
<span class="ln">    &lt;option value="pl"&gt;Польща&lt;/option&gt;</span>
<span class="ln">  &lt;/optgroup&gt;</span>
<span class="ln">&lt;/select&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 3. Групування блоків (fieldset + legend) --&gt;</span>
<span class="ln">&lt;fieldset&gt;</span>
<span class="ln">  &lt;legend&gt;Спосіб доставки&lt;/legend&gt;</span>
<span class="ln">  &lt;label&gt;&lt;input type="radio" name="delivery" value="courier" checked /&gt; Кур'єр&lt;/label&gt;</span>
<span class="ln">  &lt;label&gt;&lt;input type="radio" name="delivery" value="pickup" /&gt; Самовивіз&lt;/label&gt;</span>
<span class="ln">&lt;/fieldset&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- 4. Підказки для введення (datalist) --&gt;</span>
<span class="ln">&lt;input list="browsers" name="browser" placeholder="Виберіть браузер..." /&gt;</span>
<span class="ln">&lt;datalist id="browsers"&gt;</span>
<span class="ln">  &lt;option value="Chrome"&gt;</span>
<span class="ln">  &lt;option value="Firefox"&gt;</span>
<span class="ln">  &lt;option value="Safari"&gt;</span>
<span class="ln">&lt;/datalist&gt;</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/HTML/Element/form" target="_blank" rel="noopener">Form element — MDN</a></li>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/HTML/Element/input" target="_blank" rel="noopener">Input types &amp; attributes — MDN</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Відсутність <code>&lt;label&gt;</code> або зв'язку через <code>for/id</code></strong> — користувачі зі скрін-рідерами не знатимуть, що вводити в інпут, а користувачі миші не зможуть клікнути по тексту, щоб активувати поле.</li>
        <li><strong>Заміна <code>&lt;label&gt;</code> на <code>placeholder</code></strong> — плейсхолдер зникає при введенні тексту і не озвучується багатьма асистивними технологіями як заголовок поля!</li>
        <li><strong>Відсутність атрибута <code>name</code></strong> — значення інпуту без <code>name</code> взагалі <strong>не буде надіслано</strong> у формі на сервер або у <code>FormData</code>.</li>
        <li><strong><code>&lt;button&gt;</code> всередині форми без <code>type="button"</code></strong> — за замовчуванням кнопка має <code>type="submit"</code> і при кліку несподівано перезавантажить сторінку та відправить форму!</li>
        <li><strong>Забутий <code>enctype="multipart/form-data"</code></strong> — при надсиланні файлів без цього атрибута сервер отримає лише текстову назву файлу замість бінарних даних.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>Створи форму зворотного зв'язку з полями: ПІБ, Email, Телефон, Вибір теми (select), Повідомлення (textarea) та чекбокс згоди з умовами.</li>
        <li>Пов'яжи кожен <code>&lt;input&gt;</code> з відповідним <code>&lt;label&gt;</code> через <code>for</code> та <code>id</code>. Перевір: клік по тексту підпису має ставити курсор в інпут.</li>
        <li>Створи групу radio-кнопок для вибору тарифу (Basic, Pro, Enterprise) з однаковим атрибутом <code>name="plan"</code>.</li>
        <li>Додай до форми <code>&lt;input type="file" accept="image/png, image/jpeg"&gt;</code> та переконайся, що у форми стоїть <code>enctype="multipart/form-data"</code>.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Яка поведінка кнопки <code>&lt;button&gt;</code> за замовчуванням усередині форми і чому це часто призводить до багів?</li>
        <li>У чому різниця між методом <code>GET</code> та <code>POST</code> при відправці форми?</li>
        <li>Чому <code>placeholder</code> ніколи не замінює повноцінний тег <code>&lt;label&gt;</code>?</li>
        <li>Як зробити так, щоб у групі radio-кнопок можна було вибрати лише один варіант?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як правильно зв'язати label з input і чому це важливо?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Поставити текст поруч із інпутом у div».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Використати <code>&lt;label for="id_елемента"&gt;</code> разом з <code>&lt;input id="id_елемента"&gt;</code> або вкласти <code>&lt;input&gt;</code> всередину <code>&lt;label&gt;</code>. Це критично для: (1) Accessibility — скрін-рідер озвучує назву при фокусі; (2) UX — збільшує клікабельну зону (клік по тексту ставить курсор або перемикає чекбокс).</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«У чому різниця між значеннями атрибута type у кнопки (button, submit, reset)?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Вони однакові, тип не має значення».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>submit</code> (дефолт) — відправляє форму і викликає подію submit. <code>button</code> — просто звичайна кнопка без вбудованої поведінки для JS обробників (наприклад, відкрити модалку). <code>reset</code> — скидає всі поля форми до початкових значень.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>Атрибут <code>inputmode="numeric"</code> на <code>&lt;input type="text"&gt;</code> відкриває зручну цифрову клавіатуру на iOS/Android без зайвих стрілочок зсуву, які з'являються при <code>type="number"</code> (ідеально для банківських карток та SMS-кодів).</li>
        <li>Атрибут <code>autocomplete="new-password"</code> або <code>current-password</code> допомагає менеджерам паролів автоматично генерувати та зберігати безпечні паролі.</li>
        <li>Атрибут <code>form="form-id"</code> дозволяє розмістити інпут або кнопку поза межами тегу <code>&lt;form&gt;</code> у DOM-дереві, і вони все одно належатимуть цій формі.</li>
      </ul>
    </section>
  `,
};


