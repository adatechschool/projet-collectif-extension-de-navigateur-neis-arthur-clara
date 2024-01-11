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

/*
  function zoomIn()
  {
    var Page = document.getElementById('Body');
    var zoom = parseInt(Page.style.zoom) + 10 +'%'
    Page.style.zoom = zoom;
    return false;
  }
addEventListener("pointermove", (event) => {
                   
                });
  // pageX et pageY pour la position de la sourie

  function mousemove(event) {
    console.log(
        'clientX: ', event.clientX, 'clientY:', event.clientY)
  }


  const {
    clientX,
    clientY
  } = event;

  addEventListener("pointermove", (event) => {});

  var positions = curPos();
  var mouseX = positions.clientX;
  var mouseY = positions.clientY;


  <button type="button" id="zoomin">Zoom-in</button> 
  <button type="button" id="zoomout">Zoom-out</button>
  <script src="zoom.js"></script>
*/

