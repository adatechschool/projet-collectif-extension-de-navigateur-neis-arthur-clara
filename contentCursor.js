chrome.runtime.onMessage.addListener(changeCurrentCursor);

function changeCurrentCursor() {
    // Utiliser le curseur local
    document.body.style.cursor = 'url(' + chrome.runtime.getURL('popup/cursor_blue.png') + '), auto';
};
