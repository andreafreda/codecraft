function fizz_buzz(n){
  let count = 0;
  for(let i = 1; i < n; i++){
    if(i % 11 === 0 || i % 13 === 0){
      count += i.toString().split('7').length - 1;
    }
  }
  return count;
}
