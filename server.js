const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

//Запись логов
app.use(function(request, response, next){
    var now = new Date();
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    var data = `[${now.getHours()}:${now.getMinutes()}] url:${request.url} IP:${ip}`;
    fs.appendFile("logs.log", `${data} \n`, function(){});
    next();
});

app.use(express.static('public')) // Дает досутп к папке public





app.get("/", function(request, response){
    response.sendFile(__dirname + '/public/html/index.html');
});

//страница регистрации
app.get("/registration", function(request, response){
    response.sendFile(__dirname + '/public/html/registration.html');
});
//Принимает пост запрос, и отправляет ответ
app.post("/registration", urlencodedParser, function (request, response) {

    if(!request.body) return response.sendStatus(400);
    //в request.body хранится данные формы
   //response.send(`${request.body.userName} - ${request.body.userAge}`);
});



// ! ! ! ОБЯЗАТЕЛЬНО ПОСЛЕДНИЙ ! ! !
app.use(function(err, request, response, next){
    // логирование ошибки, пока просто console.log
    console.log(err)
    response.status(500).send('Something broke!')
})
app.listen(3000);
