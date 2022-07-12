let sum = 0
let bill = 0
let bet = 0
let hasBlackJack = false
let isAlive = false
let processing = false
let message = ''

let cards = []
let allCards = [
  2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10,
  10, 11, 12, 13,
]

let messageEl = document.getElementById('message-el')
let sumEl = document.getElementById('sum-el')
let cardsEl = document.getElementById('cards-el')
let modalEl = document.getElementById("modal-el")
let playerEl = document.getElementById('player-el')
let errorEl = document.getElementById('error-el')
let playerName = ''
let player = {
  name:  playerName,
  bill: bill,
}

function closeModal() {
  playerName = document.getElementById('name-el').value
  bill = document.getElementById('bill-el').value
  if (playerName != '') {
    if (bill > 0) {
      if (bill < 100000) {
        modalEl.style.display = "none"
        player.name = playerName
        player.bill = bill
        playerEl.textContent = player.name + ': $' + player.bill
      } else {
        errorEl.textContent = "Your bill can not be so big. You probably steal it. I'm calling police!"
      }
    } else {
      errorEl.textContent = "Your bill is empty. Get out!"
    }
  } else {
    errorEl.textContent = "Please fill the name field"
  }
}

function getBet() {
  bet = document.getElementById('bet-el').value
}

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
    if (player.bill > -1000 && player.bill - bet >= -1000) {
      if (bet >= 1) {
        isAlive = true
        hasBlackJack = false
        processing = true
        player.bill -= bet
        playerEl.textContent = player.name + ': $' + player.bill

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
    player.bill += Math.round(bet * 15)
    playerEl.textContent = player.name + ': $' + player.bill
  } else {
    message = "You're out of the game!"
    isAlive = false
    processing = false
    if (player.bill === 1) {
      player.bill -= 1
    }
    playerEl.textContent = player.name + ': $' + player.bill
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
