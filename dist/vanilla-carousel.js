'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var vanilla = {
    bodyWidth: document.body.offsetWidth,
    slide: null,
    carouselItems: document.querySelectorAll('.vanillajs-carousel .item'),
    carouselWrapper: document.querySelector('.vanillajs-carousel'),
    carouselButtons: document.querySelectorAll('.vanillajs-carousel-controls'),
    carouselBulletsWrapper: document.querySelector('.vanillajs-carousel-bullets'),
    carouselItemsNumber: function carouselItemsNumber() {
        return this.carouselItems.length;
    },
    setBullet: function setBullet(index) {
        var eqBulletElement = document.querySelector('.vanillajs-carousel-bullet-' + index);

        if (document.querySelector('.vanillajs-carousel-bullets a.active')) {
            document.querySelector('.vanillajs-carousel-bullets a.active').classList.remove('active');
        }

        eqBulletElement.classList.add('active');
    },
    setSlide: function setSlide(target, slide) {
        var activeElement = document.querySelector('.vanillajs-carousel .item.active');

        target.classList.add('active');
        activeElement.classList.remove('active');
        this.carouselWrapper.style.transform = 'translate(' + this.bodyWidth * slide * -1 + 'px)';
        this.carouselWrapper.dataset.slide = slide;
        this.setBullet(slide);
    },
    setCarousel: function setCarousel() {
        var _this = this;

        this.carouselWrapper.style.width = this.bodyWidth * this.carouselItemsNumber() + 'px';

        Object.entries(this.carouselItems).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                key = _ref2[0];

            var bullet = document.createElement('a');
            bullet.dataset.slide = key;
            bullet.classList.add('vanillajs-carousel-bullet-' + key);
            if (key === '0') bullet.classList.add('active');

            bullet.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var targetElement = void 0;
                var targetIndex = e.srcElement.dataset.slide;
                var activeElement = document.querySelector('.vanillajs-carousel .item.active');

                targetElement = _this.carouselItems[targetIndex];

                _this.setSlide(targetElement, targetIndex);
            });
            _this.carouselBulletsWrapper.appendChild(bullet);
        });

        Object.entries(this.carouselButtons).map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                button = _ref4[1];

            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var targetElement = void 0;
                var action = button.dataset.control;
                var currSlide = parseInt(_this.carouselWrapper.dataset.slide);
                var activeElement = document.querySelector('.vanillajs-carousel .item.active');

                if (action === 'next') {
                    if (activeElement.nextElementSibling) {
                        targetElement = activeElement.nextElementSibling;
                        _this.slide = currSlide + 1;
                    } else {
                        targetElement = _this.carouselItems[0];
                        _this.slide = 0;
                    }
                }

                if (action === 'prev') {
                    if (activeElement.previousElementSibling) {
                        targetElement = activeElement.previousElementSibling;
                        _this.slide = currSlide - 1;
                    } else {
                        targetElement = _this.carouselItems[_this.carouselItemsNumber - 1];
                        _this.slide = _this.carouselItemsNumber - 1;
                    }
                }

                _this.setSlide(targetElement, _this.slide);
            });
        });
    }
};
