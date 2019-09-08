function doFirstThing(){ return Promise.resolve(1) }  
function doSecondThing(res){ return Promise.resolve(res + 1) }  
function doThirdThing(res){ return Promise.resolve(res + 2) }  
function lastThing(res){ console.log("result:", res) }

var fnlist = [ doFirstThing, doSecondThing, doThirdThing, lastThing]
// var fnlist = [ doFirstThing(), doSecondThing(), doThirdThing(), lastThing()]

// Execute a list of Promise return functions in series
function pseries(list) {  
  // return list.reduce(function(promise, fn) {
  //   return promise.then(value => fn(value))
  // }, Promise.resolve())

  let sequence = Promise.resolve();
  list.forEach(fn => {
    sequence = sequence.then((value) => fn(value));
  })
}

pseries(fnlist)