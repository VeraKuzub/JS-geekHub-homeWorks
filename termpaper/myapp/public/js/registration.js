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

// function checkEmail(el){
// 	let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
// 	return regExp.test(el);
// }


// //example «+38(044)555-55-55»
// function checkPhone(el){
// 	let regExp = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
// 	return regExp.test(el);
// }

// function checkLeng (el) {
// 	if (el !== false) {
// 		return (el.length < 5) ? true : false;
// 	}
// }


// function checkTwoPasswords(pass, passRepeat){
// 	return (pass === passRepeat)? true: false;
// }


// function registrationComplete() {
// 	document.getElementsByTagName("h1")[0].innerHTML = "Регистрация завершена";
// 	inputUserLogin.value = "";
// 	inputUserPassword.value = "";
// 	inputUserEmail.value = "";
// 	inputUserPasswordMatch.value = "";
// }

// function registrationFailed () {
// 	document.getElementsByTagName("h1")[0].innerHTML = "Oшибка регистарции";
// }

// function doGetRequest (url) {
// 	let xhr = new XMLHttpRequest();
// 	xhr.onreadystatechange = function() {
// 		 if (xhr.readyState === 4) {
// 		console.log(xhr.response);
// 		}
// 	}
// 	xhr.open('GET', url);
// 	xhr.send(null);
// }

// function doPostRequest (url, data) {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-Type", "application/json"); 
// 	xhr.addEventListener("load", function () {
		 
// 		if (xhr.response.status = 302) {
// 			// window.location.href = "http://127.0.0.1:3000/login";
// 			doGetRequest("http://127.0.0.1:3000");
// 		} else {
// 			let result = JSON.parse(xhr.response);
// 			if (result.registration) {
// 				registrationComplete();
// 				prompt.style.visibility ="hidden";
// 			} else {
// 				registrationFailed();
// 				let prompt = document.getElementById("containerPrompt");
// 				prompt.style.visibility ="visible";
// 				prompt.innerHTML = result.text;
// 			}
// 		}
// 	});
// 	xhr.send(data);
// }




// const btnAddNewUser = document.getElementById("addNewUser");
// const inputUserLogin = document.getElementById('userLogin');
// const inputUserEmail = document.getElementById('userEmail');
// const inputUserPassword = document.getElementById('userPassword');
// const inputUserPasswordMatch = document.getElementById('userPasswordMatch');
// const prompt = document.getElementById('containerPrompt');

// prompt.style.visibility = "hidden";

// btnAddNewUser.addEventListener("click", function(e) {
// 	e.preventDefault();

// 	let allPrompts = "";
// 	let pass = checkInput(inputUserPassword.value);
// 	if (!checkInput(inputUserLogin.value)) allPrompts +="Введите имя пользователя <br>" ;
// 	if (!pass) allPrompts +="Введите  пароль <br>" ;
// 	if (checkLeng(pass)) allPrompts += "Пароль должен быть больше 6 символов<br>" ;
// 	if (!checkInput(inputUserEmail.value) || !checkEmail(inputUserEmail.value)) allPrompts +="Введите почту<br>";
// 	if (!checkInput(inputUserPasswordMatch.value)) allPrompts +="Введите повторно пароль <br>";
// 	if (!checkTwoPasswords(inputUserPassword.value, inputUserPasswordMatch.value)) allPrompts +="Введенные пароли не совпадают<br>";


// 	if (allPrompts.length !== 0) {
// 		prompt.style.visibility = "visible";
// 		prompt.innerHTML = allPrompts;
// 		return false;
// 	} else {
// 		allPrompts = "";
// 		prompt.innerHTML = "";
// 		prompt.style.visibility = "hidden";

// 		let user = {};
// 		user.userLogin = inputUserLogin.value;
// 		user.userPassword = inputUserPassword.value;
// 		user.userEmail = inputUserEmail.value;
// 		user.userPasswordMatch = inputUserPasswordMatch.value;

// 		let data = JSON.stringify(user);
// 		console.log('user to send', data);
// 		doPostRequest("/register", data);
// 	}
// });


