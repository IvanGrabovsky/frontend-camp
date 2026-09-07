# Автентифікація & Безпека сесій

![Статус: Доступно](https://img.shields.io/badge/Статус-Доступно-10b981)
![Рівень: Середній → просунутий](https://img.shields.io/badge/Рівень-Середній_→_просунутий-ef4444)

> Сучасна автентифікація у веб-додатках: JWT токени, безпечні кукі, OAuth 2.0 / OIDC з PKCE, захист від CSRF та Passkeys (WebAuthn).

## Про підмодуль

Підмодуль курсу **Безпека браузера**. Навчає проектувати надійні системи автентифікації на фронтенді, стійкі до XSS, викрадення токенів та CSRF.

## Програма підмодуля

1. **Моделі автентифікації: Sessions vs Tokens** — плюси й мінуси stateful vs stateless підходів
2. **JWT під мікроскопом** — анатомія токена (Header, Payload, Sign), терміни валідності
3. **Безпечні Cookies** — прапорці `HttpOnly`, `Secure`, `SameSite=Lax/Strict`, префікси `__Host-`
4. **Де зберігати токени** — ризики `localStorage` при XSS, Refresh Token Rotation
5. **CSRF атаки та захист** — Anti-CSRF токени, SameSite та Double Submit Cookie
6. **OAuth 2.0 та OIDC з PKCE** — безпечний вхід через Google/GitHub без витоку client_secret
7. **WebAuthn & Passkeys** — вхід за відбитком пальця або Face ID через `navigator.credentials`
8. **Чеклист аудиту безпеки** — перевірка клієнтської частини перед релізом у production

[← Повернутися до Безпеки браузера](../06-web-security/README.md)
