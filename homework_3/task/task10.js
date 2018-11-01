'use strict';

/**
 * cAPS lOCK
 *
 * зАЧЕМ НУЖНА КЛАВИША cAPS lOCK?
 * Caps Lock — клавиша компьютерной клавиатуры, предназначенная для автоматической (постоянной) смены регистра
 * букв со строчных на прописные. Будучи случайно нажатой, она приводит к последствиям вроде первого абзаца в
 * условии этой задачи.
 *
 * Будем считать, что слово набрано с ошибочно нажатой клавишей Caps Lock, если:
 * - либо оно полностью состоит из прописных букв;
 * - либо прописными являются все его буквы, кроме первой.
 *
 * В таком случае, нужно автоматически поменять регистр всех букв на противоположный. Например,
 * регистр букв слов «hELLO», «HTTP», «z» должен быть изменен.
 * Напишите программу, которая применяет описанное выше правило или оставляет слово без изменения, если оно не применимо.
 *
 * Входные данные
 * записано слово, состоящее из прописных или строчных букв латинского алфавита. Длина слова — от 1 до 100 символов включительно.
 *
 * Выходные данные
 * Выведите результат обработки данного слова.
 */

var capsLockTests = [
    {
        parameters: ["cAPS"],
        expectedResult: "Caps"
    },
    {
        parameters: ["Lock"],
        expectedResult: "Lock"
    },
    {
        parameters: ["wHY DO wE NEED cAPS lOCK?"],
        expectedResult: "Why do We need Caps Lock?"
    },
    {
        parameters: ["FuNkY iS nOt CaPs!"],
        expectedResult: "FuNkY Is nOt CaPs!"
    }
];

// первая буква строчная, все остальные прописные
var regExp1 = /^([A-Z])([a-z]+)$/;
// console.log(regExp1.test("Aaaa"));

//  только прописныe буквы
var regExp2= /^([A-Z]+[A-Z]+)$/;
// console.log(regExp2.test('VVRR'));


// первая буква прописная, потом строчные. В конце может быть строчная или строчная и знак ?
var regExp3 = /^([a-z])([A-Z]+)|([A-Z][\\?])$/;
// console.log(regExp3.test("cAPS"));

// первая буква строчная, потом могут быть и строчные и прописные, в конце строчная или строчная и знак !.
var regExp4 =/^([a-z])[a-zA-Z]+([a-z]+)|([a-z]+[\!])$/;
// console.log(regExp4.test("aDFDFDFa"));

// первая буква прописная, потом могут быть и строчные и прописные, в конце прописная
var regExp6 =/^([A-Z])[a-zA-Z]+([A-Z]+)$/;
// console.log(regExp6.test("AdfdAdfdDFDFsA"));

function capsLock(str) {
 //сделала массив из строки, разделение пробел (/\s+/)
    var strArr = str.split(/\s+/);
        for (var i = 0; i<strArr.length;i++){
            if(regExp2.test(strArr[i]) || regExp4.test(strArr[i])){
                strArr[i] = strArr[i].toLowerCase();
            } else if(regExp3.test(strArr[i]) || regExp6.test(strArr[i])) {
                strArr[i] = strArr[i].toLowerCase();
                var character = strArr[i].charAt(0).toUpperCase();
                strArr[i] = character + strArr[i].substring(1);
            }
        }
    // console.log("strArr.join(' ')",strArr.join(' '));
    return strArr.join(' ');
}


tasks.push({
    title: "cAPS lOCK",
    solution: capsLock,
    tests: capsLockTests
});
