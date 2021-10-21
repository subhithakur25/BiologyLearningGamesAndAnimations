// "word" : ["category", "Hint", "image_file_name.extension"]
//NOTE: DO NOT ADD SPACES IN THE WORD!!!
//Use hyphen '-' instead of spaces inside the word to be guessed

//Every word belongs into one of 3 categories: 'Plant', 'Animal or Virus' or 'Unicellular'
//Place the corresponding image of each word into the 'Assets' folder present inside the 'guessUp' folder
 

window.easywords = {
"mitochondria" : [ "Plant", "Power house of the cell", "mitochondria.jpg"],
"nucleus" : ["Plant", "Brain of a cell", "nucleus.jpg"],
"plant-cell" : ["Plant", "Basic unit of life in organisms of the kingdom plantae", "plantcell.jpg"],
"animal-cell" : ["Animal or Virus", "Basic unit of life in organisms of the kingdom animalia", "animal.jpg"],
"virus" : ["Animal or Virus","Infects a host cell" , "virus.jpg"],
"amoeba" : ["Unicellular", "Unicellular organism which has the ability to alter its shape", "amoeba.jpg"],
"paramecium" : ["Unicellular", "Genus of unicellular ciliates, commonly studied as a representative of the ciliate group", "paramecium.jpg" ]
}
window.mediumwords = {
"plasma-membrane" : [ "Unicellular", "membrane of lipids and proteins that forms the external boundary of a cell and serves as a gate keeper letting only select things in and out", "mitochondria.jpg"],
"cell-wall" : ["Plant", "tough, rigid outer covering that protects and provides shape to the cell", "nucleus.jpg"],
"cytosol" : ["Unicellular", "gel-like fluid that fills the cell, holds organelles in place, and aids in waste break down and energy transformation (metabolism)", "plantcell.jpg"],
"organ-system" : ["Animal", "organs working together to perform certain functions", "animal.jpg"],
"organelle" : ["Animal","specialized subunit within cells that performs specific functions" , "virus.jpg"],
"ribosomes" : ["Unicellular", "Non-membrane bound structures which make proteins", "paramecium.jpg" ]
}
window.hardwords = {
"prokaryotic" : [ "Plant", "cells that lack membrane-bound nuclei or organelles", "mitochondria.jpg"],
"eukaryotic" : ["Plant", "cells with membrane-bound nuclei and other organelles", "nucleus.jpg"],
"golgi-apparatus" : ["Plant", "membrane-bound organelle of flattened stacks where proteins are processed, packaged, and sent out as vesicles", "plantcell.jpg"],
"rough-endoplasmic-reticulum" : ["Animal or Virus", "membrane-bound organelle studded with ribosomes which modify proteins", "animal.jpg"],
"cytoplasm" : ["Animal or Virus","all the contents inside a cell" , "virus.jpg"],
"photosynthesis" : ["Plant", "process in which plants covert solar energy into chemical energy in the form of sugar (glucose)", "amoeba.jpg"],
"smooth-endoplasmic-reticulum" : ["Unicellular", "membrane-bound organelle not studded with ribosomes which modify proteins", "paramecium.jpg" ]
}
