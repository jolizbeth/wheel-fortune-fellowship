const body = document.body;
let display = document.getElementById('display');

const word = getRandomWord();
display.innerText = '_ '.repeat(word.length)

let startChar = 'RSTLNE'
let start = document.getElementById('start');
let underscore = display.innerText.split(' ');
// getting the random word and displaying underscores 
start.onclick = function showLetters(){
  for(let i = 0; i < word.length; i++){
    if(startChar.includes(word[i].toUpperCase())){
      underscore[i] = word[i] //replacing underscore to start letter
    }
  }
  display.innerText = underscore.join(' ').toUpperCase() //adding the letters to the display
}
const restart = document.getElementById('restart');
restart.onclick = function reloadGame(){
  window.location.reload();
}

const vowels = 'aeiou';
const form = document.getElementById('userInput')
const guess = document.getElementById('guess')

let ifVowel = false;
const guessSoFar = []
//check the users guess and validate if the value is 
const userGuess = function (event){
  event.preventDefault();
  let val = guess.value
  if(guessSoFar.length === 3){
    guess.disabled = true;
  }
  // if a vowel has already been entered and value is a vowel
  if(ifVowel === true && vowels.includes(val)){
    alert('Vowel has already been entered')
  } 
  else{ 
      // otherwise if its a vowel and we will have guesses
      if(vowels.includes(val) ){
        ifVowel = true; 
        guessSoFar.push(val)
      }else{
        guessSoFar.push(val)
      }
      let wordBox = document.getElementById("wordBox")
      let text = wordBox.innerText;
      wordBox.innerText = text + " " +val;
  }
  for(let i = 0; i<word.length; i++){
    if(word[i] === val){
      underscore[i] = word[i]
    }
  }
  display.innerText = underscore.join(' ').toUpperCase()
  console.log(word)
  form.reset()
}
form.addEventListener('submit', userGuess);

const finalForm = document.getElementById('finalForm')
const final = document.getElementById('final')
//function for guessing the whole word 
const finalGuess = function(event){
  event.preventDefault();
  let val = final.value
  if(word === val){
    for(let i = 0; i<word.length; i++){
        underscore[i] = word[i] //set win 
        body.style.background = "#649868";
    }  
  } else{
    body.style.background = "#B53737";  //set loss here 
  }
  final.disabled = true;
  display.innerText = underscore.join(" ").toUpperCase();
  finalForm.reset()
}
finalForm.addEventListener('submit', finalGuess);

function isValid(){
  const constriant = /[a-z]/g
  
  let guessVal = guess.value;
  if(!guessVal.match(constriant)){
    guess.setCustomValidity("Not valid input, please enter a-z")
  } else{
    guess.setCustomValidity("")
    console.log("pleasssse work")
  }
  
  let finalVal = final.value;
  if(!finalVal.match(constriant)){
    final.setCustomValidity("Not valid input, please enter a-z")
  } else{
    final.setCustomValidity("")
  }
}

window.onload = function(){
  final.onchange = isValid;
  guess.onchange = isValid;
}
