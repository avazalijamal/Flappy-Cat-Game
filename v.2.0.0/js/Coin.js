class Coin {
    constructor(Remove, top, bottom, score, step) {

        this.bottom = bottom || 0;
        this.top = top || 0;
        this.lapse = 5;

        this.w = 25;
        this.h = 25;
        this.x = Math.round(canvas.width + this.w + Math.random() * (this.w * 10));
        this.y = Math.round(
            (this.h / 2 + this.top - this.lapse)
            +
            Math.random() * (canvas.height - this.h
                -
                (this.bottom + this.lapse + this.top)
            ));

        this.Remove = Remove;
        this.score = score || 1;
        this.step = step || 1;

        this.img = [(new Image())];
        this.img[0].src = "/img/coin/img-1.png";
        this.i = 0;
        this.S = true;

        this.cord = [
            {
                x: 5,
                y: 10,
                w: 90,
                h: 90
            },
            {
                x: 95,
                y: 10,
                w: 90,
                h: 90
            },
            {
                x: 185,
                y: 10,
                w: 90,
                h: 90
            },
            {
                x: 275,
                y: 10,
                w: 65,
                h: 90
            },
            {
                x: 340,
                y: 10,
                w: 85,
                h: 90
            },
            {
                x: 425,
                y: 10,
                w: 80,
                h: 90
            },
            {
                x: 505,
                y: 10,
                w: 105,
                h: 90
            }
        ];

    }

    indexChange() {
        this.S = !this.S;

        if (this.S) {
            if (this.i < this.cord.length - 1) this.i++;
            else this.i = 0;
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

    moveLeft() {
        if (this.x > (0 - this.w)) this.x -= this.step;
        else this.Remove(this);
        this.Update();
    }
}