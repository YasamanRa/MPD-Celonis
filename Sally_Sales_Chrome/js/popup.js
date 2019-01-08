console.log("popup.js loadeing");


function optimizeUI(){
  /*
  * Optimizes the UI by removing unwanted elements of the DOM
  */
  document.getElementsByClassName("trial-header")[0].style.display="none";    // Remove trial header
  document.getElementsByClassName("utilitybar")[0].style.display="none";      // Remove call utility bar on bottom utilitybar
  document.getElementsByClassName("analysis-menu")[0].style.display="none";   // Remove Cenonis menu on top
  document.getElementsByClassName("tabs")[0].style.display="none";            // Remove tabs menu on bottom
}

function colleagueClickHandler(e) {
  console.log("colleagueClickHandler()");
  alert("Button pressed");
}

function toggleHandler() {
  chrome.tabs.sendMessage(tabs[0].id,"toggle");
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

  optimizeUI();
  console.log("UI optimized");
  document.getElementById("find-colleagues").addEventListener('click', colleagueClickHandler);
  console.log("Find colleague event registered");
  document.getElementById("sidebar-arrow").addEventListener("click", toggleHandler);

}

// hacky solution to wait long enough until DOM of popup is completely loaded
wait(10000);



console.log("popup.js end")
