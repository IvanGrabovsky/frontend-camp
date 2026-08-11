'use client';

import { useEffect } from 'react';

const quotes = [
  { text: '«Завжди здається неможливим — доки не зробиш.»', author: 'Nelson Mandela' },
  { text: '«Не важливо, як повільно ти йдеш, якщо не зупиняєшся.»', author: 'Confucius' },
  { text: '«Подорож у тисячу миль починається з одного кроку.»', author: 'Lao Tzu' },
  { text: '«Роби те, що мусиш, доки не зможеш робити те, чого хочеш.»', author: 'Oprah Winfrey' },
  { text: '«У середині кожної труднощі ховається можливість.»', author: 'Albert Einstein' },
];

export function HeroQuote() {
  useEffect(() => {
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    const textEl = document.querySelector('.hero__quote-text');
    const authorEl = document.querySelector('.hero__quote-author');
    if (textEl) textEl.textContent = pick.text;
    if (authorEl) authorEl.textContent = '— ' + pick.author;
  }, []);

  return (
    <blockquote className="hero__quote" id="hero-quote">
      <p className="hero__quote-text" />
      <footer className="hero__quote-author" />
    </blockquote>
  );
}
