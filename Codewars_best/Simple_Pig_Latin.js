function pigIt(str) {
    return str.split(' ').map((n) => {
        return n.slice(1) + n.slice(0, 1) + 'ay';
    }).join(' ');
}

// Move the first letter of each word to the end of it, then add 'ay' to the end of the word.

pigIt('Pig latin is cool'); // igPay atinlay siay oolcay