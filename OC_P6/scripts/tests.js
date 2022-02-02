// carroussel
function carroussel(carroussel, urlImages) {
    nbr = 10; /*nombre d'images dans le carroussel*/
    p = 0; /*position par défaut*/
    g = carroussel.getElementsByClassName("g")[0];
    d = carroussel.getElementsByClassName("d")[0];
    carroussel.style.width = (300 * nbr) + "px"
    urlImages.forEach(urlImage => {
        img = document.createElement("img"); /*on créé les img dynamiquement*/
        img.className = "photo";
        img.src = urlImage;
        carroussel.appendChild(img); /*on ajoute les nouvelles img au container principal*/
    })
    g.onclick = function () {
        if (p > -6) { /*arrête l'animation du carroussel pour arrêter quand il n'y a plus d'images*/
            p--;
        } else {
            p = 0; /*le principe c'est de retourner à la position la plus à droite mais ça marche pas (encore)*/
        }
        carroussel.style.transform = "translate(" + p * 300 + "px)";
    }

    d.onclick = function () {
        if (p < 0) { /*arrête l'animation du carroussel à -6 pour arrêter quand il n'y a plus d'images*/
            p++;
        } else {
            p = -6;/*le principe c'est de retourner à la postition la plus à gauche mais ça marche pas (encore)*/
        }
        carroussel.style.transform = "translate(" + p * 300 + "px)";
    }
}


var carroussel1 = document.getElementById('carroussel1');
var urlImages = []
// Là on récupère toute la catégorie fantasy (voir dans l'inspecteur du navigateur l'onglet Network et la console)
let result1 = fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
    .then(reponse => reponse.json())
    .then(reponse2 => {
        console.log(reponse2)
        return reponse2
    })
    .then(reponse2 => {// pour chaque element(film) dans le json, récupérer l'image
        urlImages = [];
        reponse2.results.forEach(element => urlImages.push(element.image_url));
        console.log(urlImages);
        return urlImages;
    })
let result2 = fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=2")
    .then(reponse => reponse.json())
    .then(reponse2 => {
        console.log(reponse2)
        return reponse2
    })
    .then(reponse2 => {// pour chaque element(film) dans le json, récupérer l'image
        urlImages = [];
        result.forEach(element => urlImages.push(element))
        reponse2.results.forEach(element => urlImages.push(element.image_url));
        console.log(urlImages);
        return urlImages;
    })
carroussel(carroussel1, urlImages)// fonction carroussel qui transforme les images en carroussel