const value = ['resolved'];
const promise = new Promise(resolve => {
  setTimeout(() => {
    resolve(value);
  }, 2000);
});
 
async function asyncReturn1() {
  return await promise;
}
 
async function asyncReturn2() {
  return promise;
}
 
async function asyncCall() {
  var result1 = await asyncReturn1();
  var result2 = await asyncReturn1();
  console.log(result1);
  console.log(result2); 
  // > [object Promise]
  // > [object Promise]
  console.log(result1 === result2);
  // > false
  var result3 = await result1;
  var result4 = await result2;
  console.log(result3);
  console.log(result4);
  // > "resolved"
  // > "resolved"
  console.log(result3 === result4);
  // > true
}
 
asyncCall();