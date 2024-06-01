class myRangHeart extends HTMLElement {

    constructor() {
        super();

    }

    connectedCallback() {

        this.value = parseInt(this.dataset.value) || 0;
        this.class = this.dataset.class || '';
        this.style.zoom = this.dataset.size || 0;
        this.temp='';

        this.heart();
        this.start();

    }

    heart() {
        this.temp = '';
        for (let i = 0; i < this.value; i++) {
            this.temp += '<div></div>';
        }
    }
    
    start() {

        const temp = `
        <div class="friends-rang-heart ${this.class}">
        ${this.temp}
        </div>
        `;

        this.innerHTML = temp;


    }

    setValue(v) {

        if (v) {

            this.value = parseInt(v);
            this.heart();
            this.start();
            return true;
        } else {
            return parseFloat(this.value);
        }
    }

}

customElements.define('my-rang-heart', myRangHeart);
