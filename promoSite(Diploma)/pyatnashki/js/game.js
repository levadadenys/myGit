class Game {
    constructor() {
        this.box = [];

        this._correctArr = [1, 2, 3, 4, 5, 6, 7, 8, ' '];
        this._downExceptions = [0, 1, 2];
        this._upExceptions = [6, 7, 8];
        this._rightExceptions = [0, 3, 6];
        this._leftExceptions = [2, 5, 8];
    }

    arrangeBox() {
        while (this.box.length < this._correctArr.length) {
            let num = this._correctArr[Math.floor(Math.random() * 9)];
            let isIncludes = this.box.indexOf(num) + 1;
            if (!isIncludes) this.box.push(num);
        }
    }

    fillBox() {
        this.box.map((item, i) => document.getElementById(i).innerHTML = item);
        this.checkBox();
    }

    checkBox() {
        if (this.box.join(' ') === this._correctArr.join(' ')) alert('You win!!!');
    }

    _isUnmovable(way) {
        for (let i = 0; i < way.length; i++) {
            if (this.box[way[i]] === ' ') return true;
        }
    }

    controls_down() {
        let empty = this.box.indexOf(' ');
        if (!this._isUnmovable(this._downExceptions)) {
            [this.box[empty], this.box[empty - 3]] = [this.box[empty - 3], this.box[empty]];

            this.fillBox();
        }
    }
    controls_up() {
        let empty = this.box.indexOf(' ');
        if (!this._isUnmovable(this._upExceptions)) {
            [this.box[empty], this.box[empty + 3]] = [this.box[empty + 3], this.box[empty]];

            this.fillBox();
        }
    }
    controls_right() {
        let empty = this.box.indexOf(' ');
        if (!this._isUnmovable(this._rightExceptions)) {
            [this.box[empty], this.box[empty - 1]] = [this.box[empty - 1], this.box[empty]];

            this.fillBox();
        }
    }
    controls_left() {
        let empty = this.box.indexOf(' ');
        if (!this._isUnmovable(this._leftExceptions)) {
            [this.box[empty], this.box[empty + 1]] = [this.box[empty + 1], this.box[empty]];

            this.fillBox();
        }
    }
}

let game = new Game();

let start_resetGame = () => {
    game.box = [];
    game.arrangeBox();
    game.fillBox();
}