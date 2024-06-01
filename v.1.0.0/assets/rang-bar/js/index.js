class myRang extends HTMLElement {

    constructor() {
        super();

        this._src = '';
    }

    connectedCallback() {
        this.icon = this.dataset.icon || this._src;
        this.value = this.dataset.value || 0;
        this.text = this.dataset.text || '';
        this.class = this.dataset.class || '';
        this.style.zoom = this.dataset.size || 0;

        this.photo = (this.icon != '') ? `
<div class="friends-icon" style="background-image:url('${this.icon}');"></div>` : `<div class="friends-icon"></div>`;

        this.start();

    }

    start() {

        const temp = `
    <div class="friends-rang ${this.class}">
        ${this.photo}
        <div class="friends-bar">
            <div class="friends-icerik" style="width: ${this.value}%;">
                <span>${this.text}</span>
            </div>
        </div>
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

    setText(t) {

        if (t) {

            this.text = t;
            this.start();
            return true;
        } else {
            return this.text;
        }

    }

    setIcon(i) {

        if (i) {

            this.icon = i;
            this.photo = (this.icon != '') ? `
<div class="friends-icon" style="background-image:url('${this.icon}');"></div>` : `<div class="friends-icon"></div>`;
            this.start();
            return true;
        } else {
            return this.icon;
        }



    }
}

customElements.define('my-rang', myRang);
