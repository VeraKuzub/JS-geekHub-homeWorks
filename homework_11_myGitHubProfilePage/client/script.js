// 1. Зробити сторінку “My GitHub Profile” (додаткове завдання - розмістити її на github pages), 
// з короткими даними про вас (дані з гіта отримуємо з допомогою методу fetch - у GitHub непоганий API, 
// наприклад https://developer.github.com/v3/repos/branches/… - приклад отримання списку бранчів). 
// 2. Обов’язково там має бути розділ Мої репозиторії GitHub. 
// 3. По кліку на репозиторій розкривається додаткова інформація про дату останнього коміта в master


// 4. Прикрутити ServiceWorkers до свого портфоліо на gitpages (кешування, можливість перегляду офлайн). 

//-------------------------------

let repositoriesList = document.body.querySelector('#myRepositories');
let containerImg = document.body.querySelector('#containerForImg');
let user = 'VeraKuzub';
let repoName; 

//--------------function--------------- 

function addRepoToList(text){
	let element = document.createElement('li');
	element.innerHTML = text; 
	repositoriesList.appendChild(element);
}

function addMyImage (obj) {
	let image = document.createElement('img');
	image.setAttribute('alt','Vera Kuzub');
	image.setAttribute('class','imgStyle'); 
	//image.setAttribute('src', obj.avatar_url); 
	image.setAttribute('src', './vera.jpeg'); //for service workers

	document.body.querySelector('#containerForImg').appendChild(image);
}

function addInfoAboutMe(obj){
	let element = document.createElement('p');
	element.innerHTML = `userName: ${obj.name} <br> nickName: ${obj.login} <br> Account was created: ${obj.created_at}`;
	document.body.querySelector('#containerForImg').appendChild(element);
}

function findIndex (element, collection) {
	let len = collection.length;
	for (let i = 0; i < len; i++) {
	     if (element === collection[i]) return i;
	}
}

function addInnerText (el, text){
	el.innerHTML = text;
}

//--------------promises--------------- 

let promiseInfoAboutUser = fetch(`https://api.github.com/users/${user}`, {
  method: 'get'
})
.then(response => {
    return response.json();
})
.then(result => {
	addMyImage(result);
	addInfoAboutMe(result);
})
.catch(error => console.error(error));


let promiseRepos = fetch(`https://api.github.com/users/${user}/repos`, {
  method: 'get',
  headers: {
  "Content-type": "application/json"
  },
})
.then(response => {
		// console.log(response.headers.get('Content-Type'));  
	    // console.log(response.headers.get('Date'));
	    // console.log("status",response.status);  
	    // console.log(response.statusText);  
	    // console.log(response.type);  
	    // console.log(response.url);  
    return response.json();
})
.then(results => results.forEach(repo => {
	addRepoToList(repo.name);
}))
.catch(error => console.error(error));


//--------------EventListener and promises--------------- 

document.body.querySelector('#myRepositories').addEventListener('click', function(event){
	// console.dir(event.target);
	let repos = document.body.querySelectorAll('li');
	let indexElement = findIndex (event.target, repos);
	// console.log(indexElement);


	let promise = fetch(`https://api.github.com/users/${user}/repos`, {
 		method: 'get'
	})
	.then(response => {  
	    return response.json();
	})
	.then(results => {
		repoName = results[indexElement].name;

		let promise = fetch(`https:api.github.com/repos/${user}/${repoName}/branches/master`, {
 			method: 'get',
		})
		.then(response => {  
		    return response.json();
		})
		.then(results => {
			document.body.querySelectorAll('li')[indexElement].innerHTML = repoName + ". <br> Time of the last commit: " + results.commit.commit.author.date +".";
		})
		.catch(error => console.error(error));
	})

	.catch(error => console.error(error));
	});



// -------------------serviceWorker-------------------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js', {scope: './'})
  .then(function(registration) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + registration.scope);
    console.dir(registration);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}