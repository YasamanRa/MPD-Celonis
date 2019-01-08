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
        toggle();
        //optimizeUI();
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

function toggle(){
  // Toggle side panel
    var arrow = document.getElementById("icon-arrow-sidebar");
    if(opened){
        iframe.style.transform = "translateX(-20px)";
        //arrow.removeClass("panel__icon_opened");
        //arrow.addClass("panel__icon");
        opened = false;
    }
    else{
        iframe.style.transform = "translateX(-"+panelWidth+"px)";
        //arrow.removeClass("panel__icon");
        //arrow.addClass("panel__icon_opened");
        opened = true;
    }
}

function displayColleagueTab(){
  // displays colleague tab, deactivate process view
  console.log("displayColleagueTab()");
  var colTab = document.getElementById("tab-colleague");

  colTab.classList.remove("panel-main__menu-tab_invisible");
}

function optimizeUI(){
  /*
  * Optimizes the UI by removing unwanted elements of the DOM
  */
  document.getElementsByClassName("trial-header")[0].style.display="none";    // Remove trial header
  document.getElementsByClassName("utilitybar")[0].style.display="none";      // Remove call utility bar on bottom utilitybar
  // ISSUE: It seems like we have no access to an iFrame from another Source (Cross scripting)
  // document.getElementsByClassName("analysis-menu")[0].style.display="none";   // Remove Cenonis menu on top
  // document.getElementsByClassName("tabs")[0].style.display="none";            // Remove tabs menu on bottom
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait(time) {
  /*
  * waits for X miliseconds until (hopefully) our DOM object is loaded and then
  * optimizes the UI
  */
  await sleep(time);
  optimizeUI();

}

wait(10000)

console.log("content.js end");
