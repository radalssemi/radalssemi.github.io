var postsJson;
//this reads the file and uhh puts it into an object
//reason why I load it like this is that after I create a new post it takes less time to update, since it reads from the github repo and not the website which takes kinda long
fetch('https://raw.githubusercontent.com/radalssemi/radalssemiWebsitePosts/main/posts.json')
  .then(response => response.json())
  .then(json => postsJson = json)
  .then(() => fetchPosts());






function randomIntFromInterval(min, max) { // radom int between two numbers
  return Math.floor(Math.random() * (max - min + 1) + min)
}



// these for loops add event listeners on all download buttons to call function to apply a random rotation on hover
function addEventListeners() {
  const downloadButtonCount = document.querySelectorAll(".postDownload").length;
  for (var i = 0; i < downloadButtonCount ; i++) {
    document.querySelectorAll(".postDownload")[i].addEventListener("mouseover", function() {
      hoverRotate(this);
    });
    document.querySelectorAll(".postDownload")[i].addEventListener("mouseout", function() {
      unHoverRotate(this);
    });
  }
}

//hover effect for random rotation
function hoverRotate(element) {
  element.style.rotate = randomIntFromInterval(-3, 3) + "deg";
}
function unHoverRotate(element) {
  element.style.rotate = "0deg";
}




function removeEventListeners(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  }
  else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}





















postsToLoad = 5

function fetchPosts() {
  numberOfPosts = postsJson["numberOfPosts"]
  nextPostToLoad = numberOfPosts
  console.log(numberOfPosts)
  for(nextPostToLoad; nextPostToLoad > numberOfPosts - postsToLoad; nextPostToLoad--) {
    console.log(nextPostToLoad)
    loadPost("post" + nextPostToLoad)
  }
}





image.png







/*

<div class="post">
  <div class="infocard">
    <div class="date">12.2.2022</div>
    <div class="currentPostID">#post4</div>
    <button class="postDownload">download</button>
  </div>
  <div class="images">
    <img src="image.svg" draggable=false />
  </div>
</div>

*/


function loadPost(currentPostName) {
  currentPostImageRange = [postsJson["posts"][currentPostName]["edit"]["rangeStart"], postsJson["posts"][currentPostName]["edit"]["rangeEnd"]];
  currentPostDate = postsJson["posts"][currentPostName]["info"]["date"];
  currentImagesLocation = "https://raw.githubusercontent.com/radalssemi/radalssemiWebsitePosts/main/posts/" + currentPostName + "/edit/"
  currentImageCounter = currentPostImageRange[0];
  currentImage = "img" + currentImageCounter;
  currentImageName = postsJson["posts"][currentPostName]["edit"]["name"][currentImage];
  currentThumbnailImageLocation = currentImagesLocation + "thumbnail/" + currentImageName;
  currentMediumImageLocation = currentImagesLocation + "medium/" + currentImageName;
  thumbnailImgHtml = "";

  console.log("currentPostImageRange: " + currentPostImageRange)

  var postHtml = 
  '<div class="post">' +
  '<div class="infocard">' +
  '    <div class="date">' + currentPostDate + '</div>' +
  '    <div class="postID">#' + currentPostName + '</div>' +
  '    <button class="postDownload">download</button>' +
  '  </div>' +
  '  <div class="images">' +
  addPostImages(currentPostName) +
  '  </div>' +
  '</div>' ;

  for (var i = 0; i < 1; i++) {
    document.getElementById('posts').insertAdjacentHTML("beforeend", postHtml);
  }
  // removeEventListeners();
  // addEventListeners();
}



function addPostImages(currentPostName) {
  for(currentImageCounter = currentPostImageRange[0]; currentImageCounter < currentPostImageRange[1]; currentImageCounter++) {
    currentImageID = "img" + currentImageCounter; //updating vars
    currentImageName = postsJson["posts"][currentPostName]["edit"]["name"][currentImageID];
    currentThumbnailImageLocation = currentImagesLocation + "thumbnail/" + currentImageName;

    console.log('    <img draggable=false src="' + currentThumbnailImageLocation + '"/>');
    thumbnailImgHtml = thumbnailImgHtml + '    <img draggable=false src="' + currentThumbnailImageLocation + '"/>';
  }
  return thumbnailImgHtml;
}





// function findProp(obj, prop, defval){
//   if (typeof defval == 'undefined') defval = null;
//   prop = prop.split('.');
//   for (var i = 0; i < prop.length; i++) {
//       if(typeof obj[prop[i]] == 'undefined')
//           return defval;
//       obj = obj[prop[i]];
//   }
//   return obj;
// }









window.onscroll = function() {
  if ((window.innerHeight + window.pageYOffset) >= (document.body.scrollHeight - 100)) {
      fetchPosts();
  }
};