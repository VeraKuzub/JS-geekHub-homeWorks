// function removeSlash (str){
// 	return str.replace(/[\/\\]/g,'');
// }


// //matches all HTML tags pairs including attributes in the tags
// function removeHTMLtag(str) {
// 	return str.replace(/<(.|\n)*?>/g, '');
// }


//  //remove spaces at the beginning and the end
//  function removeSpaces (el) {
//  	let str =  el.replace(/^\s+/, "");
// 	str = str.replace(/\s+$/, "");
// 	return str;
//  }


// function checkInput (el) {
// 	let str = removeSpaces(el);
// 	str = removeSlash(str);
// 	str = removeHTMLtag(str);
// 	return (str.length === 0) ? false: str;
// }


// function checkUser (user, pass) {
// 	const containerPrompt = document.getElementById("containerPrompt");
// 	let checkUserValue = checkInput (user);
// 	let checkPassValue = checkInput (pass);
// 	if ( checkUserValue && checkPassValue) {
// 		containerPrompt.innerHTML = "";
// 		 return {userlogin: checkUserValue, password: checkPassValue};
// 	} else { 
// 		containerPrompt.innerHTML= "Введите имя пользователя и пароль";
// 		return false;
// 	}	
// }

// function authorizationUser (obj) {
// 	let user = JSON.parse(obj);
// 	let userlogin = user.userlogin;
// 	let url = "/api/users/"+userlogin;
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("get", url, true);
// 	xhr.setRequestHeader("Content-Type", "application/json");
// 	xhr.addEventListener("load", function () {
// 		console.log('открыть страничку юзера', xhr.response);
// 	});
// 	xhr.send(JSON.stringify(user));
// }

// // получаем доступ к элементам DOM, с которыми будем работать
// const signUpForm = document.getElementById("signUpForm");
// const userLogin = document.getElementById("userLogin");
// const userPassword = document.getElementById("userPassword");
// const containerPrompt = document.getElementById("containerPrompt");
// const reset = document.getElementById("reset");
// const sendUser = document.getElementById("sendUser");
// const addNewUser = document.getElementById("addNewUser");


// //привязываем обработчик событий на отправку формы
// sendUser.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	let user = checkUser(userLogin.value, userPassword.value);
// 	// console.log('user',user);
// 	if (user) {
// 		// сериализуем данные в json
// 		let userToSend = JSON.stringify(user);
// 		console.log('userToSend', userToSend);
// 		userLogin.value = "";
// 		userPassword.value = "";

// 		// Создаём новый объект XMLHttpRequest
// 		let xhr = new XMLHttpRequest();

// 		//  Конфигурируем его: POST-запрос на URL "/login"
// 		xhr.open("POST", "/login", true);

// 		xhr.setRequestHeader("Content-Type", "application/json"); 

// 		xhr.addEventListener("load", function () {
// 			// смотрим ответ сервера
// 			// console.log(xhr.response);
// 			let result = xhr.response;
// 			if (result === 'Нет такого пользователя') {
// 				 containerPrompt.innerHTML = "Пользователь не найден. Введите имя и пароль пользователя или зарегистрируйтесь";
// 			} else {
// 				console.log('cделать запрос на get c юзером');
// 				// console.log(xhr.response);
// 				// authorizationUser(result);
// 			}
			
// 		});
		
// 		//Отсылаем запрос
// 		xhr.send(userToSend);
// 	}
// });