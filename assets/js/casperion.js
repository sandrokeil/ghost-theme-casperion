/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

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

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', ghostionConfig.google_analytics_tracking_id, 'auto');
ga('send', 'pageview');

/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, sr, undefined) {
    "use strict";

    var $document = $(document),

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }

        var $img = $("img").on('load', updateImageWidth);
        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
        $(window).smartresize(casperFullImg);

        $(".scroll-down").arctic_scroll();

    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery, 'smartresize');

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

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/**
 * ghostHunter - 0.2.3
 * Copyright (C) 2014 Jamal Neufeld (jamal@i11u.me)
 * MIT Licensed
 * @license
 */
(function ($) {

    /* The lunr 0.4.3 library is included here to perform the fulltext searching. lunr is copyright (C) 2013 Oliver Nightingale. MIT Licensed */
    var lunr = function (t) {
        var e = new lunr.Index;
        return e.pipeline.add(lunr.stopWordFilter, lunr.stemmer), t && t.call(e, e), e
    };
    lunr.version = "0.4.3", "undefined" != typeof module && (module.exports = lunr), lunr.utils = {}, lunr.utils.warn = function (t) {
        return function (e) {
            t.console && console.warn && console.warn(e)
        }
    }(this), lunr.utils.zeroFillArray = function () {
        var t = [0];
        return function (e) {
            for (; e > t.length;)t = t.concat(t);
            return t.slice(0, e)
        }
    }(), lunr.EventEmitter = function () {
        this.events = {}
    }, lunr.EventEmitter.prototype.addListener = function () {
        var t = Array.prototype.slice.call(arguments), e = t.pop(), n = t;
        if ("function" != typeof e)throw new TypeError("last argument must be a function");
        n.forEach(function (t) {
            this.hasHandler(t) || (this.events[t] = []), this.events[t].push(e)
        }, this)
    }, lunr.EventEmitter.prototype.removeListener = function (t, e) {
        if (this.hasHandler(t)) {
            var n = this.events[t].indexOf(e);
            this.events[t].splice(n, 1), this.events[t].length || delete this.events[t]
        }
    }, lunr.EventEmitter.prototype.emit = function (t) {
        if (this.hasHandler(t)) {
            var e = Array.prototype.slice.call(arguments, 1);
            this.events[t].forEach(function (t) {
                t.apply(void 0, e)
            })
        }
    }, lunr.EventEmitter.prototype.hasHandler = function (t) {
        return t in this.events
    }, lunr.tokenizer = function (t) {
        if (!arguments.length || null == t || void 0 == t)return [];
        if (Array.isArray(t))return t.map(function (t) {
            return t.toLowerCase()
        });
        for (var e = ("" + t).replace(/^\s+/, ""), n = e.length - 1; n >= 0; n--)if (/\S/.test(e.charAt(n))) {
            e = e.substring(0, n + 1);
            break
        }
        return e.split(/\s+/).map(function (t) {
            return t.replace(/^\W+/, "").replace(/\W+$/, "").toLowerCase()
        })
    }, lunr.Pipeline = function () {
        this._stack = []
    }, lunr.Pipeline.registeredFunctions = {}, lunr.Pipeline.registerFunction = function (t, e) {
        e in this.registeredFunctions && lunr.utils.warn("Overwriting existing registered function: " + e), t.label = e, lunr.Pipeline.registeredFunctions[t.label] = t
    }, lunr.Pipeline.warnIfFunctionNotRegistered = function (t) {
        var e = t.label && t.label in this.registeredFunctions;
        e || lunr.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", t)
    }, lunr.Pipeline.load = function (t) {
        var e = new lunr.Pipeline;
        return t.forEach(function (t) {
            var n = lunr.Pipeline.registeredFunctions[t];
            if (!n)throw Error("Cannot load un-registered function: " + t);
            e.add(n)
        }), e
    }, lunr.Pipeline.prototype.add = function () {
        var t = Array.prototype.slice.call(arguments);
        t.forEach(function (t) {
            lunr.Pipeline.warnIfFunctionNotRegistered(t), this._stack.push(t)
        }, this)
    }, lunr.Pipeline.prototype.after = function (t, e) {
        lunr.Pipeline.warnIfFunctionNotRegistered(e);
        var n = this._stack.indexOf(t) + 1;
        this._stack.splice(n, 0, e)
    }, lunr.Pipeline.prototype.before = function (t, e) {
        lunr.Pipeline.warnIfFunctionNotRegistered(e);
        var n = this._stack.indexOf(t);
        this._stack.splice(n, 0, e)
    }, lunr.Pipeline.prototype.remove = function (t) {
        var e = this._stack.indexOf(t);
        this._stack.splice(e, 1)
    }, lunr.Pipeline.prototype.run = function (t) {
        for (var e = [], n = t.length, r = this._stack.length, o = 0; n > o; o++) {
            for (var i = t[o], s = 0; r > s && (i = this._stack[s](i, o, t), void 0 !== i); s++);
            void 0 !== i && e.push(i)
        }
        return e
    }, lunr.Pipeline.prototype.toJSON = function () {
        return this._stack.map(function (t) {
            return lunr.Pipeline.warnIfFunctionNotRegistered(t), t.label
        })
    }, lunr.Vector = function (t) {
        this.elements = t
    }, lunr.Vector.prototype.magnitude = function () {
        if (this._magnitude)return this._magnitude;
        for (var t, e = 0, n = this.elements, r = n.length, o = 0; r > o; o++)t = n[o], e += t * t;
        return this._magnitude = Math.sqrt(e)
    }, lunr.Vector.prototype.dot = function (t) {
        for (var e = this.elements, n = t.elements, r = e.length, o = 0, i = 0; r > i; i++)o += e[i] * n[i];
        return o
    }, lunr.Vector.prototype.similarity = function (t) {
        return this.dot(t) / (this.magnitude() * t.magnitude())
    }, lunr.Vector.prototype.toArray = function () {
        return this.elements
    }, lunr.SortedSet = function () {
        this.length = 0, this.elements = []
    }, lunr.SortedSet.load = function (t) {
        var e = new this;
        return e.elements = t, e.length = t.length, e
    }, lunr.SortedSet.prototype.add = function () {
        Array.prototype.slice.call(arguments).forEach(function (t) {
            ~this.indexOf(t) || this.elements.splice(this.locationFor(t), 0, t)
        }, this), this.length = this.elements.length
    }, lunr.SortedSet.prototype.toArray = function () {
        return this.elements.slice()
    }, lunr.SortedSet.prototype.map = function (t, e) {
        return this.elements.map(t, e)
    }, lunr.SortedSet.prototype.forEach = function (t, e) {
        return this.elements.forEach(t, e)
    }, lunr.SortedSet.prototype.indexOf = function (t, e, n) {
        var e = e || 0, n = n || this.elements.length, r = n - e, o = e + Math.floor(r / 2), i = this.elements[o];
        return 1 >= r ? i === t ? o : -1 : t > i ? this.indexOf(t, o, n) : i > t ? this.indexOf(t, e, o) : i === t ? o : void 0
    }, lunr.SortedSet.prototype.locationFor = function (t, e, n) {
        var e = e || 0, n = n || this.elements.length, r = n - e, o = e + Math.floor(r / 2), i = this.elements[o];
        if (1 >= r) {
            if (i > t)return o;
            if (t > i)return o + 1
        }
        return t > i ? this.locationFor(t, o, n) : i > t ? this.locationFor(t, e, o) : void 0
    }, lunr.SortedSet.prototype.intersect = function (t) {
        for (var e = new lunr.SortedSet, n = 0, r = 0, o = this.length, i = t.length, s = this.elements, l = t.elements; ;) {
            if (n > o - 1 || r > i - 1)break;
            s[n] !== l[r] ? s[n] < l[r] ? n++ : s[n] > l[r] && r++ : (e.add(s[n]), n++, r++)
        }
        return e
    }, lunr.SortedSet.prototype.clone = function () {
        var t = new lunr.SortedSet;
        return t.elements = this.toArray(), t.length = t.elements.length, t
    }, lunr.SortedSet.prototype.union = function (t) {
        var e, n, r;
        return this.length >= t.length ? (e = this, n = t) : (e = t, n = this), r = e.clone(), r.add.apply(r, n.toArray()), r
    }, lunr.SortedSet.prototype.toJSON = function () {
        return this.toArray()
    }, lunr.Index = function () {
        this._fields = [], this._ref = "id", this.pipeline = new lunr.Pipeline, this.documentStore = new lunr.Store, this.tokenStore = new lunr.TokenStore, this.corpusTokens = new lunr.SortedSet, this.eventEmitter = new lunr.EventEmitter, this._idfCache = {}, this.on("add", "remove", "update", function () {
            this._idfCache = {}
        }.bind(this))
    }, lunr.Index.prototype.on = function () {
        var t = Array.prototype.slice.call(arguments);
        return this.eventEmitter.addListener.apply(this.eventEmitter, t)
    }, lunr.Index.prototype.off = function (t, e) {
        return this.eventEmitter.removeListener(t, e)
    }, lunr.Index.load = function (t) {
        t.version !== lunr.version && lunr.utils.warn("version mismatch: current " + lunr.version + " importing " + t.version);
        var e = new this;
        return e._fields = t.fields, e._ref = t.ref, e.documentStore = lunr.Store.load(t.documentStore), e.tokenStore = lunr.TokenStore.load(t.tokenStore), e.corpusTokens = lunr.SortedSet.load(t.corpusTokens), e.pipeline = lunr.Pipeline.load(t.pipeline), e
    }, lunr.Index.prototype.field = function (t, e) {
        var e = e || {}, n = {name: t, boost: e.boost || 1};
        return this._fields.push(n), this
    }, lunr.Index.prototype.ref = function (t) {
        return this._ref = t, this
    }, lunr.Index.prototype.add = function (t, e) {
        var n = {}, r = new lunr.SortedSet, o = t[this._ref], e = void 0 === e ? !0 : e;
        this._fields.forEach(function (e) {
            var o = this.pipeline.run(lunr.tokenizer(t[e.name]));
            n[e.name] = o, lunr.SortedSet.prototype.add.apply(r, o)
        }, this), this.documentStore.set(o, r), lunr.SortedSet.prototype.add.apply(this.corpusTokens, r.toArray());
        for (var i = 0; r.length > i; i++) {
            var s = r.elements[i], l = this._fields.reduce(function (t, e) {
                var r = n[e.name].length;
                if (!r)return t;
                var o = n[e.name].filter(function (t) {
                    return t === s
                }).length;
                return t + o / r * e.boost
            }, 0);
            this.tokenStore.add(s, {ref: o, tf: l})
        }
        e && this.eventEmitter.emit("add", t, this)
    }, lunr.Index.prototype.remove = function (t, e) {
        var n = t[this._ref], e = void 0 === e ? !0 : e;
        if (this.documentStore.has(n)) {
            var r = this.documentStore.get(n);
            this.documentStore.remove(n), r.forEach(function (t) {
                this.tokenStore.remove(t, n)
            }, this), e && this.eventEmitter.emit("remove", t, this)
        }
    }, lunr.Index.prototype.update = function (t, e) {
        var e = void 0 === e ? !0 : e;
        this.remove(t, !1), this.add(t, !1), e && this.eventEmitter.emit("update", t, this)
    }, lunr.Index.prototype.idf = function (t) {
        if (this._idfCache[t])return this._idfCache[t];
        var e = this.tokenStore.count(t), n = 1;
        return e > 0 && (n = 1 + Math.log(this.tokenStore.length / e)), this._idfCache[t] = n
    }, lunr.Index.prototype.search = function (t) {
        var e = this.pipeline.run(lunr.tokenizer(t)), n = lunr.utils.zeroFillArray(this.corpusTokens.length), r = [], o = this._fields.reduce(function (t, e) {
            return t + e.boost
        }, 0), i = e.some(function (t) {
            return this.tokenStore.has(t)
        }, this);
        if (!i)return [];
        e.forEach(function (t, e, i) {
            var s = 1 / i.length * this._fields.length * o, l = this, u = this.tokenStore.expand(t).reduce(function (e, r) {
                var o = l.corpusTokens.indexOf(r), i = l.idf(r), u = 1, a = new lunr.SortedSet;
                if (r !== t) {
                    var h = Math.max(3, r.length - t.length);
                    u = 1 / Math.log(h)
                }
                return o > -1 && (n[o] = s * i * u), Object.keys(l.tokenStore.get(r)).forEach(function (t) {
                    a.add(t)
                }), e.union(a)
            }, new lunr.SortedSet);
            r.push(u)
        }, this);
        var s = r.reduce(function (t, e) {
            return t.intersect(e)
        }), l = new lunr.Vector(n);
        return s.map(function (t) {
            return {ref: t, score: l.similarity(this.documentVector(t))}
        }, this).sort(function (t, e) {
            return e.score - t.score
        })
    }, lunr.Index.prototype.documentVector = function (t) {
        for (var e = this.documentStore.get(t), n = e.length, r = lunr.utils.zeroFillArray(this.corpusTokens.length), o = 0; n > o; o++) {
            var i = e.elements[o], s = this.tokenStore.get(i)[t].tf, l = this.idf(i);
            r[this.corpusTokens.indexOf(i)] = s * l
        }
        return new lunr.Vector(r)
    }, lunr.Index.prototype.toJSON = function () {
        return {
            version: lunr.version,
            fields: this._fields,
            ref: this._ref,
            documentStore: this.documentStore.toJSON(),
            tokenStore: this.tokenStore.toJSON(),
            corpusTokens: this.corpusTokens.toJSON(),
            pipeline: this.pipeline.toJSON()
        }
    }, lunr.Store = function () {
        this.store = {}, this.length = 0
    }, lunr.Store.load = function (t) {
        var e = new this;
        return e.length = t.length, e.store = Object.keys(t.store).reduce(function (e, n) {
            return e[n] = lunr.SortedSet.load(t.store[n]), e
        }, {}), e
    }, lunr.Store.prototype.set = function (t, e) {
        this.store[t] = e, this.length = Object.keys(this.store).length
    }, lunr.Store.prototype.get = function (t) {
        return this.store[t]
    }, lunr.Store.prototype.has = function (t) {
        return t in this.store
    }, lunr.Store.prototype.remove = function (t) {
        this.has(t) && (delete this.store[t], this.length--)
    }, lunr.Store.prototype.toJSON = function () {
        return {store: this.store, length: this.length}
    }, lunr.stemmer = function () {
        var t = {
            ational: "ate",
            tional: "tion",
            enci: "ence",
            anci: "ance",
            izer: "ize",
            bli: "ble",
            alli: "al",
            entli: "ent",
            eli: "e",
            ousli: "ous",
            ization: "ize",
            ation: "ate",
            ator: "ate",
            alism: "al",
            iveness: "ive",
            fulness: "ful",
            ousness: "ous",
            aliti: "al",
            iviti: "ive",
            biliti: "ble",
            logi: "log"
        }, e = {
            icate: "ic",
            ative: "",
            alize: "al",
            iciti: "ic",
            ical: "ic",
            ful: "",
            ness: ""
        }, n = "[^aeiou]", r = "[aeiouy]", o = n + "[^aeiouy]*", i = r + "[aeiou]*", s = "^(" + o + ")?" + i + o, l = "^(" + o + ")?" + i + o + "(" + i + ")?$", u = "^(" + o + ")?" + i + o + i + o, a = "^(" + o + ")?" + r;
        return function (n) {
            var i, h, c, p, f, d, v;
            if (3 > n.length)return n;
            if (c = n.substr(0, 1), "y" == c && (n = c.toUpperCase() + n.substr(1)), p = /^(.+?)(ss|i)es$/, f = /^(.+?)([^s])s$/, p.test(n) ? n = n.replace(p, "$1$2") : f.test(n) && (n = n.replace(f, "$1$2")), p = /^(.+?)eed$/, f = /^(.+?)(ed|ing)$/, p.test(n)) {
                var m = p.exec(n);
                p = RegExp(s), p.test(m[1]) && (p = /.$/, n = n.replace(p, ""))
            } else if (f.test(n)) {
                var m = f.exec(n);
                i = m[1], f = RegExp(a), f.test(i) && (n = i, f = /(at|bl|iz)$/, d = RegExp("([^aeiouylsz])\\1$"), v = RegExp("^" + o + r + "[^aeiouwxy]$"), f.test(n) ? n += "e" : d.test(n) ? (p = /.$/, n = n.replace(p, "")) : v.test(n) && (n += "e"))
            }
            if (p = /^(.+?)y$/, p.test(n)) {
                var m = p.exec(n);
                i = m[1], p = RegExp(a), p.test(i) && (n = i + "i")
            }
            if (p = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/, p.test(n)) {
                var m = p.exec(n);
                i = m[1], h = m[2], p = RegExp(s), p.test(i) && (n = i + t[h])
            }
            if (p = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/, p.test(n)) {
                var m = p.exec(n);
                i = m[1], h = m[2], p = RegExp(s), p.test(i) && (n = i + e[h])
            }
            if (p = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, f = /^(.+?)(s|t)(ion)$/, p.test(n)) {
                var m = p.exec(n);
                i = m[1], p = RegExp(u), p.test(i) && (n = i)
            } else if (f.test(n)) {
                var m = f.exec(n);
                i = m[1] + m[2], f = RegExp(u), f.test(i) && (n = i)
            }
            if (p = /^(.+?)e$/, p.test(n)) {
                var m = p.exec(n);
                i = m[1], p = RegExp(u), f = RegExp(l), d = RegExp("^" + o + r + "[^aeiouwxy]$"), (p.test(i) || f.test(i) && !d.test(i)) && (n = i)
            }
            return p = /ll$/, f = RegExp(u), p.test(n) && f.test(n) && (p = /.$/, n = n.replace(p, "")), "y" == c && (n = c.toLowerCase() + n.substr(1)), n
        }
    }(), lunr.Pipeline.registerFunction(lunr.stemmer, "stemmer"), lunr.stopWordFilter = function (t) {
        return -1 === lunr.stopWordFilter.stopWords.indexOf(t) ? t : void 0
    }, lunr.stopWordFilter.stopWords = new lunr.SortedSet, lunr.stopWordFilter.stopWords.length = 119, lunr.stopWordFilter.stopWords.elements = ["", "a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"], lunr.Pipeline.registerFunction(lunr.stopWordFilter, "stopWordFilter"), lunr.TokenStore = function () {
        this.root = {docs: {}}, this.length = 0
    }, lunr.TokenStore.load = function (t) {
        var e = new this;
        return e.root = t.root, e.length = t.length, e
    }, lunr.TokenStore.prototype.add = function (t, e, n) {
        var n = n || this.root, r = t[0], o = t.slice(1);
        return r in n || (n[r] = {docs: {}}), 0 === o.length ? (n[r].docs[e.ref] = e, this.length += 1, void 0) : this.add(o, e, n[r])
    }, lunr.TokenStore.prototype.has = function (t) {
        if (!t)return !1;
        for (var e = this.root, n = 0; t.length > n; n++) {
            if (!e[t[n]])return !1;
            e = e[t[n]]
        }
        return !0
    }, lunr.TokenStore.prototype.getNode = function (t) {
        if (!t)return {};
        for (var e = this.root, n = 0; t.length > n; n++) {
            if (!e[t[n]])return {};
            e = e[t[n]]
        }
        return e
    }, lunr.TokenStore.prototype.get = function (t, e) {
        return this.getNode(t, e).docs || {}
    }, lunr.TokenStore.prototype.count = function (t, e) {
        return Object.keys(this.get(t, e)).length
    }, lunr.TokenStore.prototype.remove = function (t, e) {
        if (t) {
            for (var n = this.root, r = 0; t.length > r; r++) {
                if (!(t[r]in n))return;
                n = n[t[r]]
            }
            delete n.docs[e]
        }
    }, lunr.TokenStore.prototype.expand = function (t, e) {
        var n = this.getNode(t), r = n.docs || {}, e = e || [];
        return Object.keys(r).length && e.push(t), Object.keys(n).forEach(function (n) {
            "docs" !== n && e.concat(this.expand(t + n, e))
        }, this), e
    }, lunr.TokenStore.prototype.toJSON = function () {
        return {root: this.root, length: this.length}
    };

    //This is the main plugin definition
    $.fn.ghostHunter = function (options) {

        //Here we use jQuery's extend to set default values if they weren't set by the user
        var opts = $.extend({}, $.fn.ghostHunter.defaults, options);
        if (opts.results) {
            pluginMethods.init(this, opts);
            return pluginMethods;
        }

    };

    $.fn.ghostHunter.defaults = {
        results: false,
        rss: "/rss",
        onKeyUp: false,
        result_template: "<a href='{{link}}'><p><h2>{{title}}</h2><h4>{{pubDate}}</h4></p></a>",
        info_template: "<p>Number of posts found: {{amount}}</p>",
        displaySearchInfo: true,
        zeroResultsInfo: true,
        before: false,
        onComplete: false
    };

    var pluginMethods = {

        isInit: false,

        init: function (target, opts) {

            var that = this;
            this.target = target;
            this.rss = opts.rss;
            this.results = opts.results;
            this.blogData = [];
            this.result_template = opts.result_template;
            this.info_template = opts.info_template;
            this.zeroResultsInfo = opts.zeroResultsInfo;
            this.displaySearchInfo = opts.displaySearchInfo;
            this.before = opts.before;
            this.onComplete = opts.onComplete;

            //This is where we'll build the index for later searching. It's not a big deal to build it on every load as it takes almost no space without data
            this.index = lunr(function () {
                this.field('title', {boost: 10});
                this.field('description');
                this.field('link');
                this.field('category');
                this.field('pubDate');
                this.ref('id');
            });

            target.focus(function () {
                that.loadRSS();
            });

            target.closest("form").submit(function (e) {
                e.preventDefault();
                that.find(target.val());
            });

            if (opts.onKeyUp) {
                that.loadRSS();
                target.keyup(function () {
                    that.find(target.val());
                });

            }

        },

        loadRSS: function () {

            if (this.isInit) return false;

            /*	Here we load an rss feed, parse it and load it into the index.
             This function will not call on load to avoid unnecessary heavy
             operations on a page if a visitor never ends up searching anything. */

            var index = this.index,
                rssURL = this.rss,
                blogData = this.blogData;

            $.get(rssURL, function (data) {

                var posts = $(data).find('item');

                for (var i = 0; posts && i < posts.length; i++) {
                    var post = posts.eq(i);
                    var parsedData = {
                        id: i + 1,
                        title: post.find('title').text(),
                        description: post.find('description').text(),
                        category: post.find('category').text(),
                        pubDate: post.find('pubDate').text(),
                        link: post.find('link').text()
                    };

                    index.add(parsedData);
                    blogData.push(parsedData);
                }
                ;

            });

            this.isInit = true;

        },

        find: function (value) {
            var searchResult = this.index.search(value);
            var results = $(this.results);
            var resultsData = [];
            results.empty();

            if (this.before) {
                this.before();
            }
            ;

            if (this.zeroResultsInfo || searchResult.length > 0) {
                if (this.displaySearchInfo) results.append(this.format(this.info_template, {"amount": searchResult.length}));
            }

            for (var i = 0; i < searchResult.length; i++) {
                var postData = this.blogData[searchResult[i].ref - 1];
                results.append(this.format(this.result_template, postData));
                resultsData.push(postData);
            }

            if (this.onComplete) {
                this.onComplete(resultsData);
            }
            ;
        },

        clear: function () {
            $(this.results).empty();
            this.target.val("");
        },

        format: function (t, d) {
            return t.replace(/{{([^{}]*)}}/g, function (a, b) {
                var r = d[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        }
    }

})(jQuery);

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-shiv-cssclasses-load
 */
;
window.Modernizr = function (a, b, c) {
    function u(a) {
        j.cssText = a
    }

    function v(a, b) {
        return u(prefixes.join(a + ";") + (b || ""))
    }

    function w(a, b) {
        return typeof a === b
    }

    function x(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function y(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c)return d === !1 ? a[e] : w(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    var d = "2.6.2", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = {}, n = {}, o = {}, p = [], q = p.slice, r, s = {}.hasOwnProperty, t;
    !w(s, "undefined") && !w(s.call, "undefined") ? t = function (a, b) {
        return s.call(a, b)
    } : t = function (a, b) {
        return b in a && w(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function")throw new TypeError;
        var d = q.call(arguments, 1), e = function () {
            if (this instanceof e) {
                var a = function () {
                };
                a.prototype = c.prototype;
                var f = new a, g = c.apply(f, d.concat(q.call(arguments)));
                return Object(g) === g ? g : f
            }
            return c.apply(b, d.concat(q.call(arguments)))
        };
        return e
    });
    for (var z in m)t(m, z) && (r = z.toLowerCase(), e[r] = m[z](), p.push((e[r] ? "" : "no-") + r));
    return e.addTest = function (a, b) {
        if (typeof a == "object")for (var d in a)t(a, d) && e.addTest(d, a[d]); else {
            a = a.toLowerCase();
            if (e[a] !== c)return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, u(""), i = k = null, function (a, b) {
        function k(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function l() {
            var a = r.elements;
            return typeof a == "string" ? a.split(" ") : a
        }

        function m(a) {
            var b = i[a[g]];
            return b || (b = {}, h++, a[g] = h, i[h] = b), b
        }

        function n(a, c, f) {
            c || (c = b);
            if (j)return c.createElement(a);
            f || (f = m(c));
            var g;
            return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
        }

        function o(a, c) {
            a || (a = b);
            if (j)return a.createDocumentFragment();
            c = c || m(a);
            var d = c.frag.cloneNode(), e = 0, f = l(), g = f.length;
            for (; e < g; e++)d.createElement(f[e]);
            return d
        }

        function p(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
                return r.shivMethods ? n(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function (a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(r, b.frag)
        }

        function q(a) {
            a || (a = b);
            var c = m(a);
            return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
        }

        var c = a.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, f, g = "_html5shiv", h = 0, i = {}, j;
        (function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", f = "hidden"in a, j = a.childNodes.length == 1 || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                }()
            } catch (c) {
                f = !0, j = !0
            }
        })();
        var r = {
            elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: c.shivCSS !== !1,
            supportsUnknownElements: j,
            shivMethods: c.shivMethods !== !1,
            type: "default",
            shivDocument: q,
            createElement: n,
            createDocumentFragment: o
        };
        a.html5 = r, q(b)
    }(this, b), e._version = d, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + p.join(" ") : ""), e
}(this, this.document), function (a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {
    }

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function () {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function () {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c])y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }

        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {t: d, s: c, e: f, a: i, x: j};
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {load: j, i: 0}, a
    }

    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance"in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) {
            return "[object Array]" == o.call(a)
        }, x = [], y = {}, z = {
        timeout: function (a, b) {
            return b.length && (a.timeout = b[0]), a
        }
    }, A, B;
    B = function (a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {
                url: c,
                origUrl: c,
                prefixes: a
            }, e, f, g;
            for (f = 0; f < d; f++)g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++)c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))c || (j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h); else if (Object(a) === a)for (n in m = function () {
                        var b = 0, c;
                        for (c in a)a.hasOwnProperty(c) && b++;
                        return b
                    }(), a)a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    } : j[n] = function (a) {
                        return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l()
                        }
                    }(k[n])), g(a[n], j, b, n, h))
                } else!c && l()
            }

            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i)
        }

        var i, j, l = this.yepnope.loader;
        if (e(a))g(a, 0, l, 0); else if (w(a))for (i = 0; i < a.length; i++)j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l)
    }, B.addPrefix = function (a, b) {
        z[a] = b
    }, B.addFilter = function (a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d)k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function () {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d)e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};

