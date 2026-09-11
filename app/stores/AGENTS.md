# AGENTS.md — app/stores/

Pinia-сторы приложения (автоимпорт через `@pinia/nuxt`). Дайджест для Codex;
канон скоупа — `.cursor/rules/40-stores.mdc`.

- Стиль store'а — setup (`defineStore('имя', () => { ... })`); живой образец —
  `stores/counter.ts`.
- Ref'ы стора в компонентах разворачивать через `storeToRefs`; действия вызывать
  прямо на экземпляре.
- Один домен — один стор; асинхронные загрузки — в actions; состояние —
  сериализуемое (уходит в SSR-payload).
