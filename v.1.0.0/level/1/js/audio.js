if (!localStorage.vol) {
    localStorage.setItem('vol', '0.1');
}

const soundAir = [(new Audio('./audio/aircraft.wav')), (new Audio('./audio/aircraft.wav'))];
const soundBoom = (new Audio('./audio/boom.wav'));
const soundCoin = (new Audio('./audio/coin.wav'));
const vol=parseFloat(localStorage.vol);


soundAir[0].addEventListener('timeupdate', function () {

    if ((this.duration - this.currentTime) < 1) {
        soundAir[1].play();
    }
});

soundAir[1].addEventListener('timeupdate', function () {

    if ((this.duration - this.currentTime) < 1) {
        soundAir[0].play();
    }
});


const sound = {

    vol:function(v){
        soundAir[0].volume=v;
        soundAir[1].volume=v;
        soundBoom.volume=v;
        soundBoom.volume=v;
    },
    airPlay: function () {
        soundAir[0].play();
    },
    airStop: function () {
        soundAir[0].pause();
        soundAir[1].pause();
        soundAir[0].currentTime = 0;
        soundAir[1].currentTime = 0;
    },
    boomPlay: function () {
        soundBoom.currentTime = 0;
        soundBoom.play();

    },
    coinPlay: function () {
        soundCoin.currentTime = 0;
        soundCoin.play();
    }

}
