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
.cursor/rules/  скоуп-инварианты Nuxt для AI-агентов (.mdc)
public/         статика (demo.png, robots.txt, favicon.ico)
scripts/        служебные скрипты (check-line-limit.mjs)
docs/           гайдлайн разработки (guideline.md)
rules/          документ-основание правил (nuxt.md)
.agents/skills/ скиллы для AI-агентов (nuxt-workflow + пер-фичные)
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
- [`.cursor/rules/`](.cursor/rules/) — скоуп-инварианты Nuxt (носитель pi-rules)

## Правила и скиллы для агентов

Правила разложены по носителям так, что каждый инвариант живёт ровно в одном месте
(single-source): общие для репо — в [AGENTS.md](AGENTS.md), скоуповые — в
`.cursor/rules/*.mdc`, процедуры — в скиллах.

| Носитель | Кто читает | Что там |
|---|---|---|
| `AGENTS.md` (корень) | pi-rules + Codex | стек, команды, гейт, структура, карта правил |
| `app/AGENTS.md`, `app/stores/AGENTS.md` | только Codex | дайджесты скоупов + указатели на `.mdc` |
| `.cursor/rules/*.mdc` | только pi-rules | alwaysApply-база + скоуп-инварианты по каталогам |
| `.agents/skills/*/SKILL.md` | скилл-механика агента | пер-фичные процедуры; зонтик — nuxt-workflow |
| `rules/nuxt.md` | человек и агент | документ-основание (исследование с источниками) |

### Как подхватывает pi-rules

Расширение [code-yeongyu/pi-rules](https://github.com/code-yeongyu/pi-rules) сканирует
`.cursor/rules/*.mdc` рекурсивно плюс корневой `AGENTS.md`. Правило с `alwaysApply: true`
инжектируется всегда; правило с `globs` — когда результат инструмента матчит маску.
Режим `pi-rules-mode` (по умолчанию `both`) — статическая инжекция на старте сессии
плюс динамическая по результату инструмента. Капы расширения: 12000 символов на
правило и 40000 на суммарную инжекцию за один tool result.

### Как подхватывает Codex

По [гайду Codex](https://learn.chatgpt.com/docs/agent-configuration/agents-md):
глобальный `~/.codex/AGENTS.md` → корень репо → вложенные файлы до текущего каталога
(не более одного файла на директорию, ближайший к файлу побеждает; суммарный кап —
32 KiB). Следствие для этого репо: `app/AGENTS.md` и `app/stores/AGENTS.md` грузятся,
только если сессия стартует внутри `app/`; для сессий из корня они спят.
`AGENTS.override.md` — поддерживаемый механизм (проверяется раньше `AGENTS.md`),
но обработка его моделью зависит от версии; этот репозиторий override-файлов не использует.

### Правила на вырост и развитие слоя

- Для ещё не существующих каталогов (`app/pages/`, `app/components/`,
  `app/composables/`, `app/utils/`, `shared/`, `server/`) правила в `.cursor/rules/`
  написаны заранее и активируются с появлением первого файла в каталоге.
- Каталог появился — добавь рядом его вложенный `AGENTS.md`-дайджест, как сделано
  в `app/` и `app/stores/`.
- Пер-фичные скиллы дополняют зонтичный `nuxt-workflow`, не заменяют его.
