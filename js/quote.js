const quote = document.querySelector(".js-quote");

const quotesList = [
  "Choose joy.",
  "Where your focus goes, your energy flows.",
  "Live what you love.",
  "Enjoy the process.",
  "Judge less, accept more.",
  "Ride the waves.",
  "Trust the process.",
  "Do the things you love.",
  "Follow your soul.",
  "Inhale confidence, exhale doubt.",
  "Never give up!",
  "It’s never too late.",
  "You are creative.",
  "Rise above.",
  "Begin.",
  "Be present."
];

const QUO_NUM = quotesList.length;

function paintQuote(randomNum) {
  quote.innerText = `"${quotesList[randomNum]}"`;
}

function genRandom() {
  const num = Math.floor(Math.random() * QUO_NUM);
  return num;
}

function init() {
  const randomNum = genRandom();
  paintQuote(randomNum);
}

init();
