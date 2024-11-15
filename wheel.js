const newItems = [
    {
        text: "1",
        background: "#AEE8FF"
    },
    {
        text: "2",
        background: "#AEE8FF"
    },
    {
        text: "3",
        background: "#FFE8B6"
    },
    {
        text: "4",
        background: "#FFE8B6"
    },
    {
        text: "5",
        background: "#F2B4A7"
    },
    {
        text: "6",
        background: "#F2B4A7"
    }
];

class Roulette {
    constructor() {
        this.SIZE = 128;
        this.LENGTH = 80;
        this.DURATION = 5000;
        this.progress = 0;
        this.startTime = 0;
        this.lastItem = 0;
        this.level = 0;
        this.roulette = document.getElementById("roulette");
        this.items = this.roulette.children;
    }

    init(items) {
        if (!Array.isArray(items)) {
            console.log("You need to pass items as an array!");
        }

        for (let i = 0; i < 6; i++) {
            const item = this.items[i];
            const itemSelected = this.getItem();
            item.style.position = 'absolute';
            item.style.transform = `translateX(${i * this.SIZE}px)`;
            item.textContent = itemSelected.text;
            item.style.background = itemSelected.background;
        }
    }

    start(lastItem) {
        this.level = 0;
        this.progress = 0;
        this.lastItem = lastItem;
        this.startTime = Date.now();
        
        for (let i = 0; i < 6; i++) {
            this.items[i].value = 0;
        }

        window.requestAnimationFrame(() => this.update());
    }

    update() {
        this.progress = (Date.now() - this.startTime) / this.DURATION;

        if (this.progress > 1) {
            this.progress = 1;
            this.render();
            return;
        }

        this.render();

        window.requestAnimationFrame(() => this.update());
    }

    render() {
        const off = this.interpolator(this.progress) * this.SIZE * this.LENGTH;
        const WIDTH = this.SIZE * 6;

        for (let i = 0; i < 6; i++) {
            const item = this.items[i];
            const base = (i + 1) * this.SIZE - off;
            const index = -Math.floor(base / WIDTH);
            const value = ((base % WIDTH) + WIDTH) % WIDTH - this.SIZE;
            
            item.style.transform = `translateX(${value}px)`;

            if (item.value != index) {
                this.level += index - item.value;

                const selectedItem = this.getItem();

                item.value = index;
                item.textContent = selectedItem.text;
                item.style.background = selectedItem.background;

                if (this.level == this.LENGTH - 3) {
                    const lastSelectedItem = this.getItem(this.lastItem);
                    item.textContent = lastSelectedItem.text;
                    item.style.background = lastSelectedItem.background;
                }
            }
        }
    }

    interpolator(val) {
        return Math.pow(Math.sin(val * Math.PI / 2), 2.6);
    }

    getItem(val) {
        val = typeof val !== "undefined" ? val : Math.floor(Math.random() * newItems.length);
        return newItems[val];
    }
}

const roulette = new Roulette();
roulette.init(newItems);

const btnStart = document.getElementById("roulette-start");
btnStart.onclick = () => roulette.start();
