    let backgroundPicker = document.getElementById('background');
    let textPicker = document.getElementById('text');
    let cookieVal = {
        colorb : '',
        colort : ''
    }

    function getActiveTab() {
        return chrome.tabs.query({active: true, currentWindow: true});
      }


    backgroundPicker.addEventListener("input", function(event){
        getActiveTab().then((tabs) => {
            let theColorb = event.target.value;
            chrome.tabs.sendMessage(tabs[0].id, {colorb: theColorb});
            
            cookieVal.colorb = theColorb;
            chrome.cookies.set({
                url: tabs[0].url,
                name: "colorPicker", 
                value: JSON.stringify(cookieVal)
            });
        });
    });

    textPicker.addEventListener("input", function (event) {
        getActiveTab().then((tabs) => {
            let theColort = event.target.value;
            chrome.tabs.sendMessage(tabs[0].id, {colort : theColort});

            cookieVal.colort = theColort;
            chrome.cookies.set({
                url : tabs[0].url,
                name : "colorPicker",
                value: JSON.stringify(cookieVal)
            });
        });
    });
    
//     function getColorb () {
//         chrome.storage.sync.get("theColorb",({theColorb}) =>{
//             document.body.style.background = theColorb;
//             document.body.style.backgroundColor = theColorb;
//             let div = document.getElementsByClassName("mw-page-container");
//             for (let i = 0; i<div.length; i++){
//                 div[i].style.backgroundColor = theColorb;
//             }
//         });
//      }   

//      function getColort () {
//         chrome.storage.sync.get("theColort",({theColort}) =>{
//         document.body.style.color = theColort; 
//         let text = document.querySelectorAll("p, a, h1, h2, h3, li, ul, label, span");
//         for (let i =0; i<text.length; i++){
//             text[i].style.color = theColort;
//         } 
//     })

// }

//     document.getElementById('background').addEventListener("input", async ()=> {
//         let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//         let theColorb = document.getElementById('background').value;
//         chrome.storage.sync.set({theColorb});
        
//         chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: getColorb,
//         });

//         chrome.tabs.sendMessage(tab[0].id, {color: theColorb});
//             cookieVal.color = theColorb;
//             chrome.cookies.set({
//                 url: tab[0].url,
//                 name: "backgroundChosen", 
//                 value: JSON.stringify(cookieVal)
//             })
//     });

//     document.getElementById('text').addEventListener("input", async ()=> {
//         let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
//         let theColort = document.getElementById('text').value;
//         chrome.storage.sync.set({theColort});
        
//         chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: getColort,
//         });
//     });