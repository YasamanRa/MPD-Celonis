console.log("popup.js loadeing");




function colleagueClickHandler(e) {
  console.log("colleagueClickHandler()");
  var tabColleague = document.getElementById("tab-colleague");
  var tabProcess = document.getElementById("tab-process");


  // show colleague tab in nav bar and make process inactive
  tabColleague.style.display = "block";
  tabColleague.classList.add("panel-main__menu-tab_active");

  tabProcess.classList.remove("panel-main__menu-tab_active");
  tabProcess.classList.add("panel-main__menu-tab_inactive");

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
  console.log('Wait ...');
  await sleep(time);
  console.log('10 seconds later');
  console.log(document);

  document.getElementById("find-colleagues").addEventListener('click', colleagueClickHandler);
  console.log("Find colleague event registered");
  document.getElementById("sidebar-arrow").addEventListener("click", toggleHandler);
  console.log("toggleHandler added")

}

// hacky solution to wait long enough until DOM of popup is completely loaded
wait(13000);



console.log("popup.js end")
