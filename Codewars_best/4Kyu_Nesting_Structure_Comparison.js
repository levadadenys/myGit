Array.prototype.sameStructureAs = function(other) {
    if (isArray(other) === isArray(this)) {
        if (this.length === other.length) {
            for (let i = 0; i < this.length; i++) {
                if (this[i].toString().length === other[i].toString().length && other[i].toString().length > 1) Array.prototype.sameStructureAs.call(this[i], other[i])
                else if (this[i].toString().length !== other[i].toString().length) return false;
            }
            return true;
        }
    }
};


// Description:

// Complete the method (or function in Python) to return true when 
// its argument is an array that has the same nesting structure as the first array.

// For example:

//  // should return true
// [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
// [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );  

//  // should return false 
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );  

// // should return true
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] ); 

// // should return false
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] );
// For your convenience, there is already a function 'isArray(o)' declared in 
// the JS version that returns true if its argument is an array, false otherwise.