/**
 * uisearch.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

(function (window) {

    'use strict';

    // EventListener | @jon_neal | //github.com/jonathantneal/EventListener
    !window.addEventListener && window.Element && (function () {
        function addToPrototype(name, method) {
            Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
        }

        var registry = [];

        addToPrototype("addEventListener", function (type, listener) {
            var target = this;

            registry.unshift({
                __listener: function (event) {
                    event.currentTarget = target;
                    event.pageX = event.clientX + document.documentElement.scrollLeft;
                    event.pageY = event.clientY + document.documentElement.scrollTop;
                    event.preventDefault = function () {
                        event.returnValue = false
                    };
                    event.relatedTarget = event.fromElement || null;
                    event.stopPropagation = function () {
                        event.cancelBubble = true
                    };
                    event.relatedTarget = event.fromElement || null;
                    event.target = event.srcElement || target;
                    event.timeStamp = +new Date;

                    listener.call(target, event);
                },
                listener: listener,
                target: target,
                type: type
            });

            this.attachEvent("on" + type, registry[0].__listener);
        });

        addToPrototype("removeEventListener", function (type, listener) {
            for (var index = 0, length = registry.length; index < length; ++index) {
                if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
                    return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
                }
            }
        });

        addToPrototype("dispatchEvent", function (eventObject) {
            try {
                return this.fireEvent("on" + eventObject.type, eventObject);
            } catch (error) {
                for (var index = 0, length = registry.length; index < length; ++index) {
                    if (registry[index].target == this && registry[index].type == eventObject.type) {
                        registry[index].call(this, eventObject);
                    }
                }
            }
        });
    })();

    // http://stackoverflow.com/a/11381730/989439
    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    // http://www.jonathantneal.com/blog/polyfills-and-prototypes/
    !String.prototype.trim && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    });

    function UISearch(el, options) {
        this.search = null;
        this.el = el;
        this.inputEl = el.querySelector('input.search-input');
        this._initEvents();
    }

    UISearch.prototype = {
        _initEvents: function () {
            var self = this,
                initSearchFn = function (ev) {
                    ev.stopPropagation();
                    // trim its value
                    self.inputEl.value = self.inputEl.value.trim();

                    if (!classie.has(self.el, 'search-open')) { // open it
                        ev.preventDefault();
                        self.open();
                    }
                    else if (classie.has(self.el, 'search-open') && /^\s*$/.test(self.inputEl.value)) { // close it
                        ev.preventDefault();
                        self.close();
                    }
                }

            this.el.addEventListener('click', initSearchFn);
            this.el.addEventListener('touchstart', initSearchFn);
            this.inputEl.addEventListener('click', function (ev) {
                ev.stopPropagation();
            });
            this.inputEl.addEventListener('touchstart', function (ev) {
                ev.stopPropagation();
            });
        },
        open: function () {
            var self = this;
            classie.add(this.el, 'search-open');
            // focus the input
            if (!mobilecheck()) {
                this.inputEl.focus();
            }
            // close the search input if body is clicked
            var bodyFn = function (ev) {
                self.close();
                this.removeEventListener('click', bodyFn);
                this.removeEventListener('touchstart', bodyFn);
            };
            document.addEventListener('click', bodyFn);
            document.addEventListener('touchstart', bodyFn);
            $('.list-inline').css('display', 'none');
            setTimeout(function () {
                $('#search').addClass('search-padding');
                $('.search-input').addClass('search-padding');
            }, 100);

            if (!self.search) {
                self.search = $(".search-input").ghostHunter({
                    results: ".search-results",
                    onKeyUp: true,
                    rss: "/rss/",
                    info_template: "<span class='search-clear-toggle'>&#215;</span> <span class='search-results-amount'>Number of posts found: {{amount}}</span><span class='clearfix'></span>",
                    result_template: "<span><a href='{{link}}'><span class='search-results-title'>{{title}}</span></a></span>",
                    onComplete: function () {
                        $('.search-results').addClass('search-active');
                    }
                });
            }
        },
        close: function () {
            this.inputEl.blur();
            classie.remove(this.el, 'search-open');
            $('.search-input').removeClass('search-padding');
            $('#search').removeClass('search-padding');
            $('.search-results').removeClass('search-active');
            setTimeout(function () {
                $('.list-inline').css('display', '');
            }, 200)
            $('.search-input').val('');
        }
    }

    // add to global namespace
    window.UISearch = UISearch;

})(window);
