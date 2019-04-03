// function User (surname, username, forename, userlogin, password, birthday , 
// 	age, position, salary, photo, phone, address, importantNotes, notes, admittance) {
// 	this.surname = surname,
// 	this.username = username,
// 	this.forename = forename,
// 	this.userlogin = userlogin,
// 	this.password = password,
// 	this.birthday = birthday,
// 	this.age = age, 
// 	this.position = position,
// 	this.salary = salary,
// 	this.photo = photo,
// 	this.phone = phone,
// 	this.address = address,
// 	this.importantNotes = importantNotes,
// 	this.notes = notes,
// 	this.admittance = admittance

// //admittance 
// // Допуск
// // Уровень допуска 1 : вся информация доступна и на чтения и на редактирование
// // Уровень допуска 2 : часть информации скрыта, часть доступна только на чтение, часть можно редоктировать
// // Уровень допуска 3 : часть инфромации скрыта,  доступна только на чтение
// // делаем запрос на сервер получаем результат выводим данные о сотруднике
// // User.prototype.showUser что бы все обьекты ссылались на один метод а не делали копию метода в каждом обьеке
// 	User.prototype.showUser = function () {
// 		document.getElementById("user").innerHTML = (`Сотрудник: ${this.surname} ${this.username} </br>`);
// 	}

// 	// метод которые анализирует допуск 1,"2" 
// }


// let user = new User ('Кузуб', 'Вера', 'Владимировна',);

// user.showUser();