# Правила Nuxt для AI-агентов — nuxt-template

Правила работы с Nuxt в этом репозитории. Составлены по исследованию экосистемы Nuxt 4
(2026-09): официальный `llms.txt`/MCP, доки nuxt.com, eslint.nuxt.com, image.nuxt.com,
pinia.vuejs.org — полный список источников внизу.

## Структура проекта (Nuxt 4)

- Код живёт в `app/` (дефолт Nuxt 4): `app.vue`, `components/`, `composables/`,
  `layouts/`, `middleware/`, `pages/`, `plugins/`, `stores/`, `utils/`, `assets/`.
- `server/`, `public/`, `shared/` и `nuxt.config.ts` — в корне. Старой плоской
  структуры (всё в корне) избегать: она легаси.
- Стартер этого репозитория не использует `pages/` — роутер не подключён; демо живёт
  в `app/app.vue`. При добавлении `pages/` роутер включится автоматически.

## TypeScript

- Корневой `tsconfig.json` единственный и генерируемый: Nuxt создаёт project references
  в `.nuxt/tsconfig.{app,node,server,shared}.json`. Его не редактировать — только
  `npx nuxt prepare` (регенерация) и ключ `typescript` в `nuxt.config.ts`.
- `nuxt typecheck` (vue-tsc) — отдельный шаг: dev/build типы по умолчанию НЕ проверяют.
  В этом репозитории typecheck включён в pre-commit гейт.
- Coverage: typecheck проверяет файлы tsconfig-проектов — `app/**/*` и генерируемые
  каталоги. Корневые `.ts`-файлы вне `app/` он не видит.
- Версия typescript закреплена (`~6.0.0`): TS 7.x не имеет compiler API и роняет
  vue-tsc 3.3.11. Не поднимать без прогона `npm run typecheck`.

## Линт и формат

- ESLint — модуль `@nuxt/eslint`: flat config, JS+TS+Vue плагины подключаются сами.
- `eslint.config.mjs` импортирует `withNuxt` из `./.nuxt/eslint.config.mjs`
  (файл генерируется `nuxt prepare` — не править его руками).
- Локальный лимит: `max-lines: 200` для кода; не-кодовые файлы — `scripts/check-line-limit.mjs`.

## Pinia

- Модуль `@pinia/nuxt`; `defineStore`/`storeToRefs` — автоимпорт.
- Сторы из `app/stores/` автоимпортятся целиком (`useCounterStore` без import).
- Предпочитать setup-стиль стора (как `app/stores/counter.ts`).

## Изображения (@nuxt/image)

- `<NuxtImg>` / `<NuxtPicture>`, встроенный IPX-пайплайн: src вида `/_ipx/...`.
- Активы — в `public/`; для реальной трансформации нужен растровый формат
  (png/webp), SVG IPX не перекодирует.
- Проверка работы: HTML страницы содержит `<img src="/_ipx/...">`, а curl этого src
  отдаёт HTTP 200 (не passthrough).

## Конфиг Nuxt

- `compatibilityDate` фиксирован (`2025-07-15`) — не опускать.
- Модули подключаются в `nuxt.config.ts` → `modules: [...]`; после любой правки
  конфига — `npx nuxt prepare`.

## Git-гигиена здесь

- 200 строк на файл (все файлы, кроме `package-lock.json`).
- Pre-commit (husky): `lint → typecheck → line-guard`; коммит с ошибкой отклоняется.
- Фикстуры/временные файлы не коммитить: создал → проверил → удалил.

## Официальные AI-ресурсы Nuxt

- `https://nuxt.com/llms.txt` и `https://nuxt.com/llms-full.txt` — машиночитаемая документация.
- Официальный Nuxt MCP-сервер — для агентных сессий с доступом к докам.
- Community-наборы правил: cursor.directory/plugins/nuxtjs, Vue RuleKit (rulekit.dev, posva).

## Источники исследования

- https://nuxt.com/blog/v4 — структура `app/` как дефолт Nuxt 4
- https://nuxt.com/docs/4.x/guide/concepts/typescript — typecheck, project references
- https://nuxt.com/docs/4.x/directory-structure/tsconfig — корневой tsconfig
- https://eslint.nuxt.com/packages/module — @nuxt/eslint, flat config
- https://pinia.vuejs.org/ssr/nuxt.html — @pinia/nuxt, автоимпорты сторов
- https://image.nuxt.com/ — @nuxt/image, NuxtImg/IPX
- https://nuxt.com/docs/4.x/guide/ai/llms-txt и https://nuxt.com/docs/4.x/guide/ai/mcp — AI-ресурсы
- https://eslint.org/docs/latest/rules/max-lines — max-lines не покрывает .md
