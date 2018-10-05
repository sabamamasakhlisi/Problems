window.onload = function () {
var canWidth = 600;
var canHeight = 600;
let element = document.getElementsByClassName("startIm");
let storage = window.localStorage;
let STORAGE_KEY = "info";
var serpant;
let direction = "down";
let score = 0;
let lengthDefault = 10;
var mode;
var speed;
var appleCount;
var canSize;
let data;
let dataIsFIlled = false;
let highscore=0;

function button(idname, txtName) {
    let father;
    let idN = idname;
    let txtN = txtName;
    father = document.createElement("BUTTON");
    father.appendChild(document.createTextNode(txtName));
    father.id = idname;
    document.getElementsByClassName("container")[0].appendChild(father);
}

function headerN() {
    let txt = document.createElement("H1");
    let innerTxt = document.createTextNode("SNAKE");
    txt.appendChild(innerTxt);
    txt.id = "snakeN";
    document.getElementsByClassName("container")[0].appendChild(txt);
}

window.addEventListener("keydown", enterKey);

setTimeout(function () {
    element[0].remove();
    document.getElementsByClassName("container")[0].appendChild(canvas);
    document.getElementsByClassName("header")[0].style.visibility = "visible";
    headerN();
    button("gNode", "Game Mode")
    button("oNode", "Settings");
    button("iNode", "Instructions");
    button("high", "High Score");
    gameMode();
}, 5001);

function gameMode() {
    document.getElementById("gNode").onclick = function () {
        let cont = document.getElementsByClassName("container");
        while (cont[0].childNodes.length > 1) {
            cont[0].removeChild(cont[0].lastChild);
        }
        inputDificullty();
        quantityApp();
        sizeofBoard();
        playNext();
        document.getElementById("random").onclick = function () {
            appleCount = Math.floor((Math.random() * 5) + 1);
        }
        document.getElementsByClassName("dropdown-content")[0].onchange = function () {
            canSize = getSize();
        }
        document.getElementById("pl").onclick = function () {
            let cont = document.getElementsByClassName("container");
            mode = getMode();
            speed = getSpeed();
            console.log(appleCount);
            while (cont[0].childNodes.length > 1) {
                cont[0].removeChild(cont[0].lastChild);
            }
            // window.addEventListener("keydown", move);
            completeForStart();
            if (typeof game_loop != "undefined") clearInterval(game_loop);
            game_loop = setInterval(game,manageSpeed());
            // document.getElementById("sound").play();
            manageData();
            if (!dataIsFIlled) {
                data.speed = speed;
                data.lengthDefault = lengthDefault;
                data.applN = appleCount;
                data.canSi = canSize;
                data.gmode = manageSpeed();
                manageData();
                console.log(manageSpeed());
            }
    }
        document.getElementById("cont").onclick = function () {
            if(data.score != 0){
            appleCount = data.applN-1;
            lengthDefault = data.snakeLen;
            canSize = data.canSi;
            score = data.score;
            while (cont[0].childNodes.length > 1) {
                cont[0].removeChild(cont[0].lastChild);
            }
            // window.addEventListener("keydown", move);
            completeForStart();
            if (typeof game_loop != "undefined") clearInterval(game_loop);
            game_loop = setInterval(game,data.gmode);
        }
    }
    }
}



function getMode() {
    let dc = document.getElementsByName('rad');
    let sc = document.getElementsByName('radk');
    console.log(dc);
    for (let i = 0; i < 3; i++) {
        if (dc[i].checked) return i;
    }

}
function getSpeed() {
    let sc = document.getElementsByName('radk');
    for (let k = 0; k < 5; k++) {
        if (sc[k].checked) return k;
    }
}

function getSize() {
    var selector = Number(document.getElementsByClassName('dropdown-content')[0].value);
    return selector;
}

function manageSpeed (){
    return 100/((mode+1)*(speed+1));
}


let easy;
let medium;
let hard;
function createCeck(diff, indexN, spanTxt, idN) {
    // let block = document.createElement("DIV");
    // block.className = `block`;
    // nm[0].appendChild(block);

    diff = document.createElement("INPUT");

    var diffAtr = document.createAttribute("data-index");
    diffAtr.value = indexN;
    // diff.id = idN;
    diff.setAttributeNode(diffAtr);
    let diffAtr2 = document.createAttribute("type");
    diffAtr2.value = "radio";
    diff.setAttributeNode(diffAtr2);
    let span = document.createElement("SPAN");
    let spanTx = document.createTextNode(spanTxt);
    span.className = "checkmark";
    let label = document.createElement("LABEL");
    let labelAt = document.createAttribute("for");
    document.getElementsByClassName("container")[0].appendChild(label);

    label.className = `block block${indexN}`;
    labelAt.value = spanTxt;
    label.setAttributeNode(labelAt);
    label.appendChild(spanTx);


    label.appendChild(diff); label.appendChild(span);
    let nmE = document.createAttribute("name");
    nmE.value = "rad";
    diff.setAttributeNode(nmE);
    let val = document.createAttribute("value");
    val.value = "one";
    diff.setAttributeNode(val);
    console.log(document.getElementsByName("rad"));
}


function createSp() {
    let sp = document.createElement("DIV");
    sp.className = "wrp";
    let spL = document.createElement("LABEL");
    for (let i = 1; i <= 5; i++) {
        let s = document.createElement("INPUT");
        spL.className = `speed${i}`
        let splTx = document.createTextNode(`${i}x`);
        spL.appendChild(splTx);
        let sV = document.createAttribute("type");
        sV.value = "radio";
        let nmE = document.createAttribute("name");
        nmE.value = "radk";
        s.setAttributeNode(nmE);
        s.setAttributeNode(sV);
        spL.appendChild(s);
        sp.appendChild(spL);
        document.getElementsByClassName("container")[0].appendChild(sp);
    }
}

function inputDificullty() {
    let txt = document.createElement("H3");
    document.getElementsByClassName("container")[0].appendChild(txt);
    let inTxt = document.createTextNode("SELECT DIFFICULTY");
    txt.id = "dif";
    txt.appendChild(inTxt);
    let txt2 = document.createElement("h3");
    let inTxt2 = document.createTextNode("SELECT SPEED");
    txt2.appendChild(inTxt2);
    txt2.id = "sp";
    document.getElementsByClassName("container")[0].appendChild(txt2);
    createCeck(easy, 0, "EASY", "easy");
    createCeck(medium, 1, "MEDIUM", "medium");
    createCeck(hard, 2, "HARD", "hard");
    createSp();
}

function quantityApp() {
    let apph3 = document.createElement("H3");
    let appTxt = document.createTextNode("QUANTITY OF APPLES");
    apph3.id = "apph3";
    apph3.appendChild(appTxt);
    document.getElementsByClassName("container")[0].appendChild(apph3);
    let random = document.createElement("BUTTON");
    let txtf = document.createTextNode("ROLL");
    random.appendChild(txtf);
    random.id = "random";
    document.getElementsByClassName("container")[0].appendChild(random);
}

let pxParse = function (num) {
    return `${num}px`;
}


let canvas = document.createElement('CANVAS');
let back = document.createElement('DIV');
back.className = "bg";
canvas.id = "canvas";
 canvas.setAttribute("width",pxParse(canWidth));
canvas.setAttribute("height",pxParse(canHeight));
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function sizeofBoard() {
    let sz = document.createElement("H3");
    let szTxt = document.createTextNode("Size Of Board");
    sz.id = "szh3";
    sz.appendChild(szTxt);
    document.getElementsByClassName("container")[0].appendChild(sz);
    let dropDown = document.createElement("DIV");
    let dropdownCont = document.createElement("SELECT");
    let innerP;
    let form = document.createElement("FORM");
    for (let i = 1; i < 4; i++) {
        let p = document.createElement("OPTION");
        p.className = `size${i}`;
        innerP = document.createTextNode(`${i * 300}x${i * 300}`);
        p.appendChild(innerP);
        p.setAttribute("value", i);
        dropdownCont.appendChild(p);
    }

    dropDown.className = "dropdown";
    dropdownCont.className = "dropdown-content";
    form.appendChild(dropDown);
    dropDown.appendChild(dropdownCont);
    document.getElementsByClassName("container")[0].appendChild(dropDown);
}

class Data {
    constructor () {
        this.speed = speed;
        this.applN = appleCount;
        this.canSi = canSize;
        this.snakeLen = lengthDefault;
        this.score = score;
        this.highScore = 0;
        this.gmMode = manageSpeed();
    }
}

 if (storage.getItem(STORAGE_KEY) != null) {
    getData();
    iHaveDefaults = true;
} else {
    data = new Data();
}

function manageData() {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getData() {
    data = JSON.parse(storage.getItem(STORAGE_KEY));

}


var playNext = function () {
    var but = document.createElement("BUTTON");
    but.id = "pl";
    var butFil = document.createTextNode("Play Game");
    but.appendChild(butFil);
    var cont = document.createElement("BUTTON");
    cont.id = "cont";
    var contFil = document.createTextNode("Continue");
    cont.appendChild(contFil);
    document.getElementsByClassName("container")[0].appendChild(but);
    document.getElementsByClassName("container")[0].appendChild(cont);
}

function playGame() {
    document.getElementById("pl").onclick = function () {
        let cont = document.getElementsByClassName("container");
        while (cont[0].childNodes.length > 1) {
            cont[0].removeChild(cont[0].lastChild);
        }
    }
}

function completeSize (size){
    if(size == 1) return Number(300);
    if(size ==2) return Number(600);
    if(size == 3) return Number(900);
}
let apples;
function completeForStart () {
    canWidth = completeSize(canSize);
    canHeight = completeSize(canSize);
    canvas.style.width = pxParse(canWidth);
    canvas.style.height = pxParse(canHeight);
    apples = new Apple();
    apples.findPosition(appleCount);
    apples.createApple(appleCount);
    serpant = new Snake();
    serpant.startSnake();
    mainSnake();
}


class Apple {
    constructor() {
        this.apples = apples;
        this.cw = 10;
        this.food = []
    }
    findPosition(number) {
        for (let i = 0; i < number; i++) {
            this.food.push({
                x: Math.round(Math.random() * (completeSize(canSize) - 10) / 10),
                y: Math.round(Math.random() * (completeSize(canSize) - 10) / 10)
               
            }); 
        }
    }
    createApple(number) {
        for (let i = 0; i < number; i++) {
            let num = this.food[i];
            let x = num.x;
            let y = num.y;
            ctx.fillStyle = "#8d29ac";
            ctx.fillRect(x*10, y*10, 10, 10);    
            ctx.strokeStyle = "white";                            
            ctx.strokeRect(x*10 , y*10 , 10, 10);
        }
    }
}

class Snake {
    constructor () {
        this.snake = [];
    }
    startSnake() {
        for (let i = lengthDefault; i >= 0; i--) {
            this.snake.push({ x: i, y: 0 });
        }
    }
}

function  mainSnake () {
    let x ;
    let y;
    var grd=ctx.createLinearGradient(0,0,180,0);
    grd.addColorStop(0,"#8d29ac");
    grd.addColorStop(0.5,"white")
    grd.addColorStop(1,"rgb(94, 39, 165)");
    for (let i = 0; i < serpant.snake.length; i++) {
        let number = serpant.snake[i];
         x = number.x;
         y = number.y;
    ctx.fillStyle = grd;
    ctx.fillRect(x * 10, y * 10, 10, 10);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * 10, y * 10, 10, 10);
}
}

function enterKey(event) {
    switch (event.key) {
        case 'ArrowUp': direction = 'up'; break;
        case 'ArrowDown': direction = 'down'; break;
        case 'ArrowLeft': direction = 'left'; break;
        case 'ArrowRight': direction = 'right'; break;
        default: break;
    }
    // console.log(direction);
    event.preventDefault();
}

function game () {
    let snakeX = serpant.snake[0].x;
    let snakeY = serpant.snake[0].y;
    // console.log(snakeX);
    // console.log(snakeY);
    switch(direction){
        case 'down' : snakeY++; break;
        case 'up' : snakeY--; break;
        case 'left' : snakeX--; break;
        case 'right' : snakeX++; break;
    }
    let save = serpant.snake.pop();
    let save2 = save;
    document.getElementById("sound").play();
    save.x = snakeX;
    save.y = snakeY;
    serpant.snake.unshift(save);
  
    if(checkLose(snakeX,snakeY,serpant.snake)){
        console.log(snakeX,snakeY);
        clearInterval(game_loop);
        localStorage.clear();

        endOfGame();
    }
    for (let i = 0; i < serpant.snake.length; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        mainSnake();
    }
    appleEaten(snakeX,snakeY);
   
    apples.createApple(appleCount);
    let Text = "Score  " + score;

    let high = "High Score :" + data.highscore;
    console.log(data.highscore);
    ctx.fillText(Text, 50, 30, 60, 60);
    ctx.fillText(high,180,30,80,80);
    ctx.font = "30px Arial";
    
}

function appleEaten (Sx,Sy){
    let x;
    let y;
    let tail;
    for (let i = 0; i < apples.food.length; i++) {
         x = apples.food[i].x;
        y = apples.food[i].y;
        if (Sx == x && Sy == y) {
            tail ={
                x : Sx,
                y : Sy
            }
            serpant.snake.unshift(tail);
            apples.food.splice(i, 1);
            apples.findPosition(1);
            apples.createApple(1);
            score = score + 10; 
            lengthDefault++;
            data.score = score;
            data.snakeLen = lengthDefault;
            manageData();
        }
}
}

function drawScore (sc) {
    var drScore = document.createElement("DIV");
    drScore.id = "score";
    var text = document.createTextNode(`SCORE + ${sc}`);
    drScore.appendChild(text);
    document.body.appendChild(drScore);
}

function collision(x, y, array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i].x == x && array[i].y == y)
            return true;
    }
    return false;

}

