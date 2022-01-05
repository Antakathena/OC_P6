fetch("mon adresse http")
    .then((reponse) => {
        return reponse.json
    })
    .then((donnees) => {
        for (let post of donnees) {
            console.log(post.title)
        }

        document.article.onload = function () { /*avt document.body mais ça ne marche pas non plus*/
            nbr = 10; /*nombre d'images dans le carroussel*/
            p = 0; /*position par défaut*/
            container = document.getElementById("container");
            g = document.getElementById("g");
            d = document.getElementById("d");
            container.style.width = (300 * nbr) + "px";
            for (i = 1; i <= nbr; i++) {
                div = document.createElement("div"); /*on créé les div dynamiquement*/
                div.className = "photo";
                div.style.backgroundImage = "url('imgcarroussel/img" + i + ".jpg')";
                container.appendChild(div); /*on ajoute les nouvelles div au container principal*/
            }
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
