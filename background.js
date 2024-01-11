/* Retrieve any previously set cookie and send to content script */
console.log("coucou")
function getActiveTab() {
    return chrome.tabs.query({active: true, currentWindow: true});
  }


  function cookieUpdate() {
    console.log("tot");
    getActiveTab().then((tabs) => {
      // get any previously set cookie for the current tab 
      let gettingCookies = chrome.cookies.get({
        url: tabs[0].url,
        name: "colorPicker"
      });
      gettingCookies.then((cookie) => {
        if (cookie) {
          let cookieVal = JSON.parse(cookie.value);
          chrome.tabs.sendMessage(tabs[0].id, {colorb: cookieVal.colorb});
          chrome.tabs.sendMessage(tabs[0].id, {colort: cookieVal.colort});
        }
      });
    }); 
  }
  
  // update when the tab is updated
  chrome.tabs.onUpdated.addListener(cookieUpdate);
  // update when the tab is activated
  chrome.tabs.onActivated.addListener(cookieUpdate);