// Depuis OCMovies avec serveur activé
// Pour activer : wsl : cd OCM+tab, source env/bin/activate, python manage.py runserver
// Pour déactiver : ctrl+C pour quitter le serveur, deactivate pour quitter l'env virtuel

window.onload = () => {


    // Get infos for best movie
    const meilleurFilmImg = document.getElementById("img-meilleur-film");
    const titreMeilleurFilm = document.getElementById("titre-meilleur-film");
    const resumeMeilleurFilm = document.getElementById("résumé-meilleur-film");

    // Get the button that opens the modal for Best Movie
    const btn = document.getElementById("myBtn");
    const btn2 = document.getElementById("en-savoir-plus");

    // Get infos for modals
    const infosModale = modal.getElementsByTagName("dd");
    const affiche = modal.querySelector("#affiche");
    const modal = document.getElementById("myModal");


    // FUNCTIONS

    /**
     * récupère le Json des infos complètes sur un film
     * @param {*} filmId l'ID du film
     * @returns {Json} les informations détaillées du film as Json
     */
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
    /**
     * créé une liste à partir des infos voulues pour le film et peuple la modale
     * @param {*} filmId
     */
    var peuplerModale = function peuplerModale(filmId) {
        getInfosFilm(filmId)
            .then(reponse => {
                console.log("reponse après getInfosFilm")
                console.log(reponse)
                var datas = [];
                affiche.src = reponse.image_url;
                datas.push(
                    reponse.title, reponse.genres, reponse.date_published,
                    reponse.rated, reponse.imdb_score, reponse.directors, reponse.actors,
                    reponse.duration, reponse.countries, reponse.avg_vote, reponse.description)
                for (i = 0; i < datas.length; i++) {
                    infosModale[i].innerText = datas[i]
                }
            })
    }
    /**
     * récupère les infos de base pour le meilleur film
     * @returns {Json} les informations de base du meilleur film as Json
     */
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
                return reponse2.results[0]
            })
    }
    /**
     * Créé un carroussel de 7 images dont 4 sont visibles.
     * Les 3 premières sont doublées pour pouvoir faire tourner entièrement le carroussel.
     * (Il y a donc 6 positions possibles pour l'apparition des images.)
     * @param {*} article position dans le HTML, correspond à une catégorie de films
     * @param {*} carroussel container à remplir
     * @param {*} imageData urlimages: [ID, URL] (l'ID sert pour peupler la modale)
     */
    var fonctionCarroussel = function carroussel(article, carroussel, imageData) {
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
                p = 3; /*le principe est de retourner à la position opposée*/
            }
            carroussel.style.transform = "translate(" + p * 199 + "px)";
        }
        g.onclick = function () {
            if (p < 3) { /* même chose dans l'autre sens */
                p++;
            } else {
                p = -3;
            }
            carroussel.style.transform = "translate(" + p * 199 + "px)";
        }
    }
    /**
     * Créé imageData pour nourrir la fonction carroussel :
     * Récupère les 7 premiers films d'une URL donnée dans l'API OCMovies,
     * Puis créé une liste de tuple contenant les image et l'ID pour chacun de ces films
     * @param {*} urlAPI la référence d'une page de l'API OCMovies contenant 7 films (&page_size=7&page=1)
     * @param {*} article cf fonction Carroussel
     * @param {*} carroussel cf fonction Carroussel
     * @param {*} fonctionCarroussel 
     */
    function get7films(urlAPI, article, carroussel, fonctionCarroussel) {
        fetch(urlAPI)
            .then(reponse => reponse.json())
            .then(reponse2 => {
                // là on a les id de tous dans la liste 0-6
                return reponse2
            })
            .then(reponse2 => {
                // pour chaque element(film) dans le json, récupérer l'image
                imageData = [];
                reponse2.results.forEach(element => imageData.push([element.id, element.image_url]));
                return imageData;
            })
            .then(imageData => fonctionCarroussel(article, carroussel, imageData))
        // fonction carroussel qui transforme les images en carroussel
    }

    // MAIN

    // MEILLEUR FILM :

    findMeilleurFilm()
        // renvoie le json des infos simples du film
        // On récupère sur la page des meilleurs films affiche, titre et ID du meilleur
        .then(reponse2 => {
            meilleurFilmImg.src = reponse2.image_url
            titreMeilleurFilm.innerText = reponse2.title
            return reponse2.id
        })
        // Puis on va sur la page de ce film
        .then(getInfosFilm)
        // et on récupère les informations démandées sur la page de ce film
        // on affiche le résumé et peupler modale récupère les infos pour la modale
        .then(infosFilms => {
            resumeMeilleurFilm.innerText = infosFilms.description
            peuplerModale(infosFilms.id)
        })


    // CARROUSSELS :

    const listeArticle = document.getElementsByClassName("catégorie")
    const listeCarroussel = document.getElementsByClassName("carroussel")
    const listeUrlCategorie = [
        "sort_by=-imdb_score",
        "genre=fantasy&sort_by=-imdb_score",
        "genre=animation&sort_by=-imdb_score",
        "genre=musical&sort_by=-imdb_score"
    ]
    for (i = 0; i < 4; i++)
        get7films(
            "http://localhost:8000/api/v1/titles?" + listeUrlCategorie[i] + "&page_size=7&page=1",
            // voir dans l'inspecteur du navigateur l'onglet Network et la console ce qui est récupéré 
            listeArticle[i],
            listeCarroussel[i],
            fonctionCarroussel)

    // MODALES :

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
        findMeilleurFilm()
            .then(meilleurFilm => {
                return meilleurFilm.id
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

                return meilleurFilm.id
            })
            .then(filmID => {
                console.log("ID après findMeilleurFilm()")
                console.log(filmID)
                return getInfosFilm(filmID)
            })
            .then(peuplerModale)
    }
    // When the user clicks on <span> (x), close the modal
    // Get the <span> element that closes the modal
    var span = document.getElementById("close");
    function hide(id) {
        var close = document.getElementById(id);
        close.style.display = "none";
        console.log(close.style.display);
        setTimeout(() => { console.log(close.style.display); });
    }
    span.onclick = function (event) {
        hide('myModal'); event.stopPropagation();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}