// Game Variables
let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;
let matched = 0;
let attempts = 4;

// Чтобы рандомно каждый раз стояли карточки
function shuffle() {
  cardArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomIndex;
    card.children[1].style.backgroundImage = `url(${card.getAttribute(
      "data-image"
    )})`;
  });
}
// Чтобы переворачивались карточки
function flipCard() {
  if (lockCard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!flippedCard) {
    // first card flipped
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Проверка на совпадение
function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unflipCards();
}

// Если совпали
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matched = matched + 1;
  if  (matched  == 6 ) {
      alert('win');
  }
  console.log(matched);
  resetBoard();
}

// Если не совпали
function unflipCards() {
  lockCard = true;
  attempts = attempts - 1;
  if (attempts == 0){
    alert('lose')
  }
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Перезагрузка
function resetBoard() {
  [flippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Начать игру
function startGame() {
  shuffle();
  cards.forEach((card) => card.addEventListener("click", flipCard));
  
}

startGame();

