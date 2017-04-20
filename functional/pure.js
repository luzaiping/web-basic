const numbers = [1, 2, 3];

const print = function ( input, index, arr ) {
  console.log( `index: ${index}, input: ${input}` );
};

numbers.forEach( print );