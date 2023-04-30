# vk-chat-bot
💬 Чат бот для соц-сети ВКОНТАКТЕ отвечающий на сообщения пользователей. Теперь поддерживает мультиаккаунтность. Подключи себя и своих друзей, друзей друзей.

❗ Необходима ОС Windows 10+ или Linux. Рекомендуется ОЗУ от 2 ГБ и процессор от 2 ядер. <br /> <br />
Шаг 1. Скачиваем с официального сайта Node.js по ссылке https://nodejs.org/en/ <br /> <br />
Шаг 2. Затем скачиваем сей проект архивом и распаковываем на пк (Зеленая кнопка code<> > Download ZIP). <br />
При наличии git можно просто вбить команды в консольке: <br />
```bash
git clone https://github.com/ckieverentineas/vk-chat-bot.git
cd vk-chat-bot-master
``` 
<br /> <br />
Шаг 3. Скачиваем готовую базу данных по ссылке https://disk.yandex.ru/d/53_bbZFdetWH6w и закидываем в папку prisma под названием dev.db - относительный путь будет таким vk-chat-bot-master/prisma/dev.db <br /><br />
Шаг 4. Создаем файл .env в корне проекта - относительный путь будет таким vk-chat-bot-master/.env <br />
🆘 Примерная конфигурация проекта файла .env: <br />
```js
DATABASE_URL = "file:./dev.db?socket_timeout=600&connection_limit=1"
root = ИДВК #root user
VK_ENTITIES = '[
    {   
        "token": "ТОКЕН ОТ СТРАНИЦЫ VK ADMIN К ПРИМЕРУ",
        "idvk": ИДВК,
        "type": "page"
    },
    {   
        "token": "ТОКЕН ОТ ГРУППЫ",
        "idvk": ИДВК,
        "type": "group"
    }
]'
``` <br />
💡 Поясняем: <br />
DATABASE_URL - путь к нашей базе данных с заданными настройками подключения. Оставляем, как в примере. <br />
root - idvk вашей главной страницы не для ботов, а лишь управления ими. <br />
VK_ENTITIES массив записей аккаунтов где указывается данные по примеру, т.е. <br />
- type, строка, вписываете page, если бот страничный, group, если бот для группы; <br />
- token, строка, токен который обеспечивает доступ к вашей странице/группе; <br />
- idvk, число, idvk идентифекатор от группы или страницы. <br />
Токен для страницы вы можете получить здесь, выбрав приложение в качестве VK Admin: https://vkhost.github.io/ <br /> <br />

Шаг 5. если у вас не было git и никогда не будет, то просто запустите вначале скрипт init.bat для windows или init.sh для linux, затем по окончанию первого - db.bat для windows или db.sh для linux.
В остальных случаях в консоле cmd или другом терминале открыт корень проекта и юзаем следующие команды: <br />
```bash
npm i
npx prisma migrate dev --name init
npx prisma generate
```
<br /> <br />
Шаг 6. Бот полностью готов к эксплуатации, если у вас не было git и никогда не будет, то просто запустите скрипт start.bat для windows или start.sh для linux каждый раз, когда надо запустить бота.
В остальных случаях иначе в консоле cmd или другом терминале открыт корень проекта и юзаем следующие команды: <br />
```bash
npm run dev
```
если сообщения об успешном запуске не появилось, тогда попробуйте еще одну команду: <br />
```bash
npm start
```
<br /> <br />
💡 Если не заработало, пишите мне, да и вообще с любыми стактрейсами пишите: https://vk.com/dj.federation <br /> <br />
____
☠ Команды бота уже сделанные: <br />
⚙ !база - считывает тхт формата: Вопрос\Ответ и все что до второй , остальное нам нафиг не надо. закидывая вопрос-ответы в базу данных <br />
⚙ !конфиг - показывает текущую конфигурацию бота и версию бота <br />
⚙ !игнор idvk - где idvk, пишем уникальный идентификатор пользователя вк, для включения или отключения режима его игнорирования <br />
⚙ !инфа - выдает информацию о вас и вашем статусе для релевантности бота, конечно вам покажут не все=) <br />
⚙ !юзердроп - удаляет всех пользователей <br />
⚙ !помощь - напоминалка по командам <br />
⚙ !аптайм - показывает время работы бота со времени старта. <br />
____
☠ Возможности бота: <br />
🚀 GLOBAL Поддержка мультиакаунтности, можно подключить как группу, так и страничку VK; <br />
🚀 GLOBAL Авто-добавление в игнор спамеров, игнорирующих предупреждения о том, что они слишком быстро пишут; <br />
🚀 GLOBAL Игнорирование тех, кто повторяет за ботом или повторяется сам; <br />
🚀 GLOBAL Игнорирование тех, кто упоминает не бота; <br />
🚀 CHAT Игнорирование сообщений в беседах, где находятся больше одного подключенного к приложению бота; <br />
🚀 CHAT Игнорирование сообщений в беседах, ответы на которые адресованы не боту; <br />
🚀 CHAT Думает, когда отвечать на сообщения в беседах, т.е. если в сообщении 1 слово и выше, то шанс на ответ 5%, при двух и более - 10%, 3-х и выше, 35%, от 4-х слов - 50%; <br />
🚀 RESEACH Четкий поиск ответа посредством DirectBoost, т.е. нахождения прямого вхождения 1 к 1 для выдачи ответа;  <br />
🚀 RESEACH Нечеткий поиск ответа посредством MultiBoost, самый крутой поисковик по цене/качеству скорости работы, выдает самый ближайщий ответ похожий от 30% и выше, парсит сообщение на предложения и подбирает; <br />
🚀 RESEACH Нечеткий поиск ответа посредством SpeedBoost, в данный момент самый быстрый и более лояльный поисковик, но вообще не четкий и все считает за одно предложение; <br />
🚀 SpeedBoost, в данный момент самый быстрый и более лояльный поисковик, но вообще не четкий и все считает за одно предложение; <br />
🚀 GROUP Группы помимо всего прочего реагируют на комментарии под своими постами на своей стене. <br />
____
💬 Подробнее о команде !база: <br />
Для команды !база по пути vk-chat-bot-master/src/book/ кладем в директорию (папку) book txt файлы согласно формату, описанному ниже для этой команды формата.
Пишите боту !база - бот начнет считывать любое количество файлов в данной папке и сохранять ответы в базу данных SQLite <br />
💡 Скорость сохранения 6-7 строк в секунду (если они являются еще неизвественными) рекомендуется не класть файл больше, чем 10-15 МБ, лучше разделить на файлы по 10 МБ и запихать сколько угодно <br />
🔧 Формат базы данных такого плана:
```js
Вопрос1\Ответ1\Приоритет
Вопрос2\Ответ2\Приоритет
я найду свою судьбу?\Поживем увидим, а я в судьбу не верю..\0
я ничего не забываю\Все забывают, так что не зарекайся.\0
ВопросN\ОтветN\0
```
____
☠ Если вы хотите обучить бота сами и с нуля, то удалите dev.db в папке prisma и выполните скрипт db.bat для windows или db.sh для linux <br /> <br />
Обратная прямая связь, вопросы и предложения по адресу: https://vk.com/dj.federation <br />