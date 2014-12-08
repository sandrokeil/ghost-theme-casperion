(function ($) {
    "use strict";

    $(document).ready(function () {
        /* Custom JavaScript for the Slide Menu */
        var html = $('html, body'),
            navContainer = $('.nav-container'),
            navToggle = $('.nav-toggle'),
            navDropdownToggle = $('.has-dropdown');

        // Nav toggle
        navToggle.on('click', function(e) {
            var $this = $(this);
            e.preventDefault();
            $this.toggleClass('is-active');
            navContainer.toggleClass('is-visible');
            html.toggleClass('nav-open');
        });

        // Nav dropdown toggle
        navDropdownToggle.on('click', function() {
            var $this = $(this);
            $this.toggleClass('is-active').children('ul').toggleClass('is-visible');
        });

        // Prevent click events from firing on children of navDropdownToggle
        navDropdownToggle.on('click', '*', function(e) {
            e.stopPropagation();
        });

        new UISearch( document.getElementById( 'search' ) );

        $('#search').on('click', '.search-clear-toggle', function (e) {
            e.preventDefault();
            $('.search-input').val('');
            $('.search-results').removeClass('search-active');
        });

        if ($("pre code")[0]) {
            $.getScript("//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/highlight.min.js", function() {
                $("pre code").each(function (i, e) {
                    hljs.highlightBlock(e)
                });
            });
        }

    });
}(jQuery));
