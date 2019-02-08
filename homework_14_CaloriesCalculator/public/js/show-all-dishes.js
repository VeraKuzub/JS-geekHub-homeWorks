function drawDishesList(obj) {
	let length = obj.length;
	const list = document.getElementById('list');
	for (let i = 0; i < length; i++) {
		let listItem = document.createElement('li');
		listItem.innerText = obj[i].dishName + ' has ' + obj[i].dishCalories + ' calories.';
		list.appendChild(listItem);
	}
}


// Получить все рецепты
function GetDishes() {
// 1. Создаём новый объект XMLHttpRequest
	let request = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL '/all-dishes'
	request.open("GET", "/all-dishes", true);

// 3. Отсылаем запрос
	request.addEventListener("load", function () {
 		console.log(request.response); // смотрим ответ сервера
 		let newDishesList = JSON.parse(request.response);
        drawDishesList(newDishesList);  
    });
	
  	request.send();	
}

//--------------------------------------------------------------------
GetDishes();