[View Photos modal page](https://razhnoff.github.io/safedeal-frontend-trainee/ "Photos page")

## Задание
​

Необходимо сверстать адаптивную страницу со списком фотографий.
​

При клике на фотографии открывается модальное окно с фотографией, списком комментариев и формой добавления комментариев.
​

Список ручек:
* GET `https://boiling-refuge-66454.herokuapp.com/images` - получение списка фотографий.
* GET `https://boiling-refuge-66454.herokuapp.com/images/:imageId` - получения большого изображения и списка комментариев.
* POST `https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments` - добавление комментария (204 – OK, комментарий не сохраняется).

​
Дизайн можно найти [тут](https://www.figma.com/file/3VP0QDK3kjdfbkj8TRrtsx/Test-task?node-id=0%3A1).
​

Ответы на вопросы по заданию можно найти [тут](mailto:varkadov@avito.ru).
​

Мы оценим если:
- приложение будет работать локально после `npm i && npm run start`;
- приложение написано на React;
- не используются внешние компоненты, например, модальное окно;
- учтен UX.
