// подключение express
const express = require('express');

//CORS

var cors = require('cors')

//для чтения и записи в файл images.json 
const fs = require("fs");

// создаем объект приложения
const app = express();

// разрешить все запросы CORS
app.use(cors());


// ------получение данных------------
app.get('/', function(req, res){

// ----------берем данные с images.json----------
    var content = fs.readFileSync("images.json", "utf8");
    console.log(content);
    var result = JSON.parse(content);
    res.json(result);
});
  

// начинаем прослушивать подключения на 3001 порту
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});