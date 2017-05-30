/*
Author: Wesley Bursch
Version: 1.0.0
Date: 5/30/2017
*/

// Required Packages
var prompt = require('prompt');
var fs = require('fs');
var csv = require('fast-csv');

prompt.start();

//Get CSV Path from User using a prompt 
 prompt.get(['CSVPath'], function (err, result) {
   //Get Stream from path 
	var stream = fs.createReadStream(result.CSVPath);
	// Initialize Variables
	var ageCount = {}; //Age Count object where the property is the Age and the Value is the Count
	var age = '';
    csv
		// No headers in CSV 
		.fromStream(stream, {headers : false}, {ignoreEmpty: true})
		// Parse the Csv file by line
		.on('data',function(data){
			// Set age as the data in the second column
			age = data[1];
			// if the age property has already been set add to the count of that property, if not set value of 1
			if(ageCount.hasOwnProperty(age)){ageCount[age] = ageCount[age]+1;}else{ageCount[age] = 1;}
		
		})
		.on('end',function(data){
		// print object to console, Age : Count delimited by commas
		console.log(ageCount);
		});
  });