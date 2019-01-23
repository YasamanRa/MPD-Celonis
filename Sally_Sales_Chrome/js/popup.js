console.log("popup.js loadeing");


function resetAnalysisScreen () {

  $("#next-steps-to-do-block").show();
  $("#sally1").show();


  // HIDE DIVS
  $("#content-task-detail-1").hide();
  $("#content-task-detail-2").hide();
  $("#add-task-form-box").hide();
  $("#content-block-colleague").hide();
  $("#sally2").hide();
  $("#sally3").hide();
  $("#sally4").hide();


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


  $("#content-task-detail-1").slideUp();
  $("#content-task-detail-2").slideUp();

  $("#content-block-colleague").slideToggle();

  $("#sally2").hide();
  $("#sally3").fadeIn(1000);


}

async function proceedAnalysisHandler(){
  resetAnalysisScreen();
  // hide start screen and show analyis SCREEN

  $("#start-screen").hide();
  $("#load-screen").show();

  // Wait for a bit ... We are loading :-)
  await sleep(2000);
  // show analyis screen
  $("#load-screen").hide();
  $("#analysis-screen").show();

}

function analyisBackHandler(){
  // hide analysis screen and show start SCREEN
  $("#start-screen").show();
  $("#analysis-screen").hide();
}

function taskDetailHandler(){

  var radioButton1 = document.getElementById("next-step-radio-1");
  var radioButton2 = document.getElementById("next-step-radio-2");

  // hide first sectionn
  $("#next-steps-to-do-block").slideToggle();

  if( radioButton1.checked == true ){
    $('#content-task-detail-1').slideToggle();

  }
  if(radioButton2.checked == true) {
    $('#content-task-detail-2').slideToggle();
  }

  $("#sally1").hide();
  $("#sally2").fadeIn(1000);
}

function taskClickHandler(){
  // Send message
  $("#add-task-form-box").slideToggle();

  $("#content-block-colleague").slideToggle();

  $("#sally3").hide();
  $("#sally4").fadeIn(1000);
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
    chrome.tabs.sendMessage(activeTab.id, "toggle-from-popup");
    console.log("side arrow button clicked");
   });
}

function activateTabHandler(){
  // get content to activate and hide all other content
  console.log("Tab Handler Click");
  $(".sally-assistant-wrapper").hide();
  $("div.icon-headline-block + div").slideUp();
  // Show content box under the tab
  $(this).siblings("div").first().slideDown();
  // Show sally
  $(this).parent("div").prev("div").fadeIn(1000);

}

function lastActionHandler(){
  toggleHandler();
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
  document.getElementById("add-task-button").addEventListener("click", lastActionHandler);

  var headlineBoxes = document.getElementsByClassName("icon-headline-block");
  var i;
  for( i=0; i < headlineBoxes.length; i++){
    headlineBoxes[i].addEventListener("click", activateTabHandler);
  };


}

// hacky solution to wait long enough until DOM of popup is completely loaded
wait(10000);



console.log("popup.js end")
