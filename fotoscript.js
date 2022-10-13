const images = document.querySelectorAll(".column img").length;

for (var i = 0; i < images ; i++) {
    document.querySelectorAll(".fotoImg")[i].addEventListener("click", function() {
        if(fotoPageOpened == false) {
          console.log( event.target.id );
          makePhotoGone(event.target.id);
        }
    });
}

columnCount = [];
function makePhotoGone(targetImage) {
  document.getElementById("fotoBackground").style.transform = "translate(-50%, -50%)";
  document.getElementById("row").style.pointerEvents = "none";
  document.getElementById("fotoAll").style.overflow = "hidden";



  nodes = document.getElementById('row').childNodes; //basically selects all columns
  for( ai=0; ai<nodes.length; ai++) {
    if (nodes[ai].nodeName.toLowerCase() == 'div') {
      columnCount.push(nodes[ai].getElementsByTagName("img").length); //keeps track of how many images in each column so I can put them back when the user exits photoPage mode 
      console.log(columnCount);
      imgFadeOutAnimation(ai); // applies effects with a delay, I know it's retarded
   }
  }
  
  document.getElementById("menuSlider").style.pointerEvents = "none";
  document.getElementById("menuSlider").style.opacity = "0";
  document.getElementById("fotoBackground").style.width = "120%";
  setTimeout(() => {
    document.getElementById("smallScreenOpenNav").style.transform = "none";
    document.getElementById("backButton").style.transform = "none";
  }, 500)


  setTimeout(() => {
    showFotoPageMode(targetImage);
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



function showFotoPageMode(targetImage) {
  for (var i = 1; i < images + 1; i++) { // this makes all images
    var fragment = document.createDocumentFragment(); // Declare a fragment -totally didn't steal this
    fragment.appendChild(document.getElementById(i)); // Append desired element to the fragment
    document.getElementById("fotoAllPage").appendChild(fragment); // Append fragment to desired element
    document.getElementById(i).classList = "fotoPage";
  }

  while(currentFotoPage != targetImage) {
    document.getElementById(currentFotoPage).style.left = "40%"; //moves currentFotoPage offscreen to the LEFT
    document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(69%)";
    currentFotoPage++;
    document.getElementById(currentFotoPage).style.left = "50%"; //moves NEXT image onscreen to the center
  }

  document.getElementById(targetImage).style.left = "50%"; //if I don't do this the first images bugs 

  setTimeout(() => { // actually shows the image you clicked on
    document.getElementById(targetImage).style.opacity = "1";
    document.getElementById(targetImage).style.transform = "translate(-50%, -50%) scale(100%)";
  }, 100)
  setTimeout(() => { // this is to avoid controls before the image has appeared and transition animation has finished
    fotoPageOpened = true;
  }, 520)
}













function movePic(direction) {
  if (currentFotoPage==images && direction=="right" || currentFotoPage==1 && direction=="left") { // idk why I need to check if the direction is actually left/right 
    console.log("sugmaballs - " + direction); //    ^ = OR
    return;
  }

  else {
    switch(direction) {
      case "right":
        document.getElementById(currentFotoPage).style.left = "40%"; //moves currentFotoPage to the LEFT
        document.getElementById(currentFotoPage).style.opacity = "0";
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(69%)";
        currentFotoPage++;
        document.getElementById(currentFotoPage).style.left = "50%"; //moves NEXT image to the center
        document.getElementById(currentFotoPage).style.opacity = "1";
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(100%)";
        break;
      
      case "left":
        document.getElementById(currentFotoPage).style.left = "60%"; //moves currentFotoPage to the RIGHT
        document.getElementById(currentFotoPage).style.opacity = "0"; 
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(69%)";
        currentFotoPage--;
        document.getElementById(currentFotoPage).style.opacity = "1";
        document.getElementById(currentFotoPage).style.left = "50%"; //moves PREVIOUS image to the center
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