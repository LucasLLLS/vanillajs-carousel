
const vanilla = {
    bodyWidth: document.body.offsetWidth,
    slide: null,
    carouselItems: document.querySelectorAll('.vanillajs-carousel .item'),
    carouselWrapper: document.querySelector('.vanillajs-carousel'),
    carouselButtons: document.querySelectorAll('.vanillajs-carousel-controls'),
    carouselBulletsWrapper: document.querySelector('.vanillajs-carousel-bullets'),
    carouselItemsNumber() {
        return this.carouselItems.length;
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
        this.carouselWrapper.style.transform = `translate(${(this.bodyWidth * slide) * -1}px)`;
        this.carouselWrapper.dataset.slide = slide;
        this.setBullet(slide);
    },
    setCarousel() {

        this.carouselWrapper.style.width = (`${this.bodyWidth * this.carouselItemsNumber()}px`);

        Object.entries(this.carouselItems).map(([key]) => {
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

                targetElement = this.carouselItems[targetIndex];

                this.setSlide(targetElement, targetIndex);
            });
            this.carouselBulletsWrapper.appendChild(bullet);
        });

        Object.entries(this.carouselButtons).map(([key, button]) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let targetElement;
                const action = button.dataset.control;
                const currSlide = parseInt(this.carouselWrapper.dataset.slide);
                const activeElement = document.querySelector('.vanillajs-carousel .item.active');

                if (action === 'next') {
                    if (activeElement.nextElementSibling) {
                        targetElement = activeElement.nextElementSibling;
                        this.slide = currSlide + 1;
                    } else {
                        targetElement = this.carouselItems[0];
                        this.slide = 0;
                    }
                }

                if (action === 'prev') {
                    if (activeElement.previousElementSibling) {
                        targetElement = activeElement.previousElementSibling;
                        this.slide = currSlide - 1;
                    } else {
                        targetElement = this.carouselItems[this.carouselItemsNumber - 1];
                        this.slide = (this.carouselItemsNumber - 1)
                    }
                }

                this.setSlide(targetElement, this.slide);
            });
        });
    },
};