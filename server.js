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

app.get("/", function(request, response){
    response.send("Hello");
});
app.listen(3000);
