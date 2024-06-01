class Fon {


    constructor(step) {


        this.w = canvas.width;
        this.h = [50, 0, 50];
        this.h[1] = canvas.height - this.h[0] - this.h[2];

        this.x = 0;
        this.y = [0, this.h[0], this.h[1] + this.h[0]];

        this.step = step || 1;


        this.img = [(new Image()), (new Image()), (new Image())];
        this.img[0].src = `${BASEURL}fon/img/img-1.png`;
        this.img[1].src = `${BASEURL}fon/img/img-2.png`;
        this.img[2].src = `${BASEURL}fon/img/img-3.png`;



    }


    Update() {

        ctx.drawImage(this.img[0], this.x, this.y[0], this.w, this.h[0]);
        ctx.drawImage(this.img[1], this.x, this.y[1], this.w, this.h[1]);
        ctx.drawImage(this.img[2], this.x, this.y[2], this.w, this.h[2]);

        ctx.drawImage(this.img[0], this.x + canvas.width, this.y[0], this.w, this.h[0]);
        ctx.drawImage(this.img[1], this.x + canvas.width, this.y[1], this.w, this.h[1]);
        ctx.drawImage(this.img[2], this.x + canvas.width, this.y[2], this.w, this.h[2]);

    }


    moveLeft() {

        if (this.x > 0 - (canvas.width - this.step)) {
            this.x -= this.step;
        } else {
            this.x = 0;
        }


        this.Update();
    }

}
