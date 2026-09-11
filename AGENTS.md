# AGENTS.md — nuxt-template

Базовая сборка Nuxt 4, подготовленная для работы AI-агентов: линтер, typecheck,
лимит 200 строк на файл, форматирование и pre-commit гейт настроены и проверяются
на каждом коммите.

## Стек

- Nuxt 4.5.2, структура `app/` (дефолт Nuxt 4); Node >= 26, пакетный менеджер npm
- TypeScript `~6.0.0` (пин осознанный: TS 7.x несовместим с `vue-tsc` 3.3.11 — `nuxt typecheck` падает)
- Модули Nuxt: `@nuxt/eslint`, `@nuxt/image`, `@pinia/nuxt` (см. `nuxt.config.ts`)
- Стили: Tailwind CSS v4 (vite-плагин `@tailwindcss/vite`) + SCSS (sass-embedded,
  инжект-хаб в `app/assets/scss`)
- Качество: ESLint 10 (flat config), husky 9.1.7 (pre-commit), vue-tsc (typecheck),
  Prettier (format:check)

## Команды

| Команда                | Что делает                                                                |
| ---------------------- | ------------------------------------------------------------------------- |
| `npm install`          | установка зависимостей + `nuxt prepare` (типы `.nuxt/`) + активация husky |
| `npm run dev`          | dev-сервер на http://localhost:3000                                       |
| `npm run build`        | прод-сборка; `npm run preview` — локальный просмотр сборки                |
| `npm run lint`         | ESLint по всему репо (flat config)                                        |
| `npm run lint:fix`     | ESLint с автоисправлением                                                 |
| `npm run typecheck`    | `nuxt typecheck` (vue-tsc) — проверка типов                               |
| `npm run line-guard`   | лимит 200 строк для не-кодовых файлов (.md, .json, ...)                   |
| `npm run format`       | Prettier по всему репо (--write)                                          |
| `npm run format:check` | Prettier без записи (--check)                                             |
| `npx nuxt prepare`     | регенерация `.nuxt/` — обязательна после правки `nuxt.config.ts`          |

## Pre-commit гейт

Хук `.husky/pre-commit` (husky v9, `git config core.hooksPath` → `.husky/_`) последовательно
запускает `npm run lint` → `npm run typecheck` → `npm run line-guard` →
`npm run format:check`. Любая ошибка отклоняет коммит. Хук проверяет рабочее дерево,
поэтому перед коммитом файлы должны быть сохранены на диске.

## Лимит 200 строк

Действует на все файлы репозитория, кроме `package-lock.json` (генерируется):

- код (.ts, .vue, .mjs) — правило ESLint `max-lines` (`eslint.config.mjs`);
- не-код (.md, .json, ...) — скрипт `scripts/check-line-limit.mjs` (юниверс — файлы,
  видимые git; бинарные файлы .png/.ico/.webp и шрифты .woff/.woff2/.ttf/.otf не считаются).

## Структура

```
app/            код приложения (дефолт Nuxt 4)
  app.vue       демо-страница: pinia-стор + <NuxtImg> + стилевое демо
  assets/       стили: scss (токены/миксины/хаб) + css (TW-entry)
  stores/       pinia-сторы (автоимпорт)
public/         статика (demo.png, robots.txt, favicon.ico)
scripts/        служебные скрипты (check-line-limit.mjs)
docs/           гайдлайн разработки (guideline.md)
rules/          агентные правила (nuxt.md)
.agents/skills/ скиллы для AI-агентов (nuxt-workflow)
nuxt.config.ts  конфиг Nuxt: modules + compatibilityDate
eslint.config.mjs   ESLint flat config (withNuxt + max-lines)
tsconfig.json   ТОЛЬКО генерируется (nuxt prepare) — руками не редактировать
```

## Правила для агентов

1. Правила работы с Nuxt — `rules/nuxt.md`; процесс разработки — `docs/guideline.md`.
2. Скилл проекта: `.agents/skills/nuxt-workflow/SKILL.md` (workflow и проверки репозитория).
3. `nuxt typecheck` покрывает только файлы tsconfig-проектов (`app/**` и генерируемые);
   корневые `.ts`-файлы вне `app/` typecheck'ом не проверяются — их ловит только ESLint.
4. Корневой `tsconfig.json` не редактировать: типы расширяются ключом `typescript`
   в `nuxt.config.ts` + `npx nuxt prepare`.
5. Новую версию typescript не поднимать без прогона `nuxt typecheck` (см. пин `~6.0.0`).
6. Скоуп-инварианты Nuxt живут в `.cursor/rules/*.mdc`: alwaysApply-база (структура app/,
   автоимпорты, данные/состояние, гейты, форматирование) плюс правила по скоупам —
   `app/stores/**`, `public/**`, стилизация (50-styling), конфиги; dormant-активаторы
   (52–54: тесты, шрифты/иконки, env) и правила отсутствующих ещё каталогов
   (`app/pages/`, `app/components/`, `app/composables/`, `app/utils/`, `shared/`)
   написаны на вырост и активируются с появлением своего скоупа.
7. Codex читает этот файл как корень инструкции и добавляет вложенные дайджесты
   `app/AGENTS.md` и `app/stores/AGENTS.md`, когда сессия стартует внутри поддерева.
8. Пер-фичные процедуры — `.agents/skills/*/SKILL.md`; зонтик — `nuxt-workflow`.
9. Каждый инвариант имеет один канонический носитель: общие для репо — здесь,
   скоуповые — в `.mdc`, процедуры — в скиллах; дословные дубли между носителями
   не заводить.
