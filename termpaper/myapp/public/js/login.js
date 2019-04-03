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

function checkLeng (el, length) {
	if (el !== '') {
		return (el.length >= length) ? true : false;
	} return false;
}

const btnDoLogin = document.getElementById("doLogin");
const inputUserLogin = document.getElementById('userLogin');const inputUserEmail = document.getElementById('userEmail');
const inputUserPassword = document.getElementById('userPassword');const inputUserPasswordMatch = document.getElementById('userPasswordMatch');
const prompt = document.getElementById('containerPrompt');

prompt.style.visibility = "hidden";

btnDoLogin.addEventListener("click", function(e) {
	e.preventDefault();

	let allPrompts = "";
	let pass = checkInput(inputUserPassword.value);
	if (!checkInput(inputUserLogin.value)) allPrompts +="Введите имя пользователя <br>" ;
	if (!pass) allPrompts +="Введите  пароль <br>" ;
	if (!checkLeng(pass, 5)) allPrompts += "Пароль должен быть больше 5 символов<br>" ;


	if (allPrompts.length !== 0) {
		prompt.style.visibility = "visible";
		prompt.innerHTML = allPrompts;
		return false;
	} else {
		allPrompts = "";
		prompt.innerHTML = "";
		prompt.style.visibility = "hidden";
		document.getElementById("loginForm").submit();
	}
});


