const isValidIP = (str) => str.split('.').filter((item) => item == Number(item).toString() && Number(item) <= 255).length == 4;

// Description:

// Write an algorithm that will identify valid IPv4 addresses in dot-decimal format. 
// Input to the function is guaranteed to be a single string.

// Examples of valid inputs: 1.2.3.4 123.45.67.89

// Examples of invalid inputs: 1.2.3 1.2.3.4.5 123.456.78.90 123.045.067.089