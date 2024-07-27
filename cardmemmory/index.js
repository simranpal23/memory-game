const emojis = ["😊", "😊", "💔", "💔", "😂", "😂", "😵", "😵", "💘", "💘", "😘", "😘", "🤯", "🤯", "😜", "😜"];
let score = 0;
let steps = 0;
let gameStarted = false;

function updateScore() {
  document.getElementById('score').textContent = score;
}

function updateSteps() {
  document.getElementById('step-count').textContent = steps;
}

function resetGame() {
  document.querySelector('.game').innerHTML = '';
  score = 0;
  steps = 0;
  updateScore();
  updateSteps();
  shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 1 : -1);
  createBoard();
  gameStarted = false; 
  document.querySelector('.reset-button').textContent = 'Start'; 
}

function createBoard() {
  for (var i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuf_emojis[i];

    box.onclick = function () {
      if (!gameStarted) {
        gameStarted = true;
        document.querySelector('.reset-button').textContent = 'Reset';
      }
      if (!this.classList.contains('boxOpen') && !this.classList.contains('boxMatch')) {
        this.classList.add('boxOpen');
        setTimeout(function () {
          let openBoxes = document.querySelectorAll('.boxOpen');
          if (openBoxes.length > 1) {
            steps++;
            updateSteps();
            if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
              openBoxes[0].classList.add('boxMatch');
              openBoxes[1].classList.add('boxMatch');
              openBoxes[0].classList.remove('boxOpen');
              openBoxes[1].classList.remove('boxOpen');
              score++;
              updateScore();

              if (document.querySelectorAll('.boxMatch').length === emojis.length) {
                alert('You win!');
              }
            } else {
              openBoxes[0].classList.remove('boxOpen');
              openBoxes[1].classList.remove('boxOpen');
            }
          }
        }, 500);
      }
    }
    document.querySelector('.game').appendChild(box);
  }
}
document.querySelector('.reset-button').addEventListener('click', function() {
  resetGame();
});


resetGame();

