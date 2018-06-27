//ყველა დავალებაა შაბათს გარჩეული + ორშაბათის დავალება , გაძლიერებული კალკულატორი და car დაკომენატარებული არ არის

//#region ex1
// 'use strict'

// let product = new Object ();

// product = {
//     name : "laptop",
//     price : 1200
// }

// product.price = 1000;
// console.log(product.name,product.price);
// delete(product.price);
// console.log(product.price);

//#endregion ex1

//#region ex2

// let salaries = {
//     John : 100,
//     Ann : 160,
//     Peter : 130
// }

// let sum = 0;
// for (let key in salaries){
//     sum+=salaries[key];
// }
// console.log(sum);
//#endregion ex2
//#region ex3
// //ex3 
// let calculator = {
//     read (){
//        this.first =  Number(prompt("Enter first Number : "));
//         this.second = Number(prompt("Enter Second Number"));
//     },
//     sum (){
//         return this.first + this.second;
//     },
//     mul(){
//         return this.first*this.second;
//     }
// }
// calculator.read();
// console.log(calculator.sum(),calculator.mul());
//#endregion ex3
//#region ex4
// // //ex4
// // function makeUser(){
// //     return{
// //         name : "John",
// //         ref : this
// //     };
// // };

// // let user = makeUser();
// // alert(user.ref.name);
//#endregion ex4
//#region ex5
// //ex5
// let ladder = {
//     step : 0,
//     up() {
//         this.step++;
//         return this;
//     },
//     down(){
//         this.step--;
//         return this;
//     },
//     showStep : function (){
//         alert(this.step);
//     }
// }
// ladder.up().up().down().showStep();
//#endregion ex5

//#region ex6
// //ex6
// function Calculator (){
//     this.read =function(){
//         this.first = Number(prompt("Enter the first number"));
//         this.second = Number(prompt("Enter the second number"));
//         this.third = Number(prompt("Enter the third number"));
//     },
//     this.sum = function (){
//         return this.first + this.second + this.third;
//     }
//     this.mul = function (){
//         return this.first*this.second*this.third;
//     }
// }
// let calculatorS = new Calculator();
// calculatorS.read();
// alert("Sum :" + calculatorS.sum());
// alert("Mul : " + calculatorS.mul());
//#endregion ex6
//#region ex7
//ex7
// function Acumulator(stringValue){
//     this.value  = stringValue;
//     this.read = function(){
//         this.save = prompt("Enter the string value")
//         this.value = this.save;
//     }
// }

// let acumulator = new Acumulator(1);
// acumulator.read();
// acumulator.read();
// console.log(acumulator.value);
//#endregion ex7

//ex8
function Calculator () {
    let math = {
        "+":  (x, y) => x + y , //arrow function it's like if/else function , for ex. if(op =="+") sum up ..
        "-": (x, y) => x-y //same here
    };
    this.calc = function(str){
        let first = parseInt(str.charAt(0)); //this method takes first char of a string and parses to the int 
        let second = parseInt(str.charAt(str.length-1)); //second number
        let operator = str.substr(1,str.length-2); //it takes the operator from the input
        return math[operator](first,second);
    }
    this.addMethod = function (name,func){
        math[name] = func; //this function adds new method to the function math , it's a like array or map , key is a operator name and value is a function 
    };
}


let result = new Calculator ();
result.addMethod("*",(a,b)=>a*b);
console.log(result.calc("3*5"));


//ExForMonday 

function Car () { //Function constructor
  this.setName = function(str4) {  
      return str4;
  },
  this.setColor = function(str1){
    return str1;
  },
  this.setBrand = function(str2){
      return str2;
  }
  this.save = function(str3){
      return str3;
  }
}

let car = new Car;
let result1;
console.log (car.setName("Jetta") , car.setColor("Blue") , car.setBrand("VW"),car.save("saving..."));
alert(car.setName("Jetta") +" "+ car.setColor("Blue") +" "+ car.setBrand("VW")+" "+car.save("saving..."));

// OUTPUT:
// > saving Jetta, color - Platinum Gray Metallic, brand - VW...
