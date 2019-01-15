const model = {
 	items:[],
 	createDate: function () {
		let date = new Date();
		return " " + date.getDate() +"." + (date.getMonth()+1) +"."+ date.getFullYear();
	},
 	addItem: function (nochecked, input){
 		let element = [];
 		element.push(nochecked);
 		element.push(input.value + this.createDate());
 		this.items.push(element);
 		this.addToLocalStorage();
 	},
 	deleteItem: function (indexOfEl){
 		this.items.splice(indexOfEl, 1);
 		this.removeDataFromLocalStorage();
 		this.addToLocalStorage();
 	},
 	upgradeItemBox:function(boxEl,indexOfEl){
 		this.items[indexOfEl][0] = boxEl.checked;
 		this.removeDataFromLocalStorage();
 		this.addToLocalStorage();
 	},
 	upgradeItemText:function(listItemEl,indexOfEl){
 		this.items[indexOfEl][1] = listItemEl.value;
 		this.removeDataFromLocalStorage();
 		this.addToLocalStorage();
 	},
 	reverseItems: function () {
 		this.items.reverse();
 		this.removeDataFromLocalStorage();
 		this.addToLocalStorage();
 	},
 	addToLocalStorage: function (){
 		localStorage.setItem('myList', JSON.stringify(this.items));
 	},
 	getFromLocalStorage: function (){
 		let itemsArray = [];
 		if (localStorage.getItem("myList")) itemsArray = JSON.parse(localStorage.getItem("myList"));
 		return itemsArray;
 	},
 	removeDataFromLocalStorage: function (){
 		localStorage.removeItem('myList');
 	},
 }

 export default model;
