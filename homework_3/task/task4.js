'use strict';

/**
 * Упражнение на строки
 *
 * Петя записался в кружок по программированию.
 * На первом занятии Пете задали написать простую программу.
 * Программа должна делать следующее: в заданной строке, которая состоит из прописных и строчных латинских букв, она:
 * удаляет все гласные буквы,
 * перед каждой согласной буквой ставит символ ".",
 * все прописные согласные буквы заменяет на строчные.
 *
 * Гласными буквами считаются буквы "A", "O", "Y", "E", "U", "I", а согласными — все остальные.
 * На вход программе подается ровно одна строка, она должна вернуть результат в виде одной строки,
 * получившейся после обработки.
 *
 * Помогите Пете справиться с этим несложным заданием.
 */

var stringDotTests = [
    {
        parameters: ["tour"],
        expectedResult: ".t.r"
    },
    {
        parameters: ["GeekHub"],
        expectedResult: ".g.k.h.b"
    },
    {
        parameters: ["aBAcAba"],
        expectedResult: ".b.c.b"
    },
    {
        parameters: ["aa"],
        expectedResult: ""
    }
];


function stringDot(word) {
    word = word.toUpperCase();
    var arr = word.split("");
    for (var i = 0; i<arr.length; i++){
        if(arr[i]==="A" || arr[i]==="O" || arr[i]==="Y" || arr[i]==="E" || arr[i]==="U" || arr[i]==="I"){
            arr.splice(arr.indexOf(arr[i]),1);
            i--;
        }
    } if (arr.length>0) {
        word = arr.join(".");
        word = "." + word.toLowerCase();
    }  else word = "";
    return word;
}


tasks.push({
    title: "Упражнение на строки",
    solution: stringDot,
    tests: stringDotTests
});
