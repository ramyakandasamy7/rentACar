var CARS = null;
var LOCATIONS = null;


function getAllLocations() {
	$.ajax({
		url: MANAGER_API+"location",
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data.Items);
		window.LOCATIONS = data.Items;
		populateLocationInput();
		getAllInventory();
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
			let delbtn  = "<a href='#' class='text-danger ml-1' onclick='deleteCar(\""+id+"\");' title='Delete Car'><i class='fas fa-trash'></i></a>"; 
			let editbtn = "<a href='#' class='text-primary mr-1' onclick='editCar(\""+id+"\");' title='Edit Car Info'><i class='fas fa-edit'></i></a>"; 
			CARS[i].options = editbtn + delbtn;
		}
		renderInventoryTable(CARS);
	});	
}

function countCarsPerLocation() {
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
	window.locationTable.destroy();
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
