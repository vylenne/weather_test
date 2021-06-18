## Тестовое Задание

### Необходимо реализовать интерфейс получения данных о погоде в городе на выбор пользователя.
**В качестве апи использовать https://openweathermap.org**

Для UI предпочтительно использовать Vuetify (там есть и i18n и чего там только нет)


**Элементы интерфейса:**
- Два варианта языков (включая текст ошибок и название элементов (i18n)) - апи поддерживает мультиязычность
  поле для ввода названия города (обязательное, выводить ошибку, если не заполнено)
- Виджет с результатами (Температура (номинал, ощущается как, минимальная, максимальная), давление, влажность, состояние(дождь, снег, ясно и т.д, ветер (скорость, направление))
- Список предыдущих запрошенных городов (сохраняется при перезагрузке страницы). Нажатие на элемент списка заполняет поле ввода имени города
- Запрос данных осуществляется по нажатии кнопки "Поиск"
- Правильность ввода названия лежит на пользователе. В случае ввода несуществующего названия, для которого апи не выводит результаты, показать на поле имени ошибку ("нет такого города")