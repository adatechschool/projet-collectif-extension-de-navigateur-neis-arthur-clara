// Ajouter un écouteur de clic au bouton 'cursor_change'
document.getElementById('cursor_change').addEventListener('click', async () => {
    // Obtenir tous les onglets actifs
    chrome.tabs.query({ active: true }, (tabs) => {
        // Parcourir tous les onglets actifs et exécuter le script
        tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, pressed);
        });
    });
});