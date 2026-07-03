function is_sorted(lst){
  for(let i = 0; i < lst.length - 1; i++){
    if(lst[i] > lst[i + 1]){
      return false;
    }
  }
  
  for(let i = 0; i < lst.length - 2; i++){
    if(lst[i] === lst[i + 1] && lst[i + 1] === lst[i + 2]){
      return false;
    }
  }
  
  return true;
}
