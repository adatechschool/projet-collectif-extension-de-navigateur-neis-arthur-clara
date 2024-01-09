document.getElementById('toggleGras').addEventListener('click', async () => {
    //let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id, allFrames : true },
    //   func: () => {
    //     document.body.style.border = '2px solid red';
    //   },
    // });

    var tabs = await chrome.tabs.query({});
    tabs.forEach(function (tab) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames : true },
            func: () => {
              document.body.style.border = '2px solid red';
            },
          });
    });
   
  });



 