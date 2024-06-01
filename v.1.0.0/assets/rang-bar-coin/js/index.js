class myRangCoin extends HTMLElement {

    constructor() {
        super();

    }

    connectedCallback() {

        this.value = this.dataset.value || 0;
        this.class = this.dataset.class || '';
        this.style.zoom = this.dataset.size || 0;


        this.start();

    }

    start() {

        const temp = `
    <div class="friends-rang-coin ${this.class}">
    <b>${this.value}</b>
    <div></div>
    </div>
`;

        this.innerHTML = temp;


    }

    setValue(v) {

        if (v) {

            this.value = v;
            this.start();
            return true;
        } else {
            return parseFloat(this.value);
        }
    }

}

customElements.define('my-rang-coin', myRangCoin);
