const images = document.querySelectorAll(".column img").length;

for (var i = 0; i < images ; i++) {
    document.querySelectorAll(".column img")[i].addEventListener("click", function() {
        console.log( event.target.id );
        switchPhotoMode(event.target.id);
    });
}



function switchPhotoMode(targetImage) {
  document.getElementById("fotoBackground").style.transform = "translate(-50%, -50%)";
  document.getElementById("row").style.pointerEvents = "none";

  nodes = document.getElementById('row').childNodes; //basically selects all columns
  for( ai=0; ai<nodes.length; ai++) {
    if (nodes[ai].nodeName.toLowerCase() == 'div') {
      imgFadeOutAnimation(ai);
   }
  }




  setTimeout(() => {
    showOtherFuckingThing(targetImage);
  }, 750)
}

function imgFadeOutAnimation(ai) { //applies effects with a delay, I know it's retarded
  setTimeout(function() {
    nodes[ai].style.opacity = "0";
    nodes[ai].style.transform = "translateY(100px)";
  }, 50 * ai);
}










function showOtherFuckingThing(targetImage) {
  for (var i = 1; i < images + 1; i++) {
    var fragment = document.createDocumentFragment(); // Declare a fragment -totally didn't steal this
    fragment.appendChild(document.getElementById(i)); // Append desired element to the fragment
    document.getElementById("fotoAllPage").appendChild(fragment); // Append fragment to desired element


    document.getElementById(i).classList = "fotoPage";
    setTimeout(() => {
      document.getElementById(i).style.opacity = "1";
      document.getElementById(i).style.transform = "translate(-50%, -50%) scale(100%)";
    }, 20)
  }
}


















































function moveLeft() { //I had to reuse this garbage code cause I didn't have time
  if (pic==64) {
    //do nothing
  }
  else {

    bgPicPos = bgPicPos - 5;
    bgPos = bgNavPos + bgPicPos;
    
    document.getElementById("bgdots").style.left = bgPos+ "%";


    document.getElementById("photo" + pic).style.left = "-150%"; //moves pic offscreen to the left

    var pDiv = document.getElementById("dcontainer"); 
    var cDiv = pDiv.children;
    for (var i = 0; i < cDiv.length; i++) {
      if (cDiv[i].tagName == "DIV") {      //allows me to change style of children
         cDiv[i].style.height = "15px";  
         cDiv[i].style.width = "15px";
         cDiv[i].style.backgroundColor = "#729394";
         cDiv[i].style.fontSize = "0%";
      }
    }
    

    pic = pic + 1; //increases the id of the picture to move
    document.getElementById("photo" + pic).style.left = "50%"; //moves pic to the middle of the screen

    setTimeout(() => {
      doDot();
    }, 200)
  }
}

function moveLeft() {
  if (pic==1) {
    //do nothing
  }
  else {

    bgPicPos = bgPicPos + 5;
    bgPos = bgNavPos + bgPicPos;

    document.getElementById("bgdots").style.left = bgPos+ "%";


    document.getElementById("photo" + pic).style.left = "150%"; //moves pic offscreen to the right

    var pDiv = document.getElementById("dcontainer"); 
    var cDiv = pDiv.children;
    for (var i = 0; i < cDiv.length; i++) {
      if (cDiv[i].tagName == "DIV") {      //allows me to change style and resetS children
         cDiv[i].style.height = "15px";  
         cDiv[i].style.width = "15px";
         cDiv[i].style.backgroundColor = "#729394";
         cDiv[i].style.fontSize = "0%";
      }
    }


    pic = pic - 1;  //decreases the id of the picture to move
    document.getElementById("photo" + pic).style.left = "50%";  //moves pic to the middle of the screen

    setTimeout(() => {
      doDot();
    }, 200)
  }
}



function doDot() {
  document.getElementById("dot" + pic).style.height = "30px"; //dots at bottom
  document.getElementById("dot" + pic).style.width = "30px";
  document.getElementById("dot" + pic).style.backgroundColor = "#B3E8CD";
  document.getElementById("dot" + pic).style.fontSize = "55%";
}



function dotClick(self) { 
  var number = self.innerHTML; //asks itself what the inner html of the div is, the number is always there, it's just scaled down infinitely
  if (number < pic) { //if the desired location is smaller than current location (doesn't do anything if it's the same)\/
    while (number != pic) { //continue moving left till you reach destination (till value of dot pressed is equal to current picture)
      moveLeft();
    }
  }
  else {
    while (number != pic) { //continue moving right till you reach destination (till value of dot pressed is equal to current picture)
      moveRight();
    }
  }
}



 //detects left/right arrow keyes so you can cycle through photos with them
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

     if (e.keyCode == '37') {
    //   moveLeft();

       // left arrow
    }
    else if (e.keyCode == '39') {
    //   moveRight();

       // right arrow
    }
}