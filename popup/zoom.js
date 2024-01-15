document.getElementById('zoomin').addEventListener('click', async () => {
    // Obtenir l'onglet actif
    var [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Vérifier si un onglet actif a été trouvé
    if (activeTab) {
        // Exécuter le script uniquement sur l'onglet actif
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: zoomIn
        });
    }
});

function zoomIn() {
    var zoom = parseInt(document.documentElement.style.zoom || '100') + 10 + '%';
    document.documentElement.style.zoom = zoom;
};

document.getElementById('zoomout').addEventListener('click', async () => {
    // Obtenir l'onglet actif
    var [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Vérifier si un onglet actif a été trouvé
    if (activeTab) {
        // Exécuter le script uniquement sur l'onglet actif
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: zoomOut
        });
    }
});
function zoomOut() {
    var zoom = parseInt(document.documentElement.style.zoom || '100') - 10 + '%';
    document.documentElement.style.zoom = zoom;
}


