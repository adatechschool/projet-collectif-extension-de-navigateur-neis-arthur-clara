
//console.log("coucou")
function getActiveTab() {
    return chrome.tabs.query({active: true, currentWindow: true});
  }


function cookieUpdate() {
    console.log("tot");
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
    console.log("tut");
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
}