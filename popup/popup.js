document.getElementById('cadre').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames : true },
      func: () => {
        document.body.style.border = '2px solid red';
      },
    });
  });