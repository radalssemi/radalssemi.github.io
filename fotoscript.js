const images = document.querySelectorAll(".column img").length -1; //I remove one cause it's the download icon
currentFotoPage = 1;
fotoPageOpened = false;
whichArrow = "none";
columnCount = []; //idk what happened, I had these vars in a place where they were relevant but then it just stopped working and was saying that it's not declared /shrug


for (var i = 0; i < images ; i++) {
    document.querySelectorAll(".fotoImg")[i].addEventListener("click", function() {
        if(fotoPageOpened == false) {
          // console.log( event.target.id );
          makePhotoGone(event.target.id);
        }
    });
}

function makePhotoGone(targetImage) {
  columnCount = []; //reset vars
  currentFotoPage = 1;

  document.getElementById("fotoBackground").style.transform = "translate(-50%, -50%)";
  document.getElementById("row").style.pointerEvents = "none";
  document.getElementById("fotoAll").style.overflowY = "hidden";
  document.getElementById("menuSlider").style.pointerEvents = "none";
  document.getElementById("menuSlider").style.translate = "-100%";
  document.getElementById("fotoBackground").style.width = "100%";

  
  nodes = document.getElementById('row').childNodes; // basically select all columns
  for( j=0; j<nodes.length; j++) {
    if (nodes[j].nodeName.toLowerCase() == 'div') {
      columnCount.push(nodes[j].getElementsByTagName("img").length); //keeps track of how many images in each column so I can put them back when the user exits photoPage mode 
      // console.log(columnCount);
      imgFadeOutAnimation(j); // applies effects with a delay, I know it's r
   }
  }

  setTimeout(() => {
    document.getElementById("smallScreenOpenNav").style.transform = "none";
    document.getElementById("closePageButton").style.transform = "none";
    document.getElementById("fotoPageLeftRight").style.transform = "translate(-50%, 0)";
  }, 500)

  setTimeout(() => {
    showFotoPageMode(targetImage);
  }, 600)
}

function imgFadeOutAnimation(j) { // applies effects with a delay, I know it's retarded, I need to do this because j var is not the same in 50ms
  setTimeout(function() {
    nodes[j].style.opacity = "0";
    nodes[j].style.transform = "translateY(100px)";
  }, 50 * j);
}




function imgFadeInAnimation(i) { // applies effects with a delay, I know it's retarded, I need to do this because j var is not the same in 50ms
  setTimeout(function() {
    document.getElementById("column" + i).style.opacity = "1";
    document.getElementById("column" + i).style.transform = "none";
  }, 50 * i);
}













function showFotoPageMode(targetImage) {
  for (var i = 1; i < images + 1; i++) { // this makes all images - ??????
    var fragment = document.createDocumentFragment(); // Declare a fragment -totally didn't steal this
    fragment.appendChild(document.getElementById(i)); // Append desired element to the fragment
    document.getElementById("fotoAllPage").appendChild(fragment); // Append fragment to desired element
    document.getElementById(i).classList = "fotoPage";
  }

  while(currentFotoPage != targetImage) { // I don't use the function movePic("right") cause it would make it appear without transition and I'm too lazy to fix it
    document.getElementById(currentFotoPage).style.left = "40%"; 
    document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(69%)";
    currentFotoPage++;
    document.getElementById(currentFotoPage).style.left = "50%";
  }

  document.getElementById(targetImage).style.left = "50%"; //if I don't do this the first images bugs 

  setTimeout(() => { // actually shows the image you clicked on
    document.getElementById(targetImage).style.opacity = "1";
    document.getElementById(targetImage).style.transform = "translate(-50%, -50%) scale(100%)";
  }, 100)
  setTimeout(() => { // this is to avoid controls before the image has appeared and transition animation has finished
    fotoPageOpened = true;
  }, 450)
}





