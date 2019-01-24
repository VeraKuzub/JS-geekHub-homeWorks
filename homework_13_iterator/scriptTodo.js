//by Denys Pysmennyi

function perform() {
	let arg = arguments[0];
	if (arguments[0] === null) arg = arguments[1]();
	return new Promise(function(resolve, reject) {
		resolve(arg);
	});
}

perform(null, function(value) { // value === null
	var param = 1;
	console.log(param); // 1
	return param;
})
.then(function(param) { // param === 1
	console.log(++param); // 2
	return param;
})
.then(function(param) { // param === 2
	console.log(++param); // 3
	return param;
})

