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


// const userName = "Majid";
// const email = "Majid@gmail.com";
// // const message = "Hi " + userName + ", Your email is " + email;
// const message = `Hi ${userName} your email ${email}`;

// // const msg = "hello 
// // wolrd"

// const msg = `h
// q
// w`

// console.log(message);



// const makeToUppercase = (text = "abc") => text.toUpperCase();

// const getCurrentTS = () => {
//     // set date into var
//     const date = new Date();
//     const currentTS = date.toLocaleString();
//     return currentTS
// }

// const onPress = () => {
//     const input = document.getElementById("inp");
//     console.log(makeToUppercase(input.value));
//     console.log("Get Time ", getCurrentTS());
// }



// const num1 = 5;
// const num2 = 9;

// const message = `Total Amount is ${num1 + num2}`
// alert(message)


const obj1 = {
    name: "Ali",
    age: "35",
    city: "karachi",
    country: "Pakistan",
}

const obj2 = {
    email: "ali@gmail",
    address: "bahadurabad saylani",
}

// const obj3 = { ...obj1, ...obj2, age2: 25 }
// console.log(obj3);


// const sum = (a, b) => a * b;
// console.log(sum(...[5, 5, 10]))



// obj1.age = "40"
// const newObj = Object.assign({}, obj1);
// newObj.gender = "Male"
// console.log(obj1);
// console.log(newObj);




// alert(1)
// alert(2)
// setTimeout(() => {
//     alert(3)
// }, 1000);
// alert(4)

// pending 
// resolve // success
// reject // failed

// const isCows = false;
// const myPromise = new Promise((resolve, reject) => {
//     if (isCow) {
//         resolve({ message: "Cow mil gai" })
//     } else {
//         reject("cow nh mili")
//     }
// })

// myPromise
// .then((response) => {
//     console.log(response)
// })
// .catch(error => {
//     console.log("Error ", error)
// })
// console.log(123456)


// ...

// const intitute = {
//     title: "Saylani",
//     reg: "approve"
// }

// const obj = {
//     name: "Ali",
//     status: "manager",
//     age: 23
// }
// // spread operator
// const newObj = { ...obj, ...intitute, phone: 4657464 }
// console.log(newObj);
// console.log("intitute ", intitute);
// console.log("Obj ", obj);

// rest operator
// const myfunc = ({ name, ...abc }) => {
//     console.log(age, name);
//     console.log(abc);
// }

// myfunc(obj)



// try {
//     const abc = "test";
//     console.log(abcs)
// } catch (error) {
//     console.log("ERROR ", error.message)
// }