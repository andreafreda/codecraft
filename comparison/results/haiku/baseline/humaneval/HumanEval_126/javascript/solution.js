function is_sorted(lst){
    for (let i = 0; i < lst.length - 1; i++) {
        if (lst[i] > lst[i + 1]) {
            return false;
        }
    }
    
    const count = {};
    for (let num of lst) {
        count[num] = (count[num] || 0) + 1;
        if (count[num] > 2) {
            return false;
        }
    }
    
    return true;
}
