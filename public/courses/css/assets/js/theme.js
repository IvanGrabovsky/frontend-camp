/* ============================================================
   theme.js — світла / темна тема курсу
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'js-arrays-theme';

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore */
    }
    updateToggle(theme);
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  function updateToggle(theme) {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    var isLight = theme === 'light';
    btn.setAttribute('aria-label', isLight ? 'Увімкнути темну тему' : 'Увімкнути світлу тему');
    btn.setAttribute('title', isLight ? 'Темна тема' : 'Світла тема');
    btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  }

  function injectToggle() {
    var inner = document.querySelector('.topnav__inner');
    if (!inner || inner.querySelector('.theme-toggle')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.innerHTML =
      '<span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">☀️</span>' +
      '<span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">🌙</span>';
    btn.addEventListener('click', toggleTheme);

    var progress = inner.querySelector('.progress');
    if (progress) {
      var actions = document.createElement('div');
      actions.className = 'topnav__actions';
      inner.insertBefore(actions, progress);
      progress.remove();
      actions.appendChild(btn);
      actions.appendChild(progress);
    } else {
      inner.appendChild(btn);
    }

    updateToggle(getTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectToggle);
  } else {
    injectToggle();
  }
})();
