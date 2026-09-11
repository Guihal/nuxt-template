---
name: nuxt-data-fetching
description: Fetch data in Nuxt 4 correctly — useFetch/useAsyncData for SSR-deduplicated render data, $fetch only for client actions. Use when adding API calls, fixing double-fetch or hydration-mismatch issues.
---

# Data Fetching (Nuxt 4)

Как получать данные, чтобы SSR не ломался. Процедуры; инвариант потока —
.cursor/rules/20-data-and-state.mdc, зонтик — nuxt-workflow.

1. Данные рендера запрашивай в setup страницы/компонента через `useFetch(url)` —
   результат переносится в payload и не перезапрашивается при гидратации.
2. Нужен ручной контроль (условный запуск, преобразование) — бери `useAsyncData`
   с уникальным ключом: `useAsyncData('ключ', () => ...)`.
3. Разбирай результат на `data`, `error`, `pending` — не оборачивай в свой try/catch
   вокруг запроса рендера.
4. Точечные клиентские действия (сабмит, клик) — `$fetch` с методом и телом; он не
   участвует в SSR-пайплайне и для рендер-данных не используется.
5. Проверка: `npm run dev`, открой вкладку Payload в Nuxt DevTools — данные должны
   приходить из payload, а не вторым запросом.

## Подводные камни

- Прямой запрос в setup даёт два запроса (сервер + клиент) и расхождения гидратации.
- Ключи useAsyncData должны быть уникальными — коллизия затирает данные.
- Смена формы ответа API обновляет тип контракта и потребителей тем же коммитом.

База: https://nuxt.com/docs/4.x/getting-started/data-fetching; оси практик — https://rulekit.dev.
