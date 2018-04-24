// list of query selectors
const strictBtn = document.getElementById('strict-btn');
const startBtn = document.getElementById('start-btn');
const isStrictLamp = document.getElementById('is-strict');
const greenField = document.getElementById('green');
const redField = document.getElementById('red');
const blueField = document.getElementById('blue');
const yellowField = document.getElementById('yellow');
const countDisplay = document.getElementById('count');
const infoField = document.getElementById('info-field');
const colourFields = document.getElementsByClassName('quarter');

const greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
const yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');

let isStrictEnabled = false;
let isGameRunning = false;
let isPlayersTurn = false;
let plays = [];
let playerClicked = [];
let counter = 0;

let colours = ['green', 'red', 'blue', 'yellow'];

const getRandInt = () => Math.floor(Math.random() * 4);

const updateInfo = (str) => {
  infoField.innerHTML = str;
}

const fieldActive = (colour) => {
  if (colour === 'green') {
    greenField.classList.add('active');
    greenSound.load();
    greenSound.play();
  } else if (colour === 'red') {
    redField.classList.add('active');
    redSound.load();
    redSound.play();
  } else if (colour === 'blue') {
    blueField.classList.add('active');
    blueSound.load();
    blueSound.play();
  } else {
    yellowField.classList.add('active');
    yellowSound.load();
    yellowSound.play();
  };
};

const winningAnimation = () => {
  colours.forEach((colour, i) => {
    setTimeout(() => {
      fieldActive(colour);
    }, 400 + 800 * i);
    setTimeout(() => {
      removeAllActive();
    }, 1200 + 800 * i);
    setTimeout(() => {
      fieldActive(colour);
    }, 5000);
    setTimeout(() => {
      removeAllActive();
    }, 5400);
  });
}

const removeAllActive = () => {
  greenField.classList.remove('active');
  redField.classList.remove('active');
  blueField.classList.remove('active');
  yellowField.classList.remove('active');
}

const displayColourSequence = () => {
  updateInfo('Playing colour sequence...');
  isPlayersTurn = false;
  plays.forEach((play, i) => {
    setTimeout(() => {
      removeAllActive();
      fieldActive(play);
      if (i === plays.length - 1) {
        setTimeout(() => {
          removeAllActive();
          isPlayersTurn = true;
          updateInfo('Your turn!');
        }, 800);
      };
    }, 800 * i);
  });
};

const checkPlayerClick = () => {
  if (playerClicked[playerClicked.length - 1] !== plays[playerClicked.length - 1] && isStrictEnabled && isPlayersTurn) {
    updateInfo('Wanna try again?');
    resetAll();
    isGameRunning = false;
  } else if (playerClicked[playerClicked.length - 1] !== plays[playerClicked.length - 1] && !isStrictEnabled && isPlayersTurn) {
    updateInfo('Try again!');
    playerClicked = [];
    setTimeout(() => {
      displayColourSequence();
    }, 800);
  } else if (playerClicked.length === plays.length && isPlayersTurn && plays.length !== 20) {
    updateInfo('Good job!');
    playerClicked = [];
    plays.push(colours[getRandInt()]);
    updateCounterDisplay();
    setTimeout(() => { displayColourSequence() }, 800);
  } else if (playerClicked.length === plays.length && isPlayersTurn && plays.length === 20) {
    updateInfo('Good job, you made it!');
    resetAll();
    isGameRunning = false;
    winningAnimation();
  }
};

const resetAll = () => {
  plays = [];
  playerClicked = [];
  counter = 0;
  countDisplay.innerText = '--';
  startBtn.innerText = 'Start';
};

const updateCounterDisplay = () => {
  counter++;
  countDisplay.innerText = counter < 10 ? `0${counter}` : counter;
}

greenField.addEventListener('mousedown', () => {
  fieldActive('green');
  setTimeout(() => {
    greenField.classList.remove('active');
  }, 250);
  if (isPlayersTurn) {
    playerClicked.push('green');
    checkPlayerClick();
  };
});

redField.addEventListener('mousedown', () => {
  fieldActive('red');
  setTimeout(() => {
    redField.classList.remove('active');
  }, 250);
  if (isPlayersTurn) {
    playerClicked.push('red');
    checkPlayerClick();
  };
});

blueField.addEventListener('mousedown', () => {
  fieldActive('blue');
  setTimeout(() => {
    blueField.classList.remove('active');
  }, 250);
  if (isPlayersTurn) {
    playerClicked.push('blue');
    checkPlayerClick();
  };
});

yellowField.addEventListener('mousedown', () => {
  fieldActive('yellow');
  setTimeout(() => {
    yellowField.classList.remove('active');
  }, 250);
  if (isPlayersTurn) {
    playerClicked.push('yellow');
    checkPlayerClick();
  };
});

strictBtn.addEventListener('click', () => {
  if (isStrictEnabled) {
    isStrictLamp.classList.remove('strict-mode-active');
  } else {
    isStrictLamp.classList.add('strict-mode-active');
  }
  isStrictEnabled = !isStrictEnabled;
});

startBtn.addEventListener('click', () => {
  if (!isGameRunning) {
    plays.push(colours[getRandInt()]);
    updateCounterDisplay();
    startBtn.innerText = 'Quit Game';
    updateInfo('Let\'s go!');
    displayColourSequence();
  } else {
    updateInfo('You quit the game!');
    resetAll();
  };
  isGameRunning = !isGameRunning;
});
