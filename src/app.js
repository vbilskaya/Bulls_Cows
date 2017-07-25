/**
 * Created by Lera on 23.07.2017.
 */
"use strict";

class Player {
    enterNumber() {

    }
}

class Game {

    constructor(){
        this.printer=new Printer();
    }

    checkPlayerNumber(playerNumber, randomNumber) {
        let a = playerNumber.toString().split('');
        let b = randomNumber.toString().split(',');
        let bulls = 0;
        let cows = 0;
        b.forEach(function (item, i, b) {
            a.forEach(function (it, j, a) {
                if (b[i] === a[j] && i === j) {
                    bulls++;
                } else if (b[i] === a[j]) {
                    cows++;
                }
            })
        });
        let result = {
            bulls_count: bulls,
            cows_count: cows,
            random_lenght: b.length
        };
        this.printer.showStatistic(playerNumber, bulls, cows);
        this.onGameEnd(bulls, b.length);
        return result;
    }

    onGameEnd(bullsCount, randomLenght) {
        if (bullsCount === randomLenght) {
            this.printer.showEndGameMsg();
        }
    }



}

class Printer{

    showEndGameMsg(){
        alert("Вы выиграли");
    }

    showStatistic(playerNumber, bulls, cows) {
        let container = document.querySelector('.result');
        let div = document.createElement('div');
        div.classList.add('table_result');
        let span = document.createElement('span');
        let span2 = document.createElement('span');
        let span3 = document.createElement('span');
        container.appendChild(div);
        div.appendChild(span);
        div.appendChild(span2);
        div.appendChild(span3);
        span.innerHTML = " Ваше число: " + playerNumber;
        span2.innerHTML = " Быки: " + bulls;
        span3.innerHTML = " Коровы: " + cows;
    }
}

class Combination {

    constructor(lenght) {
        this.lenght = lenght;
    }

    comb() {
        let rand_numbers = [];
        for (let i = 0; i < this.lenght; i++) {
            this.rand(rand_numbers);
        }
        return rand_numbers;
    }

    rand(rand_numbers) {
        while (true) {
            let result = Math.floor(Math.random() * 9);
            if (rand_numbers.indexOf(result) === -1) {
                rand_numbers.push(result);
                return result;
            }
        }
    }

}
let length = 5;
let my_combination = new Combination(length);
let array = my_combination.comb();
let game = new Game();

let button = document.querySelector('.enter-number');
button.addEventListener("click", checkNumber);

let reset = document.querySelector('.reset');
reset.addEventListener('click', startAgain);


function checkNumber() {
    let number = document.querySelector('.player-number').value;
    game.checkPlayerNumber(number, array);
    document.querySelector('.player-number').value = '';
}

function startAgain(){
let table = document.querySelector('.result');
    let results = document.querySelectorAll('.table_result');
    for(let i=0; i<results.length; i++) {
        table.removeChild(results[i]);
    }
    document.querySelector('.player-number').value = '';
    array = my_combination.comb();
}