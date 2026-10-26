# Источники иконок услуг

- Женская кисть с маникюром: [Manicure, SVG Repo](https://www.svgrepo.com/svg/5853/manicure), CC0. Убрана круглая подложка; исходные формы объединены в один внешний контур без внутренних стыков. Заливка отключена, форма кисти сохранена.
- Стопа: [Foot Silhouette, OpenClipart / FreeSVG](https://freesvg.org/foot-silhouette), public domain / CC0; [копия SVG](https://freepngimg.com/svg/63031-foot-silhouette). Используется только контур с деталями ногтей; стопа сужена по горизонтали, заливка отключена.

Толщина основной линии — 1,2 px, деталей ногтей — 0,55 px. `vector-effect="non-scaling-stroke"` сохраняет толщину линий при изменении размера иконки.

Геометрия хранится в `src/data/serviceIconPaths.ts`; компоненты — в `src/components/ServiceIcons.tsx`. Изображения не загружаются с внешних серверов при посещении сайта.
