function removeSlash (str){
	return str.replace(/[\/\\]/g,'');
}

//matches all HTML tags pairs including attributes in the tags
function removeHTMLtag(str) {
	return str.replace(/<(.|\n)*?>/g, '');
}

 //remove spaces at the beginning and the end
 function removeSpaces (el) {
 	let str =  el.replace(/^\s+/, "");
	str = str.replace(/\s+$/, "");
	return str;
 }

function checkInput (el) {
	let str = removeSpaces(el);
	str = removeSlash(str);
	str = removeHTMLtag(str);
	return (str.length === 0) ? false: str;
}

function checkEmail(el){
	let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
	return regExp.test(el);
}


//example «+38(044)555-55-55»
function checkPhone(el){
	let regExp = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
	return regExp.test(el);
}

function checkLeng (el) {
	if (el !== false) {
		return (el.length < 5) ? true : false;
	}
}


function checkTwoPasswords(pass, passRepeat){
	return (pass === passRepeat)? true: false;
}


function registrationComplete() {
	document.getElementsByTagName("h1")[0].innerHTML = "Регистрация завершена";
	inputUserLogin.value = "";
	inputUserPassword.value = "";
	inputUserEmail.value = "";
	inputUserPasswordMatch.value = "";
}

function registrationFailed () {
	document.getElementsByTagName("h1")[0].innerHTML = "Oшибка регистарции";
}


const btnAddNewUser = document.getElementById("addNewUser");
const inputUserLogin = document.getElementById('userLogin');
const inputUserEmail = document.getElementById('userEmail');
const inputUserPassword = document.getElementById('userPassword');
const inputUserPasswordMatch = document.getElementById('userPasswordMatch');
const prompt = document.getElementById('containerPrompt');

prompt.style.visibility = "hidden";

btnAddNewUser.addEventListener("click", function(e) {
	e.preventDefault();

	let allPrompts = "";
	let pass = checkInput(inputUserPassword.value);
	if (!checkInput(inputUserLogin.value)) allPrompts +="Введите имя пользователя <br>" ;
	if (!pass) allPrompts +="Введите  пароль <br>" ;
	if (checkLeng(pass)) allPrompts += "Пароль должен быть больше 6 символов<br>" ;
	if (!checkInput(inputUserEmail.value) || !checkEmail(inputUserEmail.value)) allPrompts +="Введите почту<br>";
	if (!checkInput(inputUserPasswordMatch.value)) allPrompts +="Введите повторно пароль <br>";
	if (!checkTwoPasswords(inputUserPassword.value, inputUserPasswordMatch.value)) allPrompts +="Введенные пароли не совпадают<br>";


	if (allPrompts.length !== 0) {
		prompt.style.visibility = "visible";
		prompt.innerHTML = allPrompts;
		return false;
	} else {
		allPrompts = "";
		prompt.innerHTML = "";
		prompt.style.visibility = "hidden";
		document.getElementById("signUpForm").submit();
	}
});
