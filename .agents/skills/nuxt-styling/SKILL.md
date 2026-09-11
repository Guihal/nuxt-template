---
name: nuxt-styling
description: Add design tokens and style components in this Nuxt 4 repo (Tailwind CSS v4 via @tailwindcss/vite, injected SCSS hub with tokens, mixins and functions in app/assets). Use when the task says добавить токен, стилизовать компонент, change app/assets or the css/vite styling keys in nuxt.config.ts, or debug missing tokens/utilities in built CSS.
---

# nuxt-styling

Стилизация репо: TW4 + инжект SCSS-хаба. Скоуп-инварианты —
`.cursor/rules/50-styling.mdc`; фундамент с источниками — `rules/nuxt.md`
(раздел «Стили»). Живой образец всех механизмов — демо в `app/app.vue`.

## Добавить токен (три синхронные точки)

1. `$name: value;` — в `app/assets/scss/_tokens.scss` (единственный источник значения).
2. `--token-name: #{$name};` — в `:root` эмиттера `app/assets/scss/theme.scss`.
3. Зеркало в `@theme inline` внутри `app/assets/css/main.css`: цвета —
   `--color-name: var(--token-name)`, отступы — `--spacing-name`, радиусы —
   `--radius-name`.

Потребление: в scss — `$name` или `var(--token-name)`; в разметке — TW-класс
(`bg-name`, `p-name`, `rounded-name`). Проверка моста после `npm run build`:

```bash
# объявление ровно одно (хаб не эмитит дубли):
cat .output/public/_nuxt/*.css | grep -o -- '--token-name:[^;}]*' | sort | uniq -c
# дрейф множеств (токен без зеркала / зеркало без эмиттера) — пустой вывод:
diff <(cat .output/public/_nuxt/*.css | grep -oP -- '--token-[a-z0-9-]*(?=:)' | sort -u) \
     <(cat .output/public/_nuxt/*.css | grep -oP -- '(?<=var\()--token-[a-z0-9-]*(?=\))' | sort -u)
```

## Стилизовать компонент

- Scoped-блок `<style lang="scss" scoped>`: члены хаба доступны без import —
  additionalData инжектит `main` в каждую scss-компиляцию.
- Внутри — обычный CSS: `@include card(...)`, `rgba($brand, 0.25)`,
  `fluid(14, 18)`, `var(--token-name)`.
- `@apply` в scss не писать — не раскроется и останется литералом; TW-утилиты
  вешаются классами в разметке, а `@apply` живёт только в `app/assets/css/main.css`.

## Границы

- `main.scss` и партиалы output-free (`@use`/`@forward`/переменные/миксины);
  CSS эмитит только `theme.scss`, ровно один раз.
- Ручные `@use "main"` / `@use "tokens"` не писать — вторая цепочка @use
  ломает компиляцию.
- Новый партиал подключается `@forward`-ом в хаб; каждый файл ≤200 строк.
