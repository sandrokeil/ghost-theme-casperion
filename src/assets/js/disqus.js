var disqus_shortname = ghostionConfig.disqus_shortname;

/* Disqus Comment */
$('#discuss').on('click', function () {
    $('#discuss').hide();
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + ghostionConfig.disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
});

(function ($) {
    "use strict";
    $(document).ready(function () {
        if (typeof disqus_domain != "undefined")DISQUSWIDGETS.domain = disqus_domain;
        DISQUSWIDGETS.forum = disqus_shortname;
        DISQUSWIDGETS.getCount();
    });
}(jQuery));

// count.js of disqus
var DISQUSWIDGETS, disqus_domain, disqus_shortname;
typeof DISQUSWIDGETS == "undefined" && (DISQUSWIDGETS = function () {
    var c = {}, q = document.getElementsByTagName("HEAD")[0] || document.body, h = {}, o = {identifier: 1, url: 2};
    c.domain = "disqus.com";
    c.forum = "";
    c.getCount = function (a) {
        var b;
        b = encodeURIComponent;
        var r = document.location.protocol + "//" + c.forum + "." + c.domain + "/count-data.js?", d = [], i = 0, j = 10, p = "", a = a || {};
        a.reset && (h = {}, p = "&_=" + +new Date);
        for (var a = [document.getElementsByTagName("A"), document.getElementsByClassName && document.getElementsByClassName("disqus-comment-count") ||
        []], k, g, e, f, l = 0; l < a.length; l++) {
            k = a[l];
            for (var m = 0; m < k.length; m++) {
                g = k[m];
                e = g.getAttribute("data-disqus-identifier");
                f = g.hash === "#disqus_thread" && g.href.replace("#disqus_thread", "") || g.getAttribute("data-disqus-url");
                if (e)f = o.identifier; else if (f)e = f, f = o.url; else continue;
                var n;
                h.hasOwnProperty(e) ? n = h[e] : (n = h[e] = {elements: [], type: f}, d.push(b(f) + "=" + b(e)));
                n.elements.push(g)
            }
        }
        d.sort();
        for (b = d.slice(i, j); b.length;)a = document.createElement("script"), a.async = !0, a.src = r + b.join("&") + p, q.appendChild(a),
            i += 10, j += 10, b = d.slice(i, j)
    };
    c.displayCount = function (a) {
        for (var b, c, d, i = a.counts, a = a.text.comments; b = i.shift();)if (c = h[b.id]) {
            switch (b.comments) {
                case 0:
                    d = a.zero;
                    break;
                case 1:
                    d = a.one;
                    break;
                default:
                    d = a.multiple
            }
            b = d.replace("{num}", b.comments);
            c = c.elements;
            for (d = c.length - 1; d >= 0; d--)c[d].innerHTML = b
        }
    };
    return c
}());
