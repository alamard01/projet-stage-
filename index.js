import * as WebIFC from "web-ifc";
import * as fs from "node:fs";
const filename = "a filename here";
const ifcAPI = new WebIFC.IfcAPI();
await ifcAPI.Init();
const ifcData = fs.readFileSync(filename);
let modelID = ifcAPI.OpenModel(ifcData);

let allLines = WebIFC.GetAllLines(modelID);
console.log("All Lines:", allLines);

let someLineID = allLines[1]; 
let line = WebIFC.GetLine(modelID, someLineID);
console.log("Line:", line);
 
 