console.log("popup.js loadeing");


function resetAnalysisScreen () {

  var toShow = document.getElementById("next-steps-to-do-block");
  toShow.classList.remove("content-block_invisible");

  // HIDE DIVS
  var box1 = document.getElementById("content-task-detail-1");
  var box2 = document.getElementById("content-task-detail-2");
  var box3 = document.getElementById("add-task-form-box");
  var box4 = document.getElementById("content-block-colleague");

  var divsToHide = [box1, box2, box3, box4];

  divsToHide.forEach( function(element){
    if( !element.classList.contains("content-block_invisible")){
      element.classList.add("content-block_invisible");
    }
  });

  // UNCHECK CHECKBOXES
  var inputs = document.getElementsByTagName("input");

  for( var i=0; i< inputs.length; i++){
    if(inputs[i].getAttribute("type")=="radio"){
      inputs[i].checked = false;
    }
  }

}

function colleagueClickHandler(e) {
  /* toggle colleague block */
  console.log("colleagueClickHandler()");
  console.log(document);

  var previousBox1 = document.getElementById("content-task-detail-1");
  previousBox1.classList.add("content-block_invisible");
  var previousBox2 = document.getElementById("content-task-detail-2");
  previousBox2.classList.add("content-block_invisible");

  var colleagueBlock = document.getElementById("content-block-colleague");
  if(colleagueBlock.classList.contains("content-block_invisible")){
    colleagueBlock.classList.remove("content-block_invisible");
  }
  else {
    colleagueBlock.classList.add("content-block_invisible");
  }

}

async function proceedAnalysisHandler(){
  // reset screen
  resetAnalysisScreen();
  // hide start screen and show analyis SCREEN
  var startView = document.getElementById("start-screen");
  var loadView = document.getElementById("load-screen");
  var analysisView = document.getElementById("analysis-screen");

  // FIrst show load screen
  startView.classList.add("content-block_invisible");
  loadView.classList.remove("content-block_invisible");
  // Wait for a bit ... We are loading :-)
  await sleep(5000);
  // show analyis screen
  loadView.classList.add("content-block_invisible");
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
  var radioButton1 = document.getElementById("next-step-radio-1");
  var radioButton2 = document.getElementById("next-step-radio-2");

  var previousBox = document.getElementById("next-steps-to-do-block");
  previousBox.classList.add("content-block_invisible");

  if( radioButton1.checked == true ){
    taskBox1.classList.remove("content-block_invisible");
    taskBox2.classList.add("content-block_invisible");
  }
  if(radioButton2.checked == true) {
    taskBox2.classList.remove("content-block_invisible");
    taskBox1.classList.add("content-block_invisible");
  }





}

function taskClickHandler(){
  // Send message
  var taskFormBox = document.getElementById("add-task-form-box");

  var previousBox = document.getElementById("content-block-colleague");
  previousBox.classList.add("content-block_invisible");

  if (taskFormBox.classList.contains("content-block_invisible")){
    taskFormBox.classList.remove("content-block_invisible");
  }

  /* COMMUICATION WITH CONTENT SCIPT NOT NEEDED
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log("task message sent");
      chrome.tabs.sendMessage(tabs[0].id,"task");
  });
  */
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

function activateTabHandler(){
  // get content to activate
  console.log("Tab Handler Click");
  var headlineBoxes = document.getElementsByClassName("icon-headline-block");
  var i;

  document.getElementById("content-task-detail-2").classList.add("content-block_invisible");
  for( i=0; i < headlineBoxes.length; i++){
    // if it is visible hide it
    var tempBox = headlineBoxes[i].nextElementSibling;
    if(! tempBox.classList.contains("content-block_invisible")){
      tempBox.classList.add("content-block_invisible");
    }
  };
  console.log(this.nextElementSibling);
  this.nextElementSibling.classList.remove("content-block_invisible");

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

  document.getElementsByClassName("find-colleagues")[0].addEventListener('click', colleagueClickHandler);
  document.getElementsByClassName("find-colleagues")[1].addEventListener('click', colleagueClickHandler);
  console.log("Find colleague event registered");
  console.log("colleague back event registered");
  document.getElementById("sidebar-arrow").addEventListener("click", toggleHandler);
  console.log("toggleHandler added");
  document.getElementById('mail-action').addEventListener("click", mailClickHandler);
  document.getElementById('call-action').addEventListener("click", callClickHandler);
  document.getElementById('create-task').addEventListener("click", taskClickHandler);
  document.getElementById("proceed-analysis-button").addEventListener("click", proceedAnalysisHandler);
  document.getElementById("analyis-back").addEventListener("click", analyisBackHandler);
  document.getElementById("to-ressources").addEventListener("click", taskDetailHandler);
  document.getElementById("add-task-button").addEventListener("click", toggleHandler);

  var headlineBoxes = document.getElementsByClassName("icon-headline-block");
  var i;
  for( i=0; i < headlineBoxes.length; i++){
    headlineBoxes[i].addEventListener("click", activateTabHandler);
  };


}

// hacky solution to wait long enough until DOM of popup is completely loaded
wait(13000);



console.log("popup.js end")
