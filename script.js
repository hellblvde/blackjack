let modalEl = document.getElementById("modal-el")

function closeModal() {
	modalEl.style.display = "none";
}

let cards = []
let allCards = [
  2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10,
  10, 11, 11, 11, 12, 12, 13, 13,
]

let sum = 0
let chips = 100
let bet = 0
let hasBlackJack = false
let isAlive = false
let processing = false
let message = ''

let messageEl = document.getElementById('message-el')
let sumEl = document.getElementById('sum-el')
let cardsEl = document.getElementById('cards-el')
function getBet() {
  bet = document.getElementById('bet-el').value
}
let player = {
  name: 'Ruslan',
  chips: chips,
}
let playerEl = document.getElementById('player-el')
playerEl.textContent = player.name + ': $' + player.chips

function getRandomCard() {
  let random = (Math.random() * allCards.length) | 0
  let randomNumber = allCards[random]
  if (randomNumber > 10) {
    return 10
  } else if (randomNumber === 1) {
    return 11
  } else {
    return randomNumber
  }
}

function startGame() {
  if (!processing) {
    if (player.chips > -1000 && player.chips - bet >= -1000) {
      if (bet >= 1) {
        isAlive = true
        hasBlackJack = false
        processing = true
        player.chips -= bet
        playerEl.textContent = player.name + ': $' + player.chips

        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        sum = firstCard + secondCard
        cards = [firstCard, secondCard]
        renderGame()
      } else {
        messageEl.textContent = 'Bet should be at least $1.'
      }
    } else {
      messageEl.textContent = "You don't have enough funds."
    }
  } else {
    messageEl.textContent = 'Finish the current game!'
  }
}

function renderGame() {
  cardsEl.textContent = 'Cards: '
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ' '
  }
  sumEl.textContent = 'Sum: ' + sum
  if (sum <= 20) {
    message = 'Do you want to draw a new card?'
  } else if (sum === 21) {
    message = "You've got the Blackjack!"
    hasBlackJack = true
    processing = false
    player.chips += Math.round(bet * 15)
    playerEl.textContent = player.name + ': $' + player.chips
  } else {
    message = "You're out of the game!"
    isAlive = false
    processing = false
    if (player.chips === 1) {
      player.chips -= 1
    }
    playerEl.textContent = player.name + ': $' + player.chips
  }
  messageEl.textContent = message
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let newCard = getRandomCard()
    cards.push(newCard)
    sum += newCard

    renderGame()
  }
}
