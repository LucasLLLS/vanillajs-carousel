'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var vanilla = {
    bodyWidth: document.body.offsetWidth,
    slide: null,
    items: document.querySelectorAll('.vanillajs-carousel .item'),
    wrapper: document.querySelector('.vanillajs-carousel'),
    buttons: document.querySelectorAll('.vanillajs-carousel-controls a'),
    bulletsWrapper: document.querySelector('.vanillajs-carousel-bullets'),
    itemsNumber: function itemsNumber() {
        return this.items.length;
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
        this.wrapper.style.transform = 'translate(' + this.bodyWidth * slide * -1 + 'px)';
        this.wrapper.dataset.slide = slide;
        this.setBullet(slide);
    },
    setBullets: function setBullets() {
        var _this = this;

        Object.entries(this.items).map(function (_ref) {
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

                targetElement = _this.items[targetIndex];

                _this.setSlide(targetElement, targetIndex);
            });
            _this.bulletsWrapper.appendChild(bullet);
        });
    },
    setButtons: function setButtons() {
        var _this2 = this;

        Object.entries(this.buttons).map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                button = _ref4[1];

            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var targetElement = void 0;
                var action = button.dataset.control;
                var currSlide = parseInt(_this2.wrapper.dataset.slide);
                var activeElement = document.querySelector('.vanillajs-carousel .item.active');

                if (action === 'next') {
                    if (activeElement.nextElementSibling) {
                        targetElement = activeElement.nextElementSibling;
                        _this2.slide = currSlide + 1;
                    } else {
                        targetElement = _this2.items[0];
                        _this2.slide = 0;
                    }
                }

                if (action === 'prev') {
                    if (activeElement.previousElementSibling) {
                        targetElement = activeElement.previousElementSibling;
                        _this2.slide = currSlide - 1;
                    } else {
                        targetElement = _this2.items[_this2.itemsNumber - 1];
                        _this2.slide = _this2.itemsNumber - 1;
                    }
                }

                _this2.setSlide(targetElement, _this2.slide);
            });
        });
    },
    setCarousel: function setCarousel(params) {

        this.wrapper.style.width = this.bodyWidth * this.itemsNumber() + 'px';

        if (!params || params.bullets || typeof params.bullets === 'undefined') {
            this.setBullets();
        };

        if (!params || !params.customButtons) {
            this.setButtons();
        }
    }
};
