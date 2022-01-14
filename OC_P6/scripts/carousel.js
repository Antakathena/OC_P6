alert("ok carousel");

/*Récupérer les données avec fetch
fetch("http://localhost:8000/api/v1/titles/")
    .then((reponse) => {
        return reponse.json
    })
    .then((donnees) => {
        for (let post of donnees) {
            console.log(post.title)
        }
*/


//on essaye le compteur:
window.onload = (() => {
    let compteurs = document.getElementsByClassName("compteur");
    let total_span_tag = document.getElementsByClassName("valeur totale")[0];
    let total = 0;

    console.log(compteurs);
    Array.prototype.forEach.call(compteurs, compteur => {
        let g = compteur.getElementsByClassName("moins")[0];
        let d = compteur.getElementsByClassName("plus")[0];
        let span_tag = compteur.getElementsByClassName("span")[0];
        console.log("ok");
        let value = 0;
        span_tag.textContent = value;
        g.onclick = (() => {
            value -= 1;
            total -= 1;
            span_tag.textContent = value;
            total_span_tag.textContent = total;
        })
        d.onclick = (() => {
            value += 1;
            total += 1;
            span_tag.textContent = value;
            total_span_tag.textContent = total;
        })
    });
})


// function doAction() {
//     var messageObj = {
//       text: "Here is some text"
//     }

//     document.getElementsByTagName('span')[0].innerText = messageObj.text;
//   }
//   <span>PLACEHOLDER</span>
//   <button onclick="doAction()">do</button>

// document.getElementsByClassName('text-holder')[0].textContent = message.text;
// var message = {
//     text: 'Here is some text'
// };
// document.getElementsByClassName('text-holder')[0].textContent = message.text;
// <span class="text-holder"></span>



// Get the modal
var modal = document.getElementsByClassName("myModal");

// Get the button that opens the modal
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

// On arrive au carroussel :
window.onload = function () {
    nbr = 10; /*nombre d'images dans le carroussel*/
    p = 0; /*position par défaut*/
    container = document.getElementById("container");
    g = document.getElementById("g");
    d = document.getElementById("d");
    container.style.width = (300 * nbr) + "px";
    console.log("fonction on")
    for (i = 1; i <= nbr; i++) {
        div = document.createElement("div"); /*on créé les div dynamiquement*/
        div.className = "photo";
        div.style.backgroundImage = "url('imgcarroussel/img" + i + ".jpg')";
        container.appendChild(div); /*on ajoute les nouvelles div au container principal*/
        console.log(i);
    }

    g.onclick = function () {
        if (p > -6) { /*arrête l'animation du carroussel pour arrêter quand il n'y a plus d'images*/
            p--;
        } else {
            p = 0; /*le principe c'est de retourner à la position la plus à droite mais ça marche pas (encore)*/
        }
        container.style.transform = "translate(" + p * 300 + "px)";
    }

    d.onclick = function () {
        if (p < 0) { /*arrête l'animation du carrousseul à -6 pour arrêter quand il n'y a plus d'images*/
            p++;
        } else {
            p = -6;/*le principe c'est de retourner à la postition la plus à gauche mais ça marche pas (encore)*/
        }
        container.style.transform = "translate(" + p * 300 + "px)";
    }
}