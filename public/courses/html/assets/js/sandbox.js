/* ============================================================
   sandbox.js — спільна інтерактивна утиліта курсу
   Без залежностей. Працює у будь-якому сучасному браузері.
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     SandboxRunner — запускає код студента та показує вивід
     -------------------------------------------------------- */
  const SandboxRunner = {
    init(sandboxEl) {
      const input = sandboxEl.querySelector('.sandbox__input');
      const runBtn = sandboxEl.querySelector('.sandbox__run');
      const resetBtn = sandboxEl.querySelector('.sandbox__reset');
      const output = sandboxEl.querySelector('.sandbox__output');

      if (!input || !runBtn || !output) {
        return;
      }

      // Зберігаємо початковий код, щоб можна було скинути
      let starterCode = input.value;
      sandboxEl._setStarterCode = (code) => {
        starterCode = code;
      };

      runBtn.addEventListener('click', () => {
        this.run(input.value, output);
      });

      // Запуск за Ctrl/Cmd + Enter
      input.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          this.run(input.value, output);
        }
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          input.value = starterCode;
          output.textContent = '';
          input.focus();
        });
      }
    },

    run(code, output) {
      const logs = [];

      // Форматуємо будь-яке значення у зрозумілий рядок
      const format = (value) => {
        if (typeof value === 'string') {
          return value;
        }
        if (value === undefined) {
          return 'undefined';
        }
        if (value === null) {
          return 'null';
        }
        if (typeof value === 'function') {
          return value.toString();
        }
        try {
          return JSON.stringify(
            value,
            (key, val) => (typeof val === 'function' ? val.toString() : val),
            2
          );
        } catch (e) {
          return String(value);
        }
      };

      // Тимчасово перехоплюємо console.log / warn / error / info
      const original = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
      };

      const capture = (...args) => {
        logs.push(args.map(format).join(' '));
      };

      console.log = capture;
      console.warn = capture;
      console.error = capture;
      console.info = capture;

      let hadError = false;
      let errorMessage = '';

      try {
        // new Function ізолює код від локальних змінних утиліти
        const fn = new Function(code);
        const result = fn();
        // Якщо код повертає значення напряму — теж показуємо
        if (result !== undefined) {
          logs.push(format(result));
        }
      } catch (err) {
        hadError = true;
        errorMessage = (err && err.name ? err.name + ': ' : 'Помилка: ') +
          (err && err.message ? err.message : String(err));
      } finally {
        // Обовʼязково відновлюємо оригінальні методи консолі
        console.log = original.log;
        console.warn = original.warn;
        console.error = original.error;
        console.info = original.info;
      }

      // Рендеримо результат
      output.textContent = '';
      if (hadError) {
        const span = document.createElement('span');
        span.className = 'err';
        span.textContent = '✖ ' + errorMessage;
        output.appendChild(span);
      } else if (logs.length === 0) {
        const span = document.createElement('span');
        span.className = 'ok';
        span.textContent = '✔ Код виконано (немає виводу console.log)';
        output.appendChild(span);
      } else {
        output.textContent = logs.join('\n');
      }
    },

    initAll() {
      document.querySelectorAll('[data-sandbox]').forEach((el) => this.init(el));
    },
  };

  /* --------------------------------------------------------
     CopyCode — кнопки копіювання коду
     -------------------------------------------------------- */
  const CopyCode = {
    init() {
      document.querySelectorAll('.code-block [data-copy]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const block = btn.closest('.code-block');
          const codeEl = block && block.querySelector('code');
          if (!codeEl) {
            return;
          }
          const text = codeEl.innerText;

          const done = () => {
            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 1600);
          };

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(() => this.fallback(text, done));
          } else {
            this.fallback(text, done);
          }
        });
      });
    },

    fallback(text, done) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        done();
      } catch (e) {
        /* ignore */
      }
      document.body.removeChild(ta);
    },
  };

  /* --------------------------------------------------------
     Індикатор прогресу курсу у верхній навігації
     data-lesson="3" data-total="21"
     -------------------------------------------------------- */
  function initProgress() {
    const fill = document.querySelector('.progress__fill');
    const bar = document.querySelector('.progress');
    if (!fill || !bar) {
      return;
    }
    const lesson = parseInt(bar.getAttribute('data-lesson'), 10) || 0;
    const total = parseInt(bar.getAttribute('data-total'), 10) || 21;
    const pct = Math.round((lesson / total) * 100);
    fill.style.width = pct + '%';
    const label = bar.querySelector('.progress__label');
    if (label) {
      label.textContent = 'Урок ' + lesson + ' / ' + total;
    }
  }

  // Публікуємо глобально
  window.SandboxRunner = SandboxRunner;
  window.CopyCode = CopyCode;

  // Автоініціалізація
  document.addEventListener('DOMContentLoaded', function () {
    SandboxRunner.initAll();
    CopyCode.init();
    initProgress();
  });
})();
