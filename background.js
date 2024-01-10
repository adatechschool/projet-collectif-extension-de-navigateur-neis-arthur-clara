// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: {tabId: tab.id},
//       files: ['bold-script.js']
//     });
//   })


chrome.runtime.onInstalled.addListener(function () {
    console.log('Color Changer extension installed.');
  });