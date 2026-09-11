# nuxt-template

Базовая сборка [Nuxt 4](https://nuxt.com) для Дениса: запускается сразу, готова к работе
AI-агентов — линтер, typecheck, лимит 200 строк и pre-commit гейт из коробки.

## Быстрый старт

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

На каждом коммите pre-commit хук (husky) запускает `lint → typecheck → line-guard`
и отклоняет коммит при любой ошибке.

## Стек

- [Nuxt 4](https://nuxt.com) (структура `app/`) + TypeScript `~6.0.0`
- [@pinia/nuxt](https://pinia.vuejs.org/ssr/nuxt.html) — сторы с автоимпортом из `app/stores/`
- [@nuxt/image](https://image.nuxt.com/) — `<NuxtImg>` + встроенный IPX
- [@nuxt/eslint](https://eslint.nuxt.com) — ESLint flat config
- [husky](https://typicode.github.io/husky/) — pre-commit гейт

## Документация

- [agents.md](agents.md) — команды линтера, стек, структура, правила для агентов
- [docs/guideline.md](docs/guideline.md) — гайдлайн разработки в этом репозитории
- [docs/nuxt-ai-rules.md](docs/nuxt-ai-rules.md) — правила Nuxt для AI-агентов (по ресерчу)
- [`.agents/skills/nuxt-workflow/SKILL.md`](.agents/skills/nuxt-workflow/SKILL.md) — скилл workflow
