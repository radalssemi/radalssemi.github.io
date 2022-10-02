var images = document.querySelectorAll(".column img").length;

for (var i = 0; i < images ; i++) {
    document.querySelectorAll(".column img")[i].addEventListener("click", function() {
        console.log( event.target.id );
        switchPhotoMode(event.target.id);
    });
}


function switchPhotoMode(targetImage) {
}