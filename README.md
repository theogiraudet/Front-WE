# Projet WE

## Installer le projet
Pour installer le projet :
```
git clone https://github.com/theogiraudet/Front-WE.git
npm install
npm start
```
Une fois cela fait, le site sera accessible à l'URL suivant :
http://localhost:4100/effector-react-realworld-example-app/.

## À lire avant d'aller sur le site
Ce projet est basé sur le front `Real World`, site web de type "blog". Les technologies utlisées sont React et Typescript,
avec en complément Effector pour la gestion des états et Axios pour la communication avec l'API.  

Veuillez ne pas laisser le son de votre ordinateur trop fort... ;)

## Travail réalisé

Deux fonctionnalités principales ont été réalisée autour de l'API SWAPI, une API libre basée autour du
thème de Star Wars.  
Dans un premier temps, je me suis inspiré de l'existant, puis est ajouté un nouveau feed autour de Star Wars.
En reprenant la mise en forme, j'ai ajouté un nouveau feed Star Wars, permettant d'afficher les 6 films principaux
de la franchise ainsi que quelques informations les concernant. Comme ce site se veut avoir une portée intergalactique,
le site propose également d'afficher les informations en Wookiee. Cette partie du code se trouve dans le dossier 
[star_wars_feed](src/pages/home/pages/star-wars-feed).

Dans un second temps, après avoir mieux appréhendé les technologies et l'architecture du front, j'ai pris quelques libertés
sur celui-ci pour faire quelque chose de plus "fun".
Des informations récupérées par l'API se trouve notamment le texte défilant au début de chaque Star Wars. Pourquoi
ne pas faire alors le "Read more..." de ce texte, présent sur les previews des articles concernant les films, sous forme
de ce fameux texte défilant ?  
En cherchant un peu sur Internet sur comment faire ce genre d'animation, je suis tombé sur un [tutoriel](https://medium.com/dev-red/tutorial-animate-the-opening-star-wars-crawl-in-a-react-app-with-greensock-bc55a5d05d24) 
sur comment reproduire justement cette scène d'ouverture Star Wars avec React. Le code correspondant à l'animation est donc
repris de ce site et a été traduit vers du Typescript puis adapté vers du Functional Component et au contexte global de
l'application.   
Comme le texte devait être lié au film auquel se référait le bouton de la page de blog, il fallait pouvoir passer
les textes à cette page isolée. J'aurais pu pour cela passer par Effector et des états, mais j'ai préféré exploiter les
paramètres des requêtes GET, permettant ainsi de voir comment les utiliser avec React.  
La musique est quant à elle tirée d'[Internet](https://www.youtube.com/watch?v=VeFzYPKbz1g) (je n'ai pas autant de "talent" à la flûte),
n'ayant pas les droits sur l'original, nous pouvons éventuellement considérer celle-ci comme étant "parodique" et donc comme
étant du fair-use. Tout ce qui s'apparente à cette musique est isolé dans un composant React différent. En effet, passant
par un état ``useState`` pour gérer le fait qu'elle soit activée ou non, appeler le setter associé à cet état actualise le composant
lui-même et lance donc un nouveau rendu. Cela faisait buguer l'animation en la relançant sans supprimer celle déjà lancée.
Le fait donc de séparer ces deux composants permet de localiser le rendu, et donc de ne pas faire buguer cette animation.
C'est tout de même le composant parent qui crée la référence vers l'élément HTML  ``audio`` de l'enfant et qui le passe donc
à son descendant. Cela permet ainsi au parent de pouvoir lancer la musique au bon moment par rapport à l'animation.

## Problèmes rencontrés
N'étant pas très connaisseur des technologies React et Typescript, il m'a été d'autant plus difficile de me lancer dans
ce projet qui utilisait activement Effector qui m'était jusqu'à lors inconnu. Après 2-3 jours d'étude intensive du code,
à supprimer des morceaux pour voir les effets qu'ils avaient, ou encore à expérimenter lors du développement de la première fonctionnalité,
j'ai néanmoins commencer à prendre plus d'aisance sur les technologies utilisées en comprenant notamment mieux le rôle
qu'avait Effector dans le programme. 

En effet, Effector permet de gérer les états à notre place. Il permet notamment de gérer
l'asynchrone de façon plus sure, mais aussi de lier les états et/ou les événements entre eux pour éviter une désynchronisation 
des données. Cet aspect bien que très pratique, est néanmoins difficile à comprendre, notamment sur quelles sont les données
concernées par la propagation d'un changement d'état.  
Une fois cela mieux assimilé (non pas sans beaucoup de temps passé dessus), Effector s'avère tout de même agréable à utiliser
avec React, et permet de gérer toute la synchronisation sur laquelle il y aurait forcément eu des oublies/des bugs si j'avais
à le faire manuellement.

En plus d'Effector, j'ai pu être surpris du comportement de Typescript. En effet, étant habitué à programmer sur des langages
compilés et à typage statique comme Java ou encore Scala, je pensais retrouver la même chose avec Typescript qui est une surcouche à Javascript pour cela. 
Néanmoins, bien que Typescript soit statiquement typé lui-aussi, ce n'est pas
le cas de Javascript vers lequel il transpile, ainsi le typage n'est que de façade et tout n'est que type primitif,
objet ou tableau en fond. J'ai pu expérimenter cela (à mes dépens) avec ce que me retournait Axios après une requête à l'API.
En effet, Axios est de base conçu pour Javascript, ainsi tout est typé à ``any``. Je pensais que générifier le retour de la requête
au type que je souhaitais me protégeait des erreurs de typage, mais cela ne me protège finalement qu'à la compilation ! Je m'étais
trompé dans l'expression de mon type, et au lieu de râler au runtime à la récupération des données, les variables stockant ces
fameuses données prenaient aussi leur type, rendant mes accès aux attributs de mon type totalement caduc (plusieurs heures pour s'en rendre compte).
J'ai pu ainsi bien comprendre que dans ces conditions, les types ne sont pas tant des types que des masques pas nécessairement
adaptés aux données qui transitent au-dessous.

Le dernier gros souci rencontré concerne l'accès aux ressources (images ou sons). En effet, je n'ai pas réussi, aussi bien
en passant par des imports que par des `requires` à accéder à une seule de mes ressouces hébergées localement. Le temps me
manquant pour trouver la source du problème, j'ai donc opté par un hébergement externe : directement prendre le lien des images
sur Internet, et Dropbox pour la musique.
Si vous avez une réponse potentielle à ce problème, je serai d'ailleurs curieux que vous me la partagiez !

## Conclusion

Pour conclure, j'ai passé plus de temps que je l'aurais imaginé à faire ce TP, au vue des difficultés que j'ai rencontré.
Néanmoins, je suis tout de même satisfait d'avoir pu franchir la plupart d'entre elles, et tout aussi satisfait du rendu final.
React et Effector ont une logique qui me plaît bien, et peut-être essayerais-je de creuser un peu plus ces deux notions.
