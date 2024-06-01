gameStatus = true;

if (!localStorage.score) {
    localStorage.setItem('score', '0');
}

if (!localStorage.heart) {
    localStorage.setItem('heart', '3');
}

window.addEventListener('load', () => {

    _start = document.getElementById('start');
    _score = document.getElementById('score');
    _heart = document.getElementById('heart');

    canvas = document.getElementById('game');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');


    var coinTime;
    var time = 3000;
    var score = parseInt(localStorage.score);
    _score.setValue(score);
    var heart = parseInt(localStorage.heart);
    _heart.setValue(heart);
    var status = true;

    const top = 30;
    const coins = [];
    const fon = new Fon();
    const pilot = new Pilot(gameOver, top, fon.h[2]);


    function Play(dom) {
        dom.parentElement.classList.add('hide');
        Start();
        createCoin();
        sound.vol(vol);
        sound.airPlay();
    }

    function Start() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fon.moveLeft();

        pilot.moveDown();
        for (let coin of coins) {
            if (isIntersect({
                    x: coin.x,
                    y: coin.y,
                    r: coin.w / 2
                }, {
                    x: pilot.x,
                    y: pilot.y,
                    r: pilot.w / 2
                })) {
                scoreIncrease(coin.score);
                coin.Remove(coin);
            } else {

                coin.moveLeft();
            }
        }

        if (gameStatus) {
            requestAnimationFrame(Start);
        }
    }

    function removeCoin(coin) {
        coins.splice(coins.indexOf(coin), 1);
    }

    function gameOver() {
        gameStatus = false;
        status = false;
        window.clearInterval(coinTime);
        sound.airStop();
        sound.boomPlay();

        heart--;
        _heart.setValue(heart);
        localStorage.heart = heart;

        window.setTimeout(function () {
            //            _start.parentElement.classList.remove('hide');
            window.open('index.html', '_parent');
        }, time / 3);


    }

    function isIntersect(obj1, obj2) {

        return ((obj1.r + obj2.r) >= Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) + (obj1.y - obj2.y) * (obj1.y - obj2.y))) ? true : false;

    }

    function scoreIncrease(i = 1) {
        score += i;
        sound.coinPlay();
        _score.setValue(score);
        localStorage.score = score;

    }

    function createCoin() {

        coinTime = window.setInterval(function () {

            coins.push(new Coin(removeCoin, top, fon.h[2]));

        }, time);
    }

    /*-----CONTROLS-----*/

    _start.addEventListener('click', function () {
        Play(this);
    });

    canvas.addEventListener('touchstart', () => {
        if (gameStatus && status) {
            gameStatus = false;
            pilot.moveUp();
        }

    });

    canvas.addEventListener('touchend', () => {
        if (!gameStatus) {
            gameStatus = true;
        }
    });

    canvas.addEventListener('mousedown', () => {
        if (gameStatus && status) {
            gameStatus = false;
            pilot.moveUp();
        }

    });

    canvas.addEventListener('mouseup', () => {
        if (!gameStatus) {
            gameStatus = true;
        }
    });



});
