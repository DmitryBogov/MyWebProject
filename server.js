const express = require("express");
const fs = require("fs");

const app = express();

//Запись логов
app.use(function(request, response, next){

    var now = new Date();
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    var data = `[${now.getHours()}:${now.getMinutes()}] url:${request.url} IP:${ip}`;
    fs.appendFile("logs.log", `${data} \n`, function(){});
    next();
});

app.use(express.static('public'))


app.get("/", function(request, response){
    response.sendFile(__dirname + '/public/html/index.html');
});
app.get("/r", function(request, response){
    response.sendFile(__dirname + '/public/html/registration.html');
});



// ! ! ! ОБЯЗАТЕЛЬНО ПОСЛЕДНИЙ ! ! !
app.use(function(err, request, response, next){
    // логирование ошибки, пока просто console.log
    console.log(err)
    response.status(500).send('Something broke!')
})
app.listen(3000);
