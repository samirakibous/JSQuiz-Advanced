export async function chargerQuestions(theme) {
    try {
        //on construit le chemin du fichier JSON en fonction du thème
        const fichier = `./data/${theme}.json`;
        //requette http pour récupérer ce ficher
        const res = await fetch(fichier);
        if (!res.ok) throw new Error("Fichier introuvable");
        const data = await res.json();
        return data.questions;
    } catch (error) {
        console.error(error);
        alert("Erreur de chargement du quiz");
        return [];
    }
}
