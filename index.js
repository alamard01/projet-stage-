import * as WebIFC from "web-ifc";
import * as fs from "node:fs";
const filename = "tested_sample_project.ifc";
const ifcAPI = new WebIFC.IfcAPI();
await ifcAPI.Init();
const ifcData = fs.readFileSync(filename);
let modelID = ifcAPI.OpenModel(ifcData);

let allLines = ifcAPI.GetAllLines(modelID);
console.log("All Lines:", allLines);

let someLineID = allLines.get(1); 
let line = ifcAPI.GetLine(modelID, someLineID);
console.log("Line:", line);
console.log("hello")
 
 