function cycpattern_check(a, b){
  for (let i = 0; i < b.length; i++) {
    const rotation = b.substring(i) + b.substring(0, i);
    if (a.includes(rotation)) {
      return true;
    }
  }
  return false;
}
