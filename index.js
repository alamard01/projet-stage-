import * as WebIFC from "web-ifc";  //  Importe le module web-ifc (une bibliothèque)
import * as fs from "node:fs";  // importe le module fs (permet de travailler avec les fichiers)
const filename = "tested_sample_project.ifc";   //définit la constante filename 
const ifcAPI = new WebIFC.IfcAPI(); //  crée une nouvelle instance de l'API IFC
await ifcAPI.Init();    // initialise l'API IFC
const ifcData = fs.readFileSync(filename); //  Lit le fichier IFC et stocke son contenu dans ifcData
let modelID = ifcAPI.OpenModel(ifcData);// ouvre le modèle IFC et obtient un ID de modèle
let allLines = ifcAPI.GetAllLines(modelID);    // Récupère toutes les lignes du modèle
console.log("All Lines:", allLines);    // Affiche toutes les lignes dans la console
let someLineID = allLines.get(1); // obtient l'ID de la première ligne
let line = ifcAPI.GetLine(modelID, someLineID);     // récupère les données de la ligne avec cet ID
console.log("Line:", line);// affiche les données de la ligne dans la console

//console.log("hello")


