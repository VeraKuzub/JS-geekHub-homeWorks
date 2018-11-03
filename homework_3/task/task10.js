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


// только прописныe буквы
var regExp1= /^([A-Z]*[A-Z])$/;



// первая буква строчная, потом прописные. В конце может быть прописные или знак '?'
var regExp2 = /^([a-z][A-Z]*)([A-Z]|[//?])$/;




function capsLock(str) {
 //сделала массив из строки, разделение пробел (/\s+/)
    var strArr = str.split(/\s+/);
        for (var i = 0; i<strArr.length;i++){
            if(regExp1.test(strArr[i])){
                console.log('regExp1',strArr[i]);
                strArr[i] = strArr[i].toLowerCase();
            } else if(regExp2.test(strArr[i])) {
                console.log('regExp2',strArr[i]);
                strArr[i] = strArr[i].toLowerCase();
                var character = strArr[i].charAt(0).toUpperCase();
                strArr[i] = character + strArr[i].substring(1);
            }
        }
    console.log("strArr.join(' ')",strArr.join(' '));
    return strArr.join(' ');
}


tasks.push({
    title: "cAPS lOCK",
    solution: capsLock,
    tests: capsLockTests
});
