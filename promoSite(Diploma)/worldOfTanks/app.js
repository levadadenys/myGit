class MoveTank {
    constructor() {}


    static up(mTop) {
        let defTop = parseFloat($("#Tank").css('top'));
        let defBottom = parseFloat($("#Tank").css("bottom"));
        let newTop = defTop - mTop - defBottom;
        if (newTop >= -263) {
            $("#Tank").css("top", newTop);
            $("#Tank").css("bottom", "0");
        } else {
            newTop = -263;
            $("#Tank").css("top", newTop);
        }
    }

    static left(mLeft) {
        let defLeft = parseFloat($("#Tank").css('left'));
        let defRight = parseFloat($("#Tank").css("right"));
        let newLeft = defLeft - mLeft - defRight;
        if (newLeft >= -263) {
            $("#Tank").css("left", newLeft);
            $("#Tank").css("right", "0px");
        } else {
            newLeft = -263;
            $("#Tank").css("left", newLeft);
        }
    }

    static down(mBottom) {
        let defTop = parseFloat($("#Tank").css('top'));
        let defBottom = parseFloat($("#Tank").css("bottom"));
        let newBottom = defBottom - mBottom - defTop;
        if (newBottom >= -263) {
            $("#Tank").css("bottom", newBottom);
            $("#Tank").css("top", "0px");
        } else {
            newBottom = -263;
            $("Tank").css("bottom", newBottom);
            $("#Tank").css("top", "0px");
        }
    }

    static right(mRight) {
        let defLeft = parseFloat($("#Tank").css('left'));
        let defRight = parseFloat($("#Tank").css("right"));
        let newRight = defRight - mRight - defLeft;
        if (newRight >= -263) {
            $("#Tank").css("right", newRight);
            $("#Tank").css("left", "0px");
        } else {
            newRight = -263;
            $("#Tank").css('right', newRight);
        }
    }
}


class T52 {
    constructor(amunition) {
        this.model = "T52";
        this.speed = 0;
        this.fuel = 100;
        this.hp = 100;
        this.ammo = amunition;
        this.crew = 4;
        this.towers = 1;
    }
    _printSpeed() {
        document.getElementById('Speed').innerHTML = `Speed : ${this.speed}`;
    }
    _isMoving() {
        if (this.speed > 0) return true;
        alert('We stopped!');
    }
    goFaster() {
        if (this.speed < 100) {
            ++this.speed;
            this._printSpeed();
            MoveTank.up(30);
        } else alert('We can`t go faster!');
    };
    goSlower() {
        if (this._isMoving()) {
            --this.speed;
            this._printSpeed();
            MoveTank.down(30);
        }
    };
    turnLeft() {
        if (this._isMoving()) MoveTank.left(30);
    };
    turnRight() {
        if (this._isMoving()) MoveTank.right(30);
    };
    shot() {
        if (this.speed >= 40) alert('We`re going to fast. We have to slow down first!');
        else if (this.ammo >= this.towers) {
            this.ammo -= this.towers;
            document.getElementById('Ammo').innerHTML = 'Ammo : ' + (this.ammo);
            $("#Tank").css('background', 'red');
        } else alert('We`re out of ammo!');
    }

};

let t52 = new T52(100);

class T35 extends T52 {
    constructor(amunition) {
        super(amunition);
        this.model = "T35";
        this.towers = 5;
    }
    shot() {
        super.shot()
        setTimeout(() => { $("#Tank").css("background", "none") }, 1500);
    }
}

let t35 = new T35(100);


function chooseTheTank(tank) {
    let availableTanks = [t52.model, t35.model];
    if ((availableTanks.indexOf(tank.model)) !== -1) return tank;
    alert('Wrong tank model!');

}

let tank;
try {
    tank = chooseTheTank(t35);
} catch (e) {
    alert('Wrong tank model!');
    tank = t52;
};




let isGameStart = 0;

function startFinishGame() {
    if (isGameStart === 0) {
        isGameStart = 1;
        document.getElementById('onlineStatus').innerHTML = 'Online';
        $('#onlineStatus').css('background', 'green');
        document.getElementById('startFinishButton').innerHTML = 'Finish Game';
    } else if (isGameStart === 1) {
        isGameStart = 0;
        document.getElementById('onlineStatus').innerHTML = 'Offline';
        $('#onlineStatus').css('background', 'red');
        document.getElementById('startFinishButton').innerHTML = 'Start Game';
    }
}