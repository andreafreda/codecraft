function cycpattern_check(a, b){
    for (let i = 0; i < b.length; i++) {
        const rotated = b.slice(i) + b.slice(0, i);
        if (a.includes(rotated)) return true;
    }
    return false;
}
