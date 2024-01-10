let toggle = document.getElementById("toggleGras"); // Récupération du toggle dans le HTML

// Fonction pour mettre à jour l'état du toggle en fonction de chrome.storage qui sauvegarde
function updateToggleState() {
  chrome.storage.sync.get("toggleState", ({ toggleState }) => {
    if (toggleState === undefined) {
      chrome.storage.sync.set({ toggleState: false });
      toggle.checked = false;
    } else {
      toggle.checked = toggleState;
    }

    // Si le toggle actif, fonction bionic
    if (toggle.checked) {
      formatWordsInTabs();
    }
  });
}

// Chargement initial de l'état du toggle
updateToggleState();

// Fonctions changement de l'état du toggle
toggle.addEventListener("change", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Enregistrer immédiatement l'état actuel du toggle dans chrome.storage dès qu'il est modifié
  chrome.storage.sync.set({ toggleState: toggle.checked });

  if (toggle.checked) {
    formatWordsInTabs();
  } else {
    removeWordFormatting();
  }
});

// Fonction pour mettre la moitié des mots en gras
function formatWordsInTabs() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        func: () => {
          const allParagraphs = document.querySelectorAll("p, li, strong, em, a"); //récupération de tous les paragraphes du HTML + li
          allParagraphs.forEach(paragraph => { //pour chaque paragraphe 
            const textNodes = Array.from(paragraph.childNodes).filter(node => node.nodeType === Node.TEXT_NODE); //récupération de tout le text Node = texte sans lien HTTP
            textNodes.forEach(node => { //pour tout les textes nodes 
              const words = node.textContent.split(" "); //récupération de chaque mots
              const formattedWords = words.map(w => `<b>${w.slice(0, Math.ceil(w.length / 2))}</b>${w.slice(Math.ceil(w.length / 2))}`); //formatage des mots pour la première moitié en gras
              const span = document.createElement("span"); //création d'un élément span 
              span.innerHTML = formattedWords.join(" "); //intégration du span dans le body HTML
              paragraph.replaceChild(span, node); //remplacement du paragraphe par tout les span avec le paramètre node (sans lien http)
            });
          });
        },
      });
    });
  });
}

// Fonction pour remettre le style de base
function removeWordFormatting() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        func: () => {
          const allSpans = document.querySelectorAll("p > span, li > span, strong > span, em > span, a > span"); //sélection de tous les enfants de p (et autres) qui sont des span crée dans le formatWordsInTabs
          allSpans.forEach(span => { //pour chaque span sélectionné 
            const paragraph = span.parentNode; //récupération du parent de Node de span
            paragraph.replaceChild(document.createTextNode(span.textContent), span); //Remplacement du span par le parent initial
          });
        },
      });
    });
  });
}

// Écouter les mises à jour des onglets
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateToggleState(); // Mettre à jour l'état du toggle lorsque le nouvel onglet est chargé
  }
});




