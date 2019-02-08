function deleteSpaces (el) {
	let str =  el.replace(/^\s+/, '');
	str = str.replace(/\s+$/, '');
	return str;
}


function checkLength (el) {
	if (el.length === 0) {
		return false;
	} return true;
}


function findElement(arr, key, name) {
	name = name.toLowerCase();
	for(let i = 0; i<arr.length; i++) {
		if (arr[i][key] === name) {
			console.log(arr[i]);
			return arr[i];
		} else {
			console.log('do not find');
			return false;
		}
	}
}


function createButton(text){
	const btn = document.createElement('button');
	btn.setAttribute('name', 'btnDelete');
	btn.setAttribute('type', 'button');
	btn.setAttribute('value', 'delete');
	btn.innerText = text;
	btn.addEventListener('click',deleteElements);
	return btn;
}


function deleteElements(){
	console.log(this.previousElementSibling);
	let text = this.previousElementSibling.innerText;
	console.log(text);
	//находим число в строке
	let r = /\d+/; 
	let number = (text.match(r));
	let sumCaloriesNow = caloriesFromMyMenu();
	sumCaloriesNow = sumCaloriesNow - number;
	caloriesFromMyMenu(undefined, sumCaloriesNow);
	drawCalorie (sumCaloriesNow);
	checkCalories(sumCaloriesNow);
	this.previousElementSibling.remove();
	this.remove();
}


function getCaloriesOfDish(obj){
	let calories = Number(obj.dishCalories)
	return calories;
}


function checkCalories(num) {
	let max = document.getElementById('js_maxCalories').value;
	let recommendation = document.getElementById('js_recommendation');
	if (max < num){
		let difference = num - max;
		recommendation.innerText = 'The number of calories in the menu is more than desired by ' + difference + '.';
	} else {
		recommendation.innerText = '';
	}
}

function drawCalorie (num) {
	let result = document.getElementById('js_result');
	result.innerText = 'Number of calories in the menu: ' + num;
}

function sum() {
let sumCalorie = 0;
	return function(num, changeNum) {
		if (num === undefined &&  changeNum === undefined) return sumCalorie;
		else if (changeNum !== undefined) {
			sumCalorie = changeNum;
			return sumCalorie;
		}
		sumCalorie = sumCalorie + Number(num);
		drawCalorie(sumCalorie);
		checkCalories(sumCalorie);
		return sumCalorie;
	}
}

function drawElementMenu(obj) {
	let menu = document.getElementById('js_menu');
	let element = document.createElement('li');
	element.innerText = obj.dishName + ' has ' + obj.dishCalories + ' calories.';
	let btn = createButton('Delete the dish');
	menu.appendChild(element);
	menu.appendChild(btn);
}

// Получаем все рецепты
function GetDishes() {
// 1. Создаём новый объект XMLHttpRequest
 	let request = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL '/all-dishes'
    request.open("GET", "/all-dishes", true);

// 3. Отсылаем запрос
 	request.addEventListener("load", function () {
 		console.log(request.response); // смотрим ответ сервера


 		let newDishesList = JSON.parse(request.response);
 		
 		const maxCalories = document.getElementById('js_maxCalories');
		const findDish = document.getElementById('js_findDish');
		let name = deleteSpaces(findDish.value);
		name = name.toLowerCase();
 		for (let i = 0; i < newDishesList.length; i++){
 			let element = newDishesList[i].dishName;
			if (element === name) {
				drawElementMenu(newDishesList[i]);//добавить в список 	
				caloriesFromMyMenu(newDishesList[i].dishCalories); //посчитать калории
			}
		}
    });
  	request.send();	
}

//--------------------------------------------------------------------

const menu = document.getElementById('js_menu');
const findDish = document.getElementById('js_findDish');
const addDishToMenu = document.getElementById('js_addDishToMenu');
const result = document.getElementById('js_result');
const maxCalories = document.getElementById('js_maxCalories');
let caloriesFromMyMenu = sum();


addDishToMenu.addEventListener('click', function () {
	let maxCalories = document.getElementById('js_maxCalories');
	maxCalories = deleteSpaces(maxCalories.value);
	let dish = document.getElementById('js_findDish');
	dish = deleteSpaces(findDish.value);
	dish = dish.toLowerCase();

	if (checkLength(dish) && checkLength(maxCalories) && !isNaN(maxCalories)){
		document.getElementById('js_hint').innerText = '';
		GetDishes();
	} else {
		document.getElementById('js_hint').innerText = 'Enter the name of dish and calories';
	}
});
