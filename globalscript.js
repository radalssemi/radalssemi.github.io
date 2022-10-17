const imgs = document.images, //stolen and edited script to detect that all images were loaded
      len = imgs.length;
var counter = 0;

document.getElementById("loadingNumber").innerHTML = "(" + counter + "/" + len + ")";


[].forEach.call( imgs, function( img ) {
  if(img.complete) {
    incrementCounter();
  }
  else
    img.addEventListener( 'load', incrementCounter, false );
} );

function incrementCounter() {
  counter++;
  document.getElementById("loadingNumber").innerHTML = "(" + counter + "/" + len + ")";
  if ( counter == len ) {
    setTimeout(() => {
      hideTransition();
    }, 200)
  }
}



setTimeout(() => { // I tried to do this another way but aaaaaaaaaaaaaaaaaaaaaX
  document.getElementById("loadingThing").style.opacity = "1";// I made the transition screen go away only after everything's loaded,
  document.getElementById("loadingNumber").style.opacity = "1"; // this will make the loading thing appear slowly  
}, 5000) // basically like half the time these would appear immediately without any transition

setTimeout(() => {
  document.body.style.backgroundColor = "#5552a0"; //to reduce the prominence of the flash when transitioning sites sometimes
  document.getElementById("main").style.opacity = "1";
}, 200)

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
  document.getElementById("sideNav").style.width = "300px"; // open sidenav
  document.getElementById("sideNav").style.filter = "drop-shadow(0 0 40px rgba(0, 0, 0, 0.15)) drop-shadow(2.5vh 0vh 0 rgba(0, 0, 0, 0.10))"; 
}
function closeNav() {
  document.getElementById("sideNav").style.pointerEvents = "none";
  document.getElementById("main").style.filter = "";
  document.getElementById("sideNav").style.width = "0";     // close sidenav
  document.getElementById("sideNav").style.filter = "drop-shadow(0 0 40px rgba(0, 0, 0, 0.15))"; 
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
    document.getElementById("loadingNumber").style.display = "none";
    closeNav();
    setTimeout(() => {
      window.location.href = location + ".html";
    }, 1000)
  };
}



function borWarning() {
  document.getElementById("borblur").style.pointerEvents = "none";
  document.getElementById("borWarning").style.display = "grid";
  setTimeout(() => {
    document.getElementById("borWarning").style.opacity = "1";
    document.getElementById("borWarning").style.transform = "rotate(0deg) scale(1) translate(-50%,-50%)";
    document.getElementById("borblur").style.filter = "blur(1.5vh) brightness(80%)";
    document.getElementById("borblur").style.background = "inherit";
  }, 50) //this is done so the effects aren't applied at the same time resulting in the element popping in wihtout a transition playing

}
function borWarningClos() {
  document.getElementById("borblur").style.pointerEvents = "all";
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
  document.body.style.transition = "1s";
  document.body.style.backgroundColor = "#4F5861";
  document.getElementById("bgdots").style.opacity = "0";
  document.getElementById("borblur").style.opacity = "0";
  document.getElementById("oldlogo").style.display = "block";
  setTimeout(() => {
    document.getElementById("oldlogo").style.opacity = "0.1";
    document.getElementById("oldlogo").style.transform = "translate(-50%, -50%)";
  }, 50) //have to do this or the logo appears without transition
  setTimeout(() => {
    location = "./old-site/index.html";
  }, 1200)
}



















window.addEventListener('contextmenu', function (e) { //prevents right click context menu cause
  // do something here... 
  e.preventDefault(); 
}, false);