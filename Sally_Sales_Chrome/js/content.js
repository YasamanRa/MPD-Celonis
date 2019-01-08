// content.js
// Content scripts are files that run in the context of web pages.
// By using the standard Document Object Model (DOM), they are able to read details
// of the web pages the browser visits, make changes to them and pass information to their parent extension.
// https://developer.chrome.com/extensions/content_scripts

console.log("content.js start");

// Add Listener when on message
chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "toggle"){
        console.log("chrome.runtime.onMessage.addListener");
        console.log(window);
        toggle();
        optimizeUI();
    }
})


// Set With of the Panel. For demo make sure it is visible enough
var panelWidth = 500;
// Panel should be closed by default
var opened = false;
// Create Side Bar Panel
var iframe = document.createElement('iframe');
iframe.id = "sally-sales";
iframe.style.height = "100%";
iframe.style.width = panelWidth+"px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "-"+panelWidth+"px";
iframe.style.zIndex = "9000000000000000000";
iframe.frameBorder = "none";
iframe.style.transition = "all 0.5s ease-out";
iframe.src = chrome.extension.getURL("popup.html");
document.body.appendChild(iframe);
console.log("iframe appended to DOM");
console.log(iframe);
console.log(document);
var button = document.querySelector('#find-colleagues');
console.log(button);

function toggle(){
  // Toggle side panel
    console.log("toggle()", opened);

    if(opened){
        iframe.style.transform = "translateX(0px)";
        opened = false;
    }
    else{
        iframe.style.transform = "translateX(-"+panelWidth+"px)";
        opened = true;
    }
}

function displayColleagueTab(){
  // displays colleague tab, deactivate process view
  console.log("displayColleagueTab()");
  var colTab = document.getElementById("tab-colleague");

  colTab.classList.remove("panel-main__menu-tab_invisible");
}

//EVENT NEEDS TO BE ADDED. DOM not loaded properly
addEventListener('loaded', function () {
  console.log(document.querySelector('#find-colleagues'));
  document.getElementById("find-colleagues").addEventListener('click', colleagueClickHandler);
  console.log("Find colleague event registered");
});

console.log("content.js end");