function checkLose (x,y,array) {
    if(x < 0 || x>=60 || y < 0 || y >= 60 || collision(x,y,array)) {
            return true;
    } 
    return false;
}

function endOfGame () {
    document.getElementById("canvas").remove();
    let gmImage = document.createElement("IMG")
    gmImage.id = "gm";
    gmImage.setAttribute("src", "js/gm-over.png");
    document.getElementsByClassName("container")[0].appendChild(gmImage);
    let playAgain = document.createElement("BUTTON");
    let tx = document.createTextNode("Play Again");
    playAgain.appendChild(tx);
    playAgain.id = "again";
    document.getElementsByClassName("container")[0].appendChild(playAgain);
    let exit = document.createElement("BUTTON");
    let txx = document.createTextNode("Exit");
    exit.appendChild(txx);
    exit.id = "exit";
    document.getElementsByClassName("container")[0].appendChild(exit);
    if(score>=highscore) {
        highscore=score;
        data.highscore=highscore;
        manageData();

    }
    endeSpiel();
    
    againSpiel();
}

function endeSpiel () {
    document.getElementById("exit").onclick = function (){
       document.getElementsByClassName("container")[0].remove();
    }
}
function againSpiel (){
    document.getElementById("again").onclick = function (){
        window.location.reload();
    }
}

}

