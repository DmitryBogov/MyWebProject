// подключение express
const express = require("express");
// создаем объект приложения
const server = express();
// определяем обработчик для маршрута "/"
server.get("/", function(request, response){

    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
server.listen(3000);
