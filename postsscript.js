function randomIntFromInterval(min, max) { // radom int between two numbers
  return Math.floor(Math.random() * (max - min + 1) + min)
}




addEventListeners();
// these for loops add event listeners on all download buttons and images to call function to apply a random rotation
function addEventListeners() {
  const downloadButtonCount = document.querySelectorAll(".postDownload").length;
  for (var i = 0; i < downloadButtonCount ; i++) {
    document.querySelectorAll(".postDownload")[i].addEventListener("mouseover", function() {
      hoverRotate(this, true); // it is checked if input #2 is true to see if it's the download button to have a larger range for random number. it looks kinda bad when the images rotate a lot but it also looks kinda bad when the download button doesn't rotate enough
    });
    document.querySelectorAll(".postDownload")[i].addEventListener("mouseout", function() {
      unHoverRotate(this, true);
    });
  }

  // const imagesCount = document.querySelectorAll(".images img").length;
  // for (var i = 0; i < imagesCount ; i++) {
  //   document.querySelectorAll("div.images img")[i].addEventListener("mouseover", function() {
  //     hoverRotate(this);
  //   });
  // }
  // for (var i = 0; i < imagesCount ; i++) {
  //   document.querySelectorAll("div.images img")[i].addEventListener("mouseout", function() {
  //     unHoverRotate(this);
  //   });
  // }
}

//hover effect for random rotation
function hoverRotate(element) {
  element.style.rotate = randomIntFromInterval(-3, 3) + "deg";
}
function unHoverRotate(element) {
  element.style.rotate = "0deg";
}




// function removeEventListeners(el, withChildren) {
//   if (withChildren) {
//     el.parentNode.replaceChild(el.cloneNode(true), el);
//   }
//   else {
//     var newEl = el.cloneNode(false);
//     while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
//     el.parentNode.replaceChild(newEl, el);
//   }
// }





















/*

<div class="post">
  <div class="infocard">
    <div class="date">
      12.2.2022
    </div>
    <div class="currentPostID">post #4</div>
    <button class="postDownload">download</button>
  </div>
  <div class="images">
    <img src="image.svg" draggable=false />
  </div>
</div>

*/


function loadPost() {
  currentPostID = "post1";
  currentPostImageRange = [postsJson["posts"]["post1"]["edit"]["rangeStart"], postsJson["posts"]["post1"]["edit"]["rangeEnd"]];
  currentPostDate = postsJson["posts"]["post1"]["info"]["date"];
  // currentImagesLocation = "/posts/" + postID + "/edit
  currentImagesLocation = "https://raw.githubusercontent.com/radalssemi/radalssemi.github.io/main/posts/" + currentPostID + "/edit/thumbnail/"
  currentImageCounter = currentPostImageRange[0];
  currentImage = "img" + currentImageCounter;
  currentImageName = postsJson["posts"]["post1"]["edit"]["name"][currentImage];
  currentThumbnailImageLocation = currentImagesLocation + "thumbnail/" + currentImageName;
  currentMediumImageLocation = currentImagesLocation + "medium/" + currentImageName;
  thumbnailImgHtml = "";

  var postHtml = 
  '<div class="post">' +
  '<div class="infocard">' +
  '    <div class="date">' + currentPostDate + '</div>' +
  '    <div class="postID">#' + currentPostID + '</div>' +
  '    <button class="postDownload">download</button>' +
  '  </div>' +
  '  <div class="images">' +
  addPostImages() +
  '  </div>' +
  '</div>' ;

  for (var i = 0; i < 1 ; i++) {
    document.getElementById('posts').insertAdjacentHTML("beforeend", postHtml);
  }
}



function addPostImages() {
  for(currentImageCounter = currentPostImageRange[0]; currentImageCounter < currentPostImageRange[1]; currentImageCounter++) {
    currentImage = "img" + currentImageCounter; //updating vars
    currentImageName = postsJson["posts"]["post1"]["edit"]["name"][currentImage];
    currentThumbnailImageLocation = currentImagesLocation + "thumbnail/" + currentImageName;

    console.log('    <img draggable=false src="' + currentThumbnailImageLocation + '"/>');
    thumbnailImgHtml = thumbnailImgHtml + '    <img draggable=false src="' + currentThumbnailImageLocation + '"/>';
  }
  return thumbnailImgHtml;
}





function findProp(obj, prop, defval){
  if (typeof defval == 'undefined') defval = null;
  prop = prop.split('.');
  for (var i = 0; i < prop.length; i++) {
      if(typeof obj[prop[i]] == 'undefined')
          return defval;
      obj = obj[prop[i]];
  }
  return obj;
}


var postsJson;

//this reads the file and uhh puts it into an object

fetch('https://raw.githubusercontent.com/radalssemi/radalssemi.github.io/main/posts/posts.json')
  .then(response => response.json())
  .then(json => postsJson = json)
  .then(() => loadPost());
