# vk-chat-bot
💬 Чат бот для соц сети ВКОНТАКТЕ отвечающий на сообщения пользователей.

❗ Необходима Windows 10+ и node.js не ниже 15.8.0 <br />
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

☠ Прежде чем запускать бота, отредкактируйте .env следующим образом: <br />
✅ вставьте свой токен в файле между кавычек так, где token: token = "ТОКЕН"<br />
💡 Пример: token = "vk.api.eaugue.hrirtihk.saegmieguu2_34qw4itgj4w8_gdsiguesgwugw" <br />
✅ вставьте свой ид ВК в файле между где root: root = idvk <br />
💡 Пример: root = 486747328 <br />

☠ Команды бота уже сделанные: <br />
⚙ !словарь - пополняет словарный запас бота на все еще не встреченные слова до этого, нужен для нечеткого поиска в базе данных и становления связей* <br />
⚙ !пара - устанавливает парные связи слов на основе существующего словаря и чтения книг* <br />
⚙ !база - считывает тхт формата: Вопрос\Ответ и все что до второй , остальное нам нафиг не надо. закидывая вопрос-ответы в базу данных <br />
⚙ !базомод - считывает тхт формата: Вопрос \\n Ответ \\r\\n ... Вопрос \\n Ответ \\r\\n закидывая вопрос-ответы в базу данных <br />
⚙ !конфиг - считывает тхт формата: Вопрос\Ответ и все что до второй , остальное нам нафиг не надо. закидывая вопрос-ответы в базу данных <br />
⚙ !помощь - напоминалка
💡 По пути ./src/book/ кладем в директорию (папку) книгу/answer_database в txt формата, и вначале выполняем команду словарь, по ее окончанию обучение. <br />
💡 Примечание: 1 МБ txt считывается 4+ часа, т.е. при загрузки 1 МБ тхт документа потребуется 4 часа на пополнение словарного запаса, и еще 4 для установления связей на основе полученных слов и их последовательности в книге. А при считывании вопрос-ответ базы данных 6-7 строк в секунду.

☠ Возможности бота: <br />
🚀 Ответ пользователям на основе базы данных, вопрос-ответ <br />
🚀 Ответ пользователям на основе полученной информации из книг на основе силы Бога рандома, в случае, если нечего предложить из базы данных <br />
🚀 Отвечает в беседах и в личных сообщениях <br />
🚀 Есть нечеткий поиск, позволяющий частично игнорировать ошибки, но увы лишь частично <br />
🚀 Если сообщение с точками и т.п. то построит ответ на каждое предложение. <br />
