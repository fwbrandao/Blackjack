//
// Blackjack
// by Fernando Brandao
//

// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack', 
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two'];

// DOM variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button'),
    resetButton = document.getElementById('reset-button'),
    dealerFistCard = document.getElementById('dealerFistCard'),
    dealerSecondCard = document.getElementById('dealerSecondCard'),
    playerFirstCard = document.getElementById('playerFirstCard'),
    playerSecondCard = document.getElementById('playerSecondCard');

    


// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    totalPlayerScore = 0,
    totalDealerScore = 0,
    badgeScorePlayer = 0,
    badgeScoreDealer = 0;
    
    deck = [];


dealerFistCard.style.display = 'none';
dealerSecondCard.style.display = 'none';

playerFistCard.style.display = 'none';
playerSecondCard.style.display = 'none';


hitButton.style.display = 'none';
stayButton.style.display = 'none';
resetButton.style.display = 'none';
showStatus();
  
newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];

    dealerFistCard.style.display = 'none';
    dealerSecondCard.style.display = 'none';
    
    playerFistCard.style.display = 'none';
    playerSecondCard.style.display = 'none';
    
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    resetButton.style.display = 'inline';
    showStatus();
    
    
});

resetButton.addEventListener('click',function(){
    totalPlayerScore = 0;
    totalDealerScore = 0;
    document.getElementById('badgeScorePlayer').innerHTML = 0;
    document.getElementById('badgeScoreDealer').innerHTML = 0;
    
    dealerFistCard.style.display = 'none';
    dealerSecondCard.style.display = 'none';

    playerFistCard.style.display = 'none';
    playerSecondCard.style.display = 'none';

    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    resetButton.style.display = 'none';
    showStatus();
});

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function() {
    
    dealerFistCard.style.display = 'none';
    dealerSecondCard.style.display = 'none';
    
    playerFistCard.style.display = 'none';
    playerSecondCard.style.display = 'none';
 
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});


function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push( card );
        }
    }
    return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five': 
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}


function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}


function checkForEndOfGame() {
  
  updateScores();
  

  if (gameOver) {
    // let dealer take cards
    while(dealerScore < playerScore 
          && playerScore <= 21 
          && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
    
  if ( playerScore === 21){
      alert("21 points - BLACKJACK!!!!!! - you Win");
      playerWon = true;
      gameOver = true; 
      totalPlayerScore = totalPlayerScore + 1;
document.getElementById('badgeScorePlayer').innerHTML = totalPlayerScore ;
  } 
    
    
  else if (dealerScore === 21){
      alert("Dealer's - BLACKJACK!!!!!! - you Lost");
      playerWon = false;
      gameOver = true;
      totalDealerScore = totalDealerScore + 1;
      badgeScoreDealer = badgeScoreDealer + 1;
document.getElementById('badgeScoreDealer').innerHTML = totalDealerScore;
  }
  else if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
    totalDealerScore = totalDealerScore + 1;
    badgeScoreDealer = badgeScoreDealer + 1;
document.getElementById('badgeScoreDealer').innerHTML = totalDealerScore;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
    totalPlayerScore = totalPlayerScore + 1;
    badgeScorePlayer = badgeScorePlayer + 1;
document.getElementById('badgeScorePlayer').innerHTML = totalPlayerScore;
  }
  else if (gameOver) {
    
    if (playerScore > dealerScore) {
      playerWon = true;
      totalPlayerScore = totalPlayerScore + 1;
      badgeScorePlayer = badgeScorePlayer + 1;
document.getElementById('badgeScorePlayer').innerHTML = totalPlayerScore;
    }
    else {
      playerWon = false;
      totalDealerScore = totalDealerScore + 1;
      badgeScoreDealer = badgeScoreDealer + 1;
document.getElementById('badgeScoreDealer').innerHTML = totalDealerScore;
    }
  }
    return playerWon;
}



function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();

    
   
  textArea.innerText = 
    'Dealer has:\n' +
    dealerCardString + 
    '(score: '+ dealerScore  + ')\n\n' +
      
    
    'Player has:\n' +
    playerCardString +
    '(score: ' + playerScore  + ')\n\n' ;
  
  if (gameOver) {
    if (playerWon) {
      textArea.innerHTML+=" <button style='color:green; font-weight: bold; margin:5px; font-size: 35px;'> YOU WIN</button>";
    }
    else {
      textArea.innerHTML+=" <button style='color:red; font-weight: bold; margin:5px; font-size: 35px;'>  BUST</button>";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }
       
 }









