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

  '04-http': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>HTTP (HyperText Transfer Protocol)</strong> — протокол прикладного рівня без збереження стану (stateless), за яким клієнт (браузер) і сервер спілкуються текстовими або бінарними повідомленнями за моделлю «запит — відповідь» (Request — Response).</p>
      <p><strong>HTTPS</strong> — це той самий HTTP, але загорнутий у криптографічний шар TLS/SSL (порт 443), що захищає трафік від перехоплення та модифікації.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🍽️</span> Аналогія з рестораном</div>
      <p>Клієнт — відвідувач, що передає офіціанту бланк замовлення (HTTP Request: метод «Принести», назва страви, побажання). Офіціант повертає страву з чеком (HTTP Response: статус <code>200 OK</code> або <code>404 Немає в меню</code>). HTTPS — це офіціант у броньованому сейфі, щоб шпигуни не підгледіли номер вашої картки.</p>
    </section>

    <section>
      <h2>Анатомія HTTP-запиту (Request)</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">// 1. Стартовий рядок (Request Line): Метод · Шлях · Версія протоколу</span>
<span class="ln">POST /api/v1/users HTTP/1.1</span>
<span class="ln cmt">// 2. Заголовки (Headers): Ключ-значення метаінформації</span>
<span class="ln">Host: api.example.com</span>
<span class="ln">User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)</span>
<span class="ln">Accept: application/json</span>
<span class="ln">Content-Type: application/json; charset=utf-8</span>
<span class="ln">Content-Length: 48</span>
<span class="ln">Authorization: Bearer eyJhbGciOi...</span>
<span class="ln cmt">// 3. Порожній рядок (обов'язковий розділювач)</span>
<span class="ln"></span>
<span class="ln cmt">// 4. Тіло запиту (Body) — опціонально для POST/PUT/PATCH</span>
<span class="ln">{"name": "Олександр", "email": "alex@dev.ua"}</span></code></pre>
      </div>

      <h2>Анатомія HTTP-відповіді (Response)</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">// 1. Статусний рядок (Status Line): Версія · Код статусу · Пояснення</span>
