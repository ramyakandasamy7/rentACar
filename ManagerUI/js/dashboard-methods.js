var CARS = null;
var LOCATIONS = null;
var LOC_NAMES = {};


function getAllLocations() {
	$.ajax({
		url: MANAGER_API+"location",
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data.Items);
		window.LOCATIONS = data.Items;
		for (i = 0; i < LOCATIONS.length; i++) {
			let id      = LOCATIONS[i].ID;
			let name    = LOCATIONS[i].name;
			let delbtn  = "<a href='#' class='text-danger ml-1' onclick='deleteLocation(\""+id+"\");' title='Delete Location'><i class='fas fa-trash fa-lg'></i></a>"; 
			let editbtn = "<a href='#' class='text-primary mr-1' onclick='editLocation(\""+id+"\");' data-toggle='modal' data-target='#edit_modal' title='Edit Location Info'><i class='fas fa-edit fa-lg'></i></a>"; 
			LOCATIONS[i].options = editbtn + delbtn;
			LOC_NAMES[id] = name;
		}
		populateLocations("new_location");
		if (CARS === null) {
			getAllInventory();
		}
		renderLocationTable(data.Items);
	});	
}

function getAllInventory() {
	$.ajax({
		url: MANAGER_API+"inventory",
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data.Items);
		window.CARS = null;
		window.CARS = data.Items;
		countCarsPerLocation();
		for (i = 0; i < CARS.length; i++) {
			let id      = CARS[i].ID;
			let locId   = CARS[i].locationID;
			let delbtn  = "<a href='#' class='text-danger ml-1' onclick='deleteCar(\""+id+"\");' title='Delete Car'><i class='fas fa-trash fa-lg'></i></a>"; 
			let editbtn = "<a href='#' class='text-primary mr-1' onclick='editCar(\""+id+"\");' data-toggle='modal' data-target='#edit_modal' title='Edit Car Info'><i class='fas fa-edit fa-lg'></i></a>"; 
			CARS[i].locationName = "";
			CARS[i].options = editbtn + delbtn;
			for (x in LOC_NAMES) {
				if (locId === x) {
					CARS[i].locationName = LOC_NAMES[x];
				}
			}
			if (CARS[i].locationName === "") {
				CARS[i].locationName = "<span class='text-danger'>Not Assigned</span>";
			}
		}
		renderInventoryTable(CARS);
	});	
}

function countCarsPerLocation() {
	window.locationTable.destroy();
	for (i = 0; i < LOCATIONS.length; i++) {
		let id = LOCATIONS[i].ID;
		let c  = 0;
		for (x = 0; x < CARS.length; x++) {
			if (CARS[x].locationID == id) {
				c++;
			}
		}
		LOCATIONS[i].currentVehicleCount = c.toString();
	}
	renderLocationTable(LOCATIONS);
}

function updateLocationTable(data) {
        window.locationTable.destroy();
        getAllLocations(data);
}

function updateInventoryTable(data) {
        window.inventoryTable.destroy();
	getAllInventory();
}

function addLocation() {
        let name  = $('#new_name').val();
        let addr  = $('#new_address').val();
        let city  = $('#new_city').val();
        let state = $('#new_state').val();
        let cap   = $('#new_capacity').val();
        let count = $('#new_count').val();
        let comp  = $('#new_compact').val();
        let sedan = $('#new_sedan').val();
        let suv   = $('#new_suv').val();
        let truck = $('#new_truck').val();
        let lux   = $('#new_luxury').val();

	console.log("Adding ",name);

	$.ajax({
		url: MANAGER_API+"location",
		type: "POST",
		data: {
			name:     name,
			address:  addr,
			city:     city,
			state:    state,
			capacity: cap,
			count:    count,
			compact:  comp,
			sedan:    sedan,
			suv:      suv,
			truck:    truck,
			luxury:   lux
		}
	}).done(function(data, stat, statCode) {
        	console.log(data);
        	console.log(stat);
        	console.log(statCode);
		updateLocationTable();
	});

}

