$(function () {
    var delete_tag = '<img class="delete_slide" src="https://sergeislider.github.io/slider_tilda/img/delete_2.png">';
    window.$selected_slider;
    window.$element_clicked;
    window.$lastSlide;
    window.slider_current = 0;
    window.$current_slider = '';
    $('.slick_sliders').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        nextArrow: `<div class="right">
            <svg style="display: block" viewBox="0 0 9.3 17" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>Right</desc>
                <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1"
                          points="0.5,0.5 8.5,8.5 0.5,16.5"></polyline>
            </svg>
        </div>`,
        prevArrow: `<div class="left">
            <svg style="display: block" viewBox="0 0 9.3 17" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>Left</desc>
                <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1"
                          points="0.5,0.5 8.5,8.5 0.5,16.5"></polyline>
            </svg>
        </div>`
    })
    $('.slick_sliders').on('swipe', function(event, slick, currentSlide, nextSlide){
        console.log('это слайдер slick', slick.$slider)
        $current_slider = slick.$slider;
        $current_slider.find('.delete_slide').hide();
        if ($current_slider.find('img.img_original.slick-slide.slick-current.slick-active').is('.hovered')) {
            setTimeout(function () {
                $current_slider.find('.delete_slide').show();
            },500)
        } else {
            $current_slider.find('img.img_original.slick-slide.slick-current.slick-active').removeClass('hovered');
            $current_slider.find('.delete_slide').hide();
        }
    });

    $('.slick_sliders').on('swipe', function(event, slick, currentSlide, nextSlide){
        $current_slider.find('.delete_slide').hide();
        if ($current_slider.find('img.img_original.slick-slide.slick-current.slick-active').is('.hovered')) {
            setTimeout(function () {
                $current_slider.find('.delete_slide').show();
            },500)
        } else {
            $current_slider.find('img.img_original.slick-slide.slick-current.slick-active').removeClass('hovered');
            $current_slider.find('.delete_slide').hide();
        }
    });

    $('.slick_sliders').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if (slick.$slider.find('[data-slick-index='+nextSlide+']').is('.hovered')) {
            setTimeout(function () {
                $current_slider.find('.delete_slide').show();
            },500)
        } else {
            slick.$slider.find('.delete_slide').hide();
        }
    });

    $('.add_img').on('click', function (e) {
        $element_clicked = $(e.target);
        $('#slider_upload').click();
    });

    /* Load file to slider */
    window.loadFile = function (e) {
        $selected_slider = $element_clicked.parents('.slick-slider');
        console.log('e.target.files[0] ', e.target.files[0]);
        if (e.target.files[0] != undefined) {
            var file_url = URL.createObjectURL(e.target.files[0]);
            $selected_slider.slick('slickAdd', '<img class="img_original" src="' + file_url + '">', '0');
            lastSlide = $selected_slider.find('.slick-slide').not('.slick-cloned').last().data().slickIndex;
            console.log(lastSlide);
            $selected_slider.slick('slickGoTo', lastSlide)
            addHover();
        }
    }

    /* Hover on image functions */
    function addHover() {
        $('.slick-track img.img_original').off();
        $('.slick-track img.img_original').hover(hoverIn, hoverOut);
    }

    function hoverIn(e) {
        let $target = $(e.target);
        $current_slider = $target.parents('.slick-slider');
        console.log($current_slider)
        $current_slider.find('img.img_original.slick-slide.slick-current.slick-active').addClass('hovered');
        if (!$current_slider.find('.delete_slide').is('.delete_slide')) {
            $current_slider.prepend(delete_tag);
            $current_slider.find('img.delete_slide').on('click', function (e) {
                $current_slider = $(e.target).parents('.slick-slider');
              if ( confirm('Вы хотите удалить изображение?') ) {
                  deleteSlide();
              } else {
                  $current_slider.find('img.img_original.slick-slide.slick-current.slick-active').removeClass('hovered');
                  $current_slider.find('.delete_slide').hide();
              }
            })
        }
        $current_slider.find('.delete_slide').show();
    }

    function hoverOut(e) {
        let $target = $(e.target);
        let $targetOut = $(document.elementFromPoint(e.clientX, e.clientY));
        // for mobile
        if ($(window).width() < 640 ) {
            $current_slider = $targetOut.parents('.slick-slider');
        }
        if ($targetOut.is('.right.slick-arrow') || $targetOut.is('svg') || $targetOut.is('.left.slick-arrow')) {
            $current_slider.find('.delete_slide').hide();
            return false;
        }
        console.log('$targetOut', $(document.elementFromPoint(e.pageX, e.pageY)))
        if ($targetOut.is('.delete_slide')) {
            return false;
        } else {
            $current_slider.find('img.img_original.slick-slide.slick-current.slick-active').removeClass('hovered');
            $current_slider.find('.delete_slide').hide();
        }
    }

    function deleteSlide() {
        $current_slider.find('.slick-slide').not('.slick-cloned').not('.add_img ').each(function(i,d){
            slider_current++;
            console.log(i,d, slider_current);
            if ($(d).is('.slick-active') && $(d).is('.hovered')) {
                $current_slider.slick('slickRemove', slider_current);
                slider_current = 0;
                return false;
            }
        })
        $current_slider.find('.delete_slide').hide();
        $current_slider.find('img.img_original.slick-slide.slick-current.slick-active').removeClass('hovered');
    }

})
