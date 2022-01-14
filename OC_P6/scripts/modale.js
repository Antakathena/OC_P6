// Get the modal
// avant : var modal = document.getElementById("myModal");
var modal = document.getElementsByClassName("myModal");

// Get the button that opens the modal
// avant : var btn = document.getElementById("myBtn");
var modalbtn = document.getElementsByClassName("myBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modalbtn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
