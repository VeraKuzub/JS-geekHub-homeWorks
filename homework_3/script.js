// Зробіть, щоб в чисел з'явився метод sum(), який отримує 
// інше число і на виході дає їх суму, наприклад x.sum(y) === x + y

Number.prototype.sum = function (y) {
	return this + y;
}

var number = 5;
var numberSum = number.sum(5);
console.log('result ', numberSum);