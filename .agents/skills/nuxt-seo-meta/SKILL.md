---
name: nuxt-seo-meta
description: Manage SEO/head tags in Nuxt 4 — static defaults in app.head, per-page useSeoMeta/useHead, Open Graph. Use when adding pages or fixing missing titles/descriptions.
---

# SEO & Meta (Nuxt 4)

Управление head через Unhead. Процедуры; контекст-инварианты страниц —
.cursor/rules/42-pages.mdc.

1. Статические дефолты (title по умолчанию, lang, favicon) — ключ `app.head` в
   `nuxt.config.ts`; после правки конфига всегда `npx nuxt prepare`.
2. На каждой странице — `useSeoMeta({ title, description, ogTitle, ogDescription })`:
   реактивность поддерживается, ключи типизированы.
3. Динамические значения (например, заголовок из данных страницы) передавай как
   computed/getter — не мутируй head вручную.
4. Канонические ссылки и og-изображения — через `useHead({ link: [...] })` на странице.
5. Проверка: `npm run dev`, открой страницу и посмотри `<title>`/meta в HTML;
   для генерации — `npm run generate` и осмотр статики.

## Подводные камни

- app.head не умеет реактивность — там только константы; реактивное только через
  useHead/useSeoMeta в setup.
- Не дублируй один и тот же title на всех страницах — дефолт в конфиге, конкретика
  на странице.

База: https://nuxt.com/docs/4.x/getting-started/seo-meta.
