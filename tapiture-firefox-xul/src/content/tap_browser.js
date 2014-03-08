// Tapiture Web Applet 2.0
// 2014 Tapiture LLC http://tapiture.com
// JavaScript by Joe Yu(joe@tapiture.com)


var vers = "2.1";
var total_taps = 0;
var _ga_pushInterval;
var _ga_pending = new Array();
var style, mosaic, images, videos, ga_activated = false;
var cycle = false;

// Start AJAX Library
function $(e) {
    if (typeof e == 'string') e = document.getElementById(e);
    return e
};

function collect(a, f) {
    var n = [];
    for (var i = 0; i < a.length; i++) {
        var v = f(a[i]);
        if (v != null) n.push(v)
    }
    return n
};

ajax = {};
ajax.x = function() {
    try {
        return new ActiveXObject('Msxml2.XMLHTTP')
    } catch (e) {
        try {
            return new ActiveXObject('Microsoft.XMLHTTP')
        } catch (e) {
            return new XMLHttpRequest()
        }
    }
};
ajax.serialize = function(f) {
    var g = function(n) {
        return f.getElementsByTagName(n)
    };
    var nv = function(e) {
        if (e.name) return encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value);
        else return ''
    };
    var i = collect(g('input'), function(i) {
        if ((i.type != 'radio' && i.type != 'checkbox') || i.checked) return nv(i)
    });
    var s = collect(g('select'), nv);
    var t = collect(g('textarea'), nv);
    return i.concat(s).concat(t).join('&');
};
ajax.send = function(u, f, m, a) {
    var x = ajax.x();
    x.open(m, u, true);
    x.onreadystatechange = function() {
        if (x.readyState == 4) f(x.responseText)
    };
    if (m == 'POST') x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    x.send(a)
};
ajax.get = function(url, func) {
    ajax.send(url, func, 'GET')
};
ajax.gets = function(url) {
    var x = ajax.x();
    x.open('GET', url, false);
    x.send(null);
    return x.responseText
};
ajax.post = function(url, func, args) {
    ajax.send(url, func, 'POST', args)
};
ajax.update = function(url, elm) {
    var e = $(elm);
    var f = function(r) {
        e.innerHTML = r
    };
    ajax.get(url, f)
};
ajax.submit = function(url, elm, frm) {
    var e = $(elm);
    var f = function(r) {
        e.innerHTML = r
    };
    ajax.post(url, f, ajax.serialize(frm))
};
// End AJAX Library

// Google Analytics
function init_GA() {

    var _googleInterval;

    // Does tracking exist on page
    function addGoogleTracking() {
        if (typeof _gat != 'undefined') {
            activateGoogle();
        } else {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.src = 'https://www.google-analytics.com/ga.js';
            document.body.appendChild(ga);
            _googleInterval = setInterval(activateGoogle, 250);
        }
    }

    // Push Pageview
    function activateGoogle() {
        if (typeof _gat != 'undefined') {
            clearInterval(_googleInterval);
            _gaq.push(
                ['tapiture._setAccount', 'UA-35299502-1'], ['tapiture._trackPageview'], ['tapiture._trackEvent', 'Mosaic', 'Open'], ['tapiture._trackEvent', 'Domains', document.domain]
            );
            ga_activated = true;
        }
    }

    addGoogleTracking();

}

// Validate _gaq is loaded before you try pushing
function ga_push(input) {

    if (typeof(input) != 'undefined') _ga_pending[_ga_pending.length] = input;

    if (ga_activated == true) {

        if (_ga_pending.length == 0) return;
        for (var i in _ga_pending) {
            _gaq.push(_ga_pending[i]); // Push
        }
        _ga_pending = new Array();

    } else {
        ga_activated = setTimeout(ga_push, 250);
    }

}

// Create client side interface
function init_UI() {
    init_GA();
}


serialize = function(obj) {

    var str = [];
    for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");

}

function tap(info) {
    var image = new Array();

    image['url'] = info.srcUrl;
    image['title'] = document.title;
    image['page_url'] = document.location;
    image['type'] = "image";


    // Title Logic
    //if(images[i].title !== undefined) image['img_title'] = images[i].title;
    //else                image['img_title'] = document.title;
    // Do we need these anymore
    // image['img_width']  = images[i].width;
    //image['img_height'] = images[i].height;

    url = serialize(image);
    popup(url);

    // Track Tap
    ga_push(['tapiture._trackEvent', 'Tap', 'Image', document.location.href]);


} // end tap


// Adds overlay for multiple images
function addOverlay() {
    var e = document.createElement('script');
    e.setAttribute('id', 'tapiture_js');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('charset', 'UTF-8');
    var eSrc = (location.protocol == 'https:' ? 'https://tapiture.com/assets/js/tap_browser.min.js?ver=' + Math.random() : 'http://tapiture.com/assets/js/tap_browser.min.js?ver=' + Math.random());
    e.setAttribute('src', eSrc);
    document.body.appendChild(e);
}

function tap_product() {

    url = "/product/?location=" + encodeURI(document.location);
    popup(url);

    // Track Tap
    ga_push(['tapiture._trackEvent', 'Tap', 'Product', document.location]);

} // end tap product

function popup(url) {

    window.open("//tapiture.com/widget/tap?" + url, "_blank", "scrollbars=no,menubar=no,height=540,width=600,resizeable=no,toolbar=no,status=no");

    // Track total taps
    ga_push(['tapiture._trackEvent', 'Taps Per User', ++total_taps]);

} // end popup


// Application Logic
init_UI(); // Create Mosaic