chrome.runtime.onMessage("changer").addListener(changeCurrentCursor);

function changeCurrentCursor() {
    // Utiliser le curseur local
    document.body.style.cursor = 'url(' + chrome.runtime.getURL('popup/cursor_blue.png') + '), auto';
};


function reset_cursor(){

}
