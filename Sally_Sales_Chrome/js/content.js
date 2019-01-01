// content.js

//alert("Hello from Sally Sales Chrome extension")

console.log("content.js start");

// Add Listener when on message 
chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "toggle"){
        toggle();
    }
})

// Create Side Bar Panel and set display none
var iframe = document.createElement('iframe');
iframe.style.height = "100%";
iframe.style.width = "400px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.frameBorder = "none";
iframe.style.display = "none"
iframe.src = chrome.extension.getURL("popup-panel.html")
document.body.appendChild(iframe);


function toggle(){
  // Toggle side panel

    if(iframe.style.display == "none"){
        iframe.style.display="block";
    }
    else{
        iframe.style.display="none";
    }
}


console.log("content.js end");
