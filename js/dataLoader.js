export async function chargerQuestions(theme) {
    try {
        const fichier = `./data/${theme}.json`;
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
