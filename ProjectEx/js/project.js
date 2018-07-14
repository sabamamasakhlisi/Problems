let student = document.getElementById("student"); //this var gets element from html doc with written id
let add = document.getElementById("add");//|---|
let remove = document.getElementById("remove");//|---|
var quantity; //this var saves number of students
let nameList = document.getElementById("nameList");//|---|
let sonOfmain; //this element is for to save text field elements
let momAverage = document.getElementById("average");//|---|
let average; //this one is for to save childNodes of momAverage
var count = 0; //saves number of days
let count1 = 0; 
let count2 = 0; //this element is for "point boxes " id (to have them unic id name)
var day;
var momDay;
let one = 1;
var d = new Date(`2018-04-30`); //saves the starting date
var arr = new Map(); //this is for saving total points of each student individually ,key is the student number and value is total points
var kk = 0; //saves the last filled box მნიშვნელობა ;დ   
var chng = 0;


student.addEventListener("click", function () {
    add.style.visibility = 'visible'; //then quantity button is clicked add button appears
    remove.style.visibility = 'visible'; //same here on remove button
    while (isNaN(quantity) || quantity == undefined || quantity == "") {
        quantity = prompt("Enter Number of Student You want to have in Data : ");
    } //untli user input is not a number propmt window asks user to enter num of students
    document.getElementById('Tstudent').innerText = quantity; //updates Table
    if (one == 1) { //it's possible to use quantity button only once
        for (let i = 0; i < quantity; i++) {
            sonOfmain = document.createElement("INPUT"); 
            sonOfmain.setAttribute("type", "text");
            sonOfmain.setAttribute("placeholder", "Enter Name Here");
            nameList.appendChild(sonOfmain);
            average = document.createElement("DIV");
            average.innerText = "0.00";
            average.id = `average${++count1}`; //makes average divs with unic Id
            momAverage.appendChild(average); 
        }
        one++;
    }
})



add.addEventListener("click", function () {
    // console.log(kk);
    momDay = document.createElement("DIV");
    momDay.className = `day ${count}`; //container of each day Mom Node of student Boxes in each day
    main.appendChild(momDay);
    for (let i = 0; i <= quantity; i++) {
        day = document.createElement("DIV");
        day.id = `student${count2++}`;
        day.innerText = '0';
        momDay.appendChild(day);
    }
    // ww = d.getDay();
    // mm = d.getMonth();
    momDay.firstChild.innerText = generateDate();
    chng=1; //this is for making first day 30 apr , I will explain it in generateDate() function
    count++; //raises the count variable to save number of days
   countMiss(count2); //updates statistics of missed lessons
    fillbox(); //filles the clicked box
    saveAver(count); //saves avarage of each student and dispplyaes it in avarage box 
    autoTotalAverage(); //updates statistics of all studantes avarage score
    
    document.getElementById("Tday").innerText = count; //updates the total days in the statistics board
})

remove.addEventListener("click", function () {
    if(count>0){ //if there are some days to delete than it does this things explaeined below
    if (document.getElementsByClassName(`day ${count - 1}`)[0] != null) { 
        for (let i = 1; i <= quantity; i++) {
            if (arr.has(i)) { //if there are students wich have some score than find this student in map and minus from total  his/her score of last day 
                arr.set(i, arr.get(i) - Number(document.getElementsByClassName(`day ${count - 1}`)[0].childNodes[i].innerText)); 
            }
        }
        // console.log(arr);
        document.getElementsByClassName(`day ${count - 1}`)[0].remove(); //removes last day column
        count--; //decreasing num of days
        saveAver(count); //change average automaticly
        autoTotalAverage(); //change Total Average 
        count2 = count2 - quantity - 1; //clear student box Ids of last day
        document.getElementById("Tday").innerText = count; //update num of days in statistic boars
        countMiss(count2); //change Missed lessons
        deleteDay(); //delete date of removed day
    }}
})

/*
this function checks arr collection (map) values on the specified key and checks number of days 
if there is no Problem than updates Avarage values of each Student 
*/
function saveAver(nm) {
    for (let i = 1; i <= quantity; i++) { 
        if (!isNaN(arr.get(i)) && nm!=0){
            document.getElementById(`average${i}`).innerText = (Number(arr.get(i)) / nm).toFixed(2);
    } else if(nm == 0){
        document.getElementById(`average${i}`).innerText = '0.00';
    }
    }
}

