    // Tapiture Web Applet 2.0
    // 2012 Tapiture LLC http://tapiture.com
    // JavaScript by Richard Onyon (ronyon@tapiture.com)

function addOverlay(){


    var _tapiture = (function() {

        var tapitureHost = 'http://tapiture.com';
        var tapitureHostSecure = 'https://tapiture.com';
        // CSS
        var css = '#tapiture_mosiac { font-family:"Helvetica Neue",Helvetica,Arial,sans-serif !important}#tptr_msc_header_bar {position:fixed;top:0;left:0;width:100%;background:#2f4d78;height:41px;box-shadow:0px 3px 30px rgba(0,0,0,0.22);z-index:19999999999;-webkit-animation: comeDown 0.4 ease-in-out 0 1 normal;animation: comeDown 0.4 ease-in-out 0 1 normal;}#tptr_msc_close,#tptr_msc_close:visited{font-weight: normal !important;text-decoration:none !important;display:block !important;height:41px !important;line-height:41px !important;color:#fff !important;padding:0 20px !important;font-size:14px !important}#tptr_msc_close:hover,#tptr_msc_close:focus,#tptr_msc_close:visited:hover,#tptr_msc_close:visited:focus{text-decoration:none !important;color:#fff !important}#tptr_msc_close,#tptr_msc_close:visited {float:right !important;border-left:1px solid #2e4e79; }#tptr_msc_close:hover,#tptr_msc_close:focus,#tptr_msc_close:visited:hover,#tptr_msc_close:visited:focus {background:#4582db !important;border-color:#4582db}#tptr_msc_logo{display:block;width:130px;height:41px;background-repeat: no-repeat;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAcCAYAAACu9KujAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0M0UwODkwNzUyRDAxMUUyQUY4RThFMzQxRjcyNjgwMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0M0UwODkwODUyRDAxMUUyQUY4RThFMzQxRjcyNjgwMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRTA4OTA1NTJEMDExRTJBRjhFOEUzNDFGNzI2ODAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQzRTA4OTA2NTJEMDExRTJBRjhFOEUzNDFGNzI2ODAyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+sz6AEwAAByNJREFUeNrsW31MU1cUL4Ui0wkrg4lUkBm2hKgQdCMaIINB/Edc/CJbjEBiTMmWLXGEpItNtpiMhbi4GZc1mBAQNSZjf5BFYnCCDDLUQYHiCGEijs+AXVMoln4hdOfofeTy8t7ztfRR0J7kF/rOffe+c8/v3XPPvfcR5Ha7ZShBQUEyESIHvAtIBbwD2ALYDNhEymTh4eHymZkZB/y0AMyAccA/gAeAboBVFpAVFeQ4RMR9CsAHgH0hISF7QKKys7NfT05OXr9169ZQlUq1LiYmRiGXyxffFJfL5bZYLE9NJtPcyMiI8/79+/auri6bwWD4tr+/vybgej+xzYxqlmwEqMPCwppOnDgxePPmzSmr1frUvQyprq6ufQlcpgL8BtADitYKx1xEYwj+ODo6uvXcuXPjZrN5zu0jqaur+8tHticBDvvDafv37y8dHR11YH/KysrGVpNtnhAdo1AoqrVa7QiGXrePpaWlZdQHduszMzP7SktLh/zhtLGxsTK6T6vJNtFEp6Wl/dDd3W11SyQDAwOzTNK2DKP5nLxSTtsGGCQmaFaTbaKJHh4erndLKE6ncyE2NjZ+LRO9Fm1Dc5aMLiDhgpQPDA0NDYI5bo+X1YtIArQkVBKkUTr8/QVAR5XfBpST+VMm0EY44DSle1EdvQe2sesItcfWq4gdTJ8Os/yiY7VxhejDObNu+ItrYIuUo/rs2bPfe8Py9evXa/narKmp+Zzclnvw4MEHOp1u4s6dO4v9wHzjxo0bZpw/2cQx9xw/frwRXvRfrl279h+jwzpZWVkdSxzGMXLF2CY02vnKGN3evXsrcnJyWpg+tba2fkdu0WFCSPcVpbe3dxb12B+0nTPrhvB9SUqiKysrf/dFEkTLo0ePPsJ7JiYmCl/0/EOHDl3iciY6B8G+H1+SpKSkz4SIEWPbcojGF47J9FHa2to+wVHNJpgt2J/ExEQNJ9Hw+30piW5oaBjycp7BJCiX1VwugZLcoyR6MwBHGXZS43K5mmmn8TmZSDmp84RRVFRU3BUiRqRtXhNNyUXSp22w9G1glHNzczOM3Yj5+fl/mbKrV6/28q2jZVNTUyapiB4cHLTBI16TKuFB57J12dnZOSKdqaH0+Yzy3r17Zk+J8cRuMe1BZPmaLmtqahqnXypWPeXs7KyDGdW8RMMyqEoqouFtc6ekpGRImNmqSDJ2hUlOcN5eDjkYvv1NNBMZGKFDOSsRewZWWOcm2m63Z0oZvktKSn6UiOikHTt23MVkjGu+9RU5/iBaqI4I4SYaroNtNptdKqIvX75sIMuODwFv+orovLy8X8Xs6K0yolV+I5qE7y6piDYYDE9qa2vVRUVFA3FxcT3wOMyE9+FpqYdEL1n2sMKVhkqGxDqTPqRYTK6MRqPFC6KFlmQqeu/cBy9OmoDLwgWJbm9v/1nCeXpBq9V+hX/xuqenx3ry5MlBuVx+Hh4dJpbo+Pj486STKroMCSfzNBJXDsujv1mOKWeIoPXkkOJZPbVa3cvoYfnU4ynRfLah7Nq1q47YdhqfyWpPx2Ub2w+wDF607+jRo91ko6eIAvbxNi4NBYmGtVqBlPP0mTNn2sbHx5toXXNz83R0dLRWiOjHjx930kslTLSOHDnyKZZB2DYyZThPoxPxHvazScaq5AqBTD3WFKAWQ7SQbXQZs6FBb84wotfrjWKWZJiF08kitoVtMsDno76qquoPQaLr6+t3S0k0hG8rzNVfcszfE7hbKjCi89l1Ojs7vyFlGq5nwTqzG8Fc4/KRK7MGsXDV9WDuFrItn882h8NRJ2QbT+hW0n3iE9I2P9FWq3WTW2I5duxYOyR9c+yDj4yMjPgXhO9csiHCnCLtpso0lN5MNhmUBBeJrpwnqcGX+xa7rocZtJBtSLaexzbG7nIP9gyYerfY2xXEBjW5RxbE+mYsFpAPeA+u47dv3x6JenjTn5XDItwJMd+enJxsSU9Pd6empm5UqVTbYG6N82apNDk56cKDjsjISAWtn56eflupVK7ImS7txCCRH86txa+IaKLTgcQLp06dUgGJGxMSEtZt2LAhmK4AoQIzUBdk5I6+vj57R0eHrbGx0RoVFTVZXFw8C/NRAsyxKcs5c4ZnGBUKxWawZyFAtATn0QUFBXqI5/PehOChoSE7zK3GwsLChzt37uyprKzsgNHv8SnYwsIC7vZkBc6QJRzRJpPJCSMzdLmN4hYnJCBWyKBnIKyHHjhw4I2IiAiFiKq3ACUwqHpXmuhXKnQDQY7g4OB1IuviJ0G4tsR51AXAz4YjAQmARDprhlBsg1C8nqONadnz77yR4Drwcb+/vgp5pYgGKQb8JHv+HTdb8PSmDdAK+BM3zcEnT3kaxfl5CyE9jpAeAXCSdnD58BDqD8sC4pdkDBW4i4NHXm8B8L8t8KvNLigbCbjr5RnRAXmJ5X8BBgDsNdja2k14iwAAAABJRU5ErkJggg==);position:absolute;left:50%;top:7px;margin-left:-65px}.tptr_fixed_wrapper {opacity:1;position:fixed;top:0;right:0;left:0;bottom:0;z-index:16777239;background-color:#fff;background-color:rgba(255,255,255,0.9);overflow-y:scroll;-webkit-animation: fadeIn 0.4 ease-in-out 0 1 normal;animation: fadeIn 0.4 ease-in-out 0 1 normal;}#tptr_msc_wrap{position:absolute;top:0;left:0;width:100%;height:100%;zoom:1;padding-top:40px;}#tptr_msc_wrap:before,#tptr_msc_wrap:after{content:"";display:table}#tptr_msc_wrap:after{clear:both}.tptr_msc_prdct_area{padding-bottom:20px;border-bottom:1px solid #ccc;zoom:1}.tptr_msc_prdct_area:before,.tptr_msc_prdct_area:after{content:"";display:table}.tptr_msc_prdct_area:after{clear:both}.tptr_msc_main_wrapper{padding-top:40px;width:100%;overflow:visible;text-align:center;}.tptr_msc_img_container{width:200px;height:200px;background:#fff;position:relative;text-decoration:none !important;display:inline-block;overflow:hidden;margin:10px 20px 10px 0;position:relative;cursor:pointer;box-shadow:0 0 0 1px #fff,0 0 0 2px #ccc}.tptr_msc_img_container .tptr_msc_img{min-height:200px;max-height:200px; display:block;margin:0 auto;  }.tptr_msc_img_container .tptr_msc_img_dimensions{font-size:12px !important;line-height:30px !important;background:rgba(255,255,255,0.8);position:absolute;bottom:0;width:200px;height:30px !important;text-align:center;color:#565656 !important;z-index:1}.tptr_video_item{width:356px;height:200px;}.tptr_video_item .tptr_msc_img {max-width:100%;min-height:auto;max-height:auto;height:auto;}.tptr_video_item .tptr_msc_img_dimensions{width:356px;}.tptr_msc_img_container .tptr_msc_img_mask{width:200px;height:200px;background:transparent;position:absolute;top:1px;left:1px;-webkit-transition:all 0.15s ease-in-out;-moz-transition:all 0.15s ease-in-out;-ms-transition:all 0.15s ease-in-out;-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}.tptr_video_item .tptr_msc_img_mask{width:356px;height:200px;background:transparent;position:absolute;top:1px;left:1px;-webkit-transition:all 0.15s ease-in-out;-moz-transition:all 0.15s ease-in-out;-ms-transition:all 0.15s ease-in-out;-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}.tptr_msc_img_container:active .tptr_msc_img_btn{background-color:#fdfdfe}.tptr_msc_img_container:visited{color:#444 !important;text-decoration:none !important}.tptr_msc_img_container span{display:block !important}.tptr_msc_img_container:hover .tptr_msc_img_mask,.tptr_msc_img_container:focus .tptr_msc_img_mask{background:rgba(0,0,0,0.3) !important}.tptr_msc_img_container:hover .tptr_msc_img_btn,.tptr_msc_img_container:focus .tptr_msc_img_btn{display:block !important;opacity:1}.tptr_msc_img_container:hover .tptr_msc_img,.tptr_msc_img_container:focus .tptr_msc_img{height:200px}.tptr_video_item:hover .tptr_msc_img,.tptr_video_item:focus .tptr_msc_img{height:auto;}.tptr_msc_img_btn,.tptr_msc_prdct_btn{display:none !important;opacity:0;width:110px !important;height:30px !important;margin:0 auto;text-decoration:none !important;color:#fff !important;text-align:center!important;font-size:12px !important;line-height:30px !important;border:1px solid #0b0b0b !important;border-radius:2px;position:absolute;top:50%;left:50%;margin:-15px 0 0 -55px!important;z-index:1000000000;background-color:#2f4d78;-webkit-transition:opacity 0.4s ease-in-out;-moz-transition:opacity 0.4s ease-in-out;-ms-transition:opacity 0.4s ease-in-out;-transition:opacity 0.4s ease-in-out;transition:opacity 0.4s ease-in-out}.tptr_msc_img_btn:hover,.tptr_msc_img_btn:focus,.tptr_msc_prdct_btn:hover,.tptr_msc_prdct_btn:focus{box-shadow:0 0 24px rgba(0,0,0,0.8)}.tptr_video_item:after{content:url(data:image/png;base64,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);position:absolute !important;right:20px !important;top:20px !important}.tptr_msc_main_wrapper {zoom: 1;}.tptr_msc_main_wrapper:before,.tptr_msc_main_wrapper:after {content: "";display: table;}.tptr_msc_main_wrapper:after{clear: both;}@-webkit-keyframes fadeIn{0%{opacity:0;}100%{opacity:1;}}@keyframes fadeIn {0%{opacity:0;}100%{opacity:1;}}@-webkit-keyframes comeDown{0%{top:-70px;}100%{top:0;}}@keyframes comeDown{0%{top:-70px}100%{top:0;}}',
            html = '<div id="tptr_msc_header_bar"><a href="#" id="tptr_msc_close">Close</a><a id="tptr_msc_logo" href="http://tapiture.com"></a></div><div class="tptr_fixed_wrapper"><div id="tptr_msc_wrap"><div class="tptr_msc_main_wrapper"></div></div></div>',
            vers = "2.1",
            total_taps = 0,
            _ga_pushInterval,
            _ga_pending = new Array(),
            style, mosaic, images, videos, ga_activated = false,
            cycle = false;
        // Global keywords variable use for all images/videos/object
        var g_keywords;

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

        

        // Create client side interface
        function init_UI() {
            // Scroll to 0,0
            // Some sites overrode window for some reason.
            if (typeof window.scroll == 'function') window.scroll(0, 0);

            // Append CSS
            style = document.createElement("style");
            style.type = "text/css";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } // IE
            else {
                style.appendChild(document.createTextNode(css)); // MOZ
            }

            // check to see if the head exists or if it's just an item
            if (document.getElementsByTagName('HEAD').length > 0) {
                // putting in the head so it's more semantic
                document.documentElement.getElementsByTagName("HEAD")[0].appendChild(style);
            } else {
                // drop it in the body
                document.body.appendChild(style);
            }

            // Append Empty Box
            mosaic = document.createElement('div');
            mosaic.setAttribute('id', 'tapiture_mosiac');
            mosaic.innerHTML = html;
            document.body.appendChild(mosaic);

            // Force background height to pixel match browser height
            // tptr_msc_wrap = document.getElementById("tptr_msc_wrap");
            // if(tptr_msc_wrap.styleSheet) tptr_msc_wrap.styleSheet.height = document.body.scrollHeight+"px";
            // else             tptr_msc_wrap.style.height = document.body.scrollHeight+"px";

            document.getElementById("tptr_msc_close").onclick = function() {
                destroy();
                return (false);
            }
            // document.getElementByClassName("tptr_msc_main_wrapper").onclick = function() { destroy();return(false); }

            // don't close on click inside of the objects
            // document.getElementsByClassName('.tptr_msc_img_container').onclick = function(event){ event.stopPropagation(); }

        }

        // Append a tappable object to the interface
        function append_object(key, src, dimensions, title, video) {

            // ecc
            if (src == undefined) {
                return;
            }

            /* Start Defaults */
            objs = new Object()

            // Dimensions
            objs.dimensions = document.createElement("span");
            objs.dimensions.setAttribute("class", "tptr_msc_img_dimensions");

            // Tap Button
            objs.button = document.createElement("span");
            objs.button.setAttribute("id", key);
            objs.button.setAttribute("class", "tptr_msc_img_btn");
            objs.button.innerHTML = "Click Here to Tap";
            if (video) {
                objs.button.onclick = function() {
                    tap_video(key);
                }
            } else {
                objs.button.onclick = function() {
                    tap(this.id);
                }
            }

            // Image Mask
            objs.mask = document.createElement("span");
            objs.mask.setAttribute("class", "tptr_msc_img_mask");

            // Image
            objs.img = document.createElement("img");
            objs.img.setAttribute("class", "tptr_msc_img");

            /* End Defaults */

            // Set object information
            objs.img.src = src; // Image SRC
            objs.img.setAttribute("title", title); // Image Title

            objs.dimensions.innerHTML = dimensions; // Image Dimensions

            // Insert data into <a>
            var object = document.createElement("a");
            if (video) {
                object.setAttribute("class", "tptr_msc_img_container tptr_video_item");
                if (title.length > 30) {
                    title = title.substring(1, 30) + "...";
                }
                objs.dimensions.innerHTML = title;

            } else {
                object.setAttribute("class", "tptr_msc_img_container");
            }

            // Append Child Objects
            object.appendChild(objs.dimensions);
            object.appendChild(objs.button);
            object.appendChild(objs.mask);
            object.appendChild(objs.img);

            // Append to mosaic
            var mosaic = document.getElementsByClassName("tptr_msc_main_wrapper")[0];
            mosaic.appendChild(object);

        }

        function find_images() {

            // Images used
            images_used = new Array();

            // Find Images
            images = document.getElementsByTagName('img');

            // Cycle through all img elements
            for (var i in images) {

                // Create new image element to validate against
                var image = images[i];

                // Append to array of images used so we don't use the same src twice
                images_used.push(image.src);

                // If the image is smaller than required minimums, continue
                if (image.clientWidth < 120 || image.clientHeight < 120) continue;

                // try using naturals
                if (image.naturalWidth < 120 || image.naturalHeight < 120) continue;

                // Set dimensions as string
                var dimensions = image.clientWidth + " x " + image.clientHeight;

                // Append to mosaic
                append_object(i, image.src, dimensions, image.title, false);

            }

            // Track amount of images found
            //ga_push(['tapiture._trackEvent', 'Content Count', 'Images', images_used.length.toString()]);

        }


        function find_image() {

            // Images used
            images_used = new Array();

            // Find Images
            images = document.getElementsByTagName('img');

            // Cycle through all img elements
            for (var i in images) {

                // Create new image element to validate against
                var image = images[i];

                // Append to array of images used so we don't use the same src twice
                images_used.push(image.src);

                // If the image is smaller than required minimums, continue
                if (image.clientWidth < 120 || image.clientHeight < 120) continue;

                // try using naturals
                if (image.naturalWidth < 120 || image.naturalHeight < 120) continue;

                // Set dimensions as string
                var dimensions = image.clientWidth + " x " + image.clientHeight;

                // Append to mosaic
                append_object(i, image.src, dimensions, image.title, false);

            }

            // Track amount of images found
            //ga_push(['tapiture._trackEvent', 'Content Count', 'Images', images_used.length.toString()]);

        }


        serialize = function(obj) {

            var str = [];
            for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");

        }

        function find_objects() {

            // There are two types of vidoes we need to search for.
            // iframe based & object based
            iframe = document.getElementsByTagName('iframe');
            object = document.getElementsByTagName('object');
            embed = document.getElementsByTagName('embed');
            html5vid = document.getElementsByTagName('video');

            var objects = new Array();
            for (var attrname in iframe) {
                objects.push(iframe[attrname].outerHTML);
            }
            for (var attrname in object) {
                objects.push(object[attrname].outerHTML);
            }
            for (var attrname in embed) {
                objects.push(embed[attrname].outerHTML);
            }

            // Turn into JSON object
            objects = serialize(objects);

            // Have server parse elements
            ajax.post(tapitureHostSecure + "/tap/upload/harvest?sourceUrl=" + encodeURIComponent(document.location), function(data) {

                data        = JSON.parse(data);
                g_keywords  = data.keywords;   // grab the keywords property from harvest
                // Prepend ecommerce information
                if (data.ecommerce) {

                    // Create container div
                    product = document.createElement("div");
                    product.setAttribute("class", "tptr_msc_prdct_area");
                    product.innerHTML = data.ecommerce;

                    // Prepend
                    var mosaic = document.getElementById("tptr_msc_wrap");
                    mosaic.insertBefore(product, mosaic.getElementsByTagName('div')[0]);

                    // Setup tap listener
                    document.getElementsByClassName('tptr_msc_prdct_btn')[0].onclick = function() {
                        tap_product();
                    }

                }


                //for (var i in videos) {

                //if(videos[i].image == undefined) continue;
                append_object(data, data.thumbnailUrl, data.embed, data.name, data.embed);
                //}

                // Track amount of videos found
                //ga_push(['tapiture._trackEvent','Content Count','Embeds',videos.length.toString()]);

            }, objects);



        } // end find objects

        function tap(i) {

            var image = new Array();

            image['url']        = images[i].src;
            image['title']      = document.title;
            image['page_url']   = document.location;
            image['type']       = "image";
            image['alt']        = images[i].alt;
            // Don't set keywords if its undefined or false
            if (g_keywords){
                image['keywords']      = g_keywords; // every tap will have the same keywords
            }

            // Title Logic
            if (images[i].title !== undefined) image['img_title'] = images[i].title;
            else image['img_title'] = document.title;
            // Do we need these anymore
            image['img_width'] = images[i].width;
            image['img_height'] = images[i].height;
            /* Fun things to get for future
          meta description
          oauth if it exists
          opengraph if it exists
        */

            url = serialize(image);
            popup(url);

            // Track Tap
            //   ga_push(['tapiture._trackEvent', 'Tap', 'Image', document.location.href]);


        } // end tap


        function tap_video(data) {
            var video = new Array();
            video['url']            = data.thumbnailUrl;
            video['title']          = document.title;
            video['type']           = "video";
            video['metadataUrl']    = data.metadataUrl;
            // Don't set keywords if its undefined or false
            if (g_keywords){
                image['keywords']       = g_keywords; // every video will have the same keywords
            }

            url = serialize(video);
            popup(url);

            // Track Tap
            // ga_push(['tapiture._trackEvent', 'Tap', 'Video', videos[i].oembed]);

        } // end tap video

        function tap_product() {

            url = "/product/?location=" + encodeURI(document.location);
            popup(url);

            // Track Tap
            // ga_push(['tapiture._trackEvent', 'Tap', 'Product', document.location]);

        } // end tap product

        function popup(url) {
            //window.open("http://tapiture.com/bookmarklet"+url,'_tapiture','scrollbars=no,menubar=no,height=342,width=662,resizeable=no,toolbar=no,status=no');

            window.open(tapitureHost + "/widget/tap?" + url, "_blank", "scrollbars=no,menubar=no,height=540,width=600,resizeable=no,toolbar=no,status=no");

            // Track total taps
            // ga_push(['tapiture._trackEvent', 'Taps Per User', ++total_taps]);

        } // end popup



        function noContent() {

            // Create container div
            nothing = document.createElement("div");
            nothing.setAttribute("class", "tptr_msc_nothing_area");
            nothing.innerHTML = '<h1>Nothing</h1>';

            // Prepend
            var mosaic = document.getElementById("tptr_msc_wrap");
            mosaic.insertBefore(nothing, mosaic.getElementsByTagName('div')[0]);

        } // end no content

        // Destroy mosaic
        function destroy() {

            //  ga_push(['tapiture._trackEvent', 'Mosaic', 'Close']);
            var js = document.getElementById('tapiture_js');

            if (js) {
                js.parentNode.removeChild(js);
            }

            var jq = document.getElementById('jquery_js');
            if (jq) {
                jq.parentNode.removeChild(jq);
            }
            style.parentNode.removeChild(style);
            mosaic.parentNode.removeChild(mosaic);

        }

        // Application Logic
        init_UI(); // Create Mosaic
        find_images(); // Find Images
        find_objects(); // Find Videos

    })();
}