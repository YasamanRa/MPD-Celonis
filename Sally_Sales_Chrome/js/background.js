// background.js

console.log("Background.js loaded");

// Called when the user clicks on the browser action.

chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log("toogle message sent");
        chrome.tabs.sendMessage(tabs[0].id,"toggle");
    })
});
