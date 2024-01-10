    function getColorb () {
        chrome.storage.sync.get("theColorb",({theColorb}) =>{
            document.body.style.background = theColorb;
            document.body.style.backgroundColor = theColorb;
            let div = document.getElementsByClassName("mw-page-container");
            for (let i = 0; i<div.length; i++){
                div[i].style.backgroundColor = theColorb;
            }  
        });
     }   

     function getColort () {
        chrome.storage.sync.get("theColort",({theColort}) =>{
        document.body.style.color = theColort;    
    })

}

    document.getElementById('background').addEventListener("input", async ()=> {
        let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        let theColorb = document.getElementById('background').value;
        chrome.storage.sync.set({theColorb});
        
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getColorb,
        });
    });

    document.getElementById('text').addEventListener("input", async ()=> {
        let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        let theColort = document.getElementById('text').value;
        chrome.storage.sync.set({theColort});
        
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getColort,
        });
    });