var input = document.getElementById("userInput");
var buttonEnter = document.getElementById("btnEnter");
var orderList = document.querySelector("ol");
var buttonReverse = document.getElementById("btnReverse");


function inputLength() {
	return input.value.length;
}


// Create date in format date.mounth.year
function createDate() {
	let date = new Date();
	return " " + date.getDate() +"." + date.getMonth() +"."+ date.getFullYear();
}

// Create ListElement
function createListElement() {
	if (inputLength()>0) {
		let newElement = document.createElement("li");
		newElement.innerHTML = input.value + createDate();
		newElement.classList.add("item");
		input.value = "";
		orderList.appendChild(newElement);
	}	
}


function createDelButton() {
	let btn = document.createElement("button");
	btn.innerHTML = "Delete";
	btn.setAttribute("type","button");
	btn.setAttribute("name","btnDelete");
	btn.classList.add("btn");
	btn.classList.add("btnDelete");
	btn.addEventListener('click',deleteElements);
	orderList.appendChild(btn);	
}

//delete li and delete button 
function deleteElements(){
	this.parentElement.removeChild(this.previousSibling);
	this.parentElement.removeChild(this);

}

//add li and delete button 
function addElements() {
	if(inputLength() > 0){
	createListElement();
	createDelButton();
	}
}



function ReverseListItem() {
let ListItems = document.querySelectorAll("li"); 
let length = ListItems.length;
let array = [];
	for (let i = 0; i<length; i++){ 
	array[i] = ListItems[i].innerText;
	};
array.reverse();
	for (let i = 0; i <array.length; i++) {
		ListItems[i].innerText = array[i];
	}
	return ListItems;
}


//add li and delete button after press Enter
function addListAfterKeypress(event) {
	if (event.keyCode === 13){
	createListElement();
	createDelButton();
	}
};


buttonEnter.addEventListener("click", addElements);

input.addEventListener("keydown", addListAfterKeypress);

buttonReverse.addEventListener("click", ReverseListItem);
