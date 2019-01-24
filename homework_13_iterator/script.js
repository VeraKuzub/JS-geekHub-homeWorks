// a) Написати нескінченний генератор випадкових чисел на основі ітераторів.
// b) Написати функціонал для перебору через for .. of об'єкта з декількома рівнями вкладеності.


let rendomGenerator = {
	generateNumber() {
		return this[Symbol.iterator]();
	},
	
	[Symbol.iterator]() {
		let count = 0;
		return {
			next() {
				let number = Math.round(Math.random() *100);
				if (count < 9) {
					count += 1;
					return { 
						value: number, done: false 
					};
				} return {
					value: number,
					done:true
				};
			}
		};
	}
};

for (let number of rendomGenerator){
	console.log(`Rendom number for...of: ${number}`);
};

let rendom = rendomGenerator.generateNumber();
console.log(`Rendom number: ${rendom.next().value}`);