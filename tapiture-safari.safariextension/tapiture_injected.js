/***************** SAFARI CLICK EVENTS ****************/
if (window.top === window) { // inject only once!
    document.addEventListener("mousedown", rightClickCallBack, false);
    safari.self.addEventListener("message", messageCallBack, false); // Message comes from global.html when context menu item is clicked

    // Global variable
    var userInfo = {};

    // Set up information for userInfo global variable
    function rightClickCallBack(event) {
        if (event.which === 3 || event.button === 2) {
            var clickOnImage = (event.target.nodeName == "IMG") ? true : false;

            // if he did, set an image src
            var imageSrc = (clickOnImage) ? event.target.src : null;

            // Set user info dictionary
            userInfo['clickOnImage'] = clickOnImage;
            userInfo['srcUrl'] = imageSrc;
            userInfo['documentURL'] = document.URL;

            // console.log('user right click source', imageSrc);
            // console.log("user right clicked " + userInfo);
            // Send userInfo to global.html
            safari.self.tab.setContextMenuEventUserInfo(event, 'userInfo');
        }
    }

    // Listen for message from global.html, 
    // If the user clicked on a single image, call tap, else call addOverlay();
    function messageCallBack(msgEvent) {
        if (msgEvent.name == "userClickTapThis") {
            if (userInfo.clickOnImage && userInfo.srcUrl) {
                // For iframes, userInfo will still contain srcUrl
                // Since every iframe is listening to this event, multiple taps can pop up
                // Every iframe is listening to this event. Only add overlay to the main document, not in iframes
                if (window.top === window) {
                    tap(userInfo);
                    userInfo = [];
                }
            } else if (!userInfo.clickOnImage){
                // Every iframe is listening to this event. Only add overlay to the main document, not in iframes
                if (window.top === window) {
                    addOverlay();
                }
            }
        } else if (msgEvent.name == "tapItButtonEnable"){
            // Listen for the callback here, global HTML will tell us whether or not in settings, user has enable 
            var tapItButtonEnable =  msgEvent.message;
            // Dont initialize tap button if we're on a Tapiture website
            if ((tapItButtonEnable == true) && (document.URL.indexOf("tapiture.com") == -1)){
                init_tapitBtn();
            }
        }
    }

    var tapitureHost = 'http://tapiture.com';
    var tapitureHostSecure = 'https://tapiture.com';

    var serialize = function(obj) {
        var str = [];
        for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    function tap(info) {
        // Image attributes
        var image           = new Array();
        image['url']        = info.srcUrl;
        image['title']      = document.title;
        image['page_url']   = document.location;
        image['type']       = "image";
        url                 = serialize(image);
        popup(url);
        // Track Tap

    } // end tap

    function tap_video(data) {
        var video               = new Array();
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

    }

    function popup(url) {
        window.open(tapitureHost + "/widget/tap?" + url, "_blank", "scrollbars=no,menubar=no,height=540,width=600,resizeable=no,toolbar=no,status=no");
        // var total = tapitureHost + "/widget/tap?" + url;
        // console.log("popul url", total);
        // Track total taps
        // ga_push(['tapiture._trackEvent', 'Taps Per User', ++total_taps]);

    }

    /********* INIT TAP BUTTONS *********/
    // Send a message to global HTML, telling it that the injected script has loaded. Global HTML will pass back the settings on wheather users have enable it or not, will listen for event in message callback
    safari.self.tab.dispatchMessage("tapiture_injected_loaded", "true");

    function init_tapitBtn(){
        console.log('initializing tap it button');
        window.onload = function(){
            // Inject stylesheet in dom
            var stylesheet = document.createElement("link");
            stylesheet.setAttribute('id', 'tapiture_css');
            stylesheet.setAttribute("rel", "stylesheet");
            stylesheet.setAttribute("type", "text/css");
            stylesheet.setAttribute("href", "http://statictapcdn-a.akamaihd.net/assets/css/tapitbutton_style.css");
            document.getElementsByTagName("head")[0].appendChild(stylesheet);
        };
            
         // Attach event handlers to hover event
        $(document).ready(function(){
            // Mouse enter images or elements with background images , set tapItBtn
            $("body").on('mouseenter', 'img, [style*="background-image"]', function(){

                // Grab the src url differnly if its an image or tab
                var imgSrc          = '';
                var width           = $(this).css('width');
                var height          = $(this).css('height');
                var left            = $(this).offset().left;
                var top             = $(this).offset().top;
                // Restrictions on image size
                var min_dimension   = 150;
                var max_dimension   = 2000;
                // Image size is outside of min-max boundaries, no go
                if (parseInt(height) < min_dimension || parseInt(width) < min_dimension || parseInt(height) > max_dimension || parseInt(width) > max_dimension){
                    return;
                }

                // Set imgSrc differently depending if hover over eleemnt is IMG or DIV/I witha background image
                if ($(this).prop('tagName') == "IMG"){
                    imgSrc = $(this).attr("src");
                } else{
                    imgSrc = $(this).css('background-image');
                    imgSrc = imgSrc.replace('url("','').replace('")','');
                }

                //  Reuse tapItBtn if one exists
                var tapItBtn        = ($("#tapItBtn").length > 0 ) ? $("#tapItBtn") : $('<img id="tapItBtn" src="http://i.imgur.com/Y7boiRX.png" />');
                // Set properties
                var tapItBtnLeft    = (left + 8 ) + 'px';
                var tapItBtnTop     = (top + 8)+ 'px';
                tapItBtn.data('imgSrc', imgSrc);
                tapItBtn.css( {left: tapItBtnLeft, top: tapItBtnTop } );

                // If tapItBtn exist, show, else append
                if ($("#tapItBtn").length > 0){
                    tapItBtn.show();
                } else{
                    $("body").append(tapItBtn);
                }
                // $(this).wrap(wrapper_HTML);
                // tapItBtn.insertAfter($(this));
            });

            // Mouse leaves imgs or elements with background image, hide tapItBtn
            $("body").on('mouseleave', 'img, [style*="background-image"]', function(e){
                // console.log(e.relatedTarget);
                // console.log(e.relatedTarget.id);
                if (e.relatedTarget.id != 'tapItBtn'){
                    $("#tapItBtn").hide();        
                }
            });

            // Mouse clicks, show tap popul
            $("body").on('click', '#tapItBtn', function(){
                var info = { srcUrl: $(this).data('imgSrc') };
                tap(info);
            });
        });
    }
}
