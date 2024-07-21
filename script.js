const addNewCardBtn = document.getElementById('add-new-card');
const clearCardsBtn = document.getElementById('clear-cards');
const addCardBtn = document.getElementById('add-card');
const form = document.querySelector('form');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const cardSection = document.querySelector('.card-section');
const arrows = document.querySelector('.arrows');
const arrowLeft = document.querySelector('.icon1');
const arrowRight = document.querySelector('.icon2');
const cardNumber = document.querySelector('.counter');

//The current card which is rendering in the screen
let currentCard = 1;
let counter = 0;
//the array of data which we render from it and store it in localstorage
let Data = [];

//render current counter and data from local storage if exist
function renderFromLocalStorage() {
  Data = JSON.parse(localStorage.getItem('storedData'));
  counter = localStorage.getItem('counterOfCard');
  if (!Data) {
    Data = [];
  }
  if (!counter) {
    counter = 0;
  }
  renderCard();
}

renderFromLocalStorage();

//Dispaly Add card Section
function displayAddCardSection() {
  form.classList.add('show');
  addNewCardBtn.style.display = 'none';
  cardSection.classList.add('hide');
}

//Add Card by collect data from user and store it in data arary
function addCard(event) {
  event.preventDefault();
  if (!question.value.trim || !answer.value.trim()) {
    alert('Invalid Values');
    return;
  }
  counter++;
  Data.push({
    id: counter,
    Question: question.value,
    Answer: answer.value,
  });
  localStorage.setItem('storedData', JSON.stringify(Data));
  localStorage.setItem('counterOfCard', counter);
  cardSection.classList.add('hide');
  renderCard();
}

//Here we render card using card id which is stored in data array
//and render arrows and display flips btns
function renderCard(cardId) {
  cardSection.classList.remove('hide');
  if (!cardId) {
    cardId = 1;
  }
  cardSection.innerHTML = ``;
  Data.find((card) => {
    if (card.id === cardId) {
      const newCard = document.createElement('div');
      newCard.classList.add('card');
      newCard.innerHTML = `
            <div class="front"><p>${card.Question}</p>
           <button class='flib-btn' id='flib-btn'><i class="fa-solid fa-arrows-rotate"></i> Flib</button>
           </div>
           <div class="back">
           <p>${card.Answer}</p>
            <button class='flib-btn' id='flib-btn'><i class="fa-solid fa-arrows-rotate"></i> Flib</button>
           </div>
        `;
      cardNumber.textContent = `${cardId}/${Data.length}`;
      arrows.style.display = 'flex';
      addNewCardBtn.style.display = 'block';
      cardSection.appendChild(newCard);
      const AllflibsBtns = document.querySelectorAll('.flib-btn');
      AllflibsBtns.forEach((flibBtn) => {
        flibBtn.addEventListener('click', () =>
          newCard.classList.toggle('flib')
        );
      });
      form.classList.remove('show');
      arrows.style.visibility = 'visible';
    }
  });
}

//Here we check the direction of arrow which is clicked and then slip to next or prev
//and update DOM by renderCard
function arrowsHandler(direction) {
  if (direction === 'left') {
    console.log(direction);
    currentCard--;
    if (currentCard < 1) {
      currentCard = 1;
    }
    cardSection.classList.add('transform-left');
    setTimeout(() => cardSection.classList.remove('transform-left'), 100);
    renderCard(currentCard);
    console.log('Current Card:', currentCard);
    console.log('Data:', Data);
  } else if (direction === 'right') {
    currentCard++;
    if (currentCard > Data.length) {
      currentCard = Data.length;
    }
    cardSection.classList.add('transform-right');
    setTimeout(() => cardSection.classList.remove('transform-right'), 100);
    renderCard(currentCard);
    console.log('Current Card:', currentCard);
    console.log('Data:', Data);
  }
}

//Here we clear DOM and Data Array and Counter and LocalStorage from any data
function clear() {
  Data = [];
  cardSection.innerHTML = ``;
  counter = 0;
  currentCard = 1;
  arrows.style.visibility = 'hidden';
  localStorage.removeItem('counterOfCard');
  localStorage.removeItem('storeData');
}

//Event Listeners
addNewCardBtn.addEventListener('click', displayAddCardSection);
form.addEventListener('submit', addCard);
arrowLeft.addEventListener('click', arrowsHandler.bind(this, 'left'));
arrowRight.addEventListener('click', arrowsHandler.bind(this, 'right'));
clearCardsBtn.addEventListener('click', clear);
