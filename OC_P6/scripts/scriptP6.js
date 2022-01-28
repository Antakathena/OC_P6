// Depuis OCMovies avec serveur activé (wsl : cd OCM+tab, source env/bin/activate, python manage.py runserver)

// Ici on récupère le json du meilleur film
fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
    .then(reponse => reponse.json())
    .then(reponse2 => console.log(reponse2.results[0]))

// Ici on récupère l'image du meilleur film
const meilleurFilm = document.getElementById("img")
fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
    .then(reponse => {
        if (reponse.ok) {
            reponse.json()
                .then(reponse2 => { img.src = reponse2.results[0].image_url })
        } else {
            console.log("ERREUR");
        }
    })

// Là on récupère toute la catégorie fantasy (voir dans l'inspecteur du navigateur l'onglet Network et la console)
fetch("http://localhost:8000/api/v1/titles?min_year=2020&genre=fantasy")
    .then(reponse => reponse.json())
    .then(reponse2 => console.log(reponse2))

// Ici on récupère le titre du résultat n°1, puisque qu'on a des json normaux dans un array
fetch("http://localhost:8000/api/v1/titles?min_year=2020&genre=fantasy")
    .then(reponse => reponse.json())
    .then(reponse2 => console.log(reponse2.results[0].title))

// Ici on récupère l'image titre du résultat n°1
fetch("http://localhost:8000/api/v1/titles?min_year=2020&genre=fantasy")
    .then(reponse => reponse.json())
    .then(reponse2 => console.log(reponse2.results[0].image_url))

