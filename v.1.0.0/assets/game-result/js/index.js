class gameResult extends HTMLElement {

    constructor() {
        super();

        this._star = ['star-0', 'star-1', 'star-2', 'star-3'];
        this.star = this._star[0];


    }

    connectedCallback() {


        this.time = parseInt(this.dataset.time) || 59;
        this.star = parseInt(this.dataset.star) || 0;
        this.opacity = parseFloat(this.dataset.opacity) || 0.8;

        this.href = this.dataset.href || '';
        this.target = this.dataset.target || '';


        this.result = [
            {
                name: this.dataset.name1 || '',
                value: this.dataset.value1 || '',
        },
            {
                name: this.dataset.name2 || '',
                value: this.dataset.value2 || '',
        }
        ];



        this.star = this._star[this.star];
        this.start();
        this.notEmpty();
        this.setTime(this.time, 1000);

    }

    start() {

        this.resize(500);
        const temp = `
    <div class="friends-result" style="opacity:${this.opacity};">

        <div class="friends-result-data">
            <div class="friends-result-data-top">
                <p class="p1">
                    <span>${this.result[0].name}</span>
                    <span>${this.result[0].value}</span>
                </p>
                <p class="p2">
                    <span>${this.result[1].name}</span>
                    <span>${this.result[1].value}</span>
                </p>
                <p class="p3">
                    ${this.time}
                </p>

            </div>

            <div class="friends-result-data-bottom ${this.star}"></div>

        </div>

    </div>
`;

        this.innerHTML = temp;


    }

    setTime(s, t = 1000) {

        this.t = window.setInterval(() => {
            if (s > 0) {
                s--;
                this.time = s;
                this.timeUpdate();
            } else {
                window.clearInterval(this.t);
                window.open(this.href, `_${this.target}`);
            }

        }, t);
    }

    timeUpdate() {
        this.querySelector('.p3').innerHTML = this.time;
    }
    resize(t) {

        window.setTimeout(() => {
            this.querySelector('.friends-result-data').style.zoom = this.dataset.size || 0;

        }, t);

    }

    notEmpty(c = 'transparent') {
        const dom = this.querySelectorAll('.friends-result .friends-result-data .friends-result-data-top p');
        for (let i = 0; i < this.result.length; i++) {
            if (!this.result[i].name && !this.result[i].value) {
                dom[i].style.backgroundColor = c;
                dom[i].style.borderColor = c;
            }
        }
    }



}

customElements.define('game-result', gameResult);
