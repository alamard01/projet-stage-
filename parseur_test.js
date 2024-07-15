// essayons d'itérer le parseur 


import fs from 'fs';   // permet la manipulation des fichiers 
const testFolder = 'C:\\Users\\Arthur\\Documents\\projet stage';
fs.readdir(testFolder, (err, files) => {
  if (err) {//Détecte les erreurs de lecture du répertoire 
    console.error('Erreur lors de la lecture du répertoire', err);
    return;
  }
  const filteredFiles = files.filter(file => file.includes('ids'));   // filtre les fichiers contenant 'ids' 
  console.log('Fichiers ids trouvés :');//  Affiche les fichiers filtrés dans la console 
  filteredFiles.forEach(file => { //Parcourt les fichiers et les affiche dans la console 
    console.log(file);
  });
});
