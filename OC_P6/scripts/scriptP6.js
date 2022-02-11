// Depuis OCMovies avec serveur activé
// Pour activer : wsl : cd OCM+tab, source env/bin/activate, python manage.py runserver
// Pour déactiver : ctrl+C pour quitter le serveur, deactivate pour quitter l'env virtuel

// Ici on récupère le json du meilleur film
window.onload = () => {
    const modal = document.getElementById("myModal");
    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");

    // function SetMeilleurFilm(data) {
    //     // c'est ici qu'on modifie l'image de la balise du meilleur film
    //     console.log('Données du meilleur film ');
    //     console.log(data.results[0].id);
    //     console.log(data.results[0].image_url);
    // }

    // fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
    //     .then(reponse => reponse.json())
    //     .then(reponse2 => console.log(reponse2.results[0]))
    //     .then(SetMeilleurFilm);

    // Ici on récupère les infos du meilleur film
    const meilleurFilmImg = document.getElementById("img-meilleur-film")
    const titreMeilleurFilm = document.getElementById("titre-meilleur-film")
    const resumeMeilleurFilm = document.getElementById("résumé-meilleur-film")
    const infosModale1 = modal.getElementsByTagName("dd")

    fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
        .then(reponse => {
            if (reponse.ok) {
                return reponse.json()
            } else {
                console.log("ERREUR");
                return null
            }
        })
        // On récupère sur la page des meilleurs films affiche, titre et ID du meilleur
        .then(reponse2 => {
            meilleurFilmImg.src = reponse2.results[0].image_url
            titreMeilleurFilm.innerText = reponse2.results[0].title
            return reponse2.results[0].id
        })
        // Puis on va sur la page de ce film
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
        // et on récupère les informations démandées sur la page de ce film, qu'on place dans data[]
        .then(reponse2 => {
            var datas = [];
            console.log(reponse2)
            datas.push(
                reponse2.image_url, reponse2.title, reponse2.genres, reponse2.date_published,
                reponse2.rated, reponse2.imdb_score, reponse2.directors, reponse2.actors,
                reponse2.duration, reponse2.countries, reponse2.avg_vote, reponse2.description)

            // enfin on envoie les infos où on en a besoin
            for (i = 0; i < datas.length; i++) {
                infosModale1[i].innerText = datas[i]
                resumeMeilleurFilm.innerText = reponse2.description
            }
        })

    // carroussel
    // var filmsIDs = []
    // console.log(filmsIDs)

    var peuplerModale = function peuplerModale(filmId) {
        fetch(`http://localhost:8000/api/v1/titles/` + filmId.toString())
            .then(reponse => {
                if (reponse.ok) {
                    return reponse.json()
                } else {
                    console.log("ERREUR");
                }
            })
            .then(reponse2 => {
                console.log(reponse2)
                var datas = [];
                datas.push(
                    reponse2.image_url, reponse2.title, reponse2.genres, reponse2.date_published,
                    reponse2.rated, reponse2.imdb_score, reponse2.directors, reponse2.actors,
                    reponse2.duration, reponse2.countries, reponse2.avg_vote, reponse2.description)
                for (i = 0; i < datas.length; i++) {
                    infosModale1[i].innerText = datas[i]
                }
            })
    }

    var fonctionCarroussel = function carroussel(article, carroussel, imageData) {
        // urlimages: [ID, URL]
        console.log(imageData);
        nbr = 10; /*nombre d'images dans le carroussel*/
        p = 0; /*position par défaut*/
        g = article.getElementsByClassName("g")[0];
        d = article.getElementsByClassName("d")[0];
        // il faut rajouter à droite les 3 premières images de gauche:
        let double123 = imageData.slice(0, 3);
        let images10 = imageData.concat(double123);
        // pour chaque url on créé une image :
        images10.forEach(imageData => {
            img = document.createElement("img"); /*on créé les img dynamiquement*/
            img.className = "photo";
            img.src = imageData[1];
            let idImg = imageData[0];
            bouton = document.createElement("button");
            bouton.onclick = function () {
                console.log("Chargement modale " + idImg);
                peuplerModale(idImg);
                modal.style.display = "block";
            }

            bouton.appendChild(img);
            // ... créer le bouton qui va utiliser urlData[0] (l'id), et mapper son onclick à peuplerModale
            carroussel.appendChild(bouton); /*on ajoute les nouvelles img au container principal*/
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
                console.log(reponse2) // là on a les id de tous dans la liste 0-6 => à récup pour modales
                // reponse2.results.forEach(element => filmsIDs.push(element.id));
                return reponse2
            })
            .then(reponse2 => {// pour chaque element(film) dans le json, récupérer l'image
                imageData = [];
                reponse2.results.forEach(element => imageData.push([element.id, element.image_url]));
                // console.log(urlImages);
                return imageData;
            })
            .then(imageData => fonctionCarroussel(article, carroussel, imageData))
        // fonction carroussel qui transforme les images en carroussel
    }

    // const listeArticle = document.getElementsByClassName("catégorie")
    // const listeCarroussel = document.getElementsByClassName("carroussel")
    // const listeUrlCategorie= [liste des url en dur]
    // for(i=0; i<4; i++) faire comme plus haut

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


    //modales

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close");

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
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
}