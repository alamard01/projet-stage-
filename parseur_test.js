import fs from 'fs'; // permet la manipulation des fichiers
import { parseString } from 'xml2js'; // permet le parsing
const testFolder = 'C:\\Users\\Arthur\\Documents\\stage université cardiff\\projet stage';
function parseXMLFile(filename) {
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Erreur lors de la lecture du fichier ${filename}`, err);
            return;
        }
        console.log(`Contenu du fichier ${filename} :`, data); // affiche le contenu du fichier
        // Configuration de xml2js pour gérer les namespaces
        const parseOptions = {
            tagNameProcessors: [name => name.split(':').pop()], // Supprime les namespaces des noms des tags
            explicitArray: false, // Désactive l'encapsulation des éléments uniques dans des tableaux
        };
        parseString(data, parseOptions, (err, result) => {
            if (err) {
                console.error(`Erreur lors du parsing du fichier ${filename}`, err);
                return;
            }
            console.log(`Structure du fichier parsé :`, JSON.stringify(result, null, 2)); // Affiche la structure complète de l'objet
            if (result && result.ids) {
                console.log(`Contenu de l'élément IDS du fichier ${filename} :`, result.ids);
                // Extraction des "infos"
                if (result.ids.info) {
                    console.log('infos :');
                    const info = result.ids.info;
                    console.log(`title: ${info.title}`);
                    console.log(`copyright: ${info.copyright}`);
                    console.log(`date: ${info.date}`);
                    console.log(`description: ${info.description}`);
                    console.log(`version: ${info.version}`);
                    console.log(`author: ${info.author}`);
                    console.log(`purpose: ${info.purpose}`);
                    console.log(`milestone: ${info.milestone}`);
                } else {
                    console.log('Aucune info trouvée');
                }
                // Extraction des "spécifications"
                if (result.ids.specifications && result.ids.specifications.specification) {
                    console.log('specifications :');
                    const specs = Array.isArray(result.ids.specifications.specification)
                        ? result.ids.specifications.specification
                        : [result.ids.specifications.specification];
                    specs.forEach(spec => {
                        console.log(`ifcVersion: ${spec.$.ifcVersion}`);
                        console.log(`name: ${spec.$.name}`);
                        // Extraction de "applicability"
                        if (spec.applicability && spec.applicability.entity) {
                            console.log('applicability :');
                            const entities = Array.isArray(spec.applicability.entity)
                                ? spec.applicability.entity
                                : [spec.applicability.entity];
                            entities.forEach(entity => {
                                if (entity.name && entity.name.simpleValue) {
                                    console.log(`entity name: ${entity.name.simpleValue}`);
                                }
                            });
                        } else {
                            console.log('Aucune applicability trouvée');
                        }
                        // Extraction de "requirements"
                        if (spec.requirements && spec.requirements.attribute) {
                            console.log('requirements :');
                            const attributes = Array.isArray(spec.requirements.attribute)
                                ? spec.requirements.attribute
                                : [spec.requirements.attribute];
                            attributes.forEach(attribute => {
                                if (attribute.name && attribute.name.simpleValue) {
                                    console.log(`attribute name: ${attribute.name.simpleValue}`);
                                }
                            });
                        } else {
                            console.log('Aucun requirement trouvé');
                        }
                    });
                } else {
                    console.log('Aucune spécification trouvée');
                }
            } else {
                console.log(`L'élément IDS n'a pas été trouvé dans le fichier ${filename}`);
            }
        });
    });
}
// Fonction pour parcourir tous les fichiers du répertoire et parser ceux qui contiennent 'ids'
function parseAllXMLFilesInDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Erreur lors de la lecture du répertoire', err);
            return;
        }
        const filteredFiles = files.filter(file => file.includes('ids')); // Filtre les fichiers contenant 'ids'
        console.log('Fichiers ids trouvés :');
        filteredFiles.forEach(file => {
            console.log(file);
            parseXMLFile(`${directory}\\${file}`); // Parse chaque fichier filtré
        });
    });
}
parseAllXMLFilesInDirectory(testFolder); // Appel de la fonction pour parcourir le répertoire et parser les fichiers