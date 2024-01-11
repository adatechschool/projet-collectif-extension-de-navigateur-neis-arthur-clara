// Écoutez les événements de création et de mise à jour des onglets
chrome.tabs.onCreated.addListener(function (tab) {
    handleToggleState(tab.id);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        handleToggleState(tabId);
    }
});

function handleToggleState(tabId) {
    // Charger l'état sauvegardé depuis le stockage local
    chrome.storage.local.get(['toggleState'], function (result) {
        var savedToggleState = result.toggleState;
        
        // Envoyer un message au nouvel onglet avec l'état du toggle
        chrome.tabs.sendMessage(tabId, { toggleState: savedToggleState });
    });
}