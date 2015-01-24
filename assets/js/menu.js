(function ($) {
    $('.logo-readium').click(function(e) {
        e.preventDefault();
        $(this).closest('.menu').toggleClass('menu-active');
    });
}(jQuery));
