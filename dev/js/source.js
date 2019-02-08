
const vanilla = {
    bodyWidth: document.body.offsetWidth,
    slide: null,
    items: document.querySelectorAll('.vanillajs-carousel .item'),
    wrapper: document.querySelector('.vanillajs-carousel'),
    buttons: document.querySelectorAll('.vanillajs-carousel-controls a'),
    bulletsWrapper: document.querySelector('.vanillajs-carousel-bullets'),
    itemsNumber() {
        return this.items.length;
    },
    setBullet(index) {
        const eqBulletElement = document.querySelector('.vanillajs-carousel-bullet-' + index);

        if (document.querySelector('.vanillajs-carousel-bullets a.active')) {
            document.querySelector('.vanillajs-carousel-bullets a.active').classList.remove('active');
        }

        eqBulletElement.classList.add('active');
    },
    setSlide(target, slide) {
        const activeElement = document.querySelector('.vanillajs-carousel .item.active');

        target.classList.add('active');
        activeElement.classList.remove('active');
        this.wrapper.style.transform = `translate(${(this.bodyWidth * slide) * -1}px)`;
        this.wrapper.dataset.slide = slide;
        this.setBullet(slide);
    },
    setBullets() {
        Object.entries(this.items).map(([key]) => {
            const bullet = document.createElement('a');
            bullet.dataset.slide = key;
            bullet.classList.add(`vanillajs-carousel-bullet-${key}`);
            if (key === '0') bullet.classList.add('active');

            bullet.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                let targetElement;
                const targetIndex = e.srcElement.dataset.slide;
                const activeElement = document.querySelector('.vanillajs-carousel .item.active');

                targetElement = this.items[targetIndex];

                this.setSlide(targetElement, targetIndex);
            });
            this.bulletsWrapper.appendChild(bullet);
        });
    },
    setButtons() {
        Object.entries(this.buttons).map(([key, button]) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let targetElement;
                const action = button.dataset.control;
                const currSlide = parseInt(this.wrapper.dataset.slide);
                const activeElement = document.querySelector('.vanillajs-carousel .item.active');

                if (action === 'next') {
                    if (activeElement.nextElementSibling) {
                        targetElement = activeElement.nextElementSibling;
                        this.slide = currSlide + 1;
                    } else {
                        targetElement = this.items[0];
                        this.slide = 0;
                    }
                }

                if (action === 'prev') {
                    if (activeElement.previousElementSibling) {
                        targetElement = activeElement.previousElementSibling;
                        this.slide = currSlide - 1;
                    } else {
                        targetElement = this.items[this.itemsNumber - 1];
                        this.slide = (this.itemsNumber - 1);
                    }
                }

                this.setSlide(targetElement, this.slide);
            });
        });
    },
    setCarousel(params) {

        this.wrapper.style.width = (`${this.bodyWidth * this.itemsNumber()}px`);

        if (!params || params.bullets || typeof params.bullets === 'undefined') {
            this.setBullets();
        };

        if (!params || !params.customButtons) {
            this.setButtons();
        }
    },
};