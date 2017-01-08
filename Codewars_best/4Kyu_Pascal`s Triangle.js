function pascalsTriangle(n, res = [1]) {
    if (n < 2) return res.join(',').split(',').map((i) => +i);
    let cachePrev = res[res.length - 1];
    let cacheCurr = [1]
    for (let i = 1; i < cachePrev.length; i++) {
        cacheCurr[i] = cachePrev[i] + cachePrev[i - 1];
    }
    cacheCurr.push(1);
    res.push(cacheCurr);
    return pascalsTriangle(n - 1, res);
}


// Description:

// Pascal's Triangle

// Pascal's Triangle

// Wikipedia article on Pascal's Triangle: http://en.wikipedia.org/wiki/Pascal's_triangle

// Write a function that, given a depth (n), returns a single-dimensional
//  array representing Pascal's Triangle to the n-th level.

// For example:

// pascalsTriangle(4) == [1,1,1,1,2,1,1,3,3,1]