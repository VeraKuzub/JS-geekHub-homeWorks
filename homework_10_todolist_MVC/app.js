(function(){
	const app = {
	 		init: function () {
	 			this.main();
	 			this.event();
	 		},
	 		findIndex:function (element, collection) {
	    		let len = collection.length;
	    		for (let i = 0; i < len; i++) {
	        		if (element === collection[i]) return i;
				}
			},
	 		main: function (){
	 			controller.addItemsToTodoListFromStorage(model,view);

	 		},
	 		event: function (){
	 			let buttonEnter = document.querySelector("#js_btnEnter");
	 			let buttonReverse = document.querySelector("#js_btnReverse");
	 			let input = document.querySelector("#js_userInput");
	 			let orderList = document.querySelector("#js_myListItems");
	 			// event click to add element 
	 			buttonEnter.addEventListener("click", function(){
	 				controller.addItemToTodoList(view, model);
	 			});

	 			// event keydown to add element 
	 			input.addEventListener("keydown", function(){
	 				if (event.keyCode === 13) controller.addItemToTodoList(view, model);
	 			});


	 			// event click to reverse all elements 
	 			buttonReverse.addEventListener("click", function(){
	 				controller.reverseListItem(view, model);
	 			});

	 			// event click to delete listItem or update element checkbox 
	 			orderList.addEventListener("click", function (event) {
				event = event || window.event;
				let target = event.target || event.srcElement;
				let className = event.target.className;
				let indexOfEl = app.findIndex(target, document.getElementsByClassName(className));

					if (target.tagName === "BUTTON" && className === "btn btnDelete"){
						controller.deleteListItem (view, model,indexOfEl);
					} else if (target.tagName === "INPUT" && target.type === "checkbox"){
						controller.upgradeListItemBox(model, target, indexOfEl);
					} 
				});

				// event click to update element text 
				addEventListener("input", function (event) {
				event = event || window.event;
				let target = event.target || event.srcElement;
				let className = event.target.className;
				let indexOfEl = app.findIndex(target, document.getElementsByClassName(className));
					if (target.tagName === "INPUT" && target.type === "text" && target.id  !== "js_userInput"){
						controller.upgradeListItemText(model, target, indexOfEl);
					}
				});
			}
		};
	 	app.init();
 }());