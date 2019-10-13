const body = document.querySelector("body");

const IMG_NUMBER = 11;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
  // image.addEventListener("loadend", handleImgLoad);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNum = genRandom();
  paintImage(randomNum);
}

init();
