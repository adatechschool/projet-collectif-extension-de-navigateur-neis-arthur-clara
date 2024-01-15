chrome.runtime.onMessage.addListener(updateColor);

function updateColor(request, sender, sendResponse) {
    if (request.colorb) {
        document.body.style.backgroundColor = request.colorb;
        //console.log("hello");
        document.body.style.background = request.colorb;
        let divWiki = document.getElementsByClassName("mw-page-container");
        for (let i = 0; i<divWiki.length; i++){
            divWiki[i].style.backgroundColor = request.colorb;
            };
        let divs = document.querySelectorAll("div, section, header, footer, main");
        for (let i=0; i<divs.length; i++){
            divs[i].style.background = request.colorb;
            divs[i].style.backgroundColor = request.colorb;
        }
    } else if (request.colort) {
        document.body.style.color = request.colort; 
        let text = document.querySelectorAll("p, a, h1, h2, h3, li, ul, label, span, cite");
            for (let i =0; i<text.length; i++){
                text[i].style.color = request.colort; 
            }
    } else if (request.reset) {
        document.body.style.backgroundColor = '';
        document.body.style.background = '';
        let divWiki = document.getElementsByClassName("mw-page-container");
        for (let i = 0; i<divWiki.length; i++){
            divWiki[i].style.backgroundColor = '';
            };
        let divs = document.querySelectorAll("div, section, header, footer, main");
        for (let i=0; i<divs.length; i++){
            divs[i].style.background = '';
            divs[i].style.backgroundColor = '';
        }
        document.body.style.color = ''; 
        let text = document.querySelectorAll("p, a, h1, h2, h3, li, ul, label, span, cite");
            for (let i =0; i<text.length; i++){
                text[i].style.color = ''; 
            }
        chrome.tabs.reload();
    }
}
