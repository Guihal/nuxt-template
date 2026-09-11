# nuxt-template

Базовая сборка [Nuxt 4](https://nuxt.com): запускается сразу, готова к работе
AI-агентов — линтер, typecheck, лимит 200 строк на файл и pre-commit гейт из коробки.

## Быстрый старт

Требования: Node ≥ 26, npm.

```bash
npm install   # зависимости + nuxt prepare + активация husky
npm run dev   # http://localhost:3000
```

Демо-страница показывает работу pinia-стора (счётчик) и `<NuxtImg>` (изображение
через встроенный IPX-пайплайн `/_ipx/...`).

## Команды

```bash
npm run dev          # dev-сервер
npm run build        # прод-сборка
npm run preview      # просмотр прод-сборки
npm run lint         # ESLint
npm run lint:fix     # ESLint с автоисправлением
npm run typecheck    # nuxt typecheck (vue-tsc)
npm run line-guard   # лимит 200 строк для не-кодовых файлов
```

## Качество кода

На каждом коммите pre-commit хук (husky) последовательно запускает
`lint → typecheck → line-guard` и отклоняет коммит при первой ошибке:

- **ESLint** — flat config от `@nuxt/eslint` + правило `max-lines: 200` для кода;
- **typecheck** — `nuxt typecheck` (vue-tsc), покрывает `app/**` и генерируемые каталоги;
- **line-guard** — скрипт `scripts/check-line-limit.mjs`: не более 200 строк на любой
  файл репо (юниверс — файлы, видимые git; бинарные ассеты вне домена).

## Структура

```
app/            код приложения (app.vue, stores/, components/, composables/, ...)
public/         статика (demo.png, robots.txt, favicon.ico)
scripts/        служебные скрипты (check-line-limit.mjs)
docs/           гайдлайн разработки (guideline.md)
rules/          агентные правила (nuxt.md)
.agents/skills/ скиллы для AI-агентов (nuxt-workflow)
nuxt.config.ts  конфиг Nuxt: modules + compatibilityDate
```

## Стек

- [Nuxt 4](https://nuxt.com) (структура `app/`) + TypeScript `~6.0.0`
- [@pinia/nuxt](https://pinia.vuejs.org/ssr/nuxt.html) — сторы с автоимпортом из `app/stores/`
- [@nuxt/image](https://image.nuxt.com/) — `<NuxtImg>` + встроенный IPX
- [@nuxt/eslint](https://eslint.nuxt.com) — ESLint flat config
- [husky](https://typicode.github.io/husky/) — pre-commit гейт

## Документация

- [AGENTS.md](AGENTS.md) — команды линтера, стек, структура, правила для агентов
- [docs/guideline.md](docs/guideline.md) — гайдлайн разработки в этом репозитории
- [rules/nuxt.md](rules/nuxt.md) — правила Nuxt для AI-агентов (по ресерчу)
- [`.agents/skills/nuxt-workflow/SKILL.md`](.agents/skills/nuxt-workflow/SKILL.md) — скилл workflow
