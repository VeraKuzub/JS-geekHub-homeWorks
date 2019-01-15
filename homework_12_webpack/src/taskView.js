const view = {
  	createDate: function () {
		let date = new Date();
		return " " + date.getDate() +"." + (date.getMonth()+1) +"."+ date.getFullYear();
	},
  	createCheckBox: function () {
		let elementCheckbox = document.createElement("input");
		elementCheckbox.setAttribute("type","checkbox");
		elementCheckbox.classList.add("box");
		return elementCheckbox;
	},
  	createListElement: function () {
  		let elementItem = document.createElement("li");
  		elementItem.classList.add("flex");
  		return elementItem;
  	},
  	createElementImput: function (text) {
		let elementInput = document.createElement("input");
		elementInput.setAttribute("type","text");
		elementInput.classList.add("listItem");
		elementInput.value = text  + this.createDate();
		return elementInput;
	},
	createElementImputWithOutDate: function (text) {
		let elementInput = document.createElement("input");
		elementInput.setAttribute("type","text");
		elementInput.classList.add("listItem");
		elementInput.value = text;
		return elementInput;
	},
	createFullItemWithOutDate: function (text) {
		let newItem = this.createListElement();
		newItem.appendChild(this.createCheckBox());
		newItem.appendChild(this.createElementImputWithOutDate(text));
		newItem.appendChild(this.createDelButton());
		return newItem;
	},
	addElementWithOutDate:function (text) {
		document.querySelector("#js_myListItems").appendChild(this.createFullItemWithOutDate(text));
	},
	createDelButton:function () {
		let btn = document.createElement("button");
		btn.innerHTML = "Delete";
		btn.setAttribute("type","button");
		btn.setAttribute("name","btnDelete");
		btn.classList.add("btn");
		btn.classList.add("btnDelete");
		return btn;
	},
	createFullItem: function (text) {
		let newItem = this.createListElement();
		newItem.appendChild(this.createCheckBox());
		newItem.appendChild(this.createElementImput(text));
		newItem.appendChild(this.createDelButton());
		return newItem;
	},
	addElement:function (text) {
		document.querySelector("#js_myListItems").appendChild(this.createFullItem(text));
	},

	delElement: function (index){
		document.querySelectorAll('li')[index].remove();
	},
	addCheckToBoxFromStorage: function (array) {
		let boxsArray = document.body.querySelectorAll("input[type='checkbox']");
		for (let i=0; i<array.length; i++){
			(array[i][0] === true) ? boxsArray[i].checked = true: boxsArray[i].checked = false;
		}
	}
  }

  export default view;
  