const express = require("express");
const app = express();
const fs = require("fs");


const dataBaseResponse  = require('./private/dbmodule');

// создаем парсер для данных application/x-www-form-urlencoded
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});




//Запись логов подключения пользователя к сайту
app.use(function(request, response, next){
    var now = new Date();
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    var data = `[${now.getHours()}:${now.getMinutes()}] url:${request.url} IP:${ip}`;
    fs.appendFile("logs.log", `${data} \n`, function(){});
    next();
});

app.use(express.static('public')) // Дает досутп к папке public

//Подключение модуля с запросами бд
dataBaseResponse(app, urlencodedParser);


// TODO:  обработка дальнейших get запросов на страницы
app.get("/", function(request, response){
    response.sendFile(__dirname + '/public/html/index.html');
});
//страница регистрации
app.get("/registration", function(request, response){
    response.sendFile(__dirname + '/public/html/registration.html');
});
app.get("/login", function(request, response){
    response.sendFile(__dirname + '/public/html/login.html');
});
/*
app.post("/registration", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

});



app.post("/login", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);


});

 ... */



//Принимает пост запрос, и отправляет ответ





// ! ! ! ОБЯЗАТЕЛЬНО ПОСЛЕДНИЙ ! ! !
app.use(function(err, request, response, next){
    // логирование ошибки, пока просто console.log
    console.log(err)
    response.status(500).send('Something broke!')
})
app.listen(3000);
