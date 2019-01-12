console.log("popup.js loadeing");




function colleagueClickHandler(e) {
  console.log("colleagueClickHandler()");
  var tabColleague = document.getElementById("tab-colleague");
  var tabProcess = document.getElementById("tab-process");
  var blockColleague = document.getElementById("content-block-colleague");
  var blockProcess = document.getElementById("content-block-process");


  // show colleague nav item and make active
  tabColleague.classList.add("panel-main__menu-tab_active");
  // unhighlight process nav item
  tabProcess.classList.remove("panel-main__menu-tab_active");
  tabProcess.classList.add("panel-main__menu-tab_inactive");
  // hide content block of process
  blockProcess.classList.remove("content-block_visible");
  blockProcess.classList.add("content-block_invisible");
  // show content block of colleagues
  blockColleague.classList.add("content-block_visible");
  blockColleague.classList.remove("content-block_invisible");
}

function colleagueBackHandler(e) {
  console.log("colleagueBackHandler()");
  var tabColleague = document.getElementById("tab-colleague");
  var tabProcess = document.getElementById("tab-process");
  var blockColleague = document.getElementById("content-block-colleague");
  var blockProcess = document.getElementById("content-block-process");


  // Hide coleague nav item
  tabColleague.classList.remove("panel-main__menu-tab_active");
  tabColleague.classList.add("panel-main__menu-tab_invisible");
  // activate / highlight process nav item
  tabProcess.classList.add("panel-main__menu-tab_active");
  tabProcess.classList.remove("panel-main__menu-tab_inactive");
  // show content block of process
  blockProcess.classList.add("content-block_visible");
  blockProcess.classList.remove("content-block_invisible");
  // hide content block of colleagues
  blockColleague.classList.remove("content-block_visible");
  blockColleague.classList.add("content-block_invisible");

}


function taskClickHandler(){
  // Send message
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log("task message sent");
      chrome.tabs.sendMessage(tabs[0].id,"task");
  });
}

function mailClickHandler(){
  // opens sample mail
  chrome.tabs.create({ url: "mailto:yasaman.rajaee@me.com" }, function(tab) {
    setTimeOut(function() {
        chrome.tabs.remove(tab.id);
    }, 500);
  });
}

function callClickHandler(){
  // opens sample mail
  chrome.tabs.create({ url: "facetime:+4915774122256" }, function(tab) {
    setTimeOut(function() {
        chrome.tabs.remove(tab.id);
    }, 500);
  });
}

function toggleHandler() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, "toggle");
    console.log("side arrow button clicked");
   });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait(time) {
  /*
  * waits for X miliseconds until (hopefully) our DOM object is loaded and then
  * adds an event listener to that
  */
  console.log('Popup.js : Wait ...');
  await sleep(time);
  console.log('Popup.js : 10 seconds later');
  console.log(document);

  document.getElementById("find-colleagues").addEventListener('click', colleagueClickHandler);
  console.log("Find colleague event registered");
  document.getElementById("colleague-back").addEventListener('click', colleagueBackHandler);
  console.log("colleague back event registered");
  document.getElementById("sidebar-arrow").addEventListener("click", toggleHandler);
  console.log("toggleHandler added");
  document.getElementById('mail-action').addEventListener("click", mailClickHandler);
  document.getElementById('call-action').addEventListener("click", callClickHandler);
  document.getElementById('create-task').addEventListener("click", taskClickHandler);
  document.getElementById('tab-process').addEventListener("click", colleagueBackHandler);

}

// hacky solution to wait long enough until DOM of popup is completely loaded
wait(13000);



console.log("popup.js end")
