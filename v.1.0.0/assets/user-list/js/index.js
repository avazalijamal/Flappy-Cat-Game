class userList extends HTMLElement {

    constructor() {
        super();

        this._src = '';
    }

    connectedCallback() {

        this.style.zoom = this.dataset.size || 0;

        this.href = this.dataset.href || '#';
        this.target = this.dataset.target || '';
        this.order = this.dataset.order || '';
        this.src = this.dataset.src || this._src;
        this.name = this.dataset.name || '';
        this.address = this.dataset.address || '';

        this.photo = (this.src != '') ? `
<div class="friends-user-c2" style="background-image:url('${this.src}');"></div>` : `<div class="friends-user-c2"></div>`;

        this.rang = [
            {
                name: this.dataset.name1 || "",
                value: this.dataset.value1 || ""
            },
            {
                name: this.dataset.name2 || "",
                value: this.dataset.value2 || ""

            }
        ];



        this.start();

    }

    start() {

        const temp = `
<a class="friends-link" href="${this.href}" target="_${this.target}">
    <div class="friends-user">

        <div class="friends-user-c1">
            <span>${this.order}</span>
        </div>

     ${this.photo}

        <div class="friends-user-c3">
            <p>${this.name}</p>
            <p>${this.address}</p>
        </div>
        <div class="friends-user-c4">
            <p>
                <span>${this.rang[0].name}</span>
                <span>${this.rang[0].value}</span>
            </p>
            <p>
                <span>${this.rang[1].name}</span>
                <span>${this.rang[1].value}</span>
            </p>
        </div>


    </div>
</a>
`;

        this.innerHTML = temp;


    }


}

customElements.define('user-list', userList);
