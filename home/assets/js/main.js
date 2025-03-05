// ==================================================
// * Project Name   :  RankUpFast - SEO and Digital Marketing Agency Site Template
// * File           :  JS Base
// * Version        :  1.0.0
// * Last change    :  Saturday, May 18, 2024
// * Author         :  Web Thunder (https://themeforest.net/user/web-thunder/portfolio)
// * Developer      :  webrok (https://www.fiverr.com/webrok?up_rollout=true)
// ==================================================

(function($) {
    "use strict";

    // Back To Top - Start
    // --------------------------------------------------
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.backtotop:hidden').stop(true, true).fadeIn();
        } else {
            $('.backtotop').stop(true, true).fadeOut();
        }
    });
    $(function() {
        $(".scroll").on('click', function() {
            $("html,body").animate({
                scrollTop: 0
            }, 0);
            return false
        });
    });
    // Back To Top - End
    // --------------------------------------------------

    // Preloader - Start
    // --------------------------------------------------
    const preloader = $("#preloader");
    $(window).on("load", function() {
        preloader.addClass("preloaded");
        setTimeout(function() {
            preloader.remove();
        }, 1500);
    });
    // Preloader - End
    // --------------------------------------------------

    // Sticky Header - Start
    // --------------------------------------------------
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 0) {
            $('.site_header').addClass("sticky")
        } else {
            $('.site_header').removeClass("sticky")
        }
    });
    // Sticky Header - End
    // --------------------------------------------------

    // Header Menu Item Effect - Start
    // --------------------------------------------------
    $('.site_header .main_menu_list > li:not(.active)').mouseover(function() {
        $('.site_header .main_menu_list > li:not(.active)').css({
            'opacity': '0.5',
            'transition': 'opacity 0.3s'
        });
        $(this).css({
            'opacity': '1',
            'color': 'var(--bs-dark)',
            'transition': 'opacity 0.3s'
        });
    });

    $('.site_header .main_menu_list > li:not(.active)').mouseout(function() {
        $('.site_header .main_menu_list > li:not(.active)').css({
            'opacity': '1',
            'color': 'var(--bs-dark)',
            'transition': 'opacity 0.3s'
        });
    });
    // Header Menu Item Effect - End
    // --------------------------------------------------

    // Offcanvas - Start
    // --------------------------------------------------
    $(".offcanvas_btn, .offcanvas_wrapper").on('mouseover', function() {
        $(".offcanvas_wrapper").addClass("active");
    });

    $(".offcanvas_btn, .offcanvas_wrapper").on('mouseout', function() {
        $(".offcanvas_wrapper").removeClass("active");
    });
    // Offcanvas - End
    // --------------------------------------------------

    // Pricing Toggle Button - Start
    // --------------------------------------------------
    $(".pricing_value_filter_btn > button").on('click', function() {
        $(this).toggleClass("active");
        $(".pricing_card").toggleClass("active");
    });
    // Pricing Toggle Button - End
    // --------------------------------------------------

    // Odometer Counter - Start
    // --------------------------------------------------
    jQuery('.odometer').appear(function(e) {
        var odo = jQuery(".odometer");
        odo.each(function() {
            var countNumber = jQuery(this).attr("data-count");
            jQuery(this).html(countNumber);
        });
    });
    // Odometer Counter - End
    // --------------------------------------------------

    // Videos & Images Popup - Start
    // --------------------------------------------------
    $('.popup_video, .popup_video_2').magnificPopup({
        type: 'iframe',
        preloader: false,
        removalDelay: 160,
        mainClass: 'mfp-fade',
        fixedContentPos: false
    });

    $('.zoom-gallery').magnificPopup({
        delegate: '.popup_image',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function(element) {
                return element.find('img');
            }
        }
    });
    // Videos & Images Popup - End
    // --------------------------------------------------

    // Filter Elements - Start
    // --------------------------------------------------
    $(".filter_elements_nav > button").click(function() {
        var filterValue = $(this).attr('data-filter');
        if (filterValue == "all") {
            $(".filter_elements_wrapper > div").show();
        } else {
            $(".filter_elements_wrapper > div").not('.' + filterValue).hide();
            $(".filter_elements_wrapper > div").filter('.' + filterValue).show();
        }
    });
    $(".filter_elements_nav > button").on("click", function() {
        $(this).addClass("active").siblings().removeClass("active");
    });
    // Filter Elements - End
    // --------------------------------------------------

    // Slider, Carousels - Start
    // --------------------------------------------------
    // Carousel 3 Column
    const carouselColThree = new Swiper('.carousel_col_3', {
        loop: false,
        speed: 1000,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-cc3-next",
            prevEl: ".swiper-button-cc3-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            881: {
                slidesPerView: 2,
            },
            1301: {
                slidesPerView: 3,
            },
        },
    });

    // Carousel 4 Column
    const carouselColFour = new Swiper('.carousel_col_4', {
        loop: false,
        speed: 1000,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-cc4-next",
            prevEl: ".swiper-button-cc4-prev",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1461: {
                slidesPerView: 4,
            },
        },
    });

    // Award Carousel 4 Column
    const awardCarouselColFour = new Swiper('.award_carousel_col_4', {
        loop: true,
        speed: 1000,
        spaceBetween: 24,
        pagination: {
            el: ".award-swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1461: {
                slidesPerView: 4,
            },
        },
    });

    // Carousel 7 Column
    const carouselColSeven = new Swiper('.carousel_col_7', {
        loop: false,
        speed: 6000,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-cc7-next",
            prevEl: ".swiper-button-cc7-prev",
        },
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
        pagination: {
            el: ".cc7_swiper_pagination",
            clickable: true,
        },
        breakpoints: {
            376: {
                slidesPerView: 2,
            },
            680: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
            1441: {
                slidesPerView: 5,
            },
            1561: {
                slidesPerView: 6,
            },
            1781: {
                slidesPerView: 7,
            },
        },
    });

    // Review Carousel
    const reviewCarousel = new Swiper('.review_carousel', {
        loop: true,
        speed: 6000,
        spaceBetween: 30,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-rc-next",
            prevEl: ".swiper-button-rc-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            881: {
                slidesPerView: 2,
            },
            1301: {
                slidesPerView: 3,
            },
        },
    });

    // Client Logo Carousel
    const clientLogoCarousel = new Swiper('.client_logo_carousel', {
        loop: true,
        speed: 5000,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1025: {
                slidesPerView: 5,
            },
        },
    });
    // Slider, Carousels - End
    // --------------------------------------------------


})(jQuery);