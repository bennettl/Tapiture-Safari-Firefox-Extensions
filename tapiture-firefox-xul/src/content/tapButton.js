// /**
//  * BLTapiture namespace.
//  */
// if ("undefined" == typeof(BLTapiture)) {
//     var BLTapiture = {};
// }
// // // Initalizes Bl.BrowserOverlay when the window loads
// window.onload = function() {
//     BLTapiture.TapButton.init();
//     console.log('window addEventListener');
// };

// /**
//  * Controls the tap button for the Tapiture Extension.
//  */

// // *** THIS IS AN INJECTED SCRIPT *** //

// BLTapiture.TapButton = {
//     imgSrc: '',
//     init: function() {
//         var imgs = document.getElementsByTagName("img");
//         var self = this;
//         console.log('there are ' + imgs.length + 'images');
//         // Attach event lisenter to each image
//         for (var i = 0; i < imgs.length; i++) {
//             var imgWidth = imgs[i].width;
//             var imgHeight = imgs[i].height;
//             var width = '200px';
//             var height = '200px';

//             if (imgWidth < width && imgHeight < height) {
//                 return;
//             }

//             console.log('past the test');

//             imgs[i].onmouseover = function(event) {
//                 //** Hovering over imgs **/
//                 // Create a div element
//                 var img = event.target;
//                 var parent = event.target.parentNode;
//                 self.imgSrc = event.target.src;
//                 console.log('image source ', self.imgSrc, self);
//                 parent.appendChild(self.button());
//                 parent.onmouseout = function() {
//                     // Make sure hovering over child elements doesn't register as mouseout

//                     //this is the original element the event handler was assigned to
//                     var e = event.toElement || event.relatedTarget;

//                     //check for all children levels (checking from bottom up)
//                     while (e && e.parentNode && e.parentNode != window) {
//                         if (e.parentNode == this || e == this) {
//                             if (e.preventDefault) e.preventDefault();
//                             return false;
//                         }
//                         e = e.parentNode;
//                     }

//                     var target = event.target;
//                     document.getElementById('tapThis').style.display = 'none';
//                 };
//                 parent.style.position = 'relative';
//                 // parentNode.replaceChild(containerDiv, img)
//             };
//         }
//         this.initStyle();
//     },
//     // Inject CSS style
//     initStyle: function() {
//         var injectedStyleElement = document.getElementById("tapButtonStyle");
//         // determine if style exists
//         if (!injectedStyleElement) {
//             // Create style node for tap button
//             var styleElement = document.createElement("link");
//             styleElement.setAttribute("rel", "stylesheet");
//             styleElement.setAttribute("href", 'chrome://tapiture-firefox/skin/tapButton.css?ver=1');
//             styleElement.setAttribute("id", "tapButtonStyle");
//             // Inject style nodes into the top-level element of the document
//             document.documentElement.appendChild(styleElement);
//         }
//     },
//     // Get DOM button
//     button: function() {
//         var tapThis;
//         // If tap this doesn't exist, create a new one
//         if (document.getElementById('tapThis')) {
//             tapThis = document.getElementById('tapThis');
//             tapThis.style.display = 'block';
//         } else {
//             tapThis = document.createElement('a');
//             tapThis.setAttribute('id', 'tapThis');
//             tapThis.innerHTML = 'Tap';

//             // On click event handler
//             var self = this;
//             // Event handeler for click event
//             tapThis.onclick = function() {
//                 var info = [];
//                 info['srcUrl'] = self.imgSrc;
//                 tap(info);
//                 console.log('tapThisClick', self.imgSrc);
//             };
//         }
//         return tapThis;
//     },
// };