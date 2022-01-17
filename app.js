//Areas
let menuArea = document.getElementById('menuArea');
let scoreArea = document.getElementById('scoreArea');
let chooseHeroArea = document.getElementById('chooseHeroArea');
let eventsArea = document.getElementById('eventsArea');

//btns
let startGameBtn = document.getElementById('startGame');
let restartGameBtn = document.getElementById('restartGame');
let chooseThisHeroBtn = document.getElementById('chooseThisHero');
let chooseAnotherHeroBtn = document.getElementById('chooseAnotherHero');
let fightBtn = document.getElementById('fight');

//Character and events values
let score = document.getElementById('score');
let characterCard = document.getElementById('characterCard');
let nameArea = document.getElementById('name');
let attack = document.getElementById('attack');
let life = document.getElementById('life');
let eventArea = document.getElementById('event');
let point = document.getElementById('point');
let count;

//Character
let myHero;

//Listeners
startGameBtn.addEventListener("click", startingGame);
chooseAnotherHeroBtn.addEventListener("click", createAHero);
chooseThisHeroBtn.addEventListener("click", choosenHero);
fightBtn.addEventListener("click", fight);
restartGameBtn.addEventListener("click", startingGame);
//At the beginning
scoreArea.style.display = "none";
chooseHeroArea.style.display = "none";
eventsArea.style.display = "none";

//Fcts
function startingGame(){
    console.log('startingGame');
    scoreArea.style.display = "block";
    menuArea.style.display = "none";
    count = 0;
    createAHero();
    chooseAnotherHeroBtn.style.display = "block"; //necessaire pour le restart
    chooseThisHeroBtn.style.display = "block"; //necessaire pour le restart
    chooseHeroArea.style.display = "block";
}

function createAHero(){
    let names = ['Alaric', 'Alan', 'Alistair', 'Alexander', 'Albator', 'Alala']
    let nameValue = names[Math.floor(Math.random() * 6)];
    let attackPoints = Math.floor(Math.random() * 6) + 1;
    let lifePoints = Math.floor(Math.random() * 12) + 1; // Change difficulty here

    nameArea.innerHTML = nameValue;
    attack.innerHTML = attackPoints;
    life.innerHTML = lifePoints;

    myHero = new MyChoosenHero(nameValue, attackPoints, lifePoints);
    console.log(myHero);
}

function choosenHero(){
    console.log('choosenHero');
    createEnnemy();
    chooseAnotherHeroBtn.style.display = "none";
    chooseThisHeroBtn.style.display = "none";
    eventsArea.style.display = "block";
}

function createEnnemy(){
    let nameValue;
    let eventValue;
    if(Math.random() < 0.1){ // Change difficulty here
        nameValue = 'Potion';
        eventValue = Math.floor(Math.random() * 2) + 1; // Change difficulty here
    }else{
        let names = ['Werewolf', 'Vampire', 'Sorcerer', 'Ghoul', 'Banshee', 'Golem']
        nameValue = names[Math.floor(Math.random() * 6)];
        eventValue = (Math.floor(Math.random() * 6) + 3); // Change difficulty here
    }
    eventArea.innerHTML = nameValue;
    point.innerHTML = eventValue;
}

function fight(){
    console.log('fight');
    if(eventArea.innerHTML == 'Potion'){
        myHero.updateHealth(parseInt(point.innerHTML));
        life.innerHTML = myHero.lifePoints;
        checkGameStatus();
    }else{
        if(point.innerHTML < attack.innerHTML){
            checkGameStatus();
            
        }else{
            myHero.updateHealth(-1);
            life.innerHTML = myHero.lifePoints;
            checkGameStatus();
        }
    }
}

function checkGameStatus() {
    console.log('checkGameStatus');
    if(myHero.lifePoints > 0){
        createEnnemy();
        updateScore();
    }else{
        gameOver();
    }
}

function updateScore(){
    console.log('updateScore');
    count = count + 1;
    console.log(count);
    score.innerHTML = count;
}

function gameOver(){
    console.log('gameOver');
    chooseHeroArea.style.display = "none";
    eventsArea.style.display = "none";
    score.innerHTML ="Your hero survive " + count + " turns. You'll do better next time..." ;
}

//Create a heroObject 
class MyChoosenHero {
    constructor(heroName, attackPoints, lifePoints){
        this.name = heroName;
        this.attackPoints = attackPoints;
        this.lifePoints = lifePoints;
    }
    updateHealth(value){
        console.log('updateHealth');
        this.lifePoints = this.lifePoints + value;
    }
}
