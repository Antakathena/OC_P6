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


    fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
        .then(reponse => reponse.json())
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
    function carroussel(carroussel, urlImages) {
        nbr = 10; /*nombre d'images dans le carroussel*/
        p = 0; /*position par défaut*/
        g = carroussel.getElementsByClassName("g")[0];
        d = carroussel.getElementsByClassName("d")[0];
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
    // Là on récupère toute la catégorie fantasy (voir dans l'inspecteur du navigateur l'onglet Network et la console)
    fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page_size=7&page=1")
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
        .then(urlImages => carroussel(carroussel1, urlImages))// fonction carroussel qui transforme les images en carroussel


    var carroussel2 = document.getElementById('carroussel2');
    // Là on récupère toute la catégorie fantasy (voir dans l'inspecteur du navigateur l'onglet Network et la console)
    fetch("http://localhost:8000/api/v1/titles?genre=fantasy&sort_by=-imdb_score&page_size=7&page=1")
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
        .then(urlImages => carroussel(carroussel2, urlImages))// fonction carroussel qui transforme les images en carroussel
}