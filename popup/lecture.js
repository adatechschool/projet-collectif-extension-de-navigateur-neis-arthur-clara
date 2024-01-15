
let textInput = document.getElementById('textInput');
let button = document.getElementById('lecture');
let value = [];

textInput.addEventListener("input", function(event){
    let text = event.target.value;
    console.log(typeof(text));
    value.push(text);
})
button.addEventListener("click", function(){
    console.log(value[0])
    chrome.tts.speak(value[0]);
});