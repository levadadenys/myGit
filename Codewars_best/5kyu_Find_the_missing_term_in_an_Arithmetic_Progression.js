const findMissing = (list) => {
    let prog = list[2] - list[1];
    for (let i = 1; i < list.length; i++) {
        let expected = list[i - 1] + prog;
        if (list[i] !== expected) return expected;
    }
}