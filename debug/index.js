function increment(num){
    if(num == 0 ){
        // console.log("right here");
        return 0;
    }
    const res = num+1;
    // console.log(`num(${num}) : res(${res})`);
    return res;
}
let i = 0;
setInterval(() => {
    const num = increment(i++);
    console.log(num);
}, 1000)