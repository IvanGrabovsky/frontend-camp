// Lesson HTML content for the "How the Internet Works" course

export const LESSONS_HTML: Record<string, string> = {
  '01-what-happens': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>Кожного разу</strong>, коли ти вводиш адресу в браузер і натискаєш Enter, запускається складний ланцюжок подій — від перетворення доменного імені на IP-адресу до малювання пікселів на екрані.</p>
      <p>Це питання — одне з найпопулярніших на <strong>технічних співбесідах</strong>. Відповідь показує наскільки глибоко ти розумієш веб.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📬</span> Аналогія з листом</div>
      <p>Ти пишеш на конверті адресу (URL). Пошта (DNS) знаходить будинок. Листоноша (TCP) доставляє з підтвердженням. Лист у спецконверті (TLS) — зашифрований. Друг розпаковує (парсинг HTML) і читає (рендеринг).</p>
    </section>

    <section>
      <h2>Повний шлях — 9 кроків</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// Крок 1 — Парсинг URL</span>
<span class="ln">https://example.com:443/about?lang=ua</span>
<span class="ln">│       │           │   │     └─ query string</span>
<span class="ln">│       │           │   └─ path</span>
<span class="ln">│       │           └─ port</span>
<span class="ln">│       └─ host (домен)</span>
<span class="ln">└─ scheme (протокол)</span></code></pre>
      </div>

      <ol class="steps">
        <li><strong>Парсинг URL</strong> — браузер розбиває рядок на scheme, host, port, path, query, fragment.</li>
        <li><strong>Перевірка кешу</strong> — браузер → кеш ОС → файл <code>/etc/hosts</code>.</li>
        <li><strong>DNS-запит</strong> — резолвер → Root → TLD (.com) → Authoritative → IP-адреса.</li>
        <li><strong>TCP Handshake</strong> — SYN → SYN-ACK → ACK (трьохстороннє рукостискання).</li>
        <li><strong>TLS Handshake</strong> (HTTPS) — обмін сертифікатами, узгодження ключів.</li>
        <li><strong>HTTP-запит</strong> — GET/POST + заголовки (Host, User-Agent, Accept, Cookie).</li>
        <li><strong>Відповідь сервера</strong> — статус-код + заголовки + тіло (HTML).</li>
        <li><strong>Rendering pipeline</strong> — HTML→DOM, CSS→CSSOM, Render Tree → Layout → Paint → Composite.</li>
        <li><strong>Додаткові ресурси</strong> — CSS, JS, зображення, шрифти завантажуються паралельно.</li>
      </ol>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// Rendering pipeline</span>
<span class="ln">HTML → DOM</span>
<span class="ln">CSS  → CSSOM</span>
<span class="ln">        ↓</span>
<span class="ln">DOM + CSSOM → Render Tree → Layout → Paint → Composite</span></code></pre>
      </div>

      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Метрика</th><th>Що вимірює</th><th>Орієнтир</th></tr></thead>
          <tbody>
            <tr><td><code>TTFB</code></td><td>Time to First Byte</td><td>&lt; 200ms</td></tr>
            <tr><td><code>FCP</code></td><td>First Contentful Paint</td><td>&lt; 1.8s</td></tr>
            <tr><td><code>LCP</code></td><td>Largest Contentful Paint</td><td>&lt; 2.5s</td></tr>
            <tr><td><code>CLS</code></td><td>Layout Shift</td><td>&lt; 0.1</td></tr>
          </tbody>
        </table>
      </div>

      <div class="doc-links">
        <h4>Додаткові ресурси</h4>
        <ul>
          <li><a href="https://developer.chrome.com/docs/devtools/network/" target="_blank" rel="noopener">Chrome DevTools: Network panel</a></li>
          <li><a href="https://web.dev/articles/navigation-and-resource-timing" target="_blank" rel="noopener">Navigation Timing API — web.dev</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>«Браузер робить один запит»</strong> — ні. Типова сторінка: 50–200 запитів.</li>
        <li><strong>«DNS відбувається кожного разу»</strong> — ні. Відповіді кешуються (TTL).</li>
        <li><strong>«CSS не впливає на швидкість»</strong> — CSS є render-blocking ресурсом.</li>
        <li><strong>«HTTPS — інший протокол»</strong> — ні, це HTTP + TLS шифрування.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика в DevTools</div>
      <ol>
        <li>Відкрий DevTools → Network → перезавантаж сторінку. Знайди перший HTML-запит, подивись заголовки та TTFB у Timing.</li>
        <li>Знайди загальну кількість запитів і розмір даних. Порівняй Google.com і YouTube.com.</li>
        <li>У консолі: <code>performance.getEntriesByType('navigation')[0]</code> — порахуй TTFB: <code>responseStart - requestStart</code>.</li>
        <li>DevTools → Performance → запиши завантаження, знайди FCP і LCP на таймлайні.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Назви 9 кроків від введення URL до рендеру сторінки.</li>
        <li>Що таке 3-way handshake і навіщо він?</li>
        <li>Чому CSS є render-blocking ресурсом, а зображення — ні?</li>
        <li>Яка різниця між DOM і Render Tree?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що відбувається коли вводиш URL?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Браузер надсилає запит на сервер» — занадто поверхнево.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> URL → кеш → DNS → TCP → TLS → HTTP-запит → відповідь → парсинг → рендеринг. Не забудь про паралельне завантаження ресурсів.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке Critical Rendering Path?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> Плутають DOM і Render Tree.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> HTML→DOM, CSS→CSSOM → Render Tree (без <code>display:none</code>) → Layout → Paint → Composite.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>DevTools → Security: деталі TLS-з'єднання (версія, алгоритм, сертифікат).</li>
        <li><code>dig example.com +trace</code> у терміналі показує повний DNS-ланцюжок.</li>
        <li>HTTP/2 мультиплексування: кілька запитів через одне TCP-з'єднання.</li>
        <li><code>&lt;link rel="preconnect"&gt;</code> — DNS+TCP+TLS заздалегідь, до того як браузер знайде ресурс у HTML.</li>
      </ul>
    </section>
  `,

  '02-dns': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>DNS (Domain Name System)</strong> — розподілена база даних, яка перетворює людиночитані домени (<code>google.com</code>) на IP-адреси (<code>142.250.185.46</code>). Без DNS ти мусив би знати числові адреси кожного сайту.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📖</span> Аналогія з телефонною книгою</div>
      <p>DNS — це <strong>телефонна книга інтернету</strong>. Ти знаєш ім'я (домен), книга дає номер (IP). Але вона глобальна, автоматично оновлюється і кешується на кожному рівні.</p>
    </section>

    <section>
      <h2>Ієрархія та повний ланцюжок запиту</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// Ланцюжок DNS при першому запиті</span>
<span class="ln">Браузер (кеш?) → ОС (кеш / /etc/hosts?)</span>
<span class="ln">  → Рекурсивний резолвер (провайдер / 8.8.8.8)</span>
<span class="ln">    → Root DNS  ("com? → 192.5.6.30")</span>
<span class="ln">    → TLD .com  ("example.com? → ns1.example.com")</span>
<span class="ln">    → Authoritative ("example.com A → 93.184.216.34, TTL 3600")</span>
<span class="ln">← IP повертається і кешується на кожному рівні</span></code></pre>
      </div>

      <h2>Типи DNS-записів</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Тип</th><th>Призначення</th><th>Приклад</th></tr></thead>
          <tbody>
            <tr><td><code>A</code></td><td>Домен → IPv4</td><td><code>example.com → 93.184.216.34</code></td></tr>
            <tr><td><code>AAAA</code></td><td>Домен → IPv6</td><td><code>example.com → 2606:2800:...</code></td></tr>
            <tr><td><code>CNAME</code></td><td>Псевдонім домену</td><td><code>www → example.com</code></td></tr>
            <tr><td><code>MX</code></td><td>Поштовий сервер</td><td><code>example.com → mail.example.com</code></td></tr>
            <tr><td><code>TXT</code></td><td>Текст (SPF, DKIM, верифікація)</td><td><code>"v=spf1..."</code></td></tr>
            <tr><td><code>TTL</code></td><td>Час кешування (секунди)</td><td><code>3600</code> = 1 год</td></tr>
          </tbody>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt"># Команди в терміналі</span>
<span class="ln">dig google.com A              # A-запис</span>
<span class="ln">dig google.com +trace         # повний ланцюжок</span>
<span class="ln">dig @8.8.8.8 google.com A    # через Google DNS</span>
<span class="ln">dig @1.1.1.1 google.com A    # через Cloudflare DNS</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Інструменти</h4>
        <ul>
          <li><a href="https://dnschecker.org/" target="_blank" rel="noopener">DNS Checker — перевірити поширення</a></li>
          <li><a href="https://www.iana.org/domains/root/servers" target="_blank" rel="noopener">IANA Root Servers</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>«DNS-зміна миттєва»</strong> — ні. Поширення: хвилини–24+ год залежно від TTL.</li>
        <li><strong>«CNAME на root-домен»</strong> — неможливо. На <code>@</code> тільки A/AAAA/MX/TXT/NS.</li>
        <li><strong>«Один домен — одна IP»</strong> — ні. Round-robin DNS: кілька A-записів для балансування.</li>
        <li><strong>«DNS безпечний»</strong> — базовий DNS не шифрується (UDP 53). Є DoH та DoT.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li><code>dig google.com A</code> — знайди IP та TTL у секції ANSWER.</li>
        <li><code>dig google.com +trace</code> — відстеж Root → TLD → Authoritative.</li>
        <li>Порівняй <code>dig @8.8.8.8</code> і <code>dig @1.1.1.1</code> — чи різні IP?</li>
        <li>DevTools → Network → Timing: порівняй "DNS Lookup" для першого і повторного запиту.</li>
        <li>Відкрий <code>chrome://net-internals/#dns</code> — побач закешовані домени.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Назви 4 рівні ієрархії DNS і роль кожного.</li>
        <li>Що таке TTL і чому важливо зменшити його перед переїздом сайту?</li>
        <li>Різниця між A і CNAME? Коли який?</li>
        <li>Що таке рекурсивний резолвер?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Поясни DNS»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «DNS перетворює домени в IP» — занадто поверхнево.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Ієрархія Root→TLD→Authoritative, роль резолвера, кешування з TTL, конкретний приклад для google.com.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Чому DNS-зміни не миттєві?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Треба чекати» — без механізму.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> TTL: резолвери кешують відповідь на TTL секунд. При TTL=86400 стара IP може триматися 24год. Рішення: зменшити TTL до 300s за 24-48год до зміни.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>Файл <code>/etc/hosts</code> (Mac/Linux) обходить DNS повністю — записи там мають пріоритет.</li>
        <li>Round-robin DNS: Google має ~8 A-записів, кожен запит отримує різні IP.</li>
        <li>DNS cache poisoning — підробка відповідей. Захист: DNSSEC (цифровий підпис).</li>
      </ul>
    </section>
  `,

  '03-tcp-ip': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>TCP/IP</strong> — набір протоколів, на якому базується весь інтернет. TCP (Transmission Control Protocol) забезпечує надійну доставку даних: кожен пакет підтверджується, втрачені — перепосилаються. IP (Internet Protocol) адресує й маршрутизує пакети між мережами.</p>
      <p>Модель <strong>OSI</strong> — теоретична семирівнева модель мережевих комунікацій. TCP/IP — практична реалізація, де рівні об'єднані.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">📦</span> Аналогія з поштою</div>
      <p>IP — це адреса на конверті (знає куди доставити). TCP — це кур'єрська служба з підтвердженням: отримувач підписує квитанцію за кожен пакет. Якщо пакет загубився — кур'єр привезе знову.</p>
    </section>

    <section>
      <h2>Трьохстороннє рукостискання (3-way handshake)</h2>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// TCP з'єднання між клієнтом і сервером</span>
<span class="ln">Клієнт                    Сервер</span>
<span class="ln">  │──── SYN ────────────────▶│  (1) «Хочу з'єднатися»</span>
<span class="ln">  │◀─── SYN-ACK ────────────│  (2) «Окей, підтверджую, теж хочу»</span>
<span class="ln">  │──── ACK ────────────────▶│  (3) «Підтверджую твоє підтвердження»</span>
<span class="ln">  │                          │</span>
<span class="ln">  │═══════ Дані ════════════▶│  З'єднання встановлено</span></code></pre>
      </div>

      <h2>Модель OSI vs TCP/IP</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>OSI рівень</th><th>TCP/IP рівень</th><th>Протоколи / приклади</th></tr></thead>
          <tbody>
            <tr><td>7. Прикладний</td><td rowspan="3">Прикладний</td><td>HTTP, HTTPS, DNS, FTP, WebSocket</td></tr>
            <tr><td>6. Представлення</td><td>TLS/SSL, JSON, XML</td></tr>
            <tr><td>5. Сесійний</td><td>TLS (частково), cookies</td></tr>
            <tr><td>4. Транспортний</td><td>Транспортний</td><td>TCP, UDP — порти 0–65535</td></tr>
            <tr><td>3. Мережевий</td><td>Інтернет</td><td>IP (IPv4/IPv6), ICMP, роутери</td></tr>
            <tr><td>2. Канальний</td><td rowspan="2">Мережевий доступ</td><td>Ethernet, Wi-Fi, MAC-адреси</td></tr>
            <tr><td>1. Фізичний</td><td>Кабелі, сигнали, радіохвилі</td></tr>
          </tbody>
        </table>
      </div>

      <h2>TCP vs UDP</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Характеристика</th><th>TCP</th><th>UDP</th></tr></thead>
          <tbody>
            <tr><td>Надійність</td><td>✅ Гарантована доставка</td><td>❌ «Вистрілив і забув»</td></tr>
            <tr><td>Порядок пакетів</td><td>✅ Збережений</td><td>❌ Довільний</td></tr>
            <tr><td>Швидкість</td><td>⚠️ Повільніший (overhead)</td><td>✅ Швидший</td></tr>
            <tr><td>З'єднання</td><td>Так (handshake)</td><td>Ні (connectionless)</td></tr>
            <tr><td>Використання</td><td>HTTP, email, файли</td><td>DNS, відео-стрімінг, ігри</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Порти</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// Стандартні порти</span>
<span class="ln">HTTP   → 80      HTTPS   → 443</span>
<span class="ln">DNS    → 53      SSH     → 22</span>
<span class="ln">FTP    → 21      SMTP    → 25</span>
<span class="ln">MySQL  → 3306    PostgreSQL → 5432</span>
<span class="ln">Redis  → 6379    MongoDB → 27017</span>
<span class="ln cmt">// Діапазони</span>
<span class="ln">0–1023   — системні (Well-known)</span>
<span class="ln">1024–49151 — зареєстровані (Registered)</span>
<span class="ln">49152–65535 — динамічні / приватні</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Glossary/TCP" target="_blank" rel="noopener">TCP — MDN Glossary</a></li>
          <li><a href="https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/" target="_blank" rel="noopener">OSI Model — Cloudflare</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>«TCP і IP — одне і те ж»</strong> — ні. IP маршрутизує пакети, TCP забезпечує надійність. Вони на різних рівнях.</li>
        <li><strong>«HTTP/3 використовує TCP»</strong> — ні. HTTP/3 побудований на QUIC (поверх UDP) для зменшення затримок.</li>
        <li><strong>«Порт == IP-адреса»</strong> — порт ідентифікує процес на хості, IP — сам хост.</li>
        <li><strong>«OSI використовується на практиці»</strong> — OSI лише концептуальна модель. Реально використовується TCP/IP стек.</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика</div>
      <ol>
        <li>DevTools → Network → вибери будь-який запит → вкладка Timing. Знайди «Initial connection» — це TCP handshake.</li>
        <li>Термінал: <code>netstat -an | grep ESTABLISHED</code> — побачиш активні TCP-з'єднання з портами.</li>
        <li>Термінал: <code>curl -v https://example.com 2>&amp;1 | head -30</code> — побач «Connected to» і «SSL handshake».</li>
        <li>Поясни колезі: чому YouTube використовує UDP для відео, але TCP для завантаження файлів.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Поясни TCP 3-way handshake покроково.</li>
        <li>Яка різниця між TCP і UDP? Коли який вибирати?</li>
        <li>Що таке порт і навіщо він потрібен?</li>
        <li>Назви 7 рівнів OSI і відповідний рівень у TCP/IP моделі.</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Поясни TCP handshake»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Клієнт підключається до сервера» — занадто абстрактно.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Три кроки: SYN (клієнт ініціює), SYN-ACK (сервер підтверджує і відповідає), ACK (клієнт підтверджує). Після цього з'єднання встановлено і можна передавати дані.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Чому HTTP/3 швидший за HTTP/2?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Він новіший» — не розкрито причину.</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> HTTP/2 над TCP страждає від head-of-line blocking: втрата одного пакета блокує всі стріми. HTTP/3 над QUIC (UDP) вирішує це — кожен стрім незалежний, втрата пакета в одному не блокує інші.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li><code>tcpdump -i any port 80</code> — перехоплення HTTP-пакетів у реальному часі (потребує sudo).</li>
        <li>Wireshark — графічний аналізатор пакетів. Можна побачити кожен SYN, SYN-ACK, ACK наочно.</li>
        <li>HTTP/3 і QUIC: Chrome DevTools → Network → фільтр «h3» — запити через HTTP/3.</li>
        <li><code>ss -tulnp</code> (Linux) або <code>lsof -i</code> (Mac) — які процеси слухають які порти.</li>
      </ul>
    </section>
  `,
};