function sendLocationEdit(id) {
	let name  = $("#edit_name").val();
	let addr  = $("#edit_address").val();
	let city  = $("#edit_city").val();
	let state = $("#edit_state").val();
	let capa = $("#edit_capacity").val();
	let comp = $("#edit_compact").val();
	let sedan = $("#edit_sedan").val();
	let suv = $("#edit_suv").val();
	let truck = $("#edit_truck").val();
	let luxur = $("#edit_luxury").val();

	$.ajax({
		url: MANAGER_API+"location",
		type: "PUT",
		data: {
			id: id,
			name: name,
			address: addr,
			city: city,
			state: state,
			capacity: capa,
			compact: comp,
			sedan: sedan,
			suv: suv,
			truck: truck,
			luxury: luxur
		}
	}).done(function(data, stat, statCode) {
		console.log(statCode);
		updateLocationTable();
	});
}

function deleteLocation(id) {
	let confirmDelete = confirm("Are you really sure you want to remove this location from the database?");

	if (confirmDelete === true) {
		$.ajax({
			url: MANAGER_API+"location/"+id,
			type: "DELETE"
		}).done(function(data, stat, statCode) {
			console.log(data);
			console.log(stat);
			console.log(statCode);
			updateLocationTable();
		});
	}
}

function editLocation(id) {
	let lotI = LOCATIONS.find(x => x.ID === id);
	console.log(lotI);
	$("#edit_body").empty();
	$("#edit_footer").empty();
	$("#edit_body").append(
		"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Name</span>"
                        +"</div>"
                        +"<input type='text' id='edit_name' class='form-control' aria-label='Name' aria-describedby='Location Name' value='Milpitas-Lot-A1'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Address</span>"
                        +"</div>"
                        +"<input type='text' id='edit_address' class='form-control' aria-label='Address' aria-describedby='Location Address' value='160 N Main St'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>City</span>"
                        +"</div>"
                        +"<input type='text' id='edit_city' class='form-control' aria-label='City' aria-describedby='Location City' value='Milpitas'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>State</span>"
                        +"</div>"
                        +"<input type='text' id='edit_state' class='form-control' aria-label='State' aria-describedby='Location State' value='CA'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Vehicle Capacity</span>"
                        +"</div>"
                        +"<input type='number' id='edit_capacity' class='form-control' aria-label='Capacity' aria-describedby='Capacity' value='200'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Compact Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_compact' class='form-control' aria-label='Compact Price' aria-describedby='Compact Price' value='19.99'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Sedan Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_sedan' class='form-control' aria-label='Sedan Price' aria-describedby='Sedan Price' value='23.99'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>SUV Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_suv' class='form-control' aria-label='SUV Price' aria-describedby='SUV Price' value='26.99'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Truck Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_truck' class='form-control' aria-label='Truck Price' aria-describedby='Truck Price' value='30.99'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Luxury Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_luxury' class='form-control' aria-label='Luxury Price' aria-describedby='Luxury Price' value='45.99'>"
                +"</div>"
	);
	$("#edit_footer").append(
		"<button type='button' class='btn btn-primary btn-sm' onclick='sendLocationEdit(\""+lotI.ID+"\");'>Save</button>"
                +"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Cancel</button>"
	);

	$("#edit_name").val(lotI.name).text(lotI.name);
	$("#edit_address").val(lotI.address).text(lotI.address);
	$("#edit_city").val(lotI.city).text(lotI.city);
	$("#edit_state").val(lotI.state).text(lotI.state);
	$("#edit_capacity").val(lotI.vehicleCapacity).text(lotI.vehicleCapacity);
	$("#edit_compact").val(lotI.compactPPH).text(lotI.compactPPH);
	$("#edit_sedan").val(lotI.sedanPPH).text(lotI.sedanPPH);
	$("#edit_suv").val(lotI.suvPPH).text(lotI.suvPPH);
	$("#edit_truck").val(lotI.truckPPH).text(lotI.truckPPH);
	$("#edit_luxury").val(lotI.luxuryPPH).text(lotI.luxuryPPH);
}

function addCar() {
	let make  = $('#new_make').children("option:selected").val();
	let model = $('#new_model').val();
	let year  = $('#new_year').children("option:selected").val();
	let type  = $('#new_type').children("option:selected").val();
	let cond  = $('#new_condition').children("option:selected").val();
	let locat = $('#new_location').val();
	let lic   = $('#new_license').val();
	let miles = $('#new_mileage').val();
	let serv  = $('#new_service').val();

	console.log(make);

	$.ajax({
		url: MANAGER_API+"inventory",
		type: "POST",
		data: {
			make: make,
			model: model,
			year: year,
			type: type,
			condition: cond,
			locationId: locat,
			licensePlate: lic,
			mileage: miles,
			lastServiced: serv
		},
	}).done(function(data, stat, statCode) {
		console.log(statCode);
		updateInventoryTable();
	});
}

function sendCarEdit(id) {
	let make  = $('#edit_make').children("option:selected").val();
	let model = $('#edit_model').val();
	let year  = $('#edit_year').children("option:selected").val();
	let type  = $('#edit_type').children("option:selected").val();
	let cond  = $('#edit_condition').children("option:selected").val();
	let locat = $('#edit_location').val();
	let lic   = $('#edit_license').val();
	let miles = $('#edit_mileage').val();
	let serv  = $('#edit_service').val();

	console.log(make);

	$.ajax({
		url: MANAGER_API+"inventory",
		type: "PUT",
		data: {
			id:id,
			make: make,
			model: model,
			year: year,
			type: type,
			condition: cond,
			locationId: locat,
			licensePlate: lic,
			mileage: miles,
			lastServiced: serv
		}
	}).done(function(data, stat, statCode) {
		console.log(statCode);
		updateInventoryTable();
	});
}

function editCar(id) {
	let carI = CARS.find(x => x.ID === id);
	console.log(carI);
	$("#edit_body").empty();
	$("#edit_footer").empty();
	$("#edit_body").append(
		"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Lot Assignment</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_location'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Car Type</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_type'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Condition</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_condition'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Year</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_year'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Make</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_make'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Model</span>"
                        +"</div>"
                        +"<input type='text' id='edit_model' class='form-control' aria-label='Car Model' aria-describedby='Car Model'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Mileage</span>"
                        +"</div>"
                        +"<input type='text' id='edit_mileage' class='form-control' aria-label='Car Mileage' aria-describedby='Car Mileage'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>License Plate #</span>"
                        +"</div>"
                        +"<input type='text' id='edit_license' class='form-control' aria-label='Car License Plate #' aria-describedby='Car License Plate #'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3 date' id='datetimepicker'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Last Serviced</span>"
                        +"</div>"
                        +"<input type='date' id='edit_service' class='form-control' aria-label='Last Serviced' aria-describedby='Last Serviced'>"
                +"</div>"
        );
	$("#edit_footer").append(
		"<button type='button' class='btn btn-primary btn-sm' onclick='sendCarEdit(\""+carI.ID+"\");'>Save</button>"
                +"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Cancel</button>"
	);

	populateYears("edit_year");
        populateMakes("edit_make");
        populateTypes("edit_type");
        populateConditions("edit_condition");
        populateLocations("edit_location");

	$("#edit_model").val(carI.model).text(carI.model);
	$("#edit_mileage").val(carI.mileage).text(carI.mileage);
	$("#edit_license").val(carI.registrationID).text(carI.registrationID);
	$("#edit_service").val(carI.lastServiced);
	$("#edit_year").find("option[value='"+carI.year+"']").attr("selected",true);
	$("#edit_make").find("option[value='"+carI.make+"']").attr("selected",true);
	$("#edit_type").find("option[value='"+carI.type+"']").attr("selected",true);
	$("#edit_location").find("option[value='"+carI.locationID+"']").attr("selected",true);
	$("#edit_condition").find("option[value='"+carI.condition+"']").attr("selected",true);
}
