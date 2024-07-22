import fs from 'fs';     // permet la manipulation des fichiers 
import { parseString } from 'xml2js'; //  permet le parsing 
const testFolder = 'C:\\Users\\Arthur\\Documents\\stage université cardiff\\projet stage';
function parseXMLFile(filename) {//Fonction pour lire et parser un fichier XML
    fs.readFile(filename, 'utf-8', (err, data) => {  // Lit le fichier
        if (err) {   //  vérifie s'il y a une erreur (lecture)
            console.error(`Erreur lors de la lecture du fichier ${filename}`, err);  // affiche l'erreur
            return;
        }
        parseString(data, (err, result) => {   //Parse le fichier
            if (err) {   //  vérifie s'il y a une erreur (parsing)
                console.error(`Erreur lors du parsing du fichier ${filename}`, err);  // affiche l'erreur
                return;
            }
            console.log(`Contenu du fichier ${filename} (parsed) :`, result);  // Affiche le résultat dans la console du parsing
        });
    });
}
fs.readdir(testFolder, (err, files) => {  // Lit le répertoire
    if (err) {  // Détecte les erreurs de lecture du répertoire
        console.error('Erreur lors de la lecture du répertoire', err);
        return;
    }
    const filteredFiles = files.filter(file => file.includes('ids'));   // filtre les fichiers contenant 'ids'
    console.log('Fichiers ids trouvés :');  //  affiche les fichiers filtrés dans la console
    filteredFiles.forEach(file => {  //parcourt les fichiers et les affiche dans la console
        console.log(file);
        const filePath = `${testFolder}\\${file}`;
        parseXMLFile(filePath);   // Appel de la fonction pour parser chaque fichier XML
    });
});
