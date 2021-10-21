// "word" : ["category", "Hint", "image_file_name.extension"]
//NOTE: DO NOT ADD SPACES IN THE WORD!!!
//Use hyphen '-' instead of spaces inside the word to be guessed

//Every word belongs into one of 3 categories: 'Infectious Disease', 'Infectious Disease Categories'
//Place the corresponding image of each word into the 'Assets' folder present inside the 'guessUp' folder
 

window.easywords = {
	"virus" : ["Infectious Disease","Pathogens made of protein shell that contain RNA or DNA. Infects host cell." , "virus.jpg"]
}

window.mediumwords = {
	"incubation-period" : ["Infectious Disease", "Time period between contracting infection and seeing the first symptom", "incubation.png"],
	"infectious-period" : ["Infectious Disease", "Time during which the infected person can speard the disease and infect others", "infectious.png"],
	"carrier" : ["Infectious Disease", "Asympotatic contagious people", "carrier.png"],
	"endemic" : ["Infectious Disease", "Amount of disease usually present in a given community", "virus.jpg"],
	"epidemic" : ["Infectious Disease", "Drastic increase in the number of people infected with a disease in a given community", "virus.jpg"],
	"pandemic" : ["Infectious Disease", "An epidemic that has spread to several countries or continents, affecting a large number of people", "virus.jpg"],
}

window.hardwords = {
	"case-fatality" : ["Infectious Disease", "Measure of the severity of a disease, i.e., proportion of people people that die from being infected", "case.png"],
	"basic-reproductive-rate" : ["Infectious Disease","Average number of secondary cases that occurs as a result of one infected individual" , "brr.png"],
	"secondary-attack-rate" : ["Infectious Disease", "Proportion of people exposed to the disease that develop an infection", "sar.png" ],
	"zoonotic" : ["Infectious Disease Categories", "Infectious diseases which are transmitted from animals to humans. For ex: Leptospirosis, Toxoplasmosis, Rabies, Campylobacter", "zoo.jpg"],
	"emerging-infectious-disease" : ["Infectious Disease Categories", "Disease that has appeared in the population for the first time or one that may have existed previously but rapidly increaseing in incidence or geographical range. For ex: MERS CoV, Ebola, Influenza", "eid.png"],	
	"neglected-tropical-disease" : ["Infectious Disease Categories", "Group of diseases that affect the poorest countries of the world. For ex: Leishmaniasis, Trachoma, Sleeping Sickness, Schistosomiasis", "ntd.jpg"],
	"vector-borne-disease" : ["Infectious Disease Categories", "Diseases that are transmitted from an infected animal or human through the bite of vector (ex: mosquito, ticks, flies, fleas). For ex: Malaria, Dengue, Sleeping Sickness, Schistosomiasis", "vector.png"]
}