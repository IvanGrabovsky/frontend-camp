/* playground.js — логіка окремої сторінки пісочниці */
(function () {
  'use strict';

  function initPlayground() {
    const root = document.querySelector('[data-playground]');
    if (!root || !window.PLAYGROUND_EXAMPLES) {
      return;
    }

    const topicsEl = root.querySelector('.playground-topics');
    const sandboxEl = root.querySelector('[data-sandbox]');
    const input = sandboxEl.querySelector('.sandbox__input');
    const output = sandboxEl.querySelector('.sandbox__output');
    const labelEl = root.querySelector('.playground-active-label');
    const lessonLink = root.querySelector('.playground-lesson-link');
    const clearBtn = root.querySelector('.playground__clear');

    SandboxRunner.init(sandboxEl);

    let activeId = null;

    function setActiveButton(id) {
      topicsEl.querySelectorAll('.playground-topic').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.id === id);
      });
    }

    function loadExample(example, runAfter) {
      activeId = example.id;
      input.value = example.code;
      if (sandboxEl._setStarterCode) {
        sandboxEl._setStarterCode(example.code);
      }
      output.textContent = '';
      setActiveButton(example.id);

      if (labelEl) {
        labelEl.textContent = `Урок ${example.id} · ${example.title}`;
      }
      if (lessonLink) {
        lessonLink.href = example.lessonUrl;
        lessonLink.hidden = false;
      }

      if (runAfter) {
        SandboxRunner.run(input.value, output);
      }
      input.focus();
    }

    function loadFreeMode() {
      activeId = 'free';
      const code = window.PLAYGROUND_DEFAULT || '';
      input.value = code;
      if (sandboxEl._setStarterCode) {
        sandboxEl._setStarterCode(code);
      }
      output.textContent = '';
      setActiveButton('free');

      if (labelEl) {
        labelEl.textContent = 'Вільний режим';
      }
      if (lessonLink) {
        lessonLink.hidden = true;
      }
      input.focus();
    }

    // Кнопка «Вільний режим»
    const freeBtn = document.createElement('button');
    freeBtn.type = 'button';
    freeBtn.className = 'playground-topic is-active';
    freeBtn.dataset.id = 'free';
    freeBtn.innerHTML =
      '<span class="playground-topic__num">✏️</span>' +
      '<span class="playground-topic__title">Вільний режим</span>' +
      '<span class="playground-topic__methods">довільний код</span>';
    freeBtn.addEventListener('click', loadFreeMode);
    topicsEl.appendChild(freeBtn);

    // Кнопки прикладів з уроків
    window.PLAYGROUND_EXAMPLES.forEach((example) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'playground-topic';
      btn.dataset.id = example.id;
      btn.innerHTML =
        `<span class="playground-topic__num">${example.id}</span>` +
        `<span class="playground-topic__title">${example.title}</span>` +
        `<span class="playground-topic__methods">${example.methods}</span>`;
      btn.addEventListener('click', () => loadExample(example, false));
      btn.addEventListener('dblclick', () => loadExample(example, true));
      topicsEl.appendChild(btn);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        output.textContent = '';
        if (sandboxEl._setStarterCode) {
          sandboxEl._setStarterCode('');
        }
        input.focus();
      });
    }

    // URL-параметр ?lesson=10 — автозавантаження прикладу
    const params = new URLSearchParams(window.location.search);
    const lessonParam = params.get('lesson');
    if (lessonParam) {
      const found = window.PLAYGROUND_EXAMPLES.find((e) => e.id === lessonParam.padStart(2, '0'));
      if (found) {
        loadExample(found, false);
        return;
      }
    }

    loadFreeMode();
  }

  document.addEventListener('DOMContentLoaded', initPlayground);
})();
