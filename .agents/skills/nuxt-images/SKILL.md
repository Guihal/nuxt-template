---
name: nuxt-images
description: Serve and optimize images with public/ assets and NuxtImg/IPX in this Nuxt 4 repo. Use when adding images, fixing missing /_ipx/ transformations, or touching demo assets.
---

# Images (@nuxt/image)

Картинки в репо идут через `<NuxtImg>` и встроенный IPX. Инварианты статики —
.cursor/rules/46-public-assets.mdc.

1. Растровый актив (png/webp) положи в `public/`; файл отдаётся по прямому URL.
2. В шаблоне — `<NuxtImg src="/file.png" width="480" alt="..." />`: модуль сам
   построит трансформацию через `/_ipx/`.
3. Проверь пайплайн фактически: в HTML должен появиться `<img src="/_ipx/...">`,
   и запрос этого src возвращает HTTP 200, а не отдаёт оригинал.
4. Указывай размеры (width/height) — иначе layout сдвигается при загрузке.
5. Живой образец — демо-страница: `app/app.vue` с `public/demo.png`; не сноси их
   без замены потребителя.

## Подводные камни

- SVG IPX не перекодирует — оптимизируй вручную до коммита, через `/_ipx/` он
  пройдёт как есть.
- Новый актив без потребителя не оставлять: статика добавляется вместе с
  использующим её кодом одним коммитом.

База: https://image.nuxt.com/; проверенный в этом репо пайплайн описан в rules/nuxt.md.
