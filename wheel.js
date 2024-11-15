

const newItems = [
    {
        image: "http://demo.st-marron.info/roulette/sample/star.png",
        background: "#AEE8FF"
    },
    {
        image: "http://demo.st-marron.info/roulette/sample/flower.png",
        background: "#AEE8FF"
    },
    {
        image: "http://demo.st-marron.info/roulette/sample/coin.png",
        background: "#FFE8B6"
    },
    {
        image: "http://demo.st-marron.info/roulette/sample/mshroom.png",
        background: "#FFE8B6"
    },
    {
        image: "http://demo.st-marron.info/roulette/sample/chomp.png",
        background: "#F2B4A7"
    },
]

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

    init(images) {
        if (!Array.isArray(images)) {
            console.log("You need to pass images as an array!");
        }

        images.forEach(item => {
            const img = new Image();
            img.src = item.image;
        });

        for (let i = 0; i < 6; i++) {
            const item = this.items[i];

            const itemSelected = this.getItem()
            
            item.style.position = 'absolute';
            item.style.transform = `translateX(${i * this.SIZE}px)`;
            item.lastChild.src = itemSelected.image;
            item.style.background = itemSelected.background
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
                item.lastChild.src = selectedItem.image;
                item.style.background = selectedItem.background

                if (this.level == this.LENGTH - 3) {
                    const lastSelectedItem = this.getItem(this.lastItem);
                    item.lastChild.src = lastSelectedItem.image;
                    item.style.background = lastSelectedItem.background
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
const selectWinner = document.getElementById("roulette-select-winner");

btnStart.onclick = () => roulette.start(); // KYTIČKA