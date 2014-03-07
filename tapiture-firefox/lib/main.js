// Initialize context menu and data objects
var cm = require("sdk/context-menu");
var data = require("sdk/self").data;
var tabs = require("sdk/tabs");

/** When User Clicks Toolbar Image **/
require("toolbarwidget").ToolbarWidget({
    toolbarID: "nav-bar", // <-- Place widget on Navigation bar
    id: "tap-icon",
    label: "Tap on Tapiture",
    contentURL: data.url("favicon.png"),
    // width: 50,
    onClick: function() {
        tabs.activeTab.attach({
            contentScriptFile: [data.url("tap_browser.js")],
            contentScript: 'addOverlay();'
        });
    },
    contentScriptWhen: "ready"
});

// Widget({
//   id: "mozilla-icon",
//   label: "My Mozilla Widget",
// });

var tabs = require("sdk/tabs");

// require("sdk/widget").Widget({
//     id: "auto-update-widget",
//     label: "Widget that updates content on a timer",
//     contentURL: "http://www.mozilla.org/favicon.ico",
//     onClick: function() {
//         tabs.activeTab.attach({
//             contentScriptFile: [data.url("tap_browser.js")],
//             contentScript: 'addOverlay();'
//         });
//     },
//     contentScriptWhen: "ready"
// });

/** When User Clicks Single Image **/
// Attaches "click" event handler to tap(Info)
var singleImageCallBack = 'self.on("click", function (node, data) {' +
// Get the imagesrc and place it into info
'var info = {};' +
    'info[\'srcUrl\'] = node.src;' +
    "tap(info);" +
// 'console.log("Tag " + node.nodeName + "src: " + node.src);' +
'});';
// Add item to context menu only when images are selected
cm.Item({
    label: "Tap To Tapiture",
    context: cm.SelectorContext("img"),
    contentScript: singleImageCallBack,
    contentScriptFile: [data.url("tap_browser.js")]
});

/** When User Clicks Page **/
// Page callback: attaches "click" event handler to addOverlay()
var pageCallBack = 'self.on("click", function (node, data) {' +
    'addOverlay();' +
// 'console.log("Item clicked!");' +
// 'console.log("Tag " + node.nodeName + "src: " + node.src);' +
'});';
// Add item to context menu when the rest of the page is selected
cm.Item({
    label: "Tap To Tapiture",
    context: cm.PageContext(),
    contentScript: pageCallBack,
    contentScriptFile: [data.url("tap_browser.js")]
});

// https://github.com/Rob--W/toolbarwidget-jplib
// var pageMod = require("sdk/page-mod");

// pageMod.PageMod({
//     include: "*",
//     contentScriptFile: [data.url("tap_browser.js"), data.url("test.js")]
// });

// "context" event - When the context menu is invoked. When the menu is clicked
// "click" event - When the context menu item is clicked 
// Node - DOM element that was right clicked on
// Useful Links
// https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/context-menu#Handling_Menu_Item_Clicks
// https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/page-mod
// https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Two_Types_of_Scripts
// https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation
// https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Module_structure_of_the_SDK