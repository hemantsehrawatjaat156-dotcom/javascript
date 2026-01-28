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



const name=document.querySelector('#name');
const button=document.querySelector('button');
const list=document.querySelector('.list');


button.addEventListener('click',()=>{
    const nameValue=name.value;
    const li=document.createElement('li');
    const deleteBtn=document.createElement('button');
     
    //providing text
    deleteBtn.innerText="Delete";
    li.textContent=nameValue;
    deleteBtn.addEventListener('click',()=>{
        list.removeChild(li);
    })

    //appending the elements
    li.appendChild(deleteBtn);
    list.appendChild(li);

    //clearing text
    name.value="";
})
