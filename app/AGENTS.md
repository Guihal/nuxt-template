# AGENTS.md — app/

Код приложения Nuxt 4: `app.vue` и `stores/`. Этот файл — дайджест для Codex;
полные скоуп-инварианты живут в `.cursor/rules/*.mdc` (их подхватывает pi-rules).

- Структура — модель app/ дефолта Nuxt 4; легаси-раскладка в корне запрещена
  (канон: `.cursor/rules/00-nuxt4-structure.mdc`).
- Автоимпорты: не импортировать вручную то, что Nuxt даёт сам — компоненты,
  композаблы, утилиты, сторы (канон: `.cursor/rules/10-auto-imports.mdc`).
- Данные и состояние: компонент знает стор и props, но не HTTP; рендер-данные —
  useFetch/useAsyncData, разделяемое состояние — pinia
  (канон: `.cursor/rules/20-data-and-state.mdc`).
- Сторы: setup-стиль по образцу `stores/counter.ts`
  (канон: `.cursor/rules/40-stores.mdc`).
- Гейты качества — 200 строк, pre-commit lint→typecheck→line-guard; детали и
  команды — в корневом `AGENTS.md` и `.cursor/rules/30-quality-gates.mdc`.