/*
this function saves each student points in map collection 
the first if scope tries to collect one student row ... 
if student is not scored yet , and the row is empty and the collection key is undefiend this means that KK (last num of score) is zero
if not than KK is the num of score of student before edited
*/

function saveinArr(numi) {
    let sv = numi;
    if (numi > quantity) {
        while (numi > quantity) {
            numi = numi - quantity - 1;
        }
    }
    if (arr.get(numi) == undefined) {
        kk = 0;
        arr.set(numi, kk += Number(document.getElementById(`student${sv}`).innerText));
    } else if (arr.get(numi) != undefined) {
        kk = arr.get(numi);
        arr.set(numi, kk += Number(document.getElementById(`student${sv}`).innerText));
    }
    // console.log(arr);
    document.getElementById(`average${numi}`).innerText = (arr.get(numi) / count).toFixed(2);
}


function fillbox() {
    for (let i = 1; i < count2; i++) {
        document.getElementById(`student${i}`).onclick = function () {
            if (document.getElementById(`student${i}`).style.backgroundColor == "darkgreen") {
                arr.set(convert(i), arr.get(convert(i)) - Number(document.getElementById(`student${i}`).innerText));
            }
            let k = prompt("Enter Grade to fill box : ");
            document.getElementById(`student${i}`).innerText = checkfill(k);
            saveinArr(i);
            if (k > 0 ) {
                document.getElementById(`student${i}`).style.backgroundColor = "darkgreen";
            }
            if(checkfill(k)==0) {
                document.getElementById(`student${i}`).style.backgroundColor = "crimson";
            }
            autoTotalAverage();
            countMiss(count2);
        }
    }
}

function convert(x) {
    if (x > quantity) {
        while (x > quantity) {
            x = x - quantity - 1;
        }
        return x;
    }
}

/*
if greater than 5 boxx must be green and value must be 5
if less than 0 boxx must be red and value must be 0
*/

function checkfill(variable) {
    if (variable >= 5) {
        return variable = 5;
    }
    if (variable <= 0) {
        return variable = 0;
    }
    if (isNaN(variable) || variable == undefined || variable == "") {
        return variable = 0;
    }
    else return variable;
}

function autoTotalAverage (){
    let total = Number(0);
    for(let i = 1;i<=quantity;i++){
        total += Number(document.getElementById(`average${i}`).innerText);
    }
    document.getElementById("Amark").innerText = Number(total/quantity).toFixed(2);
}

function countMiss (tk){
    var miss = 0;
    var queAd = Number(quantity) + 1;
    for(let i = 1;i<tk;i++){
    if (document.getElementById(`student${i}`).style.backgroundColor !="darkgreen"){
            miss++;
            if(i%queAd == 0)miss--;
    }
}
    document.getElementById("Mlesson").innerText = miss;
}

console.log(d.getMonth());
console.log(d.getFullYear());

function generateDate (){
    let day = d.getDay();
    if(chng!=0){
    if (day == "1") {
        d = new Date(d.getTime() + 2 * (24 * 60 * 60 * 1000))

    }
    else if (day == "3") {
        d = new Date(d.getTime() + 2 * (24 * 60 * 60 * 1000))


    }
    else if (day == "5") {
        d = new Date(d.getTime() + (24 * 60 * 60 * 1000));


    } else if (day == "6") {

        d = new Date(d.getTime() + 2 * (24 * 60 * 60 * 1000));

    } 
}
    let string = d.toString().split(" ");
    return string[0] + " " + string[1] + " " + string[2];
}
console.log(generateDate());
function deleteDay (){
    let day  = d.getDay();
    console.log(day);
    if (day == "1") {
        d = new Date(d.getTime() - 2 * (24 * 60 * 60 * 1000))

    }
    else if (day == "3") {
        d = new Date(d.getTime() - 2 * (24 * 60 * 60 * 1000))


    }
    else if (day == "6") {
        d = new Date(d.getTime() - (24 * 60 * 60 * 1000));


    } else if (day == "5") {
        d = new Date(d.getTime() - 2 * (24 * 60 * 60 * 1000));

    }
    console.log(d);
}