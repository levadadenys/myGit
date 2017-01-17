class Handler {
    constructor (name,calculateMethod){
        if(!name && !calculateMethod) {
            return {
                name: 'empty name',
                calculateMethod: () => 'сalculate method is empty'
            }
        } else {
            return {
                name: name,
                calculateMethod: calculateMethod
            }
        }
    }
};

function Controller () {
        let handlers = {};
        let results = [];

    this.addHandler = (handler) => {
        handlers[handler.name] = handler.calculateMethod;
    };

    this.calculate =  (arr, handlersToCalculate) => {
        results = [];
        if (!handlersToCalculate) {
            Object.keys(handlers).forEach((handler) => results.push(`Handler ${handler} return: ${handlers[handler](arr)}`));
        } else if (handlersToCalculate) {
            handlersToCalculate.forEach((handler) => results.push(`Handler ${handler} return: ${handlers[handler](arr)}`));
        }
    };

    this.print = () => results.forEach((result) => console.log(result));
};

let minHandler = new Handler ('min', (arr) => Math.min(...arr));

let premaxHandler = new Handler ('premax', (arr) => arr.sort((a,b) => a - b)[arr.length - 2]);

let sumHandler = new Handler ('sum', (arr) => {
    let sum = 0;
    arr.forEach((item) => sum += item)
    return sum;
});

let averageHandler = new Handler ('average', (arr) => {
    let sum = 0;
    arr.forEach((item) => sum += item);
    return sum / arr.length;
});

let emptyHandler = new Handler ();


let controller = new Controller();
controller.addHandler(minHandler);
controller.addHandler(premaxHandler);
controller.addHandler(sumHandler);
controller.addHandler(averageHandler);
controller.addHandler(emptyHandler);

controller.calculate([1,3,2,5,6,4]);
console.log(controller.print());

controller.calculate([1,2,3,4,5,6], ['min', 'sum']);
console.log(controller.print());