const game = new RockPaperScissors(3)

//Seleciona os botões
const btnRock = document.getElementById('rock')
const btnPaper = document.getElementById('paper')
const btnScissors = document.getElementById('scissors')
const btnStart = document.getElementById('start')
const btnReset = document.getElementById('reset')
const btnAudio = document.getElementById('audio')

//Seleciona áreas da pontuação e da escolha
const displayPlayerScore = document.querySelector('.player-score span')
const displayCpuScore = document.querySelector('.cpu-score span')
const displayPlayerChoice = document.querySelector('.player-choice')
const displayCpuChoice = document.querySelector('.cpu-choice')

// seleciona as mensagens de feedback
const userWon = document.querySelector('.user-won')
const cpuWon = document.querySelector('.cpu-won')
const tieGame = document.querySelector('.tie-game')
const endMessage = document.querySelector('.end-message')

// seleciona os audios
const bgAudio = document.getElementById('game-bg-audio')
const winAudio = document.getElementById('win-audio')
const loseAudio = document.getElementById('lose-audio')
const tieAudio = document.getElementById('tie-audio')
let audioActive = true

// configura volume dos audios
bgAudio.volume = 0.1
winAudio.volume = .15
loseAudio.volume = .15
tieAudio.volume = .15

//Habilita os botões de escolha
function startGame() {
    btnRock.removeAttribute('disabled')
    btnPaper.removeAttribute('disabled')
    btnScissors.removeAttribute('disabled')
    if (audioActive) {
      bgAudio.play()
    }
}

function displayChoiceImage(element, choice) {
  element.innerHTML = ''
  const image = document.createElement('img')
  image.setAttribute('alt', `${choice} icon`)
  image.setAttribute('src', `./assets/img/${choice}.svg`)
  element.appendChild(image)
}

function removeBlink() {
  displayPlayerChoice.classList.remove('animate-blink')
  displayCpuChoice.classList.remove('animate-blink')
}

function checkWinner() {
  if (game.roundWinner === 'player') {
    winAudio.currentTime = 0
    winAudio.play()
    displayPlayerChoice.classList.add('animate-blink')
  } else if (game.roundWinner === 'cpu') {
    loseAudio.currentTime = 0
    loseAudio.play()
    displayCpuChoice.classList.add('animate-blink')
  } else {
    tieAudio.play()
    displayPlayerChoice.classList.add('animate-blink')
    displayCpuChoice.classList.add('animate-blink')
  }


  if (game.checkGameOver()) {
    disableButtons()
    // exibindo a area das mensagens
    endMessage.style.display = 'block'
    // exibe a mensagem de vitoria se o player ganhar
    if(game.gameWinner === 'player') {
      userWon.style.display = 'block'
    } else if (game.gameWinner === 'cpu') {
      cpuWon.style.display = 'block'
    } else {
      tieGame.style.display = 'block'
    }
  }
}

//Desabilita os botões de escolha
function disableButtons() {
    btnRock.setAttribute('disabled', true)
    btnPaper.setAttribute('disabled', true)
    btnScissors.setAttribute('disabled', true)
}

//Função que inicia um novo round
function playGame(event) {
  removeBlink()
  const button = event.currentTarget
  const choice = button.getAttribute('id')
  const round = game.play(choice)

  displayChoiceImage(displayPlayerChoice, choice)
  displayChoiceImage(displayCpuChoice, round.cpuChoice)

  displayPlayerScore.innerHTML = round.playerPoints
  displayCpuScore.innerHTML = round.cpuPoints

  checkWinner()
}


//1. Ao clicar no botão start, habilita os botões de escolha
btnStart.onclick = startGame
btnReset.onclick = resetGame
//2. Ao clicar em um botão de escolha, inicia-se um round

function resetGame() {
  game.reset()
  endMessage.style.display = 'none'
  userWon.style.display = 'none'
  cpuWon.style.display = 'none'
  tieGame.style.display = 'none'
  displayPlayerScore.innerHTML = game.playerPoints
  displayCpuScore.innerHTML = game.cpuPoints
  removeBlink()
}

function changeAudio() {
  if (audioActive) {
    bgAudio.pause()
    audioActive = false
    btnAudio.innerHTML = 'Music Off'
  } else {
    bgAudio.play()
    audioActive = true
    btnAudio.innerHTML = 'Music On'
  }
}

btnStart.onclick = startGame
btnReset.onclick = resetGame
btnAudio.onclick = changeAudio
//Seleciona os botões de escolha
const choiceBtns = document.getElementsByClassName('choice-button')
for(let button of choiceBtns) {
    button.onclick = playGame
}
