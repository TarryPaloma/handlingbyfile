function applyhandlingfromfile(vehicle, pause, handlingfile){
	const fs = require('fs');
	//try to read in a handling file for this vehicle....
	if(typeof handlingfile == 'undefined'){
		handlingfile = vehicle.modelHash;
	}
	fs.readFile(`./packages/handlingbyfile/handlingdata/${handlingfile}.json`, (err,data) => {
		//if it doesn't exist, make it..
		if(err){
			var tofile = JSON.stringify(vehicle.handling,null,'\t');
			fs.writeFile(`./packages/handlingbyfile/handlingdata/${handlingfile}.json`, `${tofile}`, (err) =>{
				if(err){
					return console.log(err);
				}
			});
			//and report to console, admin can check to know what file to edit..
			console.log(`saved handling data to ./packages/handlingbyfile/handlingdata/${handlingfile}.json`);
			return;
		}	
		var sourceobj = JSON.parse(data); //get handling from imported data..
		var targetobj = vehicle.handling; //we're going to apply it to the spawned vehicle..
		//console.log(`b4recurse F: ${vehicle.handling.car.brakes.front.maxBrakeTorque} R: ${vehicle.handling.car.brakes.rear.maxBrakeTorque} Tq:${vehicle.handling.car.engine.torqueFactorAtOptimalRpm}`);
		recursivelyequatetofile(sourceobj,targetobj); //calling our recursing function..
		setTimeout(function() {
			if(typeof vehicle.handling !== 'undefined'){
				vehicle.handling.Apply();
			}
		}, pause);
	});
}
	
function recursivelyequatetofile(sourceobj,targetobj){
		//now cycle through each property in vehicle.handling..
	if(typeof targetobj == 'undefined'){
		return;
	}
	Object.keys(targetobj).forEach((key) => {
		//console.log(`key ${key}`); debug
		//ensure it's a property of vehicle.handling, not inherited from parent class
		if(targetobj.hasOwnProperty(key)){ 
			//if it's a sub-object, call this function again (recurse!)..
			if(typeof targetobj[key] == "object"){
				recursivelyequatetofile(sourceobj[key],targetobj[key]);
			}
			//if it's a number, set it to the one from file.
				else{
					//console.log(`file: ${sourceobj[key]} target: ${targetobj[key]}`); debug
					targetobj[key] = sourceobj[key];
					//console.log(`target: ${targetobj[key]}`); debug
				}
			}
	});
}
	//console.log(`aftrec F: ${vehicle.handling.car.brakes.front.maxBrakeTorque} R: ${vehicle.handling.car.brakes.rear.maxBrakeTorque} Tq:${vehicle.handling.car.engine.torqueFactorAtOptimalRpm}`);
	//console.log(`read handling data from ./packages/handlingbyfile/handlingdata/${handlingfile}.json`); //for debug

module.exports.applyhandlingfromfile = applyhandlingfromfile;