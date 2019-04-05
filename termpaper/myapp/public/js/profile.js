function User (surname, username, forename, login, password, birthday , 
	age, position, salary, photo, phone, address, importantNotes, notes, admittance,email) {
	this.surname = surname,
	this.username = username,
	this.forename = forename,
	this.login = login,
	this.password = password,
	this.birthday = birthday,
	this.age = age, 
	this.position = position,
	this.salary = salary,
	this.photo = photo,
	this.phone = phone,
	this.address = address,
	this.importantNotes = importantNotes,
	this.notes = notes,
	this.admittance = admittance,
	this.email = email
}

User.prototype.showUser = function () {
	document.getElementById("user").innerHTML = (`Сотрудник: ${this.surname} ${this.username} </br>`);
};


let userVera = new User ('Кузуб', 
	'Вера', 
	'Владимировна', 
	'KuzubVera', 
	'111111',
	'19.11.1983', 
	 35, 
	'economist', 
	'10000',
	'../img/kuzub.jpg',
	'+380982272712',
	'Черкассы',
	'важные заметки',
	'что то не очень важное',
	'полный допуск',
	'v.@gmail.com'
	);

// userVera.showUser();

//-----------------------------------------
//upload img
document.getElementById("imgUserForm").onsubmit = function(){
	fetch('uploads',{
		method: 'POST',
		body: new FormData(this)
	})
}