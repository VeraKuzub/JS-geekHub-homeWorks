// подключение express
const express = require('express');

const bodyParser = require("body-parser");

//CORS

var cors = require('cors')

//для чтения и записи в файл images.json 
const fs = require("fs");

// создаем объект приложения
const app = express();


// create application/json parser
const jsonParser = bodyParser.json();

// разрешить все запросы CORS
app.use(cors());


//---------------------mailgun------------------------------
function sendEmail (subject, text) {
	const mailgun = require("mailgun-js");
	const DOMAIN = "sandbox83c1f45d56a44efd969e61d8e3c5b171.mailgun.org";
	const mg = mailgun({apiKey: "02bc3f6ea5a2b5551d48cec773a04900-7caa9475-fd50c4aa", domain: DOMAIN});
	const data = {
		from: "Mailgun Sandbox <postmaster@sandbox83c1f45d56a44efd969e61d8e3c5b171.mailgun.org>",
		to: "v.kuzub@gmail.com",
		subject: subject,
		text: text
	};
	mg.messages().send(data, function (error, body) {
		console.log(body); 
	});
}
//---------------------------------------------------------

app.post("/contact", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log('request.body', req.body);

	let subject = `${req.body.lname} ${req.body.fname}`;
	let text = req.body.text;
	let email = req.body.email;
	// send email
    sendEmail (subject, email, text);

    res.json(req.body);
});
  

// начинаем прослушивать подключения на 3001 порту
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});