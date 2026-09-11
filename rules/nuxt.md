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
- Форматирование — локальный Prettier: конфиг в `.prettierrc.json` (отклонения от
  дефолтов: `semi: false`, `singleQuote: true`), команды `format`/`format:check`,
  `.editorconfig` синхронизирован с ним; `eslint-config-prettier` не ставится,
  пока у ESLint нет stylistic-правил.

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

## Стили (Tailwind v4 + SCSS)

- TW4 подключён vite-плагином `@tailwindcss/vite` в `vite.plugins`; официальный
  framework-guide для Nuxt рекомендует именно этот маршрут: модуль
  `@nuxtjs/tailwindcss` остался на линии TW3 и для TW4 не используется.
- Вход TW — `@import "tailwindcss"` в `app/assets/css/main.css` (массив `css` в
  nuxt.config, после эмиттера темы). Тема задаётся блоком `@theme inline`.
- SCSS — `sass-embedded`; откат при проблемах платформенного бинарника — замена
  devDependency на `sass`, конфиг не меняется. Modern API: `@use`/`@forward`,
  `@import` deprecated с sass 1.80.
- Инжект-хаб: `app/assets/scss/main.scss` доступен в каждой scss-компиляции без
  импорта через `additionalData` (`@use "main" as *;`) плюс `loadPaths` на каталог
  хаба. Хаб output-free (только @forward-ы), члены — в партиалах `_tokens.scss`
  и `_mixins.scss`; эмитящий CSS — только `theme.scss` через массив `css` ровно
  один раз, иначе каждое `:root` продублируется на каждую компиляцию.
- Единый источник токенов — var-мост: `$vars` партиала → `:root`-custom props
  эмиттера → `@theme inline` зеркалит их var()-ссылками. Inline важен: без него
  TW скопировал бы значения, и источник стал бы двояким. Каскадная защита моста —
  слои: unlayered `:root` сильнее `@layer theme` при любом порядке.
- `@apply` работает только в графе tailwind-entry (`main.css`): sass-компиляция
  идёт раньше раскрытия TW, и в scss-источниках (включая `<style lang="scss">`
  в SFC) `@apply` остаётся литералом. В scss — обычный CSS на var()-токенах
  и миксинах.
- Конфиг: путь хаба задаётся `loadPaths`; legacy-ключ `includePaths`
  sass-embedded молча игнорирует (проверено на 1.104.0 сборкой SFC-стиля).

## Конфиг Nuxt

- `compatibilityDate` фиксирован (`2025-07-15`) — не опускать.
- Модули подключаются в `nuxt.config.ts` → `modules: [...]`; после любой правки
  конфига — `npx nuxt prepare`.

## Git-гигиена здесь

- 200 строк на файл (все файлы, кроме `package-lock.json`; бинарные шрифты
  вне домена подсчёта).
- Pre-commit (husky): `lint → typecheck → line-guard → format:check`; коммит
  с ошибкой отклоняется.
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
- https://tailwindcss.com/docs/installation/using-vite — TW4 через @tailwindcss/vite (framework-guide)
- https://sass-lang.com/d/import — deprecation @import, modern API
- https://developer.mozilla.org/en-US/docs/Web/CSS/@layer — каскадные слои, защита моста токенов
