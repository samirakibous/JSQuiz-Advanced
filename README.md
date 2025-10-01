# Quiz Application

le version 2 de l'application de quiz interactive développée en JavaScriptavec HTML et CSS.  
L’application permet de choisir un thème, répondre aux questions avec un chronomètre, visualiser ses résultats et exporter un rapport PDF.

---

Fonctionnalités
Choix d’un pseudo et d’une thématique.
10 questions par thématique. 
Réponses simples ou multiples possibles. 
Chronomètre par question (si temps écoulé → réponse fausse). 
Calcul du score + affichage des corrections. 
Sauvegarde des résultats en localStorage (pseudo, date, score, thématique, réponses). 
Interface responsive (desktop & mobile).
dashboard avec des statistiques 
export de l'historique json/csv
reprendre un quiz interrompu

Structure
C:.
│   dashboard.html
│   index.html
│   README.md
│
├───css
│       dashboard.css
│       style.css
│
├───data
│       css.json
│       html.json
│       javascript.json
│
└───js
        dashboard.js
        dataLoader.js
        elements.js
        export.js
        historique.js
        main.js
        pseudo.js
        quiz.js
        rapportPdf.js
        statistiques.js
        utils.js

Utilisation
cloner le dépot : https://github.com/samirakibous/JSQuiz-Advanced Ouvrir index.html dans le navigateur. Lancer le quiz .