const config = {
    score: 0,
    heart: 3,
    heartIMG: `<img src="/img/heart.png" alt="">`,
    heartIMGtransparent: `<img src="/img/heart-transparent.png" alt="">`
};

gameStatus = true;

if (!localStorage.heart) localStorage.setItem('heart', config?.heart);
if (!localStorage.max) localStorage.setItem('max', config?.score);


window.addEventListener('load', function () {

    const _heart = document.getElementById('heart');
    const _score = document.getElementById('score');
    const _home = document.getElementById('home');
    const _start = document.getElementById('start');
    const _end = document.getElementById('end');
    const _result = document.getElementById('result');
    const _max = document.getElementById('max');
    const _star = document.getElementById('star');
    const _replay = document.getElementById('replay');

    var coinTime;
    var time = 3000;
    var maxScore = 0;
    var score = 0;
    var heart = parseInt(localStorage.heart);
    var max = parseInt(localStorage.max);

    var status = true;
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    updateDOM();

    const top = 30;
    const coins = [];
    const fon = new Fon();
    const pilot = new Pilot(gameOver, top, fon.h[2]);

    function Start() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fon.moveLeft();
        pilot.moveDown();

        for (let coin of coins) {
            if (isIntersect(
                {
                    x: coin.x,
                    y: coin.y,
                    r: coin.w / 2
                },
                {
                    x: pilot.x,
                    y: pilot.y,
                    r: pilot.w / 2
                }
            )) {
                scoreIncrease(coin.score);
                coin.Remove(coin);
            } else {
                coin.moveLeft();
            }
        }

        if (gameStatus) requestAnimationFrame(Start);
    }

    function updateDOM() {
        _heart.innerHTML = "";
        for (let i = 1; i <= config.heart; i++) {
            if (i <= heart) _heart.innerHTML += config?.heartIMG;
            else _heart.innerHTML += config?.heartIMGtransparent;
        }
        _score.innerText = score;
    }

    function removeCoin(coin) {
        coins.splice(coins.indexOf(coin), 1);
    }

    function gameOver() {
        gameStatus = false;
        status = false;
        clearInterval(coinTime);
        heart--;
        console.log(heart);
        updateDOM();
        localStorage.heart = heart;

        Results();
    }

    function Results() {

        _end.classList.remove('hiddeen');
        const percentage = (score * 100) / maxScore;
        let star = 0;
        if (percentage >= 90) star = 3;
        else if (percentage >= 50) star = 2;
        else if (percentage >= 10) star = 1;
        else star = 0;

        _star.src = `/img/star-${star}.png`;
        _result.innerText = score;
        _max.innerText = max;

    }

    function isIntersect(obj1, obj2) {
        return (
            (obj1.r + obj2.r) >= Math.sqrt(
                (obj1.x - obj2.x) * (obj1.x - obj2.x)
                +
                (obj1.y - obj2.y) * (obj1.y - obj2.y)
            )
        ) ? true : false;
    }

    function scoreIncrease(i = 1) {
        score += i;
        max = (score > max) ? score : max;
        localStorage.max = max;
        updateDOM();
    }

    function createCoin() {
        coinTime = setInterval(function () {
            const scoreCoin = 1;
            coins.push(new Coin(removeCoin, top, fon.h[2], scoreCoin));
            maxScore += scoreCoin;
        }, time);
    }

    // Events
    _start.addEventListener('click', function () {
        if (heart > 0) {
            _home.classList.add('hiddeen');
            Start();
            createCoin();
        } else {
            if (confirm("Caniniz bitib herseyi sifirlayib yeniden baslamaq isteyirsinizmi ?")) {
                localStorage.clear();
                window.open('/', '_parent');
            }
        }
    });

    _replay.addEventListener('click', function () {
        window.open('/', '_parent');
    });

    canvas.addEventListener("touchstart", function () {
        if (gameStatus && status) {
            gameStatus = false;
            pilot.moveUp();
        }
    });
    canvas.addEventListener("touchend", function () {
        if (!gameStatus) gameStatus = true;
    });

    canvas.addEventListener("mousedown", function () {
        if (gameStatus && status) {
            gameStatus = false;
            pilot.moveUp();
        }
    });
    canvas.addEventListener("mouseup", function () {
        if (!gameStatus) gameStatus = true;
    });

})