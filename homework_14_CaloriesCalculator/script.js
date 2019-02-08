// Реалізувати додаток: "Калькулятор калорій". 
// Мінімальний функціонал: 
// Сторінка Додавання страв/продуктів (назва, калорійність)
// Сторінка Перегляду всіх продуктів
// Сторінка “Денне меню”: поле для вводу максимальної 
// калорійності денного раціону і додання в меню/видалення продуктів зі списку. 
// Якщо загальна кількість калорій перевищить межу, виводити відповідне повідомлення. 
// Використовувати MongoDB як сховище даних.


// подключение express
const express = require('express');

//для получения данных форм из запроса
const bodyParser = require("body-parser");

//для чтения и записи в файл all-dishes.json 
const fs = require("fs");

//ключевым классом для работы с MongoDB является класс MongoClient
const MongoClient = require('mongodb').MongoClient;

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

// название БД
const dbName = 'myproject';

// создаем объект приложения
const app = express();

// обработка запросoв по адресу ./public/... 
app.use(express.static('public'));

app.get("/", function(request, response){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/all_dishes', function(req, res){
  res.sendFile(__dirname + '/public/all_dishes.html');    
});

// создаем парсер для данных в формате json
const jsonParser = bodyParser.json();

//получаем данные с формы
app.post('/index', jsonParser, function (req, res){
	 console.log(req.body);

	if(!req.body) return res.sendStatus(400);
	let newDish = req.body;

  //подключение к серверу
  mongoClient.connect(function(err, client){

  // взаимодействие с базой данных
    let db = client.db(dbName);
    let collection = db.collection("recipes");
    let oneRecipe = newDish;
    collection.insertOne(oneRecipe, function(err, result){  
        if(err){ 
          return console.log(err);
        }
        console.log(result.ops);
        res.json(`${req.body.dishName} - ${req.body.dishCalories}`);
        // client.close();
    });
  });
////----------берем данные с all_dishes.json----------
//  let data = fs.readFileSync("all-dishes.json", "utf8");
//  let dishes = JSON.parse(data);

//// добавляем блюдо в массив
//  dishes.push(newDish);
      
//  data = JSON.stringify(dishes);

////  перезаписываем файл с новыми данными
//  fs.writeFileSync("all-dishes.json", data);

//  res.json(`${req.body.dishName} - ${req.body.dishCalories}`);
});


// ------получение списка данных------------
app.get('/all-dishes', function(req, res){

//--------- взаимодействие с базой данных----------------
  mongoClient.connect(function(err, client){
    // взаимодействие с базой данных
      let db = client.db(dbName);
      let collection = db.collection("recipes");
      let allRecipes;
      collection.find().toArray(function(err, result){     
      allRecipes = result;    
        // console.log('find', allRecipes);
        res.json(allRecipes);
        // client.close();
      });
  });

  //----------берем данные с all_dishes.json----------
    // var content = fs.readFileSync("all-dishes.json", "utf8");
    // console.log(content);
    // var dishes = JSON.parse(content);
    // res.json(dishes);
});
  

// начинаем прослушивать подключения на 3000 порту
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
