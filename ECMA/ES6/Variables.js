var a = [];
for(let i = 0; i < 5; i++) {  // block scope
    a[i] = function() {
    console.log(i);
 }
}
a[3]();

/*const PI = Math.PI;
 PI = 23; // const can not change*/