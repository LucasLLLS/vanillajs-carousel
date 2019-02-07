'use strict';

var slide = void 0;
var carouselItems = document.querySelectorAll('.vanillajs-carousel .item'),
    carouselItemsNumber = carouselItems.length,
    carouselWrapper = document.querySelector('.vanillajs-carousel'),
    carouselButtons = document.querySelectorAll('.vanillajs-carousel-controls'),
    bodyWidth = document.body.offsetWidth,
    carouselBulletsWrapper = document.querySelector('.vanillajs-carousel-bullets');

var setSlide = function setSlide(targetElement, slide) {
    var activeElement = document.querySelector('.vanillajs-carousel .item.active');

    targetElement.classList.add('active');
    activeElement.classList.remove('active');
    carouselWrapper.style.transform = 'translate(' + bodyWidth * slide * -1 + 'px)';
    carouselWrapper.dataset.slide = slide;
    setBullet(slide);
};

var setBullet = function setBullet(index) {
    var eqBulletElement = document.querySelector('.vanillajs-carousel-bullet-' + index);

    if (document.querySelector('.vanillajs-carousel-bullets a.active')) {
        document.querySelector('.vanillajs-carousel-bullets a.active').classList.remove('active');
    }

    eqBulletElement.classList.add('active');
};

var setCarousel = function setCarousel() {
    var i;

    carouselWrapper.style.width = bodyWidth * carouselItemsNumber + 'px';

    for (i = 0; i < carouselItemsNumber; i++) {
        var bullet = document.createElement('a');
        bullet.dataset.slide = i;

        bullet.classList.add('vanillajs-carousel-bullet-' + i);
        if (i === 0) bullet.classList.add('active');

        bullet.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var targetIndex = this.dataset.slide;
            var targetElement;
            var newTranslate;
            var activeElement = document.querySelector('.vanillajs-carousel .item.active');

            targetElement = carouselItems[targetIndex];

            setSlide(targetElement, targetIndex);
        });
        carouselBulletsWrapper.appendChild(bullet);
    }

    for (i = 0; i < carouselButtons.length; i++) {
        carouselButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var targetElement;
            var newTranslate;
            var action = this.dataset.control;
            var currSlide = parseInt(carouselWrapper.dataset.slide);
            var activeElement = document.querySelector('.vanillajs-carousel .item.active');

            if (action === 'next') {
                if (activeElement.nextElementSibling) {
                    targetElement = activeElement.nextElementSibling;
                    slide = currSlide + 1;
                } else {
                    targetElement = carouselItems[0];
                    slide = 0;
                }
            }

            if (action === 'prev') {
                if (activeElement.previousElementSibling) {
                    targetElement = activeElement.previousElementSibling;
                    slide = currSlide - 1;
                } else {
                    targetElement = carouselItems[carouselItemsNumber - 1];
                    slide = carouselItemsNumber - 1;
                }
            }

            setSlide(targetElement, slide);
        });
    }
};
