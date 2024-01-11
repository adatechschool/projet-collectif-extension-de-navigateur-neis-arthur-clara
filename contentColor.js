chrome.runtime.onMessage.addListener(updateColor);

function updateColor(request, sender, sendResponse) {
    document.body.style.backgroundColor = request.colorb;
    console.log("hello");
    document.body.style.background = request.colorb;
    let div = document.getElementsByClassName("mw-page-container");
    for (let i = 0; i<div.length; i++){
        div[i].style.backgroundColor = request.colorb;
        };
    document.body.style.color = request.colort; 
    let text = document.querySelectorAll("p, a, h1, h2, h3, li, ul, label, span");
        for (let i =0; i<text.length; i++){
            text[i].style.color = request.colort; 
        }
} 
