//récupération du message du bold.js pour voir si le toggle est activé ou non 
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.toggleState !== undefined) {
            // Réagir en fonction de l'état du toggle
            if (request.toggleState) {
                console.log('Toggle actif');
                formatWordsInTabs();
            } else {
                console.log('Toggle pas actif');
                removeWordFormatting();
            }
        }
    }
);

//bionic reading
function formatWordsInTabs() {
    const allParagraphs = document.querySelectorAll("p, li, strong, em, ap, a, h1, h2, h3, ul, label, span, cite, b, i"); //récupération de tous les paragraphes du HTML + li
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
}

//remove l'état initial
function removeWordFormatting() {
    const allSpans = document.querySelectorAll("p, li, strong, em, ap, a, h1, h2, h3, ul, label, span, cite, b, i"); //sélection de tous les enfants de p (et autres) qui sont des span crée dans le formatWordsInTabs
    allSpans.forEach(span => { //pour chaque span sélectionné 
    const paragraph = span.parentNode; //récupération du parent de Node de span
    paragraph.replaceChild(document.createTextNode(span.textContent), span); //Remplacement du span par le parent initial
    });
}

