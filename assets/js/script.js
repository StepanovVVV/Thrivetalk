// Header/burger-menu
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const body = document.body;
    const overlay = document.querySelector('.header__overlay');
    const menuLinks = document.querySelectorAll('.header__menu a');

    burger.addEventListener('click', function () {
        const isActive = burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll', isActive);
    });

    overlay.addEventListener('click', function () {
        burger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });

    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            burger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});

// LazyLoad img/iframe/video
document.addEventListener("DOMContentLoaded", function () {
    const tags = ['img', 'iframe', 'video'];

    tags.forEach(tag => {
        const elements = document.querySelectorAll(tag);

        elements.forEach(element => {
            if (element.hasAttribute('src')) {
                const srcValue = element.getAttribute('src');

                element.setAttribute('data-src', srcValue);

                element.removeAttribute('src');

                element.classList.add('lazy');
            }

            if (tag === 'video') {
                const sources = element.querySelectorAll('source');

                sources.forEach(source => {
                    if (source.hasAttribute('src')) {
                        const srcValue = source.getAttribute('src');
                        source.setAttribute('data-src', srcValue);
                        source.removeAttribute('src');
                    }
                });
            }
        });
    });

    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });

    $(document).on("init", ".slick-slider", function (e, slick) {
        slick.$slides.find('img').each(function () {
            lazyLoadInstance.load(this);
        });
    });
});

$('.slick-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var activeSlide = $(slick.$slides[currentSlide]);
    activeSlide.find('[tabindex]').blur();
});

$('.slick-slider').on('afterChange', function (event, slick, currentSlide) {
    var newActiveSlide = $(slick.$slides[currentSlide]);
    newActiveSlide.find('[tabindex]').focus();
});

//Remove placeholder on click
$('input,textarea').on('focus', function () {
    var $this = $(this);
    if ($this.attr('placeholder')) {
        $this.data('placeholder', $this.attr('placeholder'));
        $this.attr('placeholder', '');
    }
}).on('blur', function () {
    var $this = $(this);
    if ($this.data('placeholder')) {
        $this.attr('placeholder', $this.data('placeholder'));
    }
});

// Function for start page
function showPageAfterDelay() {
    if (document.readyState === 'complete') {
        setTimeout(function () {
            document.body.classList.remove('hidden');
        }, 500);
    } else {
        window.addEventListener('load', function () {
            setTimeout(function () {
                document.body.classList.remove('hidden');
            }, 500);
        });
    }
}

showPageAfterDelay();

// Add class for header scroll
const header = document.querySelector('.header');

if (window.scrollY > 50) {
    header.classList.add('scrolled');
}

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// For scroll page
const headerScroll = document.querySelector('.header');
const menuLinks = document.querySelectorAll('a[href^="#"]');
const headerHeight = 70;

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            let offsetPosition = targetPosition;

            if (window.innerWidth <= 640) {
                offsetPosition = targetPosition - headerHeight;
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Accordion
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var dropdownlink = this.el.find('.accordion__title');
        dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            },
            this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.accordion__info').not($next).slideUp().parent().removeClass('open');
        }
    }

    var accordion = new Accordion($('.accordion'), false);
})

// Tabs
$(function () {
    $("div.tabs__btns").on("click", "div.tabs__btn:not(.active)", function () {
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs")
            .find("div.tabs__item")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
    });
});

// For active form
const inputs = document.querySelectorAll('.form__input');
const labels = document.querySelectorAll('.form__label');

inputs.forEach((input, index) => {
    const label = labels[index];

    input.addEventListener('focus', function () {
        label.classList.add('active');
    });

    input.addEventListener('blur', function () {
        if (input.value === '') {
            label.classList.remove('active');
        }
    });
});

// Mask for phones
$(function () {
    $("#phone").mask("+55 (999) 999-99-99");
});

// Gallary slider
$('.gallery__slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});