# Гайдлайн разработки — nuxt-template

Как работать в этом репозитории: правила правок, проверок и коммитов.
Краткая справка по командам — в [AGENTS.md](../AGENTS.md); правила Nuxt для AI-агентов —
в [../rules/nuxt.md](../rules/nuxt.md).

## Запуск и проверка

```bash
npm install         # один раз; заодно nuxt prepare + активация husky
npm run dev         # http://localhost:3000
npm run lint        # ESLint
npm run typecheck   # nuxt typecheck (vue-tsc)
npm run line-guard  # лимит 200 строк (не-код)
```

Перед коммитом все четыре проверки должны проходить — pre-commit хук прогоняет
три из них и отклоняет коммит при ошибке.

## Гейт коммита

- Хук: `.husky/pre-commit` — последовательно `lint → typecheck → line-guard`,
  `set -e`: первое падение останавливает цепочку и отклоняет коммит.
- Активация husky — скрипт `prepare` в `package.json` (выполняется `npm install`).
  Проверка активации: `git config core.hooksPath` → `.husky/_`.
- Если хук не сработал после клона — выполнить `npm install` (или `npx husky`).

## Лимит 200 строк на файл

- Код (.ts, .vue, .mjs): правило `max-lines` в `eslint.config.mjs`.
- Не-код (.md, .json и пр.): `scripts/check-line-limit.mjs`. Юниверс — файлы, видимые
  git (`git ls-files --cached --others --exclude-standard`); исключение — только
  `package-lock.json`; бинарные расширения (.png/.ico/.webp) не считаются.
- Файл вырос — раздели его, а не повышай лимит. Константа лимита живёт в двух местах:
  `eslint.config.mjs` и `scripts/check-line-limit.mjs`.

## Правки кода

- Корневой `tsconfig.json` не редактировать руками — он генерируется `nuxt prepare`.
  Типы/опции расширяются ключом `typescript` в `nuxt.config.ts`, затем `npx nuxt prepare`.
- После правки `nuxt.config.ts` (модули, опции) обязательно `npx nuxt prepare`:
  обновляются типы `.nuxt/` и ESLint-конфиг `.nuxt/eslint.config.mjs`.
- `eslint.config.mjs` строится поверх `withNuxt` (импорт из `./.nuxt/eslint.config.mjs`),
  кастомные правила добавляются в объект-аргумент, а не переписыванием конфига с нуля.
- Pinia-сторы кладутся в `app/stores/` — подхватываются автоимпортом (`useCounterStore`
  доступен без import). Ручной импорт сторов не нужен.

## Зависимости

- Пакетный менеджер — npm; не смешивать bun/pnpm-локфайлы.
- `typescript` закреплён на `~6.0.0`: линия 7.x несовместима с `vue-tsc` 3.3.11
  (`nuxt typecheck` падает на `ERR_PACKAGE_PATH_NOT_EXPORTED`). Поднимать мажор
  только после успешного `npm run typecheck` на новой паре версий.
- Платформенные бинарники (esbuild, sharp/@img) ставятся как optionalDependencies;
  npm может блокировать их install-скрипты (allowScripts) — это штатно и работе
  не мешает.

## Известные границы

- `nuxt typecheck` проверяет только файлы tsconfig-проектов (`app/**`, генерируемые
  каталоги). Корневые `.ts`-файлы вне `app/` typecheck не видит — их проверяет ESLint.
- `.nuxt/`, `.output/`, `node_modules/` — генерируемые, в git не попадают (gitignore).
- Демо (`app/app.vue`, `app/stores/counter.ts`, `public/demo.png`) — живой пример
  pinia + NuxtImg; менять можно, ломать запуск — нет: `npm run dev` должен поднимать
  сайт сразу после `npm install`.
