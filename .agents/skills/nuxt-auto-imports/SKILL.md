---
name: nuxt-auto-imports
description: Work with the Nuxt 4 auto-import surface — Vue APIs, app/components, app/composables, app/utils, stores, server/utils; shared/ exceptions via #shared. Use when unsure whether an import is needed or a name collides.
---

# Auto-imports (Nuxt 4)

Что Nuxt даёт без import и где проходит граница. Инварианты —
.cursor/rules/10-auto-imports.mdc; зонтик — nuxt-workflow.

1. Прежде чем писать `import`, проверь, не автоимпортируется ли имя: все Vue API
   (`ref`, `computed`, `watch`), встроенные композаблы (`useFetch`, `useState`,
   `useRoute`) доступны везде.
2. Собственный композабл — файл в `app/composables/` с именованным экспортом
   `useXxx` (каталога пока нет — создай, автоимпорт подхватит сам).
3. Чистый хелпер — файл в `app/utils/` с именованным экспортом; реактивность туда
   не тащить (для неё есть composables).
4. Компонент из `app/components/` доступен в шаблонах по имени файла (PascalCase).
5. На сервере неявно доступны экспорты `server/utils/` — клиенту они не видны.
6. Сомневаешься в составе доступного — сгенерируй актуальный список:
   `npx nuxt prepare`, затем загляни в типы `.nuxt/`.

## Подводные камни

- Ручной import автоимпортируемого — шум и рассинхрон с типами; не пиши его.
- Не называй свои функции именами встроенных (`ref`, `useFetch`) — коллизия роняет
  резолв молча.
- В `shared/` автоимпорт работает только для shared/utils и shared/types; остальное
  — явный импорт через `#shared`.

База: https://nuxt.com/docs/4.x/guide/concepts/auto-imports;
граница shared — https://nuxt.com/docs/4.x/directory-structure/shared.
