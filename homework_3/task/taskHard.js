'use strict';

/**
 * Drazil and Factorial
 *
 * Drazil is playing a math game with Varda.
 * Let's define F(x) for positive integer x as a product of factorials of its digits.
 * For example, F(135) = 1! * 3! * 5! = 720
 *
 * First, they choose a decimal number a consisting of n digits that contains at least one digit larger than 1.
 * This number may possibly start with leading zeroes. Then they should find maximum positive number x satisfying
 * following two conditions:
 *
 * 1. x doesn't contain neither digit 0 nor digit 1.
 * 2. F(x) = F(a).
 * Help friends find such number.
 *
 * Input
 * One string input parameter length <= 15. There is at least one digit in a that is larger than 1.
 * Number a may possibly contain leading zeroes.
 *
 * Output
 * Output a maximum possible integer satisfying the conditions above.
 * There should be no zeroes and ones in this number decimal representation.
 */

// var drazilTest = [
//     {
//         parameters: ["1234"],
//         expectedResult: 33222
//     },
//     {
//         parameters: ["555"],
//         expectedResult: 555
//     }
// ];


/**
 * In the first case, F(1234) = 1! * 2! * 3! * 4! = F(33222)
//  */
// var boys = ('123');
// console.log(drazil(boys));


function drazil(boys, girls) {
//TODO
}

var number;
while (number.length > 15 || number.length === 0 || isNaN(number) || parseInt(number, 10) === 0){
    number = prompt('Enter number. Length of number must be less than 15 but more than 0 ',0);
}
number = parseInt(number, 10);
number = String(number);
console.log(factorialNumberInString(number));



//Не работает. Нужно переписать.

// function maxNumberString(number,factorialNumberInString){
//     debugger;
//     var factorialNumber = factorialNumberInString(number);
//     var maxNumber = "2";
//     var numberString = "2";
//     var tttt = 1;
//     while (factorialNumberInString(maxNumber) !== factorialNumber){
//         tttt++;
//         if (tttt > 10000000) break;
//         if (numberString === "2" && factorialNumberInString(maxNumber) < factorialNumber){
//             maxNumber+=numberString;
//
//         } else if (factorialNumberInString(maxNumber) > factorialNumber)
//             {
//              maxNumber = delLastSimblString(maxNumber);
//              numberString = String(Number( numberString)+1);
//             }
//             for (var i = 0; i<maxNumber.length;i++){
//              if( Number(maxNumber.charAt(i)) === Number(numberString)-1) {
//                  maxNumber = maxNumber.substr(0, i) + numberString + maxNumber.substr(i+1);
//                  while (factorialNumberInString(maxNumber) > factorialNumber) maxNumber = delLastSimblString(maxNumber);
//                  var tick = true;
//                  for (var s = 0; s<maxNumber.length-1;s++){
//                     if  (maxNumber.charAt(s) !== maxNumber.charAt(s+1)) tick = false;
//                  }
//                  if (tick)
//                  {
//                      numberString = String(Number(numberString) + 1);
//                      maxNumber = maxNumber.substr(0, 1) + numberString + maxNumber.substr(2);
//                  }
//                  i = maxNumber.length;
//              }
//         }
//     }
//     return maxNumber;
// }



// console.log (maxNumberString('1234',factorialNumberInString));
// console.log (maxNumberString('55',factorialNumberInString));


function delLastSimblString(str) {
    return str.slice(0,str.length-1);
}

function factorialNumberInString(string) {
    var result;
    for (var i = 0; i<string.length; i++){
        if (i===0) result = factorial(Number(string.charAt(i)));
        if (i>0) result*=factorial(string.charAt(i));
    }
    return result;
}

function factorial(number){
    return (number !== 1)? number * factorial(number - 1):1;
}

tasks.push({
    title: "Drazil and Factorial",
    solution: drazil,
    tests: drazilTest
});
