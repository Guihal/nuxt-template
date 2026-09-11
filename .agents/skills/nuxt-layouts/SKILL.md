---
name: nuxt-layouts
description: Add layouts to this Nuxt 4 repo — app/layouts with default.vue, NuxtLayout wrapper in app.vue, per-page layout switch. Use when pages need shared chrome or multiple page shells.
---

# Layouts (Nuxt 4)

Общая обвязка страниц — каталог `app/layouts/` (в репо пока отсутствует; создаётся
первым файлом). Работает в паре с роутингом — см. скилл nuxt-routing-pages.

1. Создай `app/layouts/default.vue` с `<slot />` внутри разметки обвязки —
   именно default используется, когда странице не указано иное.
2. В `app.vue` оберни `<NuxtPage />` в `<NuxtLayout>`: без обёртки layout не
   подключится.
3. Альтернативная обвязка — ещё один файл в `app/layouts/` (например, страница
   документа без шапки); выбор — `definePageMeta({ layout: 'имя-файла' })`.
4. Сменить layout программно можно через `setLayout` из `#app` (внутри страниц и
   middleware).
5. Проверка: `npm run dev` — обе обвязки должны отрисоваться на своих страницах.

## Подводные камни

- Layout без слота молча проглотит содержимое страницы — слот обязателен.
- Хранить в layout состояние страницы нельзя: он переключается, состояние — в сторах.
- Имя файла layout = значение опции layout (без расширения).

База: https://nuxt.com/raw/docs/4.x/directory-structure/app/layouts.md.
