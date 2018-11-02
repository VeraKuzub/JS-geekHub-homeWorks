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

var drazilTest = [
    {
        parameters: ["1234"],
        expectedResult: 33222
    },
    {
        parameters: ["555"],
        expectedResult: 555
    }
];


/**
 * In the first case, F(1234) = 1! * 2! * 3! * 4! = F(33222)
//  */
// var boys = ('123');
// console.log(drazil(boys));


var number = prompt('Enter number. Length of number must be less than 15 but more than 0 ',0);
while (number.length > 15 || number.length === 0 || isNaN(number) || parseInt(number, 10) === 0){
    number = prompt('Enter number. Length of number must be less than 15 but more than 0 ',0);
}

number = parseInt(number, 10);
number = String(number);


var factorialNumber = factorialNumberInString(number);
console.log(drazil(number));

function drazil(number) {
    var maxNumber = "2";
    var numberString = "2";
    factorialNumber = factorialNumberInString(number);
    while (factorialNumberInString(maxNumber) < factorialNumber){
        maxNumber+=numberString;
    }
    return Number(changeSymbol(maxNumber,numberString));
}


//
function changeSymbol(str,n) {
    for (var i = 0; i < str.length; i++) {
        str = str.replace(str.charAt(i), Number(n) + 1);
        while (factorialNumberInString(str) > factorialNumber) {
            str = delLastSymblString(str);
        }
        if (factorialNumberInString(str) === factorialNumber) return str;
        if(checkString(str,String(Number(n)+1))) {
          n=String(Number(n)+1);
          str = changeSymbol(str,n);
          if (factorialNumberInString(str) === factorialNumber) return str;
        }

    }
}


//the function checks whether all characters in the string are the same and equal to the given character
function checkString (str, n) {
    for (var i = 0; i<str.length; i++){
        if (str.charAt(i) !== n){
            return false;
        }
    } return true;
}

//The function deletes the last character in the string.
function delLastSymblString(str) {
    return str.slice(0,str.length-1);
}


//the function finds the factorial of each number in the string and multiplies all values
function factorialNumberInString(string) {
    var result;
    for (var i = 0; i<string.length; i++){
        if (i===0) result = factorial(Number(string.charAt(i)));
        if (i>0) result*=factorial(string.charAt(i));
    }
    return result;
}



// the function finds the factorial of a number
function factorial(number){
    return (number !== 1)? number * factorial(number - 1):1;
}

tasks.push({
    title: "Drazil and Factorial",
    solution: drazil,
    tests: drazilTest
});
