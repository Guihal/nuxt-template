---
name: nuxt-workflow
description: Workflow for developing and verifying changes in the nuxt-template Nuxt 4 repository (run, lint, typecheck, 200-line limit, husky pre-commit gate). Use when editing code or docs in this repo, before committing, or when npm run lint/typecheck/line-guard failures need interpretation.
---

# nuxt-workflow

Как работать в этом репозитории (Nuxt 4 + AI-ready гейты). Детали — `AGENTS.md`,
`docs/guideline.md`, `rules/nuxt.md`.

## Цикл изменения

1. Правишь файлы. Код — в `app/`; не-кодовые лимиты распространяются и на docs.
2. Перед коммитом прогони:
   - `npm run lint` — ESLint (включая `max-lines: 200` для .ts/.vue/.mjs);
   - `npm run typecheck` — vue-tsc (покрывает `app/**` и генерируемые проекты);
   - `npm run line-guard` — 200 строк для не-кодовых файлов (всё, кроме `package-lock.json`).
3. Коммить: pre-commit хук (husky) сам повторит lint → typecheck → line-guard
   и отклонит коммит при любой ошибке. Коммит проходит = все три проверки зелёные
   на момент коммита.

## Инварианты репозитория

- Корневой `tsconfig.json` генерируется (`nuxt prepare`) — руками не править.
- После правки `nuxt.config.ts` — всегда `npx nuxt prepare`.
- `typescript` закреплён на `~6.0.0` (TS 7.x роняет vue-tsc 3.3.11).
- Лимит 200 строк на файл; файл вырос — раздели.
- Pinia-сторы: `app/stores/`, автоимпорт; `<NuxtImg>` — для картинок из `public/`.
- Демо в `app/app.vue` должно продолжать запускаться сразу после `npm install`.

## Типичные отказы гейта

- `max-lines ... Maximum allowed is 200` — раздели файл.
- `TS2322`/прочие `TSxxxx` — type-ошибка; проверяется только код в `app/**`
  (корневые .ts вне tsconfig-проектов typecheck не видит — ловит ESLint).
- `line-guard: N file(s) exceed the 200-line limit` — сократи/раздели не-кодовый файл.
- Хук молча не сработал — `git config core.hooksPath` должен быть `.husky/_`;
  если нет — `npm install` (скрипт `prepare` переактивирует husky).
