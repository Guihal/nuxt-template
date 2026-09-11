---
name: nuxt-routing-pages
description: Add file-based routing to this Nuxt 4 repo (router currently disabled) — create app/pages, wire NuxtPage in app.vue, dynamic segments, definePageMeta. Use when adding any page or route, or when NuxtLink/NuxtPage errors appear.
---

# Routing & Pages (Nuxt 4)

Роутер в репо выключен (pages/ отсутствует). Скилл включает его первой страницей
и добавляет маршруты. Зонтик — nuxt-workflow; инварианты скоупа — .cursor/rules/42-pages.mdc.

1. Создай каталог `app/pages/` и файл `app/pages/index.vue` — сам факт каталога
   включает vue-router, ставить ничего не нужно.
2. В `app.vue` добавь `<NuxtPage />` внутрь `<main>`: без него страницы не отрисуются
   (это самая частая поломка при первом включении роутинга).
3. Второй маршрут — `app/pages/about.vue`, ссылка на него — только `<NuxtLink to="/about">`,
   не `<a href>`.
4. Динамический сегмент — файл в квадратных скобках (например, страница с id в пути);
   параметры читай через `useRoute()`.
5. Метаданные маршрута (layout, middleware, валидация параметров) — в `definePageMeta()`
   внутри той же страницы, не в конфиге.

## Подводные камни

- Путь всегда `app/pages/` — плоский pages/ в корне репо не прочитается (легаси Nuxt 3).
- После включения роутинга прогони `npm run dev` и проверь оба маршрута руками.
- Перед коммитом: lint и typecheck; гейт описан в nuxt-workflow.

База: https://nuxt.com/raw/docs/4.x/directory-structure/app/pages.md.
