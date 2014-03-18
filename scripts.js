
//This is my awesome script to take a json and build a CSV. 

function dataLoaded (PAROLE) {
	
	console.log (PAROLE)
	

	var myParoleData = PAROLE.results;
	
	//empty array for my awesome array
	var myParoleArray = [];
	
	//creating my new headers
	var headerParoleArray = ["NYSID", "Inmate Last Name","Inmate First Name", "Current Crime DIN", "Birthdate", "Date Received (original)", "Date Received (current)", "Current Crime1" ];
	
	myParoleArray.push(headerParoleArray);
	
	//awesome for loop to create my new array of arrays with what I want.
	for(var i=0; i<myParoleData.length; i++) {
		
		var currObj = myParoleData[i];

		var currArray = [currObj.nysid, currObj["offenses"][0]["identifying"]["Inmate Name"], 
		currObj["offenses"][0]["identifying"]["Definition of DIN (Department Identification Number)"], 
		currObj["offenses"][0]["identifying"]["Date of Birth"],
		currObj["offenses"][0]["identifying"]["Definition of Date Received (Original)"],
		currObj["offenses"][0]["identifying"]["Definition of Date Received (Current)"],
		currObj["offenses"][0]["crimes"][0]["crime"]];
		
		myParoleArray.push(currArray);
	}
	//checking out the final product.
	console.log(myParoleArray);
	
	//Pushing to csv:
	var csvContent = "data:text/csv;charset=utf-8,"; 
	myParoleArray.forEach(function(infoArray, index){  
		dataString = infoArray.join(","); 
		csvContent += index < infoArray.length ? dataString+"\n" : dataString+"\n";  });
	var encodedUri = encodeURI(csvContent); 
	window.open(encodedUri);
}



//Calling my json.
function pageLoaded () {
	
	//console log checks to make sure that page loaded works.
	console.log ("Got to page loaded.");
	
	$.get("parole_test.json", dataLoaded, "json");
	
}




//Activating my awesome array maker on document ready.
$(document).ready(pageLoaded);

//Putting an end page console log just for double checking things.
console.log ("This is the end page console log. Just for double checking things.");