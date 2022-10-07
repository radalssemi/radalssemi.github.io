const images = document.querySelectorAll(".column img").length;

for (var i = 0; i < images ; i++) {
    document.querySelectorAll(".fotoImg")[i].addEventListener("click", function() {
        if(fotoPageOpened == false) {
          console.log( event.target.id );
          switchPhotoMode(event.target.id);
        }
    });
}



function switchPhotoMode(targetImage) {

  document.getElementById("fotoBackground").style.transform = "translate(-50%, -50%)";
  document.getElementById("row").style.pointerEvents = "none";

  nodes = document.getElementById('row').childNodes; //basically selects all columns
  for( ai=0; ai<nodes.length; ai++) {
    if (nodes[ai].nodeName.toLowerCase() == 'div') {
      imgFadeOutAnimation(ai); // applies effects with a delay, I know it's retarded
   }
  }

  setTimeout(() => {
    showOtherFuckingThing(targetImage);
  }, 750)
}

function imgFadeOutAnimation(ai) { // applies effects with a delay, I know it's retarded, I need to do this because ai var is not the same in 50ms
  setTimeout(function() {
    nodes[ai].style.opacity = "0";
    nodes[ai].style.transform = "translateY(100px)";
  }, 50 * ai);
}






currentFotoPage = 1;
fotoPageOpened = false;



function showOtherFuckingThing(targetImage) {

  for (var i = 1; i < images + 1; i++) { // this makes all images
    var fragment = document.createDocumentFragment(); // Declare a fragment -totally didn't steal this
    fragment.appendChild(document.getElementById(i)); // Append desired element to the fragment
    document.getElementById("fotoAllPage").appendChild(fragment); // Append fragment to desired element

    document.getElementById(i).classList = "fotoPage";
  }

  while(currentFotoPage != targetImage) {
    document.getElementById(currentFotoPage).style.left = "40%"; //moves currentFotoPage offscreen to the LEFT
    document.getElementById(currentFotoPage).style.transform = "translate(-50%, -40%) scale(69%) rotate(-15deg)";
    currentFotoPage++;
    document.getElementById(currentFotoPage).style.left = "50%"; //moves NEXT image onscreen to the center
  }
  document.getElementById(targetImage).style.transform = "translate(-50%, -50%) scale(69%)";

  // document.getElementById("1").style.left = "50%";
  // setTimeout(() => {
  //   document.getElementById("1").style.opacity = "1"; 
  //   document.getElementById("1").style.transform = "translate(-50%, -50%) scale(100%)";
  // }, 200)
  setTimeout(() => {
    document.getElementById(targetImage).style.opacity = "1";
    document.getElementById(target).style.transform = "translate(-50%, -50%) scale(100%)";
  }, 100)
  setTimeout(() => {
    fotoPageOpened = true;
  }, 620)
}













function movePic(direction) {
  if (currentFotoPage==images && direction=="right" || currentFotoPage==1 && direction=="left") {
    console.log("sugmaballs - " + direction);
    return;
  }

  else {
    switch(direction) {
      case "right":
        document.getElementById(currentFotoPage).style.left = "40%"; //moves currentFotoPage offscreen to the LEFT
        document.getElementById(currentFotoPage).style.opacity = "0";
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -40%) scale(69%) rotate(-10deg)";
        currentFotoPage++;
        document.getElementById(currentFotoPage).style.left = "50%"; //moves NEXT image onscreen to the center
        document.getElementById(currentFotoPage).style.opacity = "1";
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(100%)";
        break;
      
      case "left":
        document.getElementById(currentFotoPage).style.left = "60%"; //moves currentFotoPage to the RIGHT
        document.getElementById(currentFotoPage).style.opacity = "0"; 
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -60%) scale(131%) rotate(10deg)";
        currentFotoPage--;
        document.getElementById(currentFotoPage).style.opacity = "1";
        document.getElementById(currentFotoPage).style.left = "50%"; //moves PREVIOUS image onscreen to the center
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(100%)";
        break;
    }
  }
}








// detects left/right arrow keyes so you can cycle through photos with them
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '37' && fotoPageOpened == true) {     // left arrow
    movePic("left");
  }
  else if (e.keyCode == '39' && fotoPageOpened == true) {     // right arrow
    movePic("right");
  }
}