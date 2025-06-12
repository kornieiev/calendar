# Custom Calendar App

This is a **custom calendar application** built with React and TypeScript, **without using any third-party calendar libraries**.

## Features

- **Automatic Localization**: On load, the app detects the user's country and current date, displaying relevant holidays and information immediately.
- **Selector Menus**: Easily switch between countries and years (date range: 2020–2030) using the dropdown selectors above the calendar.
- **Add Tasks**: Double-click any calendar date to open an input field. Enter your task and either press Enter or click anywhere outside the input to save.
- **Drag & Drop**: Click and hold a task to drag it to another date. The target cell is highlighted for convenience.
- **Task Filtering**: Use the filter option above the calendar to quickly find tasks by text.
- **Persistent Storage**: All tasks are saved in your browser's localStorage, so your data remains after page reloads.
- **No Calendar Libraries**: All calendar logic and rendering are implemented from scratch.

## Usage

- Double-click a date to add a task.
- Press Enter or click outside the input to save the task.
- Drag and drop tasks between dates.
- Use the filter input to search for tasks.
- Change country or year using the selectors above the calendar.

> **Note:** For demo purposes, the selectable date range is limited to 2020–2030.
> https://date.nager.at/swagger/index.html

Enjoy using the calendar!

# Кастомний Календар

Це **кастомний застосунок-календар**, створений на React та TypeScript **без використання сторонніх бібліотек для роботи з календарем**.

## Можливості

- **Автоматична локалізація**: При завантаженні застосунок визначає країну користувача та поточну дату, одразу відображаючи актуальні свята та інформацію.
- **Меню вибору**: Легко перемикайте країну та рік (діапазон дат: 2020–2030) за допомогою селекторів над календарем.
- **Додавання записів**: Двічі клікніть на будь-яку дату календаря, щоб відкрити поле для введення. Введіть запис і натисніть Enter або клікніть мишею поза полем для збереження.
- **Drag & Drop**: Затисніть запис мишею, щоб перетягнути його на іншу дату. Цільова комірка підсвічується для зручності.
- **Фільтрація записів**: Використовуйте поле фільтрації над календарем для швидкого пошуку записів за текстом.
- **Збереження у localStorage**: Усі записи зберігаються у localStorage браузера, тому не зникають після перезавантаження сторінки.
- **Без бібліотек календаря**: Уся логіка та відображення календаря реалізовані з нуля.

## Використання

- Двічі клікніть на дату для додавання запису.
- Натисніть Enter або клікніть поза полем для збереження запису.
- Перетягуйте записи між датами.
- Використовуйте фільтр для пошуку записів.
- Змінюйте країну або рік за допомогою селекторів над календарем.

> **Примітка:** Для тестового використання діапазон дат обмежено 2020–2030 роками.

Приємного користування календарем!
