# O проекте

__Этот проект представляет собой небольшое SPA для хранения ежедневных заданий, статей или списка дел__

## Оглавление:
1. [Цели/Задачи](#Цели/Задачи)
2. [Запуск](#Запуск)
3. [Результаты](#Результаты) 

# Цели/Задачи
Основными ***Целями*** создания приложения были:
- только хардкорная работа с `реальным DOM` (innerHTML, appendChild и тд.)
- придерживаться базовых концепций SPA при проектировании
- приложения должно использовать REST API для общения с сервером
- отсутствие фрэймворков в проекте (vanila JS)

Основными ***Задачами*** создания приложения были:
- организация импровизированого хранилища данных
- создание API для общения с сервером (GET, POST, PATCH и тд.)
- конструирование и создание оберток-модулей на базе классов
- минимальное CSS оформление
- создание webpack.config для дальнейшей упаковки проекта (не приоритетно)

# Запуск проекта
- клонировать проект с одноименного репозитория (git clone https://github.com/NikitaKhadnevich/Simple_Task.git)
- открыть в терминале/консоле папку с проектом и запустить "сервер" через команду ***npm run js-ser***
- открыть в браузере файл ***index.html из папки src***

# Результаты
Результатом разработки данного проекта стало небольшое и простое приложение-шпаргалка, которое использует API на базе axios для создания запросов,
интерфейс для отправки, редактирования, удаления и тд., а также интерфейс для вывода и демонстрации текущих заданий.

# Стек

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
