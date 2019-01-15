console.log("popup.js loadeing");




function colleagueClickHandler(e) {
  /* toggle colleague block */
  console.log("colleagueClickHandler()");
  console.log(document);
  var colleagueBlock = document.getElementById("content-block-colleague");
  if(colleagueBlock.classList.contains("content-block_invisible")){
    colleagueBlock.classList.remove("content-block_invisible");
  }
  else {
    colleagueBlock.classList.add("content-block_invisible");
  }

}

function proceedAnalysisHandler(){
  // hide start screen and show analyis SCREEN
  var startView = document.getElementById("start-screen");
  var analysisView = document.getElementById("analysis-screen");

  startView.classList.add("content-block_invisible");
  analysisView.classList.remove("content-block_invisible");

}

function analyisBackHandler(){
  // hide analysis screen and show start SCREEN
  var startView = document.getElementById("start-screen");
  var analysisView = document.getElementById("analysis-screen");

  analysisView.classList.add("content-block_invisible");
  startView.classList.remove("content-block_invisible");
}

function taskDetailHandler(){
  var taskBox1 = document.getElementById('content-task-detail-1');
  var taskBox2 = document.getElementById('content-task-detail-2');
  // check if both are disabled
  // TO BE IMPLEMENTED

  // 1st click: if task box empty and not displayed yet
  if( taskBox1.classList.contains("content-block_invisible") && taskBox2.classList.contains("content-block_invisible") ){
    if(this.id == "next-step-1"){
      taskBox1.classList.remove("content-block_invisible");
    }else {
      taskBox2.classList.remove("content-block_invisible");
    }
  }
  else {
    if(this.id == "next-step-1"){
      taskBox1.classList.remove("content-block_invisible");
      taskBox2.classList.add("content-block_invisible");
    }else {
      taskBox2.classList.remove("content-block_invisible");
      taskBox1.classList.add("content-block_invisible");
    }
  }

  // toggle between task boxes
  // TO BE IMPLEMENTED

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
  console.log("colleague back event registered");
  document.getElementById("sidebar-arrow").addEventListener("click", toggleHandler);
  console.log("toggleHandler added");
  document.getElementById('mail-action').addEventListener("click", mailClickHandler);
  document.getElementById('call-action').addEventListener("click", callClickHandler);
  document.getElementById('create-task').addEventListener("click", taskClickHandler);
  document.getElementById("proceed-analysis-button").addEventListener("click", proceedAnalysisHandler);
  document.getElementById("analyis-back").addEventListener("click", analyisBackHandler);
  document.getElementById("next-step-1").addEventListener("click", taskDetailHandler);
  document.getElementById("next-step-2").addEventListener("click", taskDetailHandler);


}

// hacky solution to wait long enough until DOM of popup is completely loaded
wait(13000);



console.log("popup.js end")
