// Depuis OCMovies avec serveur activé
// Pour activer : wsl : cd OCM+tab, source env/bin/activate, python manage.py runserver
// Pour déactiver : ctrl+C pour quitter le serveur, deactivate pour quitter l'env virtuel

// Ici on récupère le json du meilleur film
window.onload = () => {
    const modal = document.getElementById("myModal");
    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");
    const btn2 = document.getElementById("en-savoir-plus");

    // Ici on récupère les infos du meilleur film
    const meilleurFilmImg = document.getElementById("img-meilleur-film");
    const titreMeilleurFilm = document.getElementById("titre-meilleur-film");
    const resumeMeilleurFilm = document.getElementById("résumé-meilleur-film");
    const infosModale1 = modal.getElementsByTagName("dd");
    const affiche = modal.querySelector("#affiche");

    // carroussel
    // var filmsIDs = []
    // console.log(filmsIDs)
    var getInfosFilm = async function getInfosFilm(filmId) {
        let infos;
        infos = fetch(`http://localhost:8000/api/v1/titles/` + filmId.toString())
            .then(reponse => {
                if (reponse.ok) {
                    return reponse.json()
                } else {
                    console.log("ERREUR");
                    return null
                }
            })
            .then(reponse => {
                if (reponse !== null) {
                    return reponse
                }
                else {
                    console.log("PAS BON")
                    console.log("Contenu filmId : ")
                    console.log(filmId)
                    return fetch(`http://localhost:8000/api/v1/titles/` + filmId.id.toString())
                        .then(reponse => {
                            if (reponse.ok) {
                                return reponse.json()
                            } else {
                                console.log("ERREUR");
                                return null
                            }
                        })
                }
            })

        return infos; // return "la chaine de montage", la promesse au code appelant qui va enchaîner ses traitements propres
    }

    var peuplerModale = function peuplerModale(filmId) {
        getInfosFilm(filmId)

            .then(reponse => {
                console.log(reponse)
                var datas = [];
                affiche.src = reponse.image_url;
                datas.push(
                    reponse.title, reponse.genres, reponse.date_published,
                    reponse.rated, reponse.imdb_score, reponse.directors, reponse.actors,
                    reponse.duration, reponse.countries, reponse.avg_vote, reponse.description)
                for (i = 0; i < datas.length; i++) {
                    infosModale1[i].innerText = datas[i]
                }
            })
    }

    var findMeilleurFilm = async function findMeilleurFilm() {
        return fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
            .then(reponse => {
                if (reponse.ok) {
                    return reponse.json()
                } else {
                    console.log("ERREUR");
                    return null
                }
            })
            .then(reponse2 => {
                return reponse2
            })
    }


    // On récupère sur la page des meilleurs films affiche, titre et ID du meilleur
    findMeilleurFilm()
        .then(reponse2 => {
            meilleurFilmImg.src = reponse2.results[0].image_url
            titreMeilleurFilm.innerText = reponse2.results[0].title
            return reponse2.results[0].id
        })
        // Puis on va sur la page de ce film
        .then(getInfosFilm)
        // et on récupère les informations démandées sur la page de ce film, qu'on place dans data[]
        .then(infosFilms => {
            resumeMeilleurFilm.innerText = infosFilms.description
            peuplerModale(infosFilms)

            // var datas = [];
            // console.log(infosFilms)
            // datas.push(
            //     infosFilms.image_url,
            //     infosFilms.title, infosFilms.genres, infosFilms.date_published,
            //     infosFilms.rated, infosFilms.imdb_score, infosFilms.directors, infosFilms.actors,
            //     infosFilms.duration, infosFilms.countries, infosFilms.avg_vote, infosFilms.description)

            // //enfin on envoie les infos où on en a besoin
            // affiche.src = infosFilms.image_url
            // for (i = 0; i < datas.length; i++) {
            //     console.log(infosModale1[i])
            //     console.log(datas[i])
            //     infosModale1[i].innerHTML = datas[i]
            // }
        })

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
        findMeilleurFilm()
            .then(meilleurFilm => {

                return meilleurFilm.results[0].id
            })
            .then(filmID => {
                console.log("ID après findMeilleurFilm()")
                console.log(filmID)
                return getInfosFilm(filmID)
            })
            .then(peuplerModale)
    }

    btn2.onclick = function () {
        modal.style.display = "block";
        findMeilleurFilm()
            .then(meilleurFilm => {

                return meilleurFilm.results[0].id
            })
            .then(filmID => {
                console.log("ID après findMeilleurFilm()")
                console.log(filmID)
                return getInfosFilm(filmID)
            })
            .then(peuplerModale)
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