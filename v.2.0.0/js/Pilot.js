class Pilot {
    constructor(gameOver, top, bottom, step) {

        this.w = 50;
        this.h = 50;

        this.x = Math.round(canvas.width / 4 - this.w);
        this.y = this.h / 2;
        this.bottom = bottom || 0;
        this.top = top || 0;
        this.lapse = 5;
        this.step = step || 1;
        this.gameOver = gameOver;

        this.img = [(new Image())];

        this.img[0].src = "/img/cat/img-1.png";

        this.i = 0;
        this.s = true;
        this.S = true;

        this.cord = [
            {
                x: 35,
                y: 30,
                w: 235,
                h: 250
            },
            {
                x: 290,
                y: 30,
                w: 235,
                h: 250
            },
            {
                x: 35,
                y: 280,
                w: 235,
                h: 250
            },
            {
                x: 290,
                y: 280,
                w: 235,
                h: 250
            }
        ];

    }


    indexChange() {

        this.S = !this.S;

        if (this.S) {
            if (this.s) {
                if (this.i < this.cord.length - 1) this.i++;
                else this.s = false;
            } else {
                if (this.i > 0) this.i--;
                else this.s = true;
            }
        }

    }

    Update() {
        this.indexChange();
        ctx.drawImage(
            this.img[0],
            this.cord[this.i].x,
            this.cord[this.i].y,
            this.cord[this.i].w,
            this.cord[this.i].h,
            (this.x - this.w / 2),
            (this.y - this.h / 2),
            this.w, this.h
        );
    }

    isDown() {
        return Math.round(
            canvas.height - this.h / 2
            -
            (this.bottom - this.step - this.lapse)
        )
    }

    isUp() {
        return Math.round(this.h / 2 + (this.top - this.lapse));
    }

    moveDown() {

        if ((this.y + this.step) < this.isDown()) this.y += this.step;
        else this.gameOver();
        this.Update();
    }

    moveUp() {
        if ((this.y - this.step * 20) > this.isUp()) this.y -= this.step * 20;
        gameStatus = true;
        this.Update();
    }
}