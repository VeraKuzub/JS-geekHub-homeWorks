const controller = {
 	addItemToTodoList: function (view, model) {
		let input = document.querySelector("#js_userInput");
		if (input.value.length > 0) {
			view.addElement(input.value);
			model.addItem(false, input);
			input.value = "";
		}
	},
	addItemsToTodoListFromStorage: function(model,view){
		let date = model.getFromLocalStorage();
		model.items = date;
		for (let i = 0; i < date.length; i++){
			view.addElementWithOutDate(date[i][1]);
		};
		view.addCheckToBoxFromStorage(date);
	},
	reverseListItem: function (view, model) {
		model.reverseItems();
		let ListItems = document.querySelectorAll("li");
		for (let i = 0; i<model.items.length; i++){
			ListItems[i].querySelector("input[type='checkbox']").checked = model.items[i][0];
			ListItems[i].querySelector("input[type='text']").value = model.items[i][1];
		}
	},
	deleteListItem: function (view, model,index){
		model.deleteItem(index);
		view.delElement(index);
	},
	upgradeListItemBox: function(model,targetEl,index){
		model.upgradeItemBox(targetEl, index);
	},
	upgradeListItemText: function(model,targetEl,index){
		model.upgradeItemText(targetEl,index);
	},
  }
