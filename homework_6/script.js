// Створити об'єкт із властивостями: ім'я, здоров'я, ситість, сила, щастя. 
// Об'єкт має створюватися через конструктор. В прототипі об'єкту мають бути методи для взаємодії з персонажем. 
// (Годувати, Гратися, Гуляти, Спати, Лікуватися)
// Кожні 3 секунди в персонажу мають зменшуватися показники.
// Відповідно викликаючи методи можна збільшувати ці показники. 
// Наприклад: тамагочі.гратися() - збільшує щастя на +5, і зменшує сили на -10 одиниць і ситість на -5 одиниць... 
// // Інформацію про стан персонажу виводьте прямо на сторінку, після кожного оновлення стану, можна виводити смайлики, 
// котрі характеризуватимуть настрій тамагочі. 
// У випадку смерті персонажу передбачити сумне повідомлення, і зупинити зміни інших показників.

// Завдання “з зірочкою”
// Створити армію тамагочі)) 
// Можливий інтерфейс: 
// Кнопка “Створити тамагочі”,
// Для кожного звірятка - “погодувати тамагочі”, “погратись”, “вкласти спати” і т.д.
// можна виводити смайлики

class Character {
	// Setup object

	constructor (name, health, satiety, happiness, force) {

	console.log ("character is being creating");

    this.name = name;
    this.health = health;
    this.satiety = satiety;
    this.happiness = happiness;
    this.force = force;
	}

	toEat () {
		this.health = this.health + 5;
		document.getElementById("smiley").setAttribute("src", "./images/smailik17.png");
		document.getElementById("demo").innerHTML =
		`Tamagochi:name:${this.name}<br>
		health:${this.health}<br> 
		satiety:${this.satiety}<br> 
		happiness:${this.happiness}<br> 
		force:${this.force}`;
		return this;
	}

	toPlay () {
		this.happiness = this.happiness + 10;
		this.force = this.force + 5;
		document.getElementById("smiley").setAttribute("src", "./images/smailik2.png");
		document.getElementById("demo").innerHTML =
		`Tamagochi:name:${this.name}<br>
		health:${this.health}<br> 
		satiety:${this.satiety}<br> 
		happiness:${this.happiness}<br> 
		force:${this.force}`;
		return this;
	}

	toWalk () {
		this.happiness = this.happiness + 5;
		this.force = this.force + 10;
		this.health =  this.health+ 10;
		document.getElementById("smiley").setAttribute("src", "./images/smailik1.png");
		document.getElementById("demo").innerHTML =
		`Tamagochi:name:${this.name}<br>
		health:${this.health}<br> 
		satiety:${this.satiety}<br> 
		happiness:${this.happiness}<br> 
		force:${this.force}`;
		return this;
	}

	toSleep () {
		this.happiness = this.happiness + 5;
		this.health = this.health + 20;
		document.getElementById("smiley").setAttribute("src", "./images/smailik2.png");
		document.getElementById("demo").innerHTML =
		`Tamagochi:name:${this.name}<br>
		health:${this.health}<br> 
		satiety:${this.satiety}<br> 
		happiness:${this.happiness}<br> 
		force:${this.force}`;
		return this;
	}

	toTreat () {
		this.health = this.health + 10;
    	this.satiety = this.satiety + 20;
    	document.getElementById("smiley").setAttribute("src", "./images/smailik1.png");
    	document.getElementById("demo").innerHTML =
		`Tamagochi:name:${this.name}<br>
		health:${this.health}<br> 
		satiety:${this.satiety}<br> 
		happiness:${this.happiness}<br> 
		force:${this.force}`;
		return this;
	}

	toJump () {
		this.health = this.health + 5;
    	this.force = this.force + 15;
    	document.getElementById("smiley").setAttribute("src", "./images/smailik4.png");
    	document.getElementById("demo").innerHTML =
		`Tamagochi:name:${this.name}<br>
		health:${this.health}<br> 
		satiety:${this.satiety}<br> 
		happiness:${this.happiness}<br> 
		force:${this.force}`;
		return this;
	}

	toFly () {
		this.health = this.health + 5;
    	this.force = this.force + 25;
    	this.happiness = this.happiness + 5;
    	document.getElementById("smiley").setAttribute("src", "./images/smailik17.png");
    	document.getElementById("demo").innerHTML =
		`Tamagochi:name:${this.name}<br>
		health:${this.health}<br> 
		satiety:${this.satiety}<br> 
		happiness:${this.happiness}<br> 
		force:${this.force}`;
		return this;
	}
}

function addTamatchi () { 
	let obj = new Character("Kate", 10, 10, 10, 10);
	document.getElementById("demo").innerHTML =
	`Tamagochi name:${obj.name}<br>
	health:${obj.health}<br> 
	satiety:${obj.satiety}<br> 
	happiness:${obj.happiness}<br> 
	force:${obj.force}`;
	let elem = document.createElement("img");
	elem.setAttribute("id","smiley");
	elem.setAttribute("width","300");
	elem.setAttribute("hight","212");
	elem.setAttribute("alt","smiley");
	elem.setAttribute("src", "./images/smailik12.png");
	document.body.appendChild(elem);
	return obj;
};


function reductionOfEvidence (obj) {
	obj.health -= 5;
	obj.satiety -= 2;
	obj.happiness -= 5;
	if (obj.health <= 0 || obj.satiety <= 0) {
		document.getElementById("demo").innerHTML = 
		`Tamagochi name:${obj.name}<br>
		health:${obj.health}<br> 
		satiety:${obj.satiety}<br> 
		happiness:${obj.happiness}<br> 
		force:${obj.force}`; 
		console.log('health',obj.health);
		console.log('satiety',obj.satiety);
		document.getElementById("help").innerHTML = "You kill me";
		document.getElementById("smiley").setAttribute("src", "./images/smailik9.png");
		setTimeout(function() { clearInterval(timerId);},0);
		return obj; 
		}
	if (obj.health > 30 || obj.satiety > 30) document.getElementById("help").innerHTML = ""; 
	if (obj.health < 30 &&  obj.satiety > 0 ||  obj.satiety < 30 && obj.health > 0) {
		document.getElementById("help").innerHTML = "I'm hungry and weak. Feed me and I need to sleep."; }
		document.getElementById("demo").innerHTML = 
		`Tamagochi name:${obj.name}<br>
		health:${obj.health}<br> 
		satiety:${obj.satiety}<br> 
		happiness:${obj.happiness}<br> 
		force:${obj.force}`; 
			console.log('health',obj.health);
			console.log('satiety',obj.satiety);
		return obj;
}


let tamagotchi;
let timerId;
let timeForSetInterval = 3000;


document.getElementById("btnAddTamagotchi").addEventListener("click", function () { tamagotchi = addTamatchi (tamagotchi)});
document.getElementById("btnAddTamagotchi").addEventListener("click", function () {return timerId = setInterval(function () { reductionOfEvidence (tamagotchi); }, timeForSetInterval);
});



















