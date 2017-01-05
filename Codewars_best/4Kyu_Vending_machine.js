class VendingMachine {
    constructor(coins) {
        this.coins = coins;
    }

    vending(price, credit) {
        let change;

        let creditMap = new Map();
        for (let key in credit) creditMap.set(key, credit[key]);

        let creditCoins = this.makeArrFromI(creditMap.keys());
        let creditVals = this.makeArrFromI(creditMap.values());

        let creditSum = 0;

        for (let i = 0; i < creditCoins.length; i++) {
            if (this.coins[creditCoins[i]] === undefined) return credit;
            creditSum += creditCoins[i] * creditVals[i];
        }

        if (creditSum >= price) {
            this.insertCoins(creditCoins, creditVals);
            change = this.countChange(creditSum - price, creditCoins, creditVals);
        } else {
            change = credit;
        }
        return change;
    }

    insertCoins(creditCoins, creditVals) {
        for (let i = 0; i < creditCoins.length; i++) {
            this.coins[creditCoins[i]] = this.coins[creditCoins[i]] + creditVals[i] || creditVals[i];
        }
    }

    countChange(changeAmount, creditCoins, creditVals, coins = this.coins, change = {}) {
        let availableCoins = [];
        for (let key in coins) availableCoins.push(+key);
        let coin;
        while (availableCoins.length > 0 && changeAmount > 0) {
            coin = Math.max(...availableCoins);

            if (coin <= changeAmount && this.coins[coin] > 0) {
                change[coin] ? change[coin] = change[coin] + 1 : change[coin] = 1;
                --this.coins[coin];

                changeAmount -= coin;

            } else {
                availableCoins.splice(availableCoins.indexOf(coin), 1);
            }
        }
        return change;
    }

    makeArrFromI(iterable) {
        let arr = [];
        for (let key of iterable) arr.push(key);
        return arr;

    }
}





// let vm = new VendingMachine({1:1, 2:0, 4:3, 6:2});

// Test.assertSimilar(vm.vending(12, {1:3, 4:2}), {1:3, 4:2}, 'insufficient balance');
// Test.assertSimilar(vm.vending(12, {1:1, 5:2}), {1:1, 5:2}, 'insufficient balance (in the machine there is no 5 coin value)');
// Test.assertSimilar(vm.vending(12, {4:3}), {}, 'Exact price');
// Test.assertSimilar(vm.vending(12, {6:1, 2:3}), {}, 'Exact price');
// Test.assertSimilar(vm.vending(12, {6:2}), {}, 'Exact price');
// Test.assertSimilar(vm.vending(12, {6:1, 4:2}), {2:1});
// Test.assertSimilar(vm.vending(12, {6:4}), {6:2});

// Test.assertSimilar(vm.vending(12, {6:4, 3:4}), {6:4, 3:4});  
// Test.assertSimilar(vm.vending(12, {4:5}), {2:1, 6:1});
// Test.assertSimilar(vm.vending(17, {4:4, 2:1}), {1:1});
// Test.assertSimilar(vm.vending(17, {4:4, 2:1}), {}, 'There is no 1 value coins');


// vm = new VendingMachine({20:0, 9:2, 5:2, 1:19})
// Test.assertSimilar(vm.vending(1, {20:1}), {9:2,1:1});
// Test.assertSimilar(vm.coins, {1:18, 5:2,9:0,20:1});

// vm = new VendingMachine({20:0, 9:2, 5:2, 1:19});
// Test.assertSimilar(vm.vending(1, {20:1,9:1}), {20:1, 5:1, 1:3});


///------------------------------------------------------------------------------------------\\\\

// In this kata we want to simulate the coin return of a vending machine.

// In the constructor, the machine receives the valid coins. The format is [{value: quantity}, ...].

// function VendingMachine(coins) {
//     this.coins = coins;
// }
// The vending method receives the item price and the coins used to buy it and returns the change out 
// using the the max value coins (for example, return {6:1, 2:1} is preferred over {4:2}).

// VendingMachine.prototype.vending = function(price, credit) {
//    ...
// }
// If the credit is less than the item price, it returns the coins inserted.
// It will return any money that is not valid for the machine.
// If it can not return the exact change out, it returns the least amount that is closest to the change out. 
// The machine never loses money!