function closePageMode() {
  fotoPageOpened = false;
  document.getElementById("borblur").style.pointerEvents = "none"; // I disable pointerEvents to borblur so you can't fuck with the images during transition
  document.getElementById("smallScreenOpenNav").removeAttribute('style');
  document.getElementById("closePageButton").removeAttribute('style');
  document.getElementById("fotoPageLeftRight").removeAttribute('style');
  document.getElementById(currentFotoPage).style.opacity = "0";
  document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(69%)";

  setTimeout(() => {
    document.getElementById("fotoBackground").removeAttribute('style');
    document.getElementById("menuSlider").removeAttribute('style');
  }, 300)


  setTimeout(() => {
    for (var i = 1; i != 5; i++) {
      imgFadeInAnimation(i); 
    }

    document.getElementById("borblur").style.pointerEvents = "all"; //enable controls for thingsfadjkhslhlhlhlhlhlhlhlhlh
    document.getElementById("row").style.pointerEvents = "all";
    document.getElementById("fotoAll").style.overflowY = "scroll";







    function putImageIntoColumn(whichImage, whichColumn) { // definitely not borrowed from the internet
      var fragment = document.createDocumentFragment(); // Declare a fragment 
      fragment.appendChild(document.getElementById(whichImage)); // Append desired element to the fragment 
      document.getElementById("column" + whichColumn).appendChild(fragment); // Append fragment to desired element
      document.getElementById(i).removeAttribute('class');
      document.getElementById(i).removeAttribute('style');
    }



    for (var i = 1; i <= columnCount[0] -1; i++) { // puts images back into columns | I had to do some retarded shit I doN't even know how to explain to get it to work with the download icon - it still throws an error but it works
      putImageIntoColumn(i, 1);
    }
    for (var i = columnCount[0]; i <= columnCount[0] + columnCount[1]; i++) { // puts images back into columns
      putImageIntoColumn(i, 2);
    }
    for (var i = columnCount[0] + columnCount[1]; i <= columnCount[0] + columnCount[1] + columnCount[2]; i++) { // puts images back into columns
      putImageIntoColumn(i, 3);
    }
    for (var i = columnCount[0] + columnCount[1] + columnCount[2]; i <= columnCount[0] - 1 + columnCount[1] + columnCount[2] + columnCount[3]; i++) { // puts images back into columns | also for some reason I need to do a -1 because it throws an error otherwise?????
      putImageIntoColumn(i, 4);
    }
  }, 500)
}













function arrowHover(which) {
  switch(which) {
    case "onLeft":
      document.getElementById(currentFotoPage).style.translate = "2vh";
      whichArrow = "left";
      break;
    case "onRight":
      document.getElementById(currentFotoPage).style.translate = "-2vh";
      whichArrow = "right";
      break;
    case "off":
      document.getElementById(currentFotoPage).style.removeProperty("translate");
      whichArrow = "none";
      break;
  }
}











function movePic(direction) {
  switch(direction) {
    case "right":
      if(currentFotoPage==images) {
        document.getElementById(currentFotoPage).classList.add("shake-horizontal");
        fotoPageOpened = false;
        setTimeout(() => {
          document.getElementById(currentFotoPage).classList.remove("shake-horizontal");
          fotoPageOpened = true;
        }, 250)
      }
      else if(fotoPageOpened == true) {
        document.getElementById(currentFotoPage).style.left = "40%"; //moves currentFotoPage to the LEFT
        document.getElementById(currentFotoPage).style.opacity = "0";
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(69%)";
        document.getElementById(currentFotoPage).style.removeProperty("translate");
        currentFotoPage++;
        document.getElementById(currentFotoPage).style.left = "50%"; //moves NEXT image to the center
        document.getElementById(currentFotoPage).style.opacity = "1";
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(100%)";
        if(whichArrow == "right") { document.getElementById(currentFotoPage).style.translate = "-2vh"; }
        if(whichArrow == "left") { document.getElementById(currentFotoPage).style.translate = "2vh"; }
      }
      break;
    
    case "left":
      if(currentFotoPage==1) {
        document.getElementById(currentFotoPage).classList.add("shake-horizontal");
        fotoPageOpened = false;
        setTimeout(() => {
          document.getElementById(currentFotoPage).classList.remove("shake-horizontal");
          fotoPageOpened = true;
        }, 250)
      }
      else if(fotoPageOpened == true) {
        document.getElementById(currentFotoPage).style.left = "60%"; //moves currentFotoPage to the RIGHT
        document.getElementById(currentFotoPage).style.opacity = "0"; 
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(69%)";
        document.getElementById(currentFotoPage).style.removeProperty("translate");
        currentFotoPage--;
        document.getElementById(currentFotoPage).style.opacity = "1";
        document.getElementById(currentFotoPage).style.left = "50%"; //moves PREVIOUS image to the center
        document.getElementById(currentFotoPage).style.transform = "translate(-50%, -50%) scale(100%)";
        if(whichArrow == "right") { document.getElementById(currentFotoPage).style.translate = "-2vh"; }
        if(whichArrow == "left") { document.getElementById(currentFotoPage).style.translate = "2vh"; }
      }
      break;
  }
}








// detects left/right arrow keyes so you can cycle through photos with them
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  switch(e.keyCode) {
    case 37: 
      if (fotoPageOpened == true) movePic("left");
      break;
    case 39: 
      if (fotoPageOpened == true) movePic("right");
      break;
    case 27:  // escape key
      if (fotoPageOpened == true) closePageMode();
      break;
  }
}