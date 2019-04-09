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

function writeText(name, health, satiety, happiness, force, help) {
	let text = `Tamagochi name:${name}<br>
	health:${health}<br> 
	satiety:${satiety}<br> 
	happiness:${happiness}<br> 
	force:${force}<br>
	${help}`;
	return text;
}


function enterName () {
	return prompt('Enter the Tamagotchi\'s name');
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function placeDiv(element, x_pos, y_pos ) {
  element.style.position = "absolute";
  element.style.left = x_pos+'px';
  element.style.top = y_pos+'px';
}


class Character {
	constructor (name, id ,health, satiety, happiness, force) {
		this.name = name;
		this.health = health;
		this.satiety = satiety;
		this.happiness = happiness;
		this.force = force;
		this.id = '' + id;
	}


	reductionOfEvidence() {
		let container = document.getElementById(this.id);
		let img = container.getElementsByTagName('p')[0].getElementsByTagName('img')[0];
		let elementInfo = container.getElementsByTagName('p')[1];

		let timerId = setInterval(() => {
			this.health -= 5;
			this.satiety -= 2;
			this.happiness -= 3;
			this.force -= 2;
		if (this.happiness < 0) this.happiness = 0;
		if (this.health <= 0 || this.satiety <= 0) {
			if (this.health < 0) this.health = 0;
			if (this.satiety < 0) this.satiety = 0;
			img.setAttribute('src',"./images/smailik9.png");
			elementInfo.innerHTML = writeText(
			this.name, 
			this.health, 
			this.satiety, 
			this.happiness, 
			this.force, 
			"You killed me");

			//added disabled 	
			let container = document.getElementById(this.id);
			let btns = container.getElementsByTagName('p')[2].getElementsByTagName('button');
			let buttonSleep = btns[0];
			let buttonFeed = btns[1];
			let buttonWalk = btns[2];
			let buttonPlay = btns[3];

			buttonFeed.disabled = true;
			buttonSleep.disabled = true;
			buttonWalk.disabled = true;
			buttonPlay.disabled = true;


			setTimeout(function() {clearInterval(timerId);},0);

			return false;

		} 
		if (this.health > 30 && this.satiety > 30) {
			img.setAttribute('src',"./images/smailik17.png");
			elementInfo.innerHTML = writeText(
			this.name, 
			this.health, 
			this.satiety, 
			this.happiness, 
			this.force, 
			"I feel good. Play with me");	
			return true;
		} 
		if (this.health < 30  &&  this.satiety > 0 ||  this.satiety < 30 && this.health > 0) {
			img.setAttribute('src',"./images/smailik12.png");
			elementInfo.innerHTML = writeText(
			this.name, 
			this.health, 
			this.satiety, 
			this.happiness, 
			this.force, 
			"I'm hungry and weak. Feed me and I need to sleep.");
			return true;
			} 
		}, 1000);
	}

	toFeed () {
		this.health += 2;
		this.satiety += 10;
		this.happiness += 1;
		this.force += 2;

		let container = document.getElementById(this.id);
		let img = container.getElementsByTagName('p')[0].getElementsByTagName('img')[0];
		let elementInfo = container.getElementsByTagName('p')[1];
		img.setAttribute('src',"./images/smailik17.png");
		elementInfo.innerHTML = writeText(
			this.name, 
			this.health, 
			this.satiety, 
			this.happiness, 
			this.force, 
			"thanks for feeding"
		);
	}


	toSleep () {
		this.happiness = this.happiness + 5;
		this.health = this.health + 10;

		let container = document.getElementById(this.id);
		let img = container.getElementsByTagName('p')[0].getElementsByTagName('img')[0];
		let elementInfo = container.getElementsByTagName('p')[1];
		img.setAttribute("src", "./images/smailik2.png");
		elementInfo.innerHTML = writeText(
			this.name, 
			this.health, 
			this.satiety, 
			this.happiness, 
			this.force, 
			"thanks for sleeping"
		);
	}

	toWalk () {
		this.happiness = this.happiness + 5;
		this.force = this.force + 10;
		this.health =  this.health+ 10;

		let container = document.getElementById(this.id);
		let img = container.getElementsByTagName('p')[0].getElementsByTagName('img')[0];
		let elementInfo = container.getElementsByTagName('p')[1];

		img.setAttribute("src", "./images/smailik1.png");
		elementInfo.innerHTML = writeText(
			this.name, 
			this.health, 
			this.satiety, 
			this.happiness, 
			this.force, 
			"It was a nice walk"
		);
	}

	toPlay () {
		this.happiness = this.happiness + 3;
		this.force = this.force + 5;

		let container = document.getElementById(this.id);
		let img = container.getElementsByTagName('p')[0].getElementsByTagName('img')[0];
		let elementInfo = container.getElementsByTagName('p')[1];
		img.setAttribute("src", "./images/smailik1.png");
		elementInfo.innerHTML = writeText(
			this.name, 
			this.health, 
			this.satiety, 
			this.happiness, 
			this.force, 
			"thanks for playing"
		);
	}
}



function addCharacter (id = 1, health = 100, satiety = 100, happiness= 100, force = 100) {
	let name = enterName ();
	if (name === null || name === '') {
		document.getElementById("help").innerText = 'To create a character you need to enter a name';
	} else {
		document.getElementById("help").innerText =`You created Tamagotchi with the name ${name}`;
		
		let obj = new Character(name, id, health, satiety, happiness, force);


		let containerCharacter = document.createElement('div');
		let elementInfo = document.createElement('p');
		elementInfo.innerHTML = 
		`Tamagochi name:${obj.name}<br>
		health:${obj.health}<br> 
		satiety:${obj.satiety}<br> 
		happiness:${obj.happiness}<br> 
		force:${obj.force}`;

		let elementForImg = document.createElement('p');
		let elementForBtn = document.createElement('p');

		let img = document.createElement('img');
		img.setAttribute("class","imgCharacter");
		img.setAttribute("alt", name);
		img.setAttribute("src", "./images/smailik12.png");


		let buttonFeed = document.createElement('button');
		buttonFeed.setAttribute('type', 'button');
		buttonFeed.setAttribute('name', 'feed');
		buttonFeed.setAttribute('class', 'button medium green');
		buttonFeed.innerText = 'Feed';
		let buttonSleep = document.createElement('button');
		buttonSleep.setAttribute('type', 'button');
		buttonSleep.setAttribute('name', 'sleep');
		buttonSleep.setAttribute('class', 'button medium green');
		buttonSleep.innerText = 'Sleep';

		let buttonWalk = document.createElement('button');
		buttonWalk.setAttribute('type', 'button');
		buttonWalk.setAttribute('name', 'walk');
		buttonWalk.setAttribute('class', 'button medium green');
		buttonWalk.innerText = 'Walk';

		let buttonPlay = document.createElement('button');
		buttonPlay.setAttribute('type', 'button');
		buttonPlay.setAttribute('name', 'play');
		buttonPlay.setAttribute('class', 'button medium green');
		buttonPlay.innerText = 'Play';


		elementForBtn.appendChild(buttonFeed);
		elementForBtn.appendChild(buttonSleep);
		elementForBtn.appendChild(buttonWalk);
		elementForBtn.appendChild(buttonPlay);
		elementForImg.appendChild(img);

		
		containerCharacter.appendChild(elementForImg);
		containerCharacter.appendChild(elementInfo);
		containerCharacter.appendChild(elementForBtn);
		
		//To remove event handlers, the function specified with the addEventListener() 
		// method must be an external function
		callbacktoSleep = () => obj.toSleep();
		callbacktoFeed =()=> obj.toFeed();
		callbacktoWalk =()=> obj.toWalk();
		callbacktoPlay =()=> obj.toPlay();

		buttonSleep.addEventListener('click', callbacktoSleep);
		buttonFeed.addEventListener('click', callbacktoFeed);
		buttonWalk.addEventListener('click', callbacktoWalk);
		buttonPlay.addEventListener('click', callbacktoPlay);


		// //removeEventListener does not work
		// let timerId = setInterval( () => {
		// 	console.log(`${obj.name} health:`,obj.health);
		// 	console.log( `${obj.name} timerId:`, timerId);
		// 	if (obj.health === 0 || obj.satiety === 0 ) {
		// 	clearInterval(timerId);
		// 	console.log('remove EventListener');
		// 	console.log('callbacktoSleep', callbacktoSleep);
		// 	buttonSleep.removeEventListener('click', callbacktoSleep);
		// 	buttonFeed.removeEventListener('click', callbacktoFeed);
		// 	buttonWalk.removeEventListener('click', callbacktoWalk);
		// 	buttonPlay.removeEventListener('click', callbacktoPlay);
		// 	}
		// }, 5000);

		
		
		containerCharacter.setAttribute('class', 'container');
		containerCharacter.setAttribute('id', obj.id);


		document.body.appendChild(containerCharacter);

		obj.reductionOfEvidence();

	// place tamagochi in different coordinates
		placeDiv(containerCharacter, getRandomInt(0, 1000), getRandomInt(0, 1000));
	}
}


//-------------------------------------------------------

// global id for everyone characher
let idForCharacter = 1;

document.getElementById("btnAddTamagotchi").addEventListener("click", function () { 
	addCharacter(idForCharacter);
	idForCharacter++;
});




















