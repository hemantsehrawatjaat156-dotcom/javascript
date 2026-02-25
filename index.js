// dom create tree like page
// he use for the inner changes

// console.log(document)

// const para=document.querySelector('p')      

// para.textContent="this is para"

// // this code use change the text of para and color of para
// /////////////////////////////////////////////////////////////////////////////////////////////

// const para=document.getElementsByClassName("para");
// para[0].innerText="this is para 1";
// para[1].style.color="red";
// console.log(para);

// //////////////////////////////////////////////////////////////

 
// const para2=document.querySelectorAll('.para');
// para2[0].innerText="this is para 1";
// para2[1].style.color="red";
// console.log(para2);

// const para2=document.querySelector('.para');
// para2[0].innerText="this is para 1";
// para2[1].style.color="red";
// console.log(para2);

// let arr=[236,45,67,89];
// arr.forEach((ele)=>console.log(ele));

// /////////////////////////////////////////////////////////////////

// const oll=document.querySelector('.oll');
// oll.innerHTML="<h1>This is heading</h1><p>This is paragraph</p>";
// console.log(oll)


// const btn=document.querySelector('.btn');
// const myBtn=document.querySelector('#myBtn');


// function message(event){
//     console.log("event.key",event.key)
//     console.log("button clicked")
// }

// btn.addEventListener('keyup',message);
// myBtn.addEventListener('click',()=>{
//     console.log("stop button clicked")
//     btn.removeEventListener('click',message)
// });

// const from=document.querySelector('from');
// from.addEventListener('submit',(event)=>{
//     event.preventDefault()
//     console.log("form submitted")
// })
// const can=document.querySelector('#can');
// const can2=document.querySelector('#can2');
// const btn=document.querySelector('#btn');

// can.addEventListener('click',()=>{console.log("cancel button clicked")})
// can2.addEventListener('click',()=>{console.log("cancel button2 clicked")})
// btn.addEventListener('click',()=>{console.log("submit button clicked")})


// ////////////////////////////////////////////////////////////////////////////////
 
// // debugger
// console.log(a);
// // console.log(b);

// var a=10;
// let b=20;

// console.log(a);
// console.log(b);

// function print(){
//     let c=30;
//     console.log(c);
//     console.log("inside fn")
// }

// print();

// function greet(){
//     console.log("Hello, World!");
// }

// greet();
// console.log("This is a simple greeting function.");

// // debugger

// function first(){
//     second();

// }
// function second(){ 
//     third();
// }
// function third(){
//     console.trace()
// }
// first();

// function infinite(){
//     infinite();
// }
// infinite();

  //////////////////////////////////////////////////////////////////////////////////////


//   setTimeout(() => {
//     alert("Hello, this is a delayed message!");
//   }, 3*1000);

// const timerid=setInterval(() => {
//     console.log("This message is displayed every 2 seconds.");
//     }, 1000);
// console.log(timerid);

// setTimeout(() => {
//     clearInterval(timerid);
// }, 10*1000);


// event loop
// const name=document.querySelector('#name');
// const button=document.querySelector('button');
// const list=document.querySelector('.list');


// button.addEventListener('click',()=>{
//     const nameValue=name.value;
//     const li=document.createElement('li');
//     const deleteBtn=document.createElement('button');
     
//     //providing text
//     deleteBtn.innerText="Delete";
//     li.textContent=nameValue;
//     deleteBtn.addEventListener('click',()=>{
//         list.removeChild(li);
//     })

//     //appending the elements
//     li.appendChild(deleteBtn);
//     list.appendChild(li);

//     //clearing text
//     name.value="";
// })

// callback function they are function passed as an argument to another function

// function greet(){ //callback function
//     console.log("Hello, student!");
// }

// function print(sample,num){ //higher order function
//     sample()
//     console.log("Total students are",num)
// }
// print(greet,45);


// function greet(callback){ //higher order function
//     setTimeout(() => {
//         console.log("Hello, student!");    
//         callback(45);
//     }, 2*1000);
// }


// function print(num){ //callback function
    
//     console.log("Total students are",num)
// }
// greet(print);

//complex example of callback hell
// console.log("starting homework....");

// setTimeout(() => {
//     console.log("homework done!");
//     console.log("starting dinner....");

//     setTimeout(() => {
//         console.log("dinner done!");
//         console.log("Getting ready to go out....");

//         setTimeout(() => {
//             console.log("going to the playground");

//         }, 5*1000); //after dinner

//     }, 2*1000); //dinner time

// }, 3*1000); //homework time

//refactored code to avoid callback hell
// function fini

// promiseFunction(time,message){

// const p=new Promise((res,rej) => {
//     let done=false;
//     setTimeout(() => {
//         if(done){
//             res("work is done");
//         }else{
//             rej("work not done");
//         } 
//     }, 3*1000);
// })

// p.then((msg)=>{
//     console.log(msg)
// }).catch((err)=>{
//     console.log(err)
// }).finally(()=>{
//     console.log("finally block");
// })

// console.log(p);


// function doHomework(){
//     const p=new Promise((res,rej) => {
//         setTimeout(() => {
//             let done=true;
//             if(done){
//                 console.log("homework done!");
//                 res(
//                     "Homework Completed"
//                 );
//             }else{
//                 rej("homework not done");
//             }
//         }, 3000);
//     })

//     return p;
// }

// function eatDinner(){
//     const p=new Promise((res,rej) => {
//         setTimeout(() => {
//             let done=true;
//             if(done){
//                 console.log("dinner done!");
//                 res(
//                     "dinner Completed"
//                 );
//             }else{
//                 rej("dinner not done");
//             }
//         }, 2000);
//     })
//     return p;
// }

// function goToPlayground(){
//     const p=new Promise((res,rej) => {
//         setTimeout(() => {
//             let done=true;
//             if(done){
//                 console.log("went to  playground");
//                 res(
//                     "playground Completed"
//                 );
//             }else{
//                 rej("not allowed");
//             }
//         }, 2000);
//     })
//     return p;
// }

// doHomework().then((msg)=>{
//     console.log(msg);
//     return eatDinner();
// }).then((msg)=>{
//     console.log(msg);
//     return goToPlayground();
// }).then((msg)=>{
//     console.log(msg);
// }).catch((err)=>{

//     console.log(err);
// }).finally(()=>{
//     console.log("go to sleep");  
// });

/////////////////////////////////////////////////////////////////////////


// function orderFood(){
//     return new Promise((res,rej)=>{
//         setTimeout(() => {
//           console.log("food ordered");
//           res()
//         }, 2000);
//     })
// }

// function prepareFood(){
//     return new Promise((res,rej)=>{
//         setTimeout(() => {
//           console.log("food prepared");
//           res()
//         }, 2000);
//     })
// }

// function deliverFood(){
//     return new Promise((res,rej)=>{
//         setTimeout(() => {
//           console.log("food delivered");
//           res()
//         }, 2000);
//     })
// }

// async function order(){
//   await orderFood();
//   await prepareFood();
//   await deliverFood();     
// }

// order();  

// console.log("First Line")
// try{
//   let sample=234
//   console.log(sample)
//   console.log("Line after sample")

// }catch(e){
//   console.log(e)
// }
// console.log("last line")

// console.log("First Line")
// try{
//   let age=16
//   if(age<18){
//      throw new Error("You are not eligilbe to vote")
// }

// }catch(e){                
//   console.warn(e)
// }
// console.log("last line")

// async funtion getData(){
//   try{
//     const response=await fetch("https://dummyjson.com/products")
//     if(response.ok===false){
//       throw new Error("Something went wrong")
//     }
//     const data=await response.json()
//     // console.log(data.product[0].tilte)
//     data.products.forEach((product)=>{
//     console.log(product.title)
//     })
  
//   }catch(err){
//     console.log(err)
//   }
// }
// getData()

// document.cookie="name=Alex;expires-Wed, 25 Feb 2026 23:59:59 UTC"
// document.cookie="name=Alex;expires-Wed, 25 Feb 2026 23:59:59 UTC"

// function generate(){
//   // yield 1
//   // yield 2
//   // yield 3
//   let index=25017343
//   while(true){
//     yield index
//     index++
//   }
// }

// const gen=generate()
// console.log(gen)
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())

function add(a){
  return function(b){
    return functon(c){
      return a+b+c
    }
  }
}

const first=add(1)
console.log(first)
const second=first(2)
console.log(second)
console.log(second(3))

console.log(add(1)(2)(3))