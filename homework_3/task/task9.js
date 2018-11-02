'use strict';

/**
 * Средство от бессонницы
 *
 * «Раз дракон. Два дракон. Три дракон», — считала принцесса.
 * У нее была бессонница, а считать барашков ей надоело еще в девять лет.
 * Впрочем, считать драконов просто так тоже было скучно, поэтому она развлекалась как могла.
 * Этой ночью она представляла, что все посчитанные драконы явились сюда, чтобы ее украсть,
 * а она отбивается от них, как может. Каждого k-ого дракона она била сковородкой по морде.
 * Каждому l-ому — прищемляла хвост балконной дверью. Каждому m-ому — наступала на лапу острым каблучком.
 * Наконец, каждому n-ому она грозила позвать мамочку, и он в ужасе ретировался.
 *
 * Скольким воображаемым драконам успела нанести моральный или физический ущерб принцесса,
 * если всего она насчитала d драконов?
 *
 * Входные данные содержат целые числа k, l, m, n и d (1 ≤ k, l, m, n ≤ 10, 1 ≤ d ≤ 105).
 * Выведите количество пострадавших драконов.
 */

var dragonCountTests = [
    {
        parameters: [1, 2, 3, 4, 12],
        expectedResult: 12
    },
    {
        parameters: [2, 3, 4, 5, 24],
        expectedResult: 17
    }
];


function dragonCount(k, l, m ,n, d) {
    var arr = [];
    arr.length = d;
    for (var j = 0; j < arguments.length-1; j++){
        for (var i = arguments[j]; i<=d; i =i+arguments[j]){
            arr[i] = "true";
        }
    }
    var newArr = arr.filter(function (el){ return el=== "true"});
    return newArr.length;
}


tasks.push({
    title: "Средство от бессонницы",
    solution: dragonCount,
    tests: dragonCountTests
});