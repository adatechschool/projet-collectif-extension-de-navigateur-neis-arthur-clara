document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('toggleCursor');
  
    // Charger l'état sauvegardé depuis le stockage local 
    chrome.storage.local.get(['toggle2State'], function (result) {
      var savedToggleState = result.toggle2State;
      // Mettre à jour visuellement le toggle
      toggle.checked = savedToggleState;
    });
  
    toggle.addEventListener('change', function () {
      // Récupérer l'état actuel du toggle
      var isChecked = toggle.checked;
  
      // Sauvegarder l'état du toggle dans le stockage local
      chrome.storage.local.set({ toggle2State: isChecked });
  
      // Envoyer un message à tous les onglets avec l'état du toggle
      chrome.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
              chrome.tabs.sendMessage(tabs[i].id, { toggle2State: isChecked });
          }
      });
  });
});
