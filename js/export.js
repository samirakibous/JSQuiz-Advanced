export function exporterEnJSON(results, filename = "historique.json") {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const a = document.createElement("a");
    a.setAttribute("href", dataUri);
    a.setAttribute("download", filename);
    a.click();
}


export function exporterEnCSV(results, filename = "historique.csv") {
    //bach wantagcha ijen csv vide
    if (!results || results.length === 0) return;

    const csvRows = [];

    // Récupérer les entêtes 
    let headers = [];
    for (let key in results[0]) {
        headers.push(key);
    }
    csvRows.push(headers.join(","));

    results.forEach(result => {
        const values = [];
        for (let key in result) {
            let val = result[key];
            if (Array.isArray(val)) {
                val = val.join("|");
            }
            values.push(`"${val}"`);
        }
        csvRows.push(values.join(","));
    });
    const csvString = csvRows.join("\n");

    //nteg ijen lien pour télécharger le fichier
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvString);
    link.download = filename;
    link.click();
}



