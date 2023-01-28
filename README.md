# vk-chat-bot
💬 Чат бот для соц сети ВКОНТАКТЕ отвечающий на сообщения пользователей.

❗ Необходима Windows 10+ и node.js не ниже 15.8.0 <br />
Качаем тут и ставим: https://nodejs.org/en/ <br />
Затем скачиваем сей проект архивом и распаковываем на пк <br />
Открываем cmd.exe и переходим в корень проекта, затем пишем: <br />
npm i <br />
npm run dev <br />

либо просто запускаем init.bat по окончанию которого, start.bat <br />

В случае проблем с базами данных:
npx prisma migrate dev --name init <br />
npx prisma generate <br />


☠ Прежде чем запускать бота, отредкактируйте .env следующим образом:

✅ вставьте свой токен в файле между кавычек так, где token: token = "ТОКЕН"<br />
    Пример: token = "vk.api.eaugue.hrirtihk.saegmieguu2_34qw4itgj4w8_gdsiguesgwugw"

✅ вставьте свой ид ВК в файле между где root: root = idvk <br />
    Пример: root = 486747328

☠ Команды бота уже сделанные:

⚙ словарь - пополняет словарный запас бота на все еще не встреченные слова до этого, нужен для нечеткого поиска в базе данных и становления связей*

⚙ обучение - устанавливает парные связи слов на основе существующего словаря и чтения книг*

* По пути ./src/book/ кладем в директорию (папку) книгу в txt формата, и вначале выполняем команду словарь, по ее окончанию обучение. 
Примечание: 1 МБ txt считывается 4+ часа, т.е. при загрузки 1 МБ тхт документа потребуется 4 часа на пополнение словарного запаса, и еще 4 для установления связей на основе полученных слов и их последовательности в книге.

☠ Возможности бота:
🚀 Ответ пользователям на основе полученной информации из книг на основе силы Бога рандома
🚀 Отвечает в беседах и в личных сообщениях
🚀 Есть нечеткий поиск, позволяющий частично игнорировать ошибки, но увы лишь частично
