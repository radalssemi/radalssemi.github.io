var imgs = document.images, //stolen script to detect that all images were loaded
    len = imgs.length,
    counter = 0;

[].forEach.call( imgs, function( img ) {
  if(img.complete)
    incrementCounter();
  else
    img.addEventListener( 'load', incrementCounter, false );
} );

function incrementCounter() {
  counter++;
  if ( counter === len ) {
    hideTransition();
    console.log("ass");
  }
}



document.getElementById("loadingThing").style.opacity = "1"; // I made the transition screen go away only after everything's loaded,
                                                             // this will make a loading thing appear slowly

function hideTransition() {
  document.getElementById("transitionScreen").style.bottom = "0";
  setTimeout(() => {
    document.getElementById("transitionScreen").style.height = "0";
    document.getElementById("transitionScreen").style.boxShadow = "none";
  }, 200)
}






function openNav() {
  document.getElementById("sideNav").style.pointerEvents = "all";
  document.getElementById("main").style.pointerEvents = "";
  setTimeout(() => {
    document.getElementById("menuArrow").style.animation = "none";
  }, 200)
  document.getElementById("main").style.filter = "blur(1vh)";
  document.getElementById("sideNav").style.width = "300px"; // side navigation panel
  document.getElementById("sideNav").style.boxShadow = "0 0 0 30px rgba(98, 98, 191, 0.3)"; 
  document.getElementById("bgdots").style.left = "10%";   //animates background to slide right when nav opens
}
function closeNav() {
  document.getElementById("sideNav").style.pointerEvents = "none";
  document.getElementById("main").style.filter = "";
  document.getElementById("sideNav").style.width = "0";     //sidenav
  document.getElementById("sideNav").style.boxShadow = "none"; 
  document.getElementById("bgdots").style.left = "0%";
}



function go(location) {  // handles fade out animation and goes to corresponding page
  if (location == "./old-site/index") {
    borWarning();
  }
  else {
    document.getElementById("menuSlider").style.display = "none";
    document.getElementById("smallScreenOpenNav").style.display = "none";
    document.getElementById("transitionScreen").style.top = "0";
    document.getElementById("transitionScreenLocation").style.top = "50vh";
    document.getElementById("transitionScreen").style.height = "100%";
    document.getElementById("transitionScreen").style.boxShadow = "0 0 0 50vh rgba(98, 98, 191, 1)";
    document.getElementById("transitionScreenLocation").innerHTML = window.location.origin + "/" + location + ".html";
    document.getElementById("loadingThing").style.display = "none";
    closeNav();
    setTimeout(() => {
      window.location.href = location + ".html";
    }, 1000)
  };
}



function borWarning() {
  document.getElementById("borWarning").style.display = "grid";
  setTimeout(() => {
    document.getElementById("borWarning").style.opacity = "1";
    document.getElementById("borWarning").style.transform = "rotate(0deg) scale(1) translate(-50%,-50%)";
    document.getElementById("borblur").style.filter = "blur(1.5vh)";
    document.getElementById("borblur").style.background = "inherit";
  }, 10) //this is done so the effects aren't applied at the same time resulting in the element popping in wihtout a transition playing

}
function borWarningClos() {
  document.getElementById("borWarning").style.opacity = "0";
  document.getElementById("borWarning").style.transform = "rotate(10deg) scale(0.75) translate(-50%,-50%)";
  document.getElementById("borblur").style.filter = "";
  document.getElementById("borblur").style.background = "none";
  setTimeout(() => {
    document.getElementById("borWarning").style.display = "none";
  }, 400)
}
function borWarningGo() {
  borWarningClos();
  closeNav();
  document.getElementById("menuSlider").style.display = "none";
  document.getElementById("smallScreenOpenNav").style.display = "none";
  document.body.style.backgroundColor = "#4F5861";
  document.getElementById("bgdots").style.opacity = "0";
  document.getElementById("borblur").style.opacity = "0";
  document.getElementById("logoWrap").style.transform = "scaleX(0%)";
  document.getElementById("oldlogo").style.display = "block";
  setTimeout(() => {
    document.getElementById("oldlogo").style.opacity = "0.1";
    document.getElementById("oldlogo").style.transform = "translate(-50%, -50%)";
  }, 10) //have to do this or the logo appears without transition
  setTimeout(() => {
    location = "./old-site/index.html";
  }, 1200)
}