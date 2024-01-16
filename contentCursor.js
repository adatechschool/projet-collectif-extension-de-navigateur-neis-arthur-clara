function changeCurrentCursor() {
    // Utiliser le curseur local
    document.body.style.cursor = 'url(' + chrome.runtime.getURL('popup/cursor_blue.png') + '), auto';
};

// remove l'état initial
function removeCursor() {
    document.body.style.cursor = 'default';
};

//récupération du message du bold.js pour voir si le toggle est activé ou non 
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.toggle2State !== undefined) {
            // Réagir en fonction de l'état du toggle
            if (request.toggle2State) {
                console.log('Toggle actif');
                changeCurrentCursor();
            } else {
                console.log('Toggle pas actif');
                removeCursor();
            };
        };
    });



