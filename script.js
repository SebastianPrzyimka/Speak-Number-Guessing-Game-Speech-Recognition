const sendMsg = document.querySelector('#msg')
let makeNbr = randomNumber()
console.log('Number:',makeNbr)



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition()

recognition.start()


//capture user speak
function onSpeak(e){
  const msg = e.results[0][0].transcript
  writeMessage(msg)
  checkNumber(msg)
}

function writeMessage(msg){
  sendMsg.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `
}

function checkNumber(msg){
  const num = +msg;

  if(Number.isNaN(num)){
    sendMsg.innerHTML += '<div>That is not a valid number </div>'
    return;
  }

  if(num > 100 || num < 1){
    sendMsg.innerHTML += '<div>Number must be between 1 and 100 </div>'
    return;
  }

  if(num === makeNbr){
    document.body.innerHTML = `<h2>Congratulation! You have guessed the number!<br><br> It was ${makeNbr}</h2>
    <button class="play-again" id="play-again"> Play again </button>
    `;
  }else if (num > makeNbr){
    sendMsg.innerHTML += '<div>GO LOWER </div>'
  }else if (num < makeNbr){
    sendMsg.innerHTML += '<div>GO HIGHER </div>'
  }
}

//generate random number
function randomNumber(){
   return Math.floor(Math.random()*100) + 1;
}

//speak result
recognition.addEventListener('result',onSpeak)
//reset speech
recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', (e) => {
  if(e.target.id == 'play-again'){
    window.location.reload();
  }
}
)


