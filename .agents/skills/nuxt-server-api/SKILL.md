---
name: nuxt-server-api
description: Add Nitro server API routes in this Nuxt 4 repo — server/api handlers, server/utils helpers, calling endpoints from the app, shared API contracts. Use when creating or changing backend endpoints.
---

# Server API (Nitro, Nuxt 4)

Бэкенд-эндпоинты живут в `server/` в корне репо (не в app/). Инварианты границы —
.cursor/rules/45-shared.mdc; скилл-зонтик — nuxt-workflow.

1. Создай `server/api/<имя>.ts` с обработчиком `defineEventHandler((event) => ...)` —
   маршрут `/api/<имя>` появится сам, регистрировать ничего не нужно.
2. Данные из приложения получай через `useFetch('/api/<имя>')` (рендер) или
   `$fetch` (действие) — см. скилл nuxt-data-fetching.
3. Повторяемые серверные хелперы складывай в `server/utils/` — они автоимпортятся
   внутри обработчиков.
4. Методы читай из `event` (getRouterParam, readBody); POST-тело читается только
   внутри обработчика.
5. Контракт ответа (тип), нужный обеим сторонам, клади в `shared/types/`; сам тип
   без Vue/Nitro-импортов.

## Подводные камни

- Каталог именно корневой `server/`: в app/ его не переносить — это другой бандл (Nitro).
- Vue-код в обработчиках запрещён: сервер собирается отдельно от приложения.
- Проверка эндпоинта: `npm run dev`, затем curl `/api/<имя>` до правки UI.

База: https://nuxt.com/docs/4.x/getting-started/server;
детали каталога — https://nuxt.com/raw/docs/4.x/directory-structure/server.md.
