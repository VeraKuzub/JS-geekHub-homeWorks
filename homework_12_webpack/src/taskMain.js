import controller from './taskController';
import view from './taskView';
import model from './taskModel';

function main (){
	controller.addItemsToTodoListFromStorage(model,view);
}

export default main;