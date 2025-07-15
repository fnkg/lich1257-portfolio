### Структура проекта

![Dependabot](https://badgen.net/dependabot/<user>/<repo>)

#### Клиент

_Next.js v15.1.7, TypeScript, Swiper.js v11.2.3, Tailwind.css v4.0.6_

- `src/app/layout.tsx` - общий ui
- `src/app/page.tsx` - входная точка в приложение
- `src/app/icon.ico` - фавиконка
- `src/app/[slug]/loading.tsx` - индикатор загрузки [заготовка]
- `src/app/[slug]/page.tsx` - динамический роут для страницы категории проектов
- `src/app/about/page.tsx` - страница об авторе
- `src/components/category/CustomSwiper.tsx` - кастомный Swiper
- `src/components/category/Slider.tsx` - слайдер с карточками проктов
- `src/components/gallery/Gallery.tsx` - компонент галереи, которая открывается по клику на карточку в слайдере
- `src/components/gallery/MediaModal.tsx `- вспомогательный компонент для галереи
- `src/components/gallery/MediaViewer.tsx` - вспомогательный компонент для галереи
- `src/components/layout/Dropdown.tsx` - выпадающий список ссылок в навигации
- `src/components/layout/Header.tsx` - общий для всего сайтва хедер с навигацией
- `src/components/AudioMenu.tsx` - добавление звука по ховеру к навигации
- `src/components/StrapiImage.tsx` - вспомогательный компонент для изображений из Strapi [сейчас не используется]
- `src/data/loaders.ts` - загрузчики контента из Strapi
- `src/styles/global.css` - глобальные стили
- `src/styles/slider.css` - стили для слайдера проектов
- `src/utils/fetchApi.ts` - фетчер
- `src/utils/getUrl.ts` - функции для формирования урлов
- `src/utils/randomText.ts` - эффект для постепенного появления текста
- `src/fonts.ts` - шрифты
- `src/types.ts` - типы
- `.env.example`

#### Сервер

_Strapi CMS v5, PostgreSql v15_

requirement node version ">=18.0.0 <=22.x.x"
