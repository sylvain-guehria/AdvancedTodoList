[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">AdvancedTodoList</h3>

  <p align="center">
    Ce repository contient le code de mon application AdvancedTodoList qui est une todolist interactive qui a pour but d'aider qui le veut à lister et à prioriser ses tâches afin d'etre le plus efficace possible. La particularité de cette application sera la matrice de eisenhower intégrée qui est un outil ingénieur pour l'organisation et la priorisation des tâches.
   <br />
    <br />
    <a href="https://github.com/bloodysysy73/AdvancedTodoList"><strong>Arborescence des fichiers</strong></a>
    <br />
  
  <br />
  Cette application web est réalisée en typescript avec le framework vuejs 
    <br />
</p>



<!-- TABLE OF CONTENTS -->
## Sommaire

* [Principe de l'application](#principe-de-lapplication)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## Principe de l'application

Cette application web est une todolist avec outil graphique.

[![Capture mainview][capture-mainview]]

On ajoute des tasks qui sont visible via l'onglet todolist.

Le fomulaire d'ajout de tâche : 

[![Capture addform][capture-addform]]

Le rendu de la liste : 

[![Capture todolist][capture-todolist]]

Chacune de ces tâches est modifiable via les bouton edit. De plus on peut cliquer sur les flêches vertes pour trier la liste par importance, date, nombre de jour restant...

Il est également possible d'avoir une description compléte de la tâche en cliquant sur la ligne associée. La description s'ouvre dans le modal suivant :

[![Capture description][capture-description]]

Quels sont les objectifs ?

Mettre à disposition des personnes qui travaillent un outil d'organisation visuel et simple d'utilisation.

Mes objectifs ? 
* []() Un design moderne et responsive
* []() Une utilisation simple
* []() Un résultat visuel pour prioriser ses tâches en un coup d'oeil
* []() Une connexion avec google ou un email pour persister ses données (j'utiliserai firebase)

### Built With

* []() Typescript
* []() vuejs
* []() vuex 
* []() vuetify


<!-- GETTING STARTED -->
## Getting Started

Pour obtenir un copie locale de cette application veuillez suivre ces étapes. 

### Prerequisites

installer node:

* npm
```sh
npm install npm@latest -g
```


### Installation
 
1. Cloner le repo du front dans un dossier
```sh
git clone git@github.com:bloodysysy73/AdvancedTodoList.git
```
2. Installer NPM packages
```sh
npm install
```
3. Lancer l'application 
```sh
npm run serve
```
3. Lancer l'interface avec votre client (se lance toute seule avec VS code)
```sh
http://localhost:8080
```

<!-- USAGE EXAMPLES -->
## Usage


<!-- CONTACT -->
## Contact

Sylvain GUEHRIA   - sylvain.guehria@gmail.com - 06 64 39 70 53

[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/sylvain-guehria-ab9737134/
[capture-mainview]: src/assets/images/mainview.png
[capture-addform]: src/assets/images/addform.png
[capture-description]: src/assets/images/description.png
[capture-todolist]: src/assets/images/todolist.png



