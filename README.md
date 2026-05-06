# Проектная работа 11-го спринта

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Этапы работы:

1. Разверните проект и ознакомьтесь с кодом. Все необходимые вам компоненты уже созданы и лежат в папке `src/components`

2. Настройте роутинг.

3. Напишите функционал запросов данных с сервера, используя `Redux` и глобальный `store`. Сами "ручки" уже прописаны и лежат в `utils/burger-api.ts`

4. Настройте авторизацию и создайте защищённые роуты.

## Важно:

Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.

## Тесты

- Unit-тесты (Jest): `npm test`
- Unit-тесты в watch-режиме: `npm run test:watch`
- Покрытие Jest: `npm run test:coverage`
- E2E-тесты (Cypress, headless): `npm run cypress:run`
- Cypress UI: `npm run cypress:open`

Перед запуском Cypress поднимите приложение на `http://localhost:4000` (например, `npm start`), так как `baseUrl` для e2e-тестов настроен на этот адрес.

Если Cypress в Linux/WSL не стартует с ошибкой по библиотекам (`libnss3.so`, `libnspr4.so`, `libasound.so.2`), установите системные зависимости:
`sudo apt update && sudo apt install -y libnss3 libnspr4 libasound2t64`.
