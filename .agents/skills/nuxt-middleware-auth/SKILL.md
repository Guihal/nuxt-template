---
name: nuxt-middleware-auth
description: Add route middleware in Nuxt 4 (auth guards, redirects) — defineNuxtRouteMiddleware, global vs named, navigateTo. Use when guarding routes or adding redirect logic.
---

# Middleware & Auth Guards (Nuxt 4)

Перехват навигации через route middleware. Каталог `app/middleware/` в репо пока
не создан — скилл заводит его вместе с первым файлом.

1. Создай `app/middleware/<имя>.ts` с `defineNuxtRouteMiddleware((to, from) => ...)`.
2. Локальный гар (только на выбранных страницах) подключается в самой странице
   через `definePageMeta({ middleware: '<имя>' })`.
3. Глобальный гар — файл `auth.global.ts`: исполняется на каждом переходе; держи
   его лёгким, тяжёлые проверки — в сторах/композаблах.
4. Редирект — `return navigateTo('/login')`; отмена навигации — `abortNavigation()`.
5. Состояние сессии храни в pinia-сторе (см. скилл nuxt-state-pinia), middleware
   только читает его и решает: пропустить, редиректить или прервать.

## Подводные камни

- Маршрутов пока нет (pages/ не создан) — middleware имеет смысл только вместе со
  скиллом nuxt-routing-pages.
- На сервере нет window/document: в middleware работают to/from и куки через
  useRequestHeaders/useCookie, но не браузерные API.
- Глобальный middleware с обращением к API тормозит каждый переход — кешируй
  проверку в состояние приложения.

База: https://nuxt.com/raw/docs/4.x/directory-structure/app/middleware.md.
