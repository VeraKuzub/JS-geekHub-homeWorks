function checkLength (el) {
	let str =  el.replace(/^\s+/, '');
	str = str.replace(/\s+$/, '');
	if (str.length === 0) {
		return false;
	} return true;
}


function addTextInElWithId (id, text) {
	document.getElementById(id).innerText = text;
}


//--------------------------------------------------------------------

const inputDishName = document.getElementById('js_dishName');
const inputDishCalories = document.getElementById('js_calories');
const btnAddDish = document.getElementById('js_addDish');


btnAddDish.addEventListener('click', function (e) {
	e.preventDefault();

	// получаем данные формы
	let dishName = inputDishName.value;
	dishName = dishName.toLowerCase();
	let dishCalories = inputDishCalories.value;

	if (checkLength(dishName) && checkLength(dishCalories) && (!isNaN(dishCalories))) {
		addTextInElWithId('js_hint', '');
		
		// сериализуем данные в json
		let dish = JSON.stringify({dishName: dishName, dishCalories: dishCalories});
		console.log(dish);
		inputDishName.value = '';
		inputDishCalories.value = '';

		// посылаем запрос на адресc "/index"
		let request = new XMLHttpRequest();
		request.open("POST", "/index", true);
		request.setRequestHeader("Content-Type", "application/json"); 
		request.addEventListener("load", function () {
			// смотрим ответ сервера
			console.log(request.response);
		});
		request.send(dish);
	} else {
		addTextInElWithId('js_hint', 'Enter name of dish and calories');
	}

});