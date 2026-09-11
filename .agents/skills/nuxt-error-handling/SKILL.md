---
name: nuxt-error-handling
description: Handle errors in Nuxt 4 — createError/showError, error.vue page, server-side error responses, onErrorCaptured. Use when adding failures to pages or API handlers, or building a custom error page.
---

# Error Handling (Nuxt 4)

Ошибки по слоям: серверные хендлеры, страницы, глобальный экран ошибки.

1. В серверном обработчике (`server/api/`) ошибка клиента/данных —
   `createError({ statusCode, statusMessage })`; необработанное исключение уходит
   500-м — статус ставь осознанно.
2. На странице/компоненте фатальная ошибка данных — `throw createError(...)` из
   useAsyncData-пайплайна; ожидаемая нехватка данных — показывай состояние UI, а
   не кидай ошибку.
3. Для программного перехода на экран ошибки из любого места — `showError()`.
4. Кастомный экран — файл `error.vue` рядом с `app.vue` (в корне app/); внутри
   доступен `error` c statusCode и есть кнопка очистки через `clearError`.
5. Локальный перехват рендера — `onErrorCaptured`; глобальный репортинг — хук
   `vue:error` в плагине (плагины пока не заведены — создавай в `app/plugins/`).

## Подводные камни

- error.vue — отдельное дерево рендера: сторы в нём доступны, но layout страницы
  не применяется.
- Проглатывать ошибки молча запрещено: либо обработал осознанно, либо отдал выше.
- После правок: `npm run dev` и проверь оба сценария — ошибку страницы и
  ошибку эндпоинта; typecheck перед коммитом обязателен.

База: https://nuxt.com/docs/4.x/getting-started/error-handling.