<span class="ln">HTTP/1.1 201 Created</span>
<span class="ln cmt">// 2. Заголовки відповіді (Response Headers)</span>
<span class="ln">Date: Sun, 23 Aug 2026 18:30:00 GMT</span>
<span class="ln">Content-Type: application/json; charset=utf-8</span>
<span class="ln">Content-Length: 64</span>
<span class="ln">Set-Cookie: session_id=abc123xyz; HttpOnly; Secure; SameSite=Strict</span>
<span class="ln">Cache-Control: no-store</span>
<span class="ln">Access-Control-Allow-Origin: https://myfrontend.com</span>
<span class="ln"></span>
<span class="ln cmt">// 3. Тіло відповіді (Response Body)</span>
<span class="ln">{"id": 42, "name": "Олександр", "status": "active"}</span></code></pre>
      </div>

      <h2>Основні методи HTTP</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Метод</th><th>Призначення (CRUD)</th><th>Безпечний (Safe)?</th><th>Ідемпотентний?</th><th>Тіло (Body)</th></tr></thead>
          <tbody>
            <tr><td><code>GET</code></td><td>Отримання ресурсу (Read)</td><td>✅ Так (не змінює стан)</td><td>✅ Так</td><td>❌ Немає</td></tr>
            <tr><td><code>POST</code></td><td>Створення нового ресурсу (Create)</td><td>❌ Ні</td><td>❌ Ні (дублює записи)</td><td>✅ Так</td></tr>
            <tr><td><code>PUT</code></td><td>Повна заміна ресурсу (Update/Replace)</td><td>❌ Ні</td><td>✅ Так</td><td>✅ Так</td></tr>
            <tr><td><code>PATCH</code></td><td>Часткове оновлення (Update/Modify)</td><td>❌ Ні</td><td>❌ Зазвичай ні</td><td>✅ Так</td></tr>
            <tr><td><code>DELETE</code></td><td>Видалення ресурсу (Delete)</td><td>❌ Ні</td><td>✅ Так</td><td>Опціонально</td></tr>
            <tr><td><code>HEAD</code></td><td>Як GET, але повертає лише заголовки</td><td>✅ Так</td><td>✅ Так</td><td>❌ Немає</td></tr>
            <tr><td><code>OPTIONS</code></td><td>Перевірка підтримуваних методів (CORS Preflight)</td><td>✅ Так</td><td>✅ Так</td><td>❌ Немає</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Статус-коди HTTP: класи та найважливіші коди</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Діапазон</th><th>Класифікація</th><th>Ключові статус-коди</th></tr></thead>
          <tbody>
            <tr><td><code>1xx</code></td><td>Інформаційні</td><td><code>101 Switching Protocols</code> (апгрейд до WebSocket)</td></tr>
            <tr><td><code>2xx</code></td><td>Успіх (Success)</td><td><code>200 OK</code> (успішний GET/POST), <code>201 Created</code> (створено новий ресурс), <code>204 No Content</code> (виконано без тіла відповіді)</td></tr>
            <tr><td><code>3xx</code></td><td>Перенаправлення (Redirection)</td><td><code>301 Moved Permanently</code> (постійний редирект), <code>302 Found</code> / <code>307 Temporary Redirect</code>, <code>304 Not Modified</code> (контент у кеші)</td></tr>
            <tr><td><code>4xx</code></td><td>Помилки клієнта (Client Error)</td><td><code>400 Bad Request</code>, <code>401 Unauthorized</code> (не залогінений), <code>403 Forbidden</code> (немає прав), <code>404 Not Found</code>, <code>405 Method Not Allowed</code>, <code>409 Conflict</code>, <code>422 Unprocessable Entity</code>, <code>429 Too Many Requests</code> (rate limit)</td></tr>
            <tr><td><code>5xx</code></td><td>Помилки сервера (Server Error)</td><td><code>500 Internal Server Error</code>, <code>502 Bad Gateway</code> (збій проксі/апстріму), <code>503 Service Unavailable</code> (перевантаження), <code>504 Gateway Timeout</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2>Важливі HTTP-заголовки</h2>
      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Заголовок</th><th>Тип</th><th>Призначення</th></tr></thead>
          <tbody>
            <tr><td><code>Content-Type</code></td><td>Запит / Відповідь</td><td>MIME-тип тіла повідомлення: <code>application/json</code>, <code>text/html</code>, <code>multipart/form-data</code>.</td></tr>
            <tr><td><code>Authorization</code></td><td>Запит</td><td>Облікові дані для доступу: <code>Bearer &lt;token&gt;</code> або <code>Basic &lt;base64&gt;</code>.</td></tr>
            <tr><td><code>Set-Cookie</code></td><td>Відповідь</td><td>Встановлює куку: атрибути <code>HttpOnly</code> (захист від XSS), <code>Secure</code> (тільки по HTTPS), <code>SameSite</code> (захист від CSRF).</td></tr>
            <tr><td><code>Cache-Control</code></td><td>Запит / Відповідь</td><td>Директиви кешування: <code>max-age=3600</code>, <code>no-cache</code>, <code>no-store</code>, <code>immutable</code>.</td></tr>
            <tr><td><code>Access-Control-Allow-Origin</code></td><td>Відповідь</td><td>CORS — визначає, які джерела (origins) мають право читати відповідь у браузері.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Еволюція: HTTP/1.1 vs HTTP/2 vs HTTP/3</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// HTTP/1.1 — Текстовий протокол, 1 TCP-з'єднання = 1 запит одночасно (Head-of-Line blocking на рівні HTTP)</span>
