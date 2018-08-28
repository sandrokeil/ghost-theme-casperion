(function ($) {
    'use strict';

    $( document ).ready( function () {
        $("#search-field").ghostHunter({
            results: "#results",
            onKeyUp: true,
            info_template: "<p class='search-results-number'>Number of posts found: {{amount}}</p>",
            result_template: "<a id='gh-{{ref}}' class='gh-search-item' href='{{link}}'><h3>{{title}} - {{pubDate}}</h3><p class='search-description'>{{description}}</p></a>"
        });
        $( '#close-btn' ).click( function () {
            $( '#search-overlay' ).fadeOut();
        } );
        $( '#search-btn' ).click( function () {
            $( '#search-overlay' ).fadeIn();
            $( '#search-field' ).focus();
        } );

        $(document).keyup(function(e) {
            if (e.keyCode === 27) $('#close-btn').click();   // esc
        });
    } );

}( jQuery ));