---
name: nuxt-forms-validation
description: Build forms in Nuxt 4 — reactive form state, validation with pure functions, submit via $fetch POST, error display. Use when adding any input form or its submit flow.
---

# Forms & Validation (Nuxt 4)

Формы без тяжёлых зависимостей: состояние + чистая валидация + $fetch. Поток
данных — .cursor/rules/20-data-and-state.mdc.

1. Состояние формы — локальный `reactive({...})` в компоненте; в pinia тащи только
   то, что нужно другим частям приложения.
2. Правила валидации — чистые функции (по одному полю или по форме целиком),
   возвращающие текст ошибки или null; когда появится `app/utils/`, живут там.
3. Сабмит — обработчик с `$fetch(url, { method: 'POST', body })`; во время запроса
   блокируй кнопку (флаг pending из ref).
4. Ошибки валидации показывай по полям; ошибку сервера — одним сообщением у формы.
5. Успешный сабмит: сбрось форму и сообщи результат — не оставляй форму в
   промежуточном состоянии.

## Подводные камни

- useFetch не для сабмита — это рендер-композабл, повторный триггер запутает payload.
- Валидация на клиенте — удобство, не защита: сервер обязан проверять сам.
- Не сериализуй в состояние формы функции — состояние уходит в payload.

База: https://nuxt.com/docs/4.x/getting-started/data-fetching (раздел $fetch);
оси практик — https://rulekit.dev.
