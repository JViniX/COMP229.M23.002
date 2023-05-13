function parent() {
   const message = 'Hello World';

   function child() {
      alert (message);
   }

   return child;
}

const childFN = parent();
childFN();