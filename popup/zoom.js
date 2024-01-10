document.getElementById('zoomin').addEventListener('click', async () => {
    var tabs = await chrome.tabs.query({});
    tabs.forEach(function (tab) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            function: zoomIn
        });
    });
});

function zoomIn() {
    var zoom = parseInt(document.documentElement.style.zoom || '100') + 10 + '%';
    document.documentElement.style.zoom = zoom;
};

document.getElementById('zoomout').addEventListener('click', async () => {
    var tabs = await chrome.tabs.query({});
    tabs.forEach(function (tab) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            function: zoomOut
        });
    });
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