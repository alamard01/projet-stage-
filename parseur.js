import fs from 'fs';     // permet la manipulation des fichiers 
import { parseString } from 'xml2js'; //  permet le parsing 
const filename = 'IDS_aachen_example.ids' ;  //Chemin vers votre fichier XML
function parseXMLFile(filename) {//  Fonction pour lire et parser un fichier XML
    fs.readFile(filename, 'utf-8', (err, data) => {  // Lit le fichier 
        if (err) {     // vérifie s'il y a une erreur (lecture)
        console.error(`Erreur lors de la lecture du fichier ${filename}`, err);  //affiche l'erreur 
            return;         
        }
        parseString(data, (err, result) => {   // Parse le fichier
            if (err) {   // vérifie s'il y a une erreur (parsing)
                console.error(`Erreur lors du parsing du fichier ${filename}`, err);  //  Affiche l'erreur 
                return;                              
            }
        console.log(`Contenu du fichier ${filename} (parsed) :`, result);  // Affiche le résultat dans la console du parsing 
        });
    });
}
parseXMLFile(filename);//Appel de la fonction pour parser le fichier XML
