'use strict';

/**
 * Кефа и первые шаги
 *
 * Кефа решил подзаработать денег, занимаясь различной деятельностью в интернете на протяжении ровно n дней.
 * Он знает, что в i-й день (1 ≤ i ≤ n) он заработает ai монет. Кефа любит прогресс,
 * поэтому он хочет узнать длину максимального неубывающего подотрезка в последовательности ai.
 * Напомним, что подотрезок последовательности — это её непрерывный фрагмент. Подотрезок чисел называется неубывающим,
 * если числа в нём следуют в порядке неубывания.
 *
 * Помогите Кефе справиться с этой задачей!
 *
 * Входные данные
 * Массив целых чисел a1,  a2,  ...,  an (1 ≤ ai ≤ 109).
 *
 * Выходные данныx
 * Верните единственное целое число — длину максимального неубывающего подотрезка последовательности a.
 */

var firstStepsTests = [
    {
        parameters: [[2, 2, 1, 3, 4, 1]],
        expectedResult: 3
    },
    {
        parameters: [[2, 2, 9]],
        expectedResult: 3
    }
];


function firstSteps (arr) {
    var res = 0;
    var len = 0;
    var maxSum = 0;
    var sumNumber = 0;
    for (var i = 0; i<arr.length; i++){
        if (check(arr[i],arr[i+1])){
            sumNumber += arr[i];
            len++;
        } else {
            sumNumber += arr[i];
            len++;
            if(maxSum<sumNumber){
                maxSum = sumNumber;
                res = len;
            }
            sumNumber = 0;
            len = 0;
        }
    } return res;
}

function check(a,b) {
    return b >= a;
}



tasks.push({
    title: "Кефа и первые шаги",
    solution: firstSteps,
    tests: firstStepsTests
});
