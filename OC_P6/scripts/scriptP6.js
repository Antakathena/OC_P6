// Depuis OCMovies avec serveur activé
// Pour activer : wsl : cd OCM+tab, source env/bin/activate, python manage.py runserver
// Pour déactiver : ctrl+C pour quitter le serveur, deactivate pour quitter l'env virtuel

// Ici on récupère le json du meilleur film
window.onload = () => {
    var data = {};
    var meilleurFilm = null

    function SetMeilleurFilm(data) {
        // c'est ici qu'on modifie l'image de la balise du meilleur film
        console.log('Données du meilleur film ');
        console.log(data.results[0].id);
        console.log(data.results[0].image_url);
    }

    fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
        .then(reponse => reponse.json())
        .then(reponse2 => console.log(reponse2.results[0]))
        .then(SetMeilleurFilm);

    // Ici on récupère les infos du meilleur film
    const meilleurFilmImg = document.getElementById("img1")
    const titre1 = document.getElementById("titre1")
    const resume1 = document.getElementById("résumé1")

    fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
        .then(reponse => {
            if (reponse.ok) {
                return reponse.json()
            } else {
                console.log("ERREUR");
                return null
            }
        })
        .then(reponse2 => {
            meilleurFilmImg.src = reponse2.results[0].image_url
            titre1.innerText = reponse2.results[0].title
            return reponse2.results[0].id
        })
        .then(
            filmId => fetch(`http://localhost:8000/api/v1/titles/` + filmId.toString())
        )
        .then(reponse => {
            if (reponse.ok) {
                return reponse.json()
            } else {
                console.log("ERREUR");
            }
        })
        .then(reponse2 => {
            resume1.innerText = reponse2.description
        })

    // carroussel
    var fonctionCarroussel = function carroussel(article, carroussel, urlImages) {
        nbr = 10; /*nombre d'images dans le carroussel*/
        p = 0; /*position par défaut*/
        g = article.getElementsByClassName("g")[0];
        d = article.getElementsByClassName("d")[0];
        // il faut rajouter à droite les 3 premières images de gauche:
        let double123 = urlImages.slice(0, 3);
        let images10 = urlImages.concat(double123);
        // pour chaque url on créé une image :
        images10.forEach(urlImage => {
            img = document.createElement("img"); /*on créé les img dynamiquement*/
            img.className = "photo";
            img.src = urlImage;
            carroussel.appendChild(img); /*on ajoute les nouvelles img au container principal*/
        })
        d.onclick = function () {
            if (p > -3) { /*arrête l'animation du carroussel pour arrêter quand il n'y a plus d'images*/
                p--;
            } else {
                p = 3; /*le principe c'est de retourner à la position la plus à droite mais ça marche pas (encore)*/
            }
            carroussel.style.transform = "translate(" + p * 199 + "px)";
        }

        g.onclick = function () {
            if (p < 3) { /*arrête l'animation du carroussel à -6 pour arrêter quand il n'y a plus d'images*/
                p++;
            } else {
                p = -3;/*le principe c'est de retourner à la postition la plus à gauche mais ça marche pas (encore)*/
            }
            carroussel.style.transform = "translate(" + p * 199 + "px)";
        }
    }
    function get7films(urlAPI, article, carroussel, fonctionCarroussel) {
        fetch(urlAPI)
            .then(reponse => reponse.json())
            .then(reponse2 => {
                // console.log(reponse2)
                return reponse2
            })
            .then(reponse2 => {// pour chaque element(film) dans le json, récupérer l'image
                urlImages = [];
                reponse2.results.forEach(element => urlImages.push(element.image_url));
                // console.log(urlImages);
                return urlImages;
            })
            .then(urlImages => fonctionCarroussel(article, carroussel, urlImages))
        // fonction carroussel qui transforme les images en carroussel
    }

    var article1 = document.getElementById("mieux-notés");
    var carroussel1 = document.getElementById('carroussel1');
    get7films(
        "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page_size=7&page=1",
        article1,
        carroussel1,
        fonctionCarroussel)

    var article2 = document.getElementById("fantasy");
    var carroussel2 = document.getElementById('carroussel2');
    get7films(
        "http://localhost:8000/api/v1/titles?genre=fantasy&sort_by=-imdb_score&page_size=7&page=1",
        // voir dans l'inspecteur du navigateur l'onglet Network et la console ce qui est récupéré
        article2,
        carroussel2,
        fonctionCarroussel)

    var article3 = document.getElementById("animation");
    var carroussel3 = document.getElementById('carroussel3');
    get7films(
        "http://localhost:8000/api/v1/titles?genre=animation&sort_by=-imdb_score&page_size=7&page=1",
        article3,
        carroussel3,
        fonctionCarroussel)

    var article4 = document.getElementById("musical");
    var carroussel4 = document.getElementById('carroussel4');
    get7films(
        "http://localhost:8000/api/v1/titles?genre=musical&sort_by=-imdb_score&page_size=7&page=1",
        article4,
        carroussel4,
        fonctionCarroussel)

}