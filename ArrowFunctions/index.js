// var hello;

// hello = () => {
//   document.getElementById("demo").innerHTML += this;
// }

// //The window object calls the function:
// window.addEventListener("load", hello);

// //A button object calls the function:
// document.getElementById("btn").addEventListener("click", hello);


// var numbers = [1,2,3,4,5];
// const squares = numbers.map(n => n * n);
// document.write(squares);

// var evens = new Array();
// numbers.forEach(n => {
//    if (n % 2 === 0) { 
//       evens.push(n);
//    }
// });
// document.write(evens);

const author = {
    fullName: "Bob Alice",
    books: ["Book 01","Book 02","Book 03"],
    
    printBooks() {
      this.books.forEach(book => document.write(book + ' by ' +this.fullName + '<br>'));
    },

    printBooks1() {
      function printValue(book) {      
         document.write(book + ' by ' +this.fullName + '<br>');
      }

      this.books.forEach(printValue);
    }    
};
author.printBooks();
author.printBooks1();