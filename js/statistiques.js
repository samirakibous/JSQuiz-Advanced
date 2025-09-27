export function calculerPartiesParTheme(results) {
    return results.reduce((acc, partie) => {
        acc[partie.theme] = (acc[partie.theme] || 0) + 1;
        return acc;
    }, {});

    // let count1 = 0
    // let count2 = 0
    // let count3 = 0
    // results.forEach(element => {
    //     if (element.theme === "javascript")
    //         count1++
    //     else if (element.theme === "html")
    //         count2++
    //     else
    //         count3++
    // });
    // return {
    //     javascript: count1,
    //     html: count2,
    //     autres: count3
    // };
}

export function calculerScoreMoyenParTheme(results) {
    let themeActuel = results[0]?.theme || "";
    let total = 0;
    let count = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i].theme === themeActuel) {
            total += results[i].score;
            count++;
        }
    }

    let moyenne = count > 0 ? total / count : 0;

    return {
        theme: themeActuel,
        moy: moyenne
    };
}

export function calculerMeilleurScore(results) {

    // let meilleurScore=0;
    // for (let i=0;i<results.length;i++){
    //     if(results[i].score>meilleurScore){meilleurScore=results[i].score}
    // }
    // return meilleurScore;

    return results.reduce((max, partie) => Math.max(max, partie.score), 0);

}
export function avgScorefunction(results) {
    return (results.reduce((avg, element) => avg + element.score, 0) / results.length).toFixed(1);
}

export function obtenirClassementTop3(results) {
    let classement = [];
    for (let i = 0; i < results.length; i++) {
        let insere = false;
        for (let j = 0; j < classement.length; j++) {
            if (results[i].score > classement[j].score) {
                classement.splice(j, 0, { pseudo: results[i].pseudo, score: results[i].score });
                insere = true;
                break;
            }
        }
        if (!insere && classement.length < 3) {
            classement.push({ pseudo: results[i].pseudo, score: results[i].score });
        }
        if (classement.length > 3) {
            classement.pop();
        }
    }

    return classement;

}

export function diagrammePArtieParThem(partiesParTheme) {
    //    getContext("2d") cad dessin 2d
    const ctx = document.getElementById("themeChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(partiesParTheme),
            datasets: [{
                label: "Parties par thématique",
                data: Object.values(partiesParTheme),
                // backgroundColor: ["#D4AF37", "#CD853F", "#36454F"], 
                // hoverBackgroundColor: ["#E6C757", "#D2B48C", "#4F5F6F"]
                backgroundColor: ["#F39C12", "#E67E22", "#34495E"],
                hoverBackgroundColor: ["#F5B041", "#EB984E", "#5D6D7E"]
            }]
        }
    });
}

export function progressionScores(results) {
    //   const progression = [];
    // results.sort((a, b) => new Date(a.date) - new Date(b.date));

    // for (let i = 0; i < results.length; i++) {
    //     progression.push({
    //         date: results[i].date,
    //         score: results[i].score
    //     });
    // }
    // return progression;

    return results
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(p => ({ date: p.date, score: p.score }));
}

export function afficherGraphiqueProgression(progression) {
    const ctx = document.getElementById("progressChart").getContext("2d");
    const labels = [];
    const scores = [];
    for (let i = 0; i < progression.length; i++) {
        labels.push(progression[i].date);
        scores.push(progression[i].score);
    }
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Scores dans le temps",
                data: scores,
                borderColor: "yellow",
                fill: false
            }]
        }
    });
}
