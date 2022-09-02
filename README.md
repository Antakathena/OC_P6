# OC_P6:
Projet d'entrainement à HTML, CSS et Javascript
Page de site internet récupérant des informations sur des films grâce à une API REST (Django Rest)



## Fonctions JS :
### Affichage de fenêtres modales :

getInfosFilm(filmId) : récupère le Json des infos complètes sur un film
peuplerModale(filmId) : créé une liste à partir des infos voulues pour le film et peuple la modale

### Affichage de carroussels de 7 images 4 par 4 : 

findMeilleurFilm() : récupère les infos de base pour le meilleur film
fonctionCarroussel(article, carroussel, imageData) :      
* Créé un carroussel de 7 images dont 4 sont visibles.
* Les 3 premières sont doublées pour pouvoir faire tourner entièrement le carroussel.
* (Il y a donc 6 positions possibles pour l'apparition des images.)
get7films(urlAPI, article, carroussel, fonctionCarroussel)