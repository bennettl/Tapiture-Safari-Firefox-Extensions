/**
 * BLTapiture namespace.
 */
if ("undefined" == typeof(BLTapiture)) {
    var BLTapiture = {};
};


/*********** Add toolbarbutton on nav-bar on first run ***********/
function firstRun(extensions) {
    let extension = extensions.get('jid0-lUPopEcEr3ZFpGFCiUHsCV3lDOw@jetpack');
    if (extension.firstRun) {
        // add button here.
        // Force toolbarbutton to be on nav-bar
        var navbar = document.getElementById("nav-bar");
        var newset = navbar.currentSet;
        if (newset.indexOf("tapiture-button") == -1) {
            if (newset.indexOf("reload-button,stop-button,") > -1) {
                newset = newset.replace("reload-button,stop-button,", "reload-button,stop-button,tapiture-button,");
            } else {
                newset = newset + ",tapiture-button";
            }
            navbar.currentSet = newset;
            navbar.setAttribute("currentset", newset);
            // document.persist("nav-bar", "currentset");
        }

    }
}

if (Application.extensions)
    firstRun(Application.extensions);
else
    Application.getExtensions(firstRun);

/*********** End ***********/


/*********** APPlICATION SCRIPT ***********/

// Initalizes Bl.BrowserOverlay when the window loads
window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    BLTapiture.BrowserOverlay.init();
}, false);

/**
 * Controls the browser overlay for the Tapiture Extension.
 */
BLTapiture.BrowserOverlay = {
    /*************** Properties ***************/
    clickOnImage: false,
    imgSrc: '',
    /*************** Functions ***************/
    init: function() {
        // Listen for when the DOMContent is loaded and call onPageLoad once it is
        var appcontent = document.getElementById("appcontent"); // browser
        if (appcontent) {
            appcontent.addEventListener("DOMContentLoaded", this.onPageLoad, true);
        }
        // var messagepane = document.getElementById("messagepane"); // mail
        // if (messagepane) {
        //     messagepane.addEventListener("load", function(event) {
        //         myExtension.onPageLoad(event);
        //     }, true);
        // }
    },
    // When page loads, inject script if it doesn't exist already
    onPageLoad: function(aEvent) {
        if (document.title != "Tapiture - Add Tap") {
            BLTapiture.BrowserOverlay.injectScriptIfDoesntExist();
        }
    },
    // Inject script to HTML Document
    injectScript: function() {
        // Get the current filename
        let file = Components.stack.filename;
        // Strip off any prefixes added by the sub-script loader
        // and the trailing filename
        let directory = file.replace(/.* -> |[^\/]+$/g, "");
        var contentDoc = gBrowser.contentDocument;

        // Create script node for tap_browswer
        let script = contentDoc.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", directory + 'tap_functions.js');
        script.setAttribute("id", "tapFunction");
        // Create script node for tap_browswer
        // let scriptTapButton = contentDoc.createElement("script");
        // scriptTapButton.setAttribute("type", "text/javascript");
        // scriptTapButton.setAttribute("src", directory + 'tapButton.js?ver=1');
        // scriptTapButton.setAttribute("id", "tapButton");
        // Inject script nodes into the top-level element of the document
        contentDoc.documentElement.appendChild(script);
        // contentDoc.documentElement.appendChild(scriptTapButton);
    },
    // Check if script element exists, if it doesn't call this.injectedScript
    injectScriptIfDoesntExist: function() {
        var injectedScriptElement = gBrowser.contentDocument.getElementById("tapFunction");
        // determine if script exists
        if (!injectedScriptElement) {
            this.injectScript();
        }
    },
    // Run function 'addOvery()' on HTML Document
    addOverlay: function() {
        var code = 'addOverlay();';
        this.executeScriptOnHTML(code);
    },
    // Run function 'tap(fun)' on HTML document
    tap: function() {
        var code = '';
        if (this.clickOnImage) {
            code = "var info = {}; " +
                "info['srcUrl'] = \"" + this.imgSrc + '";' +
                'tap(info);';
        } else {
            code = 'addOverlay();';
        }

        this.executeScriptOnHTML(code);
    },
    // Run javascript code on HTML Document
    executeScriptOnHTML: function(code) {
        var contentDoc = gBrowser.contentDocument;
        let s = contentDoc.createElement('script');
        s.setAttribute("type", "text/javascript");
        s.appendChild(contentDoc.createTextNode(code));
        contentDoc.documentElement.appendChild(s);
    },
    // When context menu (<menupopup>) appears, save whether or not user clicked on image and what the imageSrc is
    popupShowingCallBack: function(aEvent) {
        // Determine whether user clicked on an image 
        var node = aEvent.target.triggerNode;
        var localName = node.localName;
        this.clickOnImage = (localName == "img") ? true : false;
        this.imgSrc = node.src;
    }
    // sayHello: function(aEvent) {
    //     //let stringBundle = document.getElementById("xulschoolhello-string-bundle");
    //     //let message = stringBundle.getString("xulschoolhello.greeting.label");
    //     // console.log('variable view of blah =', window);
    //     // gBrowser.contentDocument.body.innerHTML = 'rawr';
    //     // addOverlay();
    // },
};