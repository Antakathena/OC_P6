/*NB: un problème de lecture dans le script bloque son execution à partir du problème*/

/*Essais Fetch
https://www.youtube.com/watch?v=2lt4HmLm8LE*/

// Depuis Github. Remarquer le console.table au lieu du console.log
fetch("https://api.github.com/users/antakathena")
    .then(reponse => reponse.json())
    .then(reponse2 => console.table(reponse2))

// Depuis OCMovies avec serveur activé (wsl : cd OCM+tab, source env/bin/activate, python manage.py runserver)
// Là on récupère tout (voir dans l'inspecteur du navigateur l'onglet Network et la console)
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


/*Recup input et video utube : code d'integration*/
// const input = document.getElementById('input')
// const video = document.getElementById('video')
// let link ="";

// input.addEventListener('input', (e) => {
//     console.log(e.target.value);


//     video.innerHTML =
//         `<iframe width="634" height="357" src=${link}\
//     title="YouTube video player" frameborder="0" allow="accelerometer;\
//     autoplay; clipboard-write; encrypted-media; gyroscope;\
//     picture-in-picture" allowfullscreen></iframe>`;
// })
//         '<iframe width="1280" height="720"\
// src="https://www.youtube.com/embed/QB1DTl7HFnc"\
// title="YouTube video player" frameborder="0" allow="accelerometer;\
// autoplay; clipboard-write; encrypted-media; gyroscope;\
// picture-in-picture" allowfullscreen></iframe>'


/*Toggle pour faire apparaitre et disparaitre l'image au click: */
const btn2 = document.getElementById('btn2');
const imgHidden = document.getElementById('img-hidden');

btn2.addEventListener('click', () => {
    console.log('yes!');
    imgHidden.classList.toggle('show');
});


/*Pour afficher les mouvements de la souris dans un cadre déterminé:*/
document.getElementById("myDIV").addEventListener("mousemove", function (event) {
    myFunction(event);
});

function myFunction(e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
}


// Depuis Github. Remarquer le console.table au lieu du console.log
const btn1 = document.getElementById('btn1')

btn1.onclick = (() => {
    let url = "https://api.github.com/users/" + champ.value;
    console.log(url);
    fetch("https://api.github.com/users/" + champ.value)
        .then(reponse => reponse.json())
        .then(data => {
            output.textContent = ""; // pour que ça se vide à chaque requête
            output.textContent = `Compte de ${data.name}`;
            let avatar = document.createElement("img");
            avatar.src = data.avatar_url;
            avatar.width = "100"; // à faire en CSS
            output.appendChild(avatar)
        })
});

/*Pour faire apparaître les infos de coordonnées dans la console au mvt de la souris:*/
// const mouseEvent = document.getElementById('mouseEvent');
// const horizontal = document.getElementById('horizontal');
// const vertical = document.getElementById('vertical');

// mouseEvent.addEventListener('mousemove', () => {
//     console.log('yes!');
// })
