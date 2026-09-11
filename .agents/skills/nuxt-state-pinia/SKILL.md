---
name: nuxt-state-pinia
description: Manage shared state with pinia setup-stores in app/stores (auto-imported via @pinia/nuxt). Use when creating a store, sharing state across components, or choosing store vs useState.
---

# State & Pinia (Nuxt 4)

Разделяемое состояние — pinia-сторы в `app/stores/`. Рабочий образец —
`app/stores/counter.ts`. Инварианты — .cursor/rules/40-stores.mdc.

1. Новый стор — файл `app/stores/<домен>.ts` в setup-стиле:
   `defineStore('имя', () => { ... })` с `ref` для состояния и обычными функциями
   для действий.
2. Импорт не нужен: стор доступен из любого компонента по имени
   (`useCounterStore()` — без import, модуль @pinia/nuxt).
3. В компоненте реактивные поля разворачивай через `storeToRefs(store)`, действия
   вызывай прямо на экземпляре.
4. Асинхронные загрузки — в action, не на верхнем уровне setup: инициализация
   состояния остаётся синхронной.
5. Лёгкое несвязанное состояние (один ref на компонент-дерево) можно держать в
   `useState` — но его значение должно сериализоваться в JSON.

## Подводные камни

- В значении состояния не должно быть классов/функций/символов — оно уходит в
  SSR-payload.
- Один домен — один стор; стор-свалка делится, а не растёт.
- Проверка типов после нового стора: `npm run typecheck`.

База: https://nuxt.com/docs/4.x/getting-started/state-management;
https://pinia.vuejs.org/ssr/nuxt.html; образец — `app/stores/counter.ts`.
