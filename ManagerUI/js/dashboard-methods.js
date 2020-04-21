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
		renderLocationTable(LOCATIONS);
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

function getAllUsers() {
	$.ajax({
		url: MANAGER_API+"users",
		type: "GET"
	}).done(function(data, stat, statCode) {
		console.log(data.Items);
		window.USERS = null;
		window.USERS = data.Items;
		for (i=0; i < USERS.length; i++) {
			let id = USERS[i].ID;
			let delbtn  = "<a href='#' class='text-danger ml-1' onclick='deleteUser(\""+id+"\");' title='Delete User'><i class='fas fa-trash fa-lg'></i></a>"; 
			let editbtn = "<a href='#' class='text-primary mr-1' onclick='editUser(\""+id+"\");' data-toggle='modal' data-target='#edit_modal' title='Edit User Info'><i class='fas fa-edit fa-lg'></i></a>";
			USERS[i].options = editbtn + delbtn;
		}
		renderUsersTable(USERS);
	});
}


function getAllReservations() {
	$.ajax({
		url: MANAGER_API+"reservations",
		type: "GET"
	}).done(function(data, stat, statCode) {
		console.log(data.Items);
		window.RESERVATIONS = null;
		window.RESERVATIONS = data.Items;
		for (i=0; i < RESERVATIONS.length; i++) {
			let id = RESERVATIONS[i].id;
			let delbtn  = "<a href='#' class='text-danger ml-1' onclick='deleteReservation(\""+id+"\");' title='Delete Reservation'><i class='fas fa-trash fa-lg'></i></a>"; 
			let editbtn = "<a href='#' class='text-primary mr-1' onclick='editReservation(\""+id+"\");' data-toggle='modal' data-target='#edit_modal' title='Edit Reservation Info'><i class='fas fa-edit fa-lg'></i></a>";
			RESERVATIONS[i].options = editbtn + delbtn;
		}
		renderReservationsTable(RESERVATIONS);
	});
}

function getAllTransactions() {
	$.ajax({
		url: MANAGER_API+"transactions",
		type: "GET"
	}).done(function(data, stat, statCode) {
		console.log(data.Items);
		window.TRANSACTIONS = null;
		window.TRANSACTIONS = data.Items;
		for (i = 0; i < TRANSACTIONS.length; i++) {
			let id = TRANSACTIONS[i].ID;
			let delbtn  = "<a href='#' class='text-danger ml-1' onclick='deleteTransaction(\""+id+"\");' title='Delete Transaction'><i class='fas fa-trash fa-lg'></i></a>"; 
			let editbtn = "<a href='#' class='text-primary mr-1' onclick='editTransaction(\""+id+"\");' data-toggle='modal' data-target='#edit_modal' title='Edit Transaction Info'><i class='fas fa-edit fa-lg'></i></a>";
			TRANSACTIONS[i].options = editbtn + delbtn;
		}
		renderTransactionsTable(TRANSACTIONS);
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

function updateUsersTable(data) {
        window.usersTable.destroy();
	getAllUsers();
}

function updateReservationsTable(data) {
        window.reservationsTable.destroy();
	getAllReservations();
}

function updateTransactionsTable(data) {
        window.transactionsTable.destroy();
	getAllTransactions();
}
