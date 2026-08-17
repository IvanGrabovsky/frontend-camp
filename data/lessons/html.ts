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
};
