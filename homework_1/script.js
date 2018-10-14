/*Create a page to which the script is connected, which alternates the work of each method of the array:
pop, push, concat, indexOf, join, forEach, filter, find, map, slice, splice, shift, unshift.
 Display the results of the demonstration in the console. */

// methods pop() , push(), concat(), indexOf(), join()

var myArray = [2,4,6,8,'one','hello',45, 'test'];
console.log(myArray);

var resultMethodPop = myArray.pop();
console.log("Pop() returns the value that was \"popped out\": " + resultMethodPop);

var resultMethodPush = myArray.push('push');
console.log("Push() returns the new array length: " + resultMethodPush);

var secondArray = ['cat', 'dog', 45];
var resultMethodConcat = myArray.concat(secondArray);
console.log("Concat() returns the new array containing the values of the joined arrays: " + resultMethodConcat);

var resultMethodindexOf = myArray.indexOf('hello');
console.log("IndexOf() returns the position of the first occurence: " + resultMethodindexOf);


var resultMethodJoin = myArray.join(' ');
console.log ("Join() method joins the elements of an array into a string, and returns the string: " + resultMethodJoin);

// method forEach()

var thirdArray = ['Vera', 'Roma', 'Sasha', 'Igor'];
var newArray = [];

var resultMethodforEach = thirdArray.forEach(myNameIs);
    console.log("ForEach() method: "+ resultMethodforEach);
    console.log("newArray: " + newArray);

function myNameIs (item, index){
   var itemMyName = 'My name is: ' + item;
    console.log("item: " + item + "\n" + "index: " + index + " \n" + "newItem: " + itemMyName);
    return newArray[index]=itemMyName;
}

// methods filter() , find()

var ages = [4,6,1,78,54,34];

var resultMethodFilter = ages.filter(function(item){return item < 54});
    console.log("Ages array: " + ages + "\n" + "Filter() return an array: " + resultMethodFilter);

var resultMethodFind = ages.find(function (item){return item === 78});
    console.log("Find() return the value of the first element that past a test: " + resultMethodFind);

// methods maps(), slice()

var numberArr = [5,3,2,1,6,7,8,0];

var resultMethodMap = numberArr.map(function (item) { return item*2 });
    console.log("Maps() return new array: " + resultMethodMap);


var resultMethodSlice = numberArr.slice(0,3);
console.log("Slice() returns the selected element of array: " + resultMethodSlice);

// method splice()

var arrSplice = ['I', 'do', 'not', 'know', 'how', 'to', 'do', 'this', '!'];

var returnArrSplice = arrSplice.splice(1,2, 'really');
    console.log("Splice() return: " + returnArrSplice + "\n" + "arrSplice: " + arrSplice);

//methods shift() , unshift()

var users = ['user1', 'user2', 'user3'];

var resultMethodShift= users.shift();
    console.log ("Array users: " + users + "\n" + "Shift() return the value of the first removed item of array: " + resultMethodShift);

var resultMethodUnshift= users.unshift('user4','user5','user6');
    console.log ("Array users: " + users + "\n" + "Unshift() return the new lenght of array: " + resultMethodUnshift);


document.getElementById("result").innerHTML =
    "myArray: 2,4,6,8,one,hello,45,test" + "<br>" +
    "pop() return: " + resultMethodPop + "<br>" +
    "push() return: " + resultMethodPush + "<br>" +
    "concat() return:" +  resultMethodConcat + "<br>" +
    "indexOf() return: " + resultMethodindexOf + "<br>" +
    "join() return: " + resultMethodJoin + "<br>" +
    "array Age: " + ages + "<br>" +
    "filter() return: " + resultMethodFilter + "<br>" +
    "find() return: " + resultMethodFind + "<br>" +
    "number Array: " + numberArr + "<br>" +
    "map() return: " + resultMethodMap + "<br>" +
    "slice() return: " + resultMethodSlice + "<br>" +
    "array Splice: " +  arrSplice + "<br>" +
    "splice() return: " + returnArrSplice + "<br>"+
    "array Users: " + users + "<br>"+
    "shift() return: " + resultMethodShift + "<br>"+
    "unshift() return: " + resultMethodUnshift