<span class="ln cmt">// HTTP/2   — Бінарний, мультиплексування (сотні запитів через 1 TCP-з'єднання), HPACK стиснення заголовків</span>
<span class="ln cmt">// HTTP/3   — Базується на QUIC (поверх UDP), усуває Head-of-Line blocking на рівні TCP, 0-RTT відновлення</span></code></pre>
      </div>

      <div class="doc-links">
        <h4>Документація та інструменти</h4>
        <ul>
          <li><a href="https://developer.mozilla.org/uk/docs/Web/HTTP" target="_blank" rel="noopener">HTTP Overview — MDN</a></li>
          <li><a href="https://httpstatusdogs.com/" target="_blank" rel="noopener">HTTP Status Dogs</a> / <a href="https://http.cat/" target="_blank" rel="noopener">HTTP Cats</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>Плутанина <code>401 Unauthorized</code> та <code>403 Forbidden</code></strong> — 401 означає «хто ти такий? увійди в систему», 403 означає «я знаю хто ти, але тобі сюди заборонено».</li>
        <li><strong>Передача конфіденційних даних у GET-запиті</strong> — параметри URL (query string) зберігаються в історії браузера, логах провайдера та серверних логах! Завжди використовуйте POST з шифруванням HTTPS.</li>
        <li><strong>Плутанина <code>PUT</code> та <code>PATCH</code></strong> — PUT замінює сутність повністю (якщо не передали поле, воно занулюється), а PATCH точково змінює лише вказані поля.</li>
        <li><strong>Ігнорування прапорців безпеки в Cookies</strong> — відсутність <code>HttpOnly</code> робить куку вразливою до викрадення через JS (XSS).</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика з cURL та DevTools</div>
      <ol>
        <li>Виконай у терміналі <code>curl -I https://httpbin.org/status/200</code> — переглянь заголовки відповіді та статус.</li>
        <li>Відішли POST-запит з JSON: <code>curl -X POST https://httpbin.org/post -H "Content-Type: application/json" -d '{"framework":"nextjs"}'</code>.</li>
        <li>Відкрий DevTools → Network, зроби будь-яку дію на сайті, клікни на запит і знайди: Request Headers, Response Headers, Payload (Body) та Status Code.</li>
        <li>Знайди у фільтрі Network типи протоколів (h2, h3, http/1.1) для різних сервісів.</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Що означає поняття «ідемпотентність» методу? Які методи є ідемпотентними, а які — ні?</li>
        <li>У чому різниця між статусами <code>301 Moved Permanently</code> та <code>302 Found</code> з точки зору кешування та SEO?</li>
        <li>Які атрибути заголовка <code>Set-Cookie</code> обов'язкові для захищеної аутентифікації і чому?</li>
        <li>Чому протокол HTTP називають протоколом «без стану» (stateless)? Як веб-додатки зберігають стан користувача?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«У чому різниця між 401 та 403 кодами відповіді?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це обидва коди помилки доступу».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> <code>401 Unauthorized</code> — проблема автентифікації: користувач не надав валідні креденшали (токен/сесію). <code>403 Forbidden</code> — проблема авторизації (прав доступу): користувач успішно залогінений, але його роль (наприклад, звичайний юзер) не дозволяє виконувати адмінські дії.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке ідемпотентність HTTP-методів?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це коли метод працює швидко і без помилок».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Ідемпотентність означає, що багаторазове виконання одного й того ж запиту призводить до однакового стану системи на сервері, що й один запит. GET, PUT, DELETE, HEAD — ідемпотентні (навіть якщо DELETE повертає 404 після першого разу, ресурсу на сервері більше немає). POST — неідемпотентний, оскільки N запитів створять N нових записів.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li>Статус <code>304 Not Modified</code> дозволяє не передавати тіло відповіді заново, якщо хеш ресурсу (ETag) у браузера збігається з серверним.</li>
        <li>Заголовок <code>Strict-Transport-Security</code> (HSTS) змушує браузер спілкуватися з сайтом виключно по HTTPS навіть якщо користувач ввів <code>http://</code>.</li>
        <li>У вкладці Network можна скопіювати будь-який запит як готовий cURL або <code>fetch()</code> код (Right click → Copy → Copy as fetch).</li>
        <li>Заголовок <code>Sec-CH-UA</code> у сучасних браузерах поступово замінює громіздкий та застарілий <code>User-Agent</code> для Client Hints.</li>
      </ul>
    </section>
  `,

  '05-tls': `
    <article class="lesson-card">
      <h2>Що це таке?</h2>
      <p><strong>TLS (Transport Layer Security)</strong> — криптографічний протокол, який гарантує конфіденційність (шифрування), цілісність (захист від підміни) та автентифікацію (підтвердження того, з ким ви спілкуєтесь) між браузером і сервером.</p>
      <p><strong>SSL (Secure Sockets Layer)</strong> — застарілий попередник TLS. Назва «SSL» збереглася у вжитку як синонім (наприклад, «SSL-сертифікат»), але сучасний інтернет працює виключно на <strong>TLS 1.2 та TLS 1.3</strong>.</p>
    </article>

    <section class="analogy-block">
      <div class="analogy-block__title"><span class="analogy-block__icon">🔐</span> Аналогія з дипломатичною валізою</div>
      <p>Уяви, що тобі потрібно передати секретний документ кур'єром. Замість того, щоб шукати спільний ключ по незахищеній пошті (де його можуть перехопити), банк надсилає тобі відкритий навісний замок (Public Key). Ти замикаєш ним валізу зі своїм секретним шифром сесії. Відкрити замок може тільки банк своїм єдиним ключем (Private Key). Після цього ви обидва знаєте спільний швидкий пароль і спілкуєтесь блискавично.</p>
    </section>

    <section>
      <h2>Симетричне vs Асиметричне шифрування</h2>
      <p>TLS поєднує обидва підходи (гібридне шифрування), щоб отримати максимальну безпеку без втрати швидкості:</p>

      <div class="syntax-params">
        <table class="params-table">
          <thead><tr><th>Критерій</th><th>Асиметричне шифрування</th><th>Симетричне шифрування</th></tr></thead>
          <tbody>
            <tr><td>Ключі</td><td>Пара: Публічний (Public) + Приватний (Private)</td><td>Один спільний сесійний ключ (Session Key)</td></tr>
            <tr><td>Швидкість</td><td>🐢 Повільне (важкі математичні операції)</td><td>⚡ Блискавичне (апаратне прискорення AES-NI)</td></tr>
            <tr><td>Роль у TLS</td><td>Лише під час Handshake (автентифікація та обмін ключами)</td><td>Шифрування 100% реального трафіку (HTML, JS, фото)</td></tr>
            <tr><td>Алгоритми</td><td>ECDHE, RSA, Ed25519</td><td>AES-256-GCM, ChaCha20-Poly1305</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Ланцюжок довіри та X.509 Сертифікати</h2>
      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span></div>
        <pre><code><span class="ln cmt">// Ланцюжок перевірки сертифіката (Trust Chain)</span>
<span class="ln">Root CA (Кореневий центр сертифікації — зашитий в macOS/Windows/iOS/Android)</span>
<span class="ln">  │  підписаний цифровим підписом Root CA</span>
<span class="ln">  ▼</span>
<span class="ln">Intermediate CA (Проміжний центр — наприклад, Let's Encrypt R3)</span>
<span class="ln">  │  підписаний цифровим підписом Intermediate CA</span>
<span class="ln">  ▼</span>
<span class="ln">Leaf Certificate (Сертифікат твого сайту — example.com)</span></code></pre>
      </div>

      <h2>Анатомія TLS Handshake (TLS 1.2 vs TLS 1.3)</h2>
      <p>У TLS 1.3 рукостискання скоротилося з 2 RTT (Round Trips) до всього <strong>1 RTT</strong> завдяки надсиланню параметрів ключів одразу в першому пакеті:</p>

      <div class="code-block">
        <div class="code-block__head"><span class="code-block__dots"><span></span><span></span><span></span></span><button class="copy-btn" data-copy aria-label="Копіювати"></button></div>
        <pre><code><span class="ln cmt">// TLS 1.3 Handshake (1 RTT)</span>
<span class="ln">Клієнт                                                 Сервер</span>
<span class="ln">  │                                                      │</span>
<span class="ln">  │─── ClientHello + Supported Ciphers + KeyShare ──────▶│ (1) Пропонує шифри й одразу шле свій ECDHE ключ</span>
<span class="ln">  │                                                      │</span>
<span class="ln">  │◀── ServerHello + KeyShare + Certificate + Finished ──│ (2) Вибирає шифр, шле свій ключ, сертифікат і підпис</span>
<span class="ln">  │                                                      │</span>
<span class="ln">  │════════════ Зашифрований HTTP-трафік ═══════════════▶│ Спільний Session Key обчислено обома сторонами!</span></code></pre>
      </div>

      <h2>Perfect Forward Secrecy (PFS)</h2>
      <p>Сучасний TLS вимагає <strong>Forward Secrecy</strong>: навіть якщо зловмисник записував ваш трафік роками, а в майбутньому викраде приватний ключ сервера, він <strong>не зможе</strong> розшифрувати старі записи. Щоразу під час Handshake генеруються унікальні одноразові сесійні ключі (Ephemeral Diffie-Hellman — ECDHE).</p>

      <div class="doc-links">
        <h4>Документація та перевірка</h4>
        <ul>
          <li><a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener">Qualys SSL Labs — перевірити якість TLS сайту</a></li>
          <li><a href="https://letsencrypt.org/howitworks/" target="_blank" rel="noopener">Як працює Let's Encrypt (ACME протокол)</a></li>
        </ul>
      </div>
    </section>

    <section class="tip-block tip-block--warn">
      <div class="tip-block__title"><span>⚠️</span> Типові помилки</div>
      <ul>
        <li><strong>«HTTPS захищає від зламу коду»</strong> — ні! TLS шифрує лише передачу даних «по дротах». Якщо на сервері SQL-ін'єкція або XSS у браузері, HTTPS від цього не захищає.</li>
        <li><strong>Протермінований сертифікат</strong> — браузер миттєво блокує користувачів червоним екраном «Ваше підключення не приватне». Для автоматизації використовуйте Certbot / Let's Encrypt.</li>
        <li><strong>Self-signed (самопідписаний) сертифікат на продакшені</strong> — браузери не довіряють сертифікатам, не підписаним валідним Root CA зі сховища системи.</li>
        <li><strong>Mixed Content</strong> — коли на HTTPS сторінці завантажується незахищений ресурс <code>http://...</code> (скрипт або CSS блокуються браузером автоматично).</li>
      </ul>
    </section>

    <section class="practice-block">
      <div class="practice-block__title"><span>⚡</span> Практика в терміналі та DevTools</div>
      <ol>
        <li>Відкрий у браузері будь-який сайт → клікни на іконку налаштувань біля URL (замок) → «З'єднання захищене» → переглянь видавця сертифіката та термін дії.</li>
        <li>Виконай у терміналі: <code>openssl s_client -connect google.com:443 -servername google.com</code> — побач повний ланцюжок сертифікатів (Certificate chain) та версію TLS 1.3.</li>
        <li>Перевір версію TLS через curl: <code>curl -vI --tlsv1.3 https://cloudflare.com 2>&amp;1 | grep "SSL connection"</code>.</li>
        <li>Знайди у DevTools → Security вкладку Main Origin і подивись cipher suite (наприклад, <code>TLS_AES_128_GCM_SHA256</code>).</li>
      </ol>
    </section>

    <section class="homework-block">
      <div class="homework-block__title"><span>📝</span> Самоперевірка</div>
      <ol>
        <li>Чому TLS не використовує асиметричне шифрування для всього трафіку, а застосовує гібридну схему?</li>
        <li>Що таке SNI (Server Name Indication) і навіщо він потрібен при розміщенні сотень HTTPS-сайтів на одній IP-адресі?</li>
        <li>У чому полягає перевага TLS 1.3 над TLS 1.2 щодо швидкості (RTT) та безпеки?</li>
        <li>Що таке Forward Secrecy і чому статичний RSA-обмін ключами було заборонено в TLS 1.3?</li>
      </ol>
    </section>

    <section class="hw-review-block">
      <div class="hw-review-block__title"><span>📋</span> Розбір на співбесідах</div>
      <div class="hw-review-items">
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Як працює TLS Handshake простими словами?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Браузер і сервер обмінюються паролями».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Клієнт і сервер обмінюються випадковими числами та підтримуваними шифрами (ClientHello/ServerHello). Сервер надсилає свій сертифікат, підписаний CA. Клієнт перевіряє ланцюжок довіри до Root CA. За допомогою алгоритму Діффі-Хеллмана (ECDHE) сторони безпечно обчислюють спільний сесійний ключ і переходять на швидке симетричне шифрування AES/ChaCha20.</p>
        </article>
        <article class="hw-review-item">
          <h4 class="hw-review-item__task">«Що таке Mixed Content і як з ним боротися?»</h4>
          <p class="hw-review-item__bad"><span class="hw-review-label">❌</span> «Це коли на сторінці є і текст, і картинки».</p>
          <p class="hw-review-item__good"><span class="hw-review-label">✅</span> Mixed Content виникає, коли основний HTML завантажено по безпечному HTTPS, але окремі ресурси (JS, CSS, img) підвантажуються через незахищений HTTP. Браузер повністю блокує Mixed Active Content (скрипти). Рішення: використовувати відносні шляхи або директиву CSP <code>upgrade-insecure-requests</code>.</p>
        </article>
      </div>
    </section>

    <section class="pro-tips-block">
      <div class="pro-tips-block__title"><span>✨</span> Фішки</div>
      <ul>
        <li><strong>0-RTT Resumption (TLS 1.3)</strong> — при повторному підключенні браузер може надіслати зашифрований HTTP-запит одразу в першому пакеті handshake без жодних затримок.</li>
        <li><strong>SNI (Server Name Indication)</strong> — передає ім'я потрібного хоста ще на етапі TLS handshake до передачі HTTP-заголовка <code>Host</code>, що дозволяє одному серверу хостити тисячі різних SSL-сайтів.</li>
        <li><strong>ALPN (Application-Layer Protocol Negotiation)</strong> — дозволяє під час TLS Handshake домовитися про використання протоколу HTTP/2 або HTTP/3 без додаткового RTT.</li>
        <li><strong>Certificate Transparency (CT)</strong> — публічний відкритий журнал усіх виданих сертифікатів у світі, що унеможливлює непомітний випуск підробленого сертифіката для вашого домену.</li>
      </ul>
    </section>
  `,
};


