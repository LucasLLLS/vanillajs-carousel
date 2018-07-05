function setCarousel() {
    var i;
    const carouselItems = document.querySelectorAll('.vanillajs-carousel .item'),
        carouselItemsNumber = carouselItems.length,
        carouselWrapper = document.querySelector('.vanillajs-carousel'),
        carouselButtons = document.querySelectorAll('.vanillajs-carousel-controls'),
        bodyWidth = carouselWrapper.offsetWidth,
        carouselBulletsWrapper = document.querySelector('.vanillajs-carousel-bullets');

    carouselWrapper.style.width = (bodyWidth * carouselItemsNumber) + 'px';

    for (i = 0; i < carouselItemsNumber.length; i++) {
        var bullet = document.createElement('a');

        console.log(' AQUI ');

        bullet.addEventListener('click', function (e) {
            e.preventDefault();
            targetElement = carouselItems[i];
            newTranslate = (bodyWidth * i) * -1;
        });
        carouselBulletsWrapper.appendChild(bullet);
    }

    for (i = 0; i < carouselButtons.length; i++) {
        carouselButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            var targetElement;
            var newTranslate;
            var action = this.dataset.control;
            var currTranslate = parseInt(carouselWrapper.dataset.translate);
            var activeElement = document.querySelector('.vanillajs-carousel .item.active');

            if (action === 'next') {
                if (activeElement.nextElementSibling) {
                    targetElement = activeElement.nextElementSibling;
                    newTranslate = (currTranslate - bodyWidth);
                } else {
                    targetElement = carouselItems[0];
                    newTranslate = 0;
                }
            }

            if (action === 'prev') {
                if (activeElement.previousElementSibling) {
                    targetElement = activeElement.previousElementSibling;
                    newTranslate = (currTranslate + bodyWidth);
                } else {
                    targetElement = carouselItems[carouselItemsNumber - 1];
                    newTranslate = (bodyWidth * (carouselItemsNumber - 1)) * -1;
                }
            }

            targetElement.classList.add('active');
            activeElement.classList.remove('active');
            carouselWrapper.style.transform = 'translate(' + (newTranslate) + 'px)';
            carouselWrapper.dataset.translate = newTranslate;
        });
    }
}