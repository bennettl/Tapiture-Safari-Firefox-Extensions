// Event Listeners
// if (window.top === window) {
    console.log('hey');
    document.addEventListener("mousedown", rightClickCallBack, false);
    safari.self.addEventListener("message", contextMenuItemCallBack, false); // Message comes from global.html when context menu item is clicked
    console.log('hey im being injected');

// }

// Global variable
var userInfo = {};

// Set up information for userInfo global variable
function rightClickCallBack(event) {

    if (event.which === 3 || event.button === 2) {
        var clickOnImage = (event.target.nodeName == "IMG") ? true : false;
        console.log('right click deteched');
        // if he did, set an image src
        var imageSrc = (clickOnImage) ? event.target.src : null;

        // Set user info dictionary
        userInfo['clickOnImage'] = clickOnImage;
        userInfo['srcUrl'] = imageSrc;
        userInfo['documentURL'] = document.URL;

        console.log("user right clicked " + userInfo);
        // Send userInfo to global.html
        safari.self.tab.setContextMenuEventUserInfo(event, 'userInfo');
    }
}

// Listen for message from global.html, 
// If the user clicked on a single image, call tap, else call addOverlay();
function contextMenuItemCallBack(event) {
    if (event.name == "userClickTapThis") {

        if (userInfo.clickOnImage && userInfo.srcUrl) {
            tap(userInfo);
            // For iframes, userInfo will still contain srcUrl
            // Since every iframe is listening to this event, multiple taps can pop up
            userInfo = [];
        } else if (!userInfo.clickOnImage){
            // E every iframe is listening to this event. Only add overlay to the main document, not in iframes
            if (window.top === window) {
                addOverlay();
            }
        }
    }
}

