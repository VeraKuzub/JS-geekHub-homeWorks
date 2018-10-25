// Create object  which is similar to the array. Realize the method: push,
// pop, join, filter, find, map, sort, toString, геттер length

var arrObj = {
	'0': '5',
	'1': '1',
	'2': '3',
	'3': '2',
	'4': '45',
	'5': '1',
// pop
	'pop': function () {
		var count = this.lengthObject;
		if (count > 0) {
			count --;
			count = String(count);
			var delElement = this[count];
			delete this[count];
			return delElement;
		} return undefined; 
	},
// push
	'push': function (element) {
		var count = this.lengthObject;
		for (var i = 0; i < arguments.length; i++){
		this[count] = arguments[i];
		count++;
		}
		return this.lengthObject;
	},
// join	
	'join': function (separator) {
		var objToString = '';
		if (this.lengthObject === 0) return objToString;
		if (arguments.length > 0){ 
			for (var key in this){
				if (!isNaN(key)){
					if (Number(key) === this.lengthObject-1) {
					objToString = objToString + this[key];
					return objToString;
					}
				objToString = objToString + this[key] + separator;
				}
			}
		} else {
			for (var key in this){
				if (!isNaN(key)){
					if (Number(key) === this.lengthObject-1){
					objToString = objToString + this[key];
					return objToString;
				}
				objToString = objToString + this[key] + ',';
				}
			}
		}
	},

// toString
	toString: function () {
		var objToString = '';
		if (this.lengthObject === 0) return objToString;
			for (var key in this){
				if (!isNaN(key)){
					if (Number(key) === this.lengthObject-1){
						objToString = objToString + this[key];
						return objToString;
					}
					objToString = objToString + this[key] + ',';
				}
		} 
	},

// filter
	filter: function (checkConditions) {
		var arr = [];
			for (var key in this){
			if(isNaN(key)) continue;
			if (checkConditions(this[key]) === true){
				arr.push(this[key]);
			} 	
		} return arr;
	}, 

// find
	find: function (checkCondition) {
		for (var key in this) {
			if(isNaN(key)) continue;
			if (checkCondition(this[key]) === true) {
				return this[key];
			} 
		} return undefined;
	},
	
// map 
	map: function (elementFunction) {
		for (var key in this) {
			if(isNaN(key)) continue;
			var newThisKey = elementFunction(this[key]);
			this[key] = newThisKey;
		} return this;
	},

// Function sort. Sort the elements in the array in ascending order.
	sort: function sort (){
		var arr = [];
		var minNumber;
		var i = 0;
		for (var key in this) {
			if(isNaN(key)) continue;
			arr[i] = this[key];
			i++; 
		};
		for (var j = 0; j<arr.length-1; j++){
			for (var k = 0; k<arr.length-j; k++) {
				if (arr[k] > arr[k+1]) {
					minNumber = arr[k+1];
					arr[k+1] = arr[k];
					arr[k] = minNumber;
				}
			} 
		} 
		var i = 0;
		for (var key in this) {
			if(isNaN(key)) continue;
			this[key] = arr[i];
			i++;
		} return this;
	},



// getter length
  	get lengthObject () {
		var count = 0;
		for (var key in this){
			if(isNaN(key)) continue;
			count++;
		} return count;
	}
}

// Create Constructor similar to new Array (........).
// You can put any number of element in this constructor, which begin become the elements of our "array".

// Constructor ArrayObjConstructor
function ArrayObjConstructor () {
    for (var i = 0; i<arguments.length; i++){
    	var j = String(i);
    	this[j] = arguments[i];
    }
}

// Сreate an object using the constructor
var obj1 = new ArrayObjConstructor('h', 'neme', 'v');
console.log ('obj1',obj1);
var obj2 = new ArrayObjConstructor('1', '2', '4');
console.log ('obj2',obj2);


console.log('My arrObj',arrObj);
// Example  method pop
console.log('method pop', arrObj.pop());
// Example  method push
console.log('method push', arrObj.push('78'));
// Example  method join
console.log('method join', arrObj.join());
// toString
console.log('method toString', arrObj.toString());

// Example  method map
console.log('array', arrObj); 
arrObj.map(increaseByTwo);
console.log('map: ', arrObj);

function increaseByTwo(number) {
    return number * 2;
}


// Example  method filter
console.log('array', arrObj);  
var arrFilterd = arrObj.filter(checkNumber);
console.log('filter', arrFilterd);

function checkNumber (number) {
    return number > 2;
}


// Example  method find
console.log('array', arrObj); 
var arrFindEl = arrObj.find(findEl);
console.log('find', arrFindEl);

function findEl(number) {
    return number > 2;
}

// Example  method sort
console.log('array', arrObj); 
var arrFindEl = arrObj.sort();
console.log('sort', arrFindEl);