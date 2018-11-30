// create date in format date.mounth.year
function createDate() {
	let date = new Date();
	return " " + date.getDate() +"." + date.getMonth() +"."+ date.getFullYear();
}

// create element input, type="checkbox"
function createCheckBox () {
	let elementCheckbox = document.createElement("input");
	elementCheckbox.setAttribute("type","checkbox");
	elementCheckbox.classList.add("box");
	let itemsBox = JSON.parse(localStorage.getItem("myBoxs"));
	itemsBox.push(elementCheckbox.checked);
  	localStorage.setItem("myBoxs", JSON.stringify(itemsBox));
	return elementCheckbox;
}


// create element input, type="text"
function createElementImput (text) {
	let elementInput = document.createElement("input");
	elementInput.setAttribute("type","text");
	elementInput.classList.add("listItem");
	elementInput.value = text;
	return elementInput;
}



// create element li
function createListElement() {
		let elementItem = document.createElement("li");
		elementItem.classList.add("flex");
		return elementItem;
	}	


// create element delete button and add addEventListener to this button

function createDelButton() {
	let btn = document.createElement("button");
	btn.innerHTML = "Delete";
	btn.setAttribute("type","button");
	btn.setAttribute("name","btnDelete");
	btn.classList.add("btn");
	btn.classList.add("btnDelete");
	btn.addEventListener('click',deleteElements);
	return btn;
}

// add item li with checkbox, 
// input="text" and delete button into the listItems

function createFullItem(text) {
	let newItem = createListElement();
	newItem.appendChild(createCheckBox());
	newItem.appendChild(createElementImput(text));
	newItem.appendChild(createDelButton());
	return newItem;
}

//delete checkbox input and delete button and parent element li
//delete input values and marks done or not from localStorage
function deleteElements(){
    let indexOfEl = index(this, document.getElementsByClassName("btnDelete"));
	let itemsArray = JSON.parse(localStorage.getItem("myList"));
	itemsArray.splice(indexOfEl, 1);
	localStorage.setItem("myList", JSON.stringify(itemsArray));
	let itemsBox = JSON.parse(localStorage.getItem("myBoxs"));
	itemsBox.splice(indexOfEl, 1);
	localStorage.setItem("myBoxs", JSON.stringify(itemsBox));
	this.parentElement.remove();
}


function inputLength() {
	return input.value.length;
}


//add element li with chekbox, input and delete button inside
//add input value to localStorage
function addElement() {
	let text = input.value + "" + createDate();
	if(inputLength() > 0){
		orderList.appendChild(createFullItem(text));
		itemsArray.push(text);
	  	localStorage.setItem("myList", JSON.stringify(itemsArray));
		input.value = "";
	}
}


function ReverseListItem() {
	reverseLocalStorage ();
	reverseLocalStorageMyBoxs();
let ListItems = document.querySelectorAll("li"); 
let length = ListItems.length;
let array = [];
	for (let i = 0; i<length; i++){ 
	array[i] = ListItems[i].children[1].value;
	};
	array.reverse();
	for (let i = 0; i <array.length; i++) {
		ListItems[i].children[1].value = array[i];
	}
	return ListItems;
}


function reverseLocalStorage () {
	let itemsArray = JSON.parse(localStorage.getItem('myList'));
	itemsArray.reverse();
	localStorage.setItem("myList", JSON.stringify(itemsArray));
}


function reverseLocalStorageMyBoxs () {
	let itemsArray = JSON.parse(localStorage.getItem('myBoxs'));
	itemsArray.reverse();
	localStorage.setItem("myBoxs", JSON.stringify(itemsArray));
}



//add li checkbox and delete button after press Enter
function addListAfterKeypress(event) {
	if (event.keyCode === 13){
	addElement();
	}
};


//find index 
function index(element, collection) {
    var len = collection.length;
    for (var i = 0; i < len; i++) {
        if (element === collection[i]) {
        return i;
    	}
	}
}




const input = document.querySelector("#js_userInput");
const buttonEnter = document.querySelector("#js_btnEnter");
const orderList = document.querySelector("#js_myListItems");
const buttonReverse = document.querySelector("#js_btnReverse");

// statement that checks if localStorage myList already exists myList
let itemsArray = localStorage.getItem("myList") ? JSON.parse(localStorage.getItem("myList")) : [];

//localStorage myList
localStorage.setItem("myList", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('myList'));

data.forEach(item => {
  orderList.appendChild(createFullItem(item));
  let delItem = JSON.parse(localStorage.getItem('myBoxs'));
  delItem.pop();
  localStorage.setItem("myBoxs", JSON.stringify(delItem));
});


// statement that checks if localStorage myBoxs already exists
let itemsBox = localStorage.getItem("myBoxs") ? JSON.parse(localStorage.getItem("myBoxs")) : [];

//set localStorage myBoxs
localStorage.setItem("myBoxs", JSON.stringify(itemsBox));


let dataBoxs = JSON.parse(localStorage.getItem('myBoxs'));
let allBoxs = document.getElementsByClassName("box");
  	for (let i = 0; i < allBoxs.length; i++) {
  		allBoxs[i].checked = dataBoxs[i];
  	};



// <--addEventListener-->

// add element 
buttonEnter.addEventListener("click", addElement);

// reverse elements
buttonReverse.addEventListener("click", ReverseListItem);

//add list item 
input.addEventListener("keydown", addListAfterKeypress);


//change mark done or not in checkbox in localStorage
orderList.addEventListener("click", function (event) {
	event = event || window.event;
	let target = event.target || event.srcElement;
	if (target.tagName === "INPUT" && target.type === "checkbox") {
	let indexOfEl = index(target, document.getElementsByClassName("box"));
	let boxsArray = JSON.parse(localStorage.getItem("myBoxs"));
	boxsArray[indexOfEl]=target.checked;
	localStorage.setItem("myBoxs", JSON.stringify(boxsArray));
	};
});


//change my listItem in localStorage
orderList.addEventListener("input", function (event) {
	event = event || window.event;
	let target = event.target || event.srcElement;
	let indexOfEl = index(target, document.getElementsByClassName("listItem"));
	let itemsArray = JSON.parse(localStorage.getItem("myList"));
	itemsArray[indexOfEl] = target.value;
	localStorage.setItem("myList", JSON.stringify(itemsArray));
});