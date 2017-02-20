'use strict'

var funcs;
try{
	funcs = require('../funcs');
}
catch(err){
	console.log(err);
}


jcmp.events.Add('VehicleCreated', vehicle => {
	funcs.applyhandlingfromfile(vehicle, 1200);
});