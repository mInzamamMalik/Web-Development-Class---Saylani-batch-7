// this.userName = "Ali Mughal";

// regular function/
// const callMe = function () {
//     console.log(this.userName);
// }
//     function callMe() {
//         this.userName = "Ali";
//         console.log(this.userName);
// }
// callMe()

// arrow function
// const callMe2 = () => {
//     console.log(this.userName);
// }

// const multiply = (x) => x * x;
// const multiply = (x) => {
//     return x * x
// };
// console.log(multiply(5));

// function onChangeHandler(evnt) {
//     console.log(evnt.value);
// }

// const onChangeHandler = (ev) =>{
//     console.log(ev.value)
// }


// const email = "majid@gmail.com";
// (email === "majid@gmail.com") ? alert("correct email") : alert("incorrect email");

// if (email === "majid@gmail.com") {
//     alert("correct email")
// } else {
//     alert("incorrect email")
// }


// de structuring
// const userDetails = ({ name, roll ,city}) => {
// const userDetails = (user) => {
//     const { name, roll, city } = user;
//     console.log("Name " + name);
//     console.log("RollNumber " + city);
// }
// userDetails({ name: "Majid", roll: 164, city: "Khi" });

// const userDetails = (user) => {
//     const [name, roll, city] = user;
//     console.log("Name " + name);
//     console.log("City " + city);
// }
// userDetails(["Majid", "email@gmail.com", 123]);


const userName = "Majid";
const email = "Majid@gmail.com";
// const message = "Hi " + userName + ", Your email is " + email;
const message = `Hi ${userName} your email ${email}`;

// const msg = "hello 
// wolrd"

const msg = `h
q
w`

console.log(message);