//creation d'un context menu qui apparait lors d'un clic droit sur une selection
chrome.contextMenus.create({
  id: "text-selection",
  title: "Lire à voix haute",
  contexts: ["selection"],
});

//écoute des clics sur le context-menu
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "text-selection") {
    //lecture à voix haute du texte selectionné
    chrome.tts.speak(info.selectionText);
    //creation d'un autre contexte menu pour arreter la lecture qui apparrait au clic droit n'importe où
    chrome.contextMenus.create({
      id: "stop",
      title: "Arrêter la lecture",
      contexts : ["all"],
});//si le clic est sur le contexte menu de stop
  } else if (info.menuItemId == "stop"){
    //arrête la lecture
    chrome.tts.stop();
    //efface le context menu de stop
    chrome.contextMenus.remove(info.menuItemId)
  }
});

function getActiveTab() {
    return chrome.tabs.query({active: true, currentWindow: true});
  }


function cookieUpdate() {
    getActiveTab().then((tabs) => {
    //cherche s'il y a des anciens cookies pour l'active tab//   
      let gettingCookies = chrome.cookies.get({
        url: tabs[0].url,
        name: "colorPicker"
      });
      //et les envoie en message au content-script//
      gettingCookies.then((cookie) => {
        if (cookie) {
          console.log("blabla");
          let cookieVal = JSON.parse(cookie.value);
          chrome.tabs.sendMessage(tabs[0].id, {colorb: cookieVal.colorb});
          chrome.tabs.sendMessage(tabs[0].id, {colort: cookieVal.colort});
        }
      });
    }); 
  }
  
  // update quand la page est actualisée
chrome.tabs.onUpdated.addListener(cookieUpdate);
  // update quand la page est activée
chrome.tabs.onActivated.addListener(cookieUpdate);
chrome.tabs.onCreated.addListener(cookieUpdate);


  // Écoutez les événements de création et de mise à jour des onglets
chrome.tabs.onCreated.addListener(function (tab) {
    handleToggleState(tab.id);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        handleToggleState(tabId);
    }
});

function handleToggleState(tabId) {
    // Charger l'état sauvegardé depuis le stockage local
    chrome.storage.local.get(['toggleState'], function (result) {
        var savedToggleState = result.toggleState;
        
        // Envoyer un message au nouvel onglet avec l'état du toggle
        chrome.tabs.sendMessage(tabId, { toggleState: savedToggleState });
    });
    // toggle2 cursor
    chrome.storage.local.get(['toggle2State'], function (result) {
      var savedToggle2State = result.toggle2State;
      chrome.tabs.sendMessage(tabId, { toggle2State: savedToggle2State });
  });
}