function randomIntFromInterval(min, max) { // radom int between two numbers
  return Math.floor(Math.random() * (max - min + 1) + min)
}





// these for loops add event listeners on all download buttons and images to call function to apply a random rotation
// const images = document.querySelectorAll(".images img").length;
for (var i = 0; i < 4 ; i++) {
  document.querySelectorAll(".postDownload")[i].addEventListener("mouseover", function() {
    randomRotate(this, true); // it is checked if input #2 is true to see if it's the download button to have a larger range for random number. it looks kinda bad when the images rotate a lot but it also looks kinda bad when the download button doesn't rotate enough
  });
}
for (var i = 0; i < 4 ; i++) {
  document.querySelectorAll(".postDownload")[i].addEventListener("mouseout", function() {
    unRotate(this);
  });
}

const images = document.querySelectorAll(".images img").length;
for (var i = 0; i < images ; i++) {
  document.querySelectorAll("div.images img")[i].addEventListener("mouseover", function() {
    randomRotate(this);
  });
}
for (var i = 0; i < images ; i++) {
  document.querySelectorAll("div.images img")[i].addEventListener("mouseout", function() {
    unRotate(this);
  });
}





//hover effect for random rotation
function randomRotate(element, isDownloadButton) {
  if(isDownloadButton == true) {
    element.style.rotate = randomIntFromInterval(-2, 2) + "deg";
  }
  else {
    element.style.rotate = randomIntFromInterval(-1, 1) + "deg";
  }
}
function unRotate(element) {
  element.style.rotate = "0deg";
}