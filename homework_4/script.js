// Дан масив чисел, которые представляют собой показатели высоты скал: [2,1,5,0,3,4,7,2,3,1,0]			
// (для примера дан этот масив, но может быть любой, Ваш алгоритм должен решать все случаи)			
// Посчитать количество воды (количество синих йчеек), набранной в ямы после дождя.			
// Нужно по возможности использовать методы массива, а не обычные цыклы.			
// Например, в даном примере правильный ответ: 10			

// var x = [2,1,5,0,3,4,7,2,3,1,0];
var x = [2,1,5,0,3,4,7,2,3,1,0];
console.log(findAmountOfWater(x));

function findAmountOfWater(arr) {
	var leftMaxNumber = 0;
	var rightMaxNumber = 0;
	var left = 0;
	var rigth = arr.length-1;
	var result = 0;
	if (arr.length <= 2) return result;
	for (var i =0; i<arr.length; i++) {
		if (arr[left] > leftMaxNumber){
			leftMaxNumber = arr[left];
		}
		if (arr[rigth] > rightMaxNumber){
			rightMaxNumber = arr[rigth];
		}
		if (leftMaxNumber>=rightMaxNumber){
			result+=rightMaxNumber-arr[rigth];
			rigth--;
		} else {
			result+=leftMaxNumber-arr[left];
			left++;
		}
	} return result;
}
