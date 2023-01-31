# vk-chat-bot
💬 Чат бот для соц сети ВКОНТАКТЕ отвечающий на сообщения пользователей.

❗ Необходима Windows 10+ и node.js не ниже 15.8.0 и ОЗУ 2 ГБ минимум.<br />
Качаем тут и ставим: https://nodejs.org/en/ <br />
Затем скачиваем сей проект архивом и распаковываем на пк (Зеленая кнопка code<> > Download ZIP) <br />
Либо же при наличии git: <br />
```bash
git clone https://github.com/ckieverentineas/vk-chat-bot.git
```
Открываем cmd.exe и переходим в корень проекта, затем пишем: <br />
```bash
npm i
npm run dev
```

💡 либо просто запускаем init.bat по окончанию которого, start.bat <br />

В случае проблем с базами данных:
```bash
npx prisma migrate dev --name init
npx prisma generate
```
____
☠ Прежде чем запускать бота, отредкактируйте .env следующим образом: <br />
✅ вставьте свой токен в файле между кавычек так, где token: token = "ТОКЕН"<br />
💡 Пример: token = "vk.api.eaugue.hrirtihk.saegmieguu2_34qw4itgj4w8_gdsiguesgwugw" <br />
✅ вставьте свой ид ВК в файле между где root: root = idvk <br />
💡 Пример: root = 486747328 <br />
____
☠ Команды бота уже сделанные: <br />
⚙ !словарь - пополняет словарный запас бота на все еще не встреченные слова до этого, нужен для нечеткого поиска в базе данных и становления связей* <br />
⚙ !пара - устанавливает парные связи слов на основе существующего словаря и чтения книг* <br />
⚙ !база - считывает тхт формата: Вопрос\Ответ и все что до второй , остальное нам нафиг не надо. закидывая вопрос-ответы в базу данных <br />
⚙ !базомод - считывает тхт формата: Вопрос \\n Ответ \\r\\n ... Вопрос \\n Ответ \\r\\n закидывая вопрос-ответы в базу данных <br />
⚙ !конфиг - считывает тхт формата: Вопрос\Ответ и все что до второй , остальное нам нафиг не надо. закидывая вопрос-ответы в базу данных <br />
⚙ !мутинг idvk - где idvk, пишем уникальный идентификатор пользователя вк, для включения или отключения режима его игнорирования <br />
⚙ !инфа - выдает информацию о вас и вашем статусе для релевантности бота, конечно вам покажут не все=) <br />
⚙ !помощь - напоминалка <br />
💡 По пути ./src/book/ кладем в директорию (папку) книгу/answer_database в txt формата, и вначале выполняем команду словарь, по ее окончанию обучение. <br />
💡 Примечание: 1 МБ txt считывается 4+ часа, т.е. при загрузки 1 МБ тхт документа потребуется 4 часа на пополнение словарного запаса, и еще 4 для установления связей на основе полученных слов и их последовательности в книге. А при считывании вопрос-ответ базы данных 6-7 строк в секунду.
____
☠ Возможности бота: <br />
🚀 Ответ пользователям на основе базы данных, вопрос-ответ <br />
🚀 Ответ пользователям на основе полученной информации из книг на основе силы Бога рандома, в случае, если нечего предложить из базы данных <br />
🚀 Отвечает в беседах и в личных сообщениях <br />
🚀 Есть нечеткий поиск, позволяющий частично игнорировать ошибки, но увы лишь частично <br />
🚀 Если сообщение с точками и т.п. то построит ответ на каждое предложение. <br />
🚀 Запоминает два предыдущих сообшения, и будет игнорировать повторки. <br />
🚀 Защита от спамеров, по дефолту автоматически начинает игнорировать, предварительно выдавая предупреждения. <br />
____
💬 Подробнее о команде !база: <br />
Кладете в директорию /src/book/ базу данных айха (файл) или любую другую с расширением txt <br />
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

💬 Подробнее о команде !базомод: <br />
Кладете в директорию /src/book/ базу данных айха (файл) или любую другую с расширением txt <br />
Пишите боту !базомод - бот начнет считывать любое количество файлов в данной папке и сохранять ответы в базу данных SQLite <br />
💡 Скорость сохранения 6-7 строк в секунду (если они являются еще неизвественными) рекомендуется не класть файл больше, чем 10-15 МБ, лучше разделить на файлы по 10 МБ и запихать сколько угодно <br />
🔧 Формат базы данных такого плана:
```js

Заходи потом ко мне в спальню! Я кое-что покажу тебе.
Ну?
Что ну?

Теперь можно посмотреть?
Теперь можно посмотреть?

Бет?
Да?

Я сказал, хватит! Холли даже бровью не повела.
Холли, черт возьми!

```
💡 Обьясняем:  <br />
Вопрос: Заходи потом ко мне в спальню! Я кое-что покажу тебе. <br />
Ответ: Ну? <br />
Вопрос: Ну? <br />
Ответ: Что ну? <br />

Вопрос: Теперь можно посмотреть? <br />
Ответ: Теперь можно посмотреть? <br />
и по аналогии далее.. <br />

💬 Подробнее о команде !словарь и !пара: <br />
Кладете в директорию /src/book/ базу данных айха (файл) или любую другую с расширением txt <br />
Пишите боту !база - бот начнет считывать любое количество файлов в данной папке и сохранять слова/пару слов на основе последовательности их в книге в базу данных SQLite <br />
💡 1 МБ txt для !словарь и !пара  занимает по 4 часа примерно, а в сумме 8.<br />
🔧 Формат - книга, текстовые документы, главное формат txt  с предложениями.
```js
Поясняем:
Закинули txt в /src/book/
Написали боту команду !словарь и дождались выполнения
Написали боту команду !пара и дождались выполнения
Готово для генератора созданы слова и пары связей из них для построения на неизвестные вещи в базе данных, может позже команду обьединим...
```