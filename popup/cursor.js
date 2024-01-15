console.log('dpov');
var pointer = "url(https://www.vhv.rs/dpng/d/8-83792_cool-mouse-cursors-png-transparent-png.png), auto";

function changeCurrentCursor(){
    document.body.style.cursor = 'url("https://tse4.mm.bing.net/th?id=OIP.ckihhAqQ34iAwmU_PjicMgAAAA&pid=Api"), auto';
};

// function changeCurrentCursor(){
//     document.body.style.cursor = 'url("https://icons8.com/icon/rKqQiYPTkVLU/select-cursor"), auto';
// };



// Ajouter un écouteur de clic au bouton 'cursor_change'
document.getElementById('cursor_change').addEventListener('click', async () => {
    // Obtenir tous les onglets actifs
    chrome.tabs.query({ active: true }, (tabs) => {
        // Parcourir tous les onglets actifs et exécuter le script
        tabs.forEach((tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: changeCurrentCursor
            });
        });
    });
});


