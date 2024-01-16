
let textInput = document.getElementById('textInput');
let buttonL = document.getElementById('lecture');
let buttonS = document.getElementById('stop');
let value = [];

textInput.addEventListener("input", function(event){
    let text = event.target.value;
    console.log(typeof(text));
    value.push(text);
})
buttonL.addEventListener("click", function(){
    console.log(value[0])
    chrome.tts.speak(value[0]);
});
buttonS.addEventListener("click",() => {
    chrome.tts.stop();
});