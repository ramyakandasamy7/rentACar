var userEmail = getUserEmail();
var userName  = getUserName();
var userId    = getUserId();

var locationTable     = "";
var inventoryTable    = "";
var usersTable        = "";
var reservationsTable = "";
var transactionsTable = "";

console.log(userEmail);
console.log(userName);
console.log(userId);

function initUI() {
	checkIfLoggedIn();
	renderContainers();
	renderNavigationBar();
	renderContents();
	getAllLocations();
	//getAllInventory();
	getAllUsers();
	getAllReservations();
	getAllTransactions();
	renderModal();
}

function renderContainers() {
	$("#root").append(
		"<nav class='navbar fixed-top navbar-dark bg-dark'>"
			+"<a class='navbar-brand' href='#'>Rent-A-Car Admin Dashboard</a>"
			+"<form class='form-inline' style='margin-block-end: 0;'>" 
				+"<span class='text-white mr-4'>Hi "+userName+"</span>"
				+"<button type='button' class='btn btn-danger btn-sm' onclick='logout();'>Logout</button>"
			+"</form>" 
		+"</nav>"
		+"<div class='container-fluid'>"
			+"<div class='row flex-xl-nowrap' id='ui_container'>"
				+"<div class='col-12 col-md-2 col-xl-2 bd-sidebar' id='navigation_bar' style='border-right: 2px solid #333333; height: 100vh; padding-top: 65px;'>"
				+"</div>"
				+"<div class='col-12 col-md-10 col-xl-10 bd-content' id='main_content' style='padding-top: 65px;'>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function renderNavigationBar() {
	$("#navigation_bar").append(
		"<div class='container text-center'>"
			+"<h5>Navigation</h3>"
			+"<div class='container'>"
				+"<nav class='nav flex-column nav-pills'>"
					+"<a data-toggle='tab' class='nav-link active' href='#main_location_content'>Locations</a>"
					+"<a data-toggle='tab' class='nav-link' href='#car_inventory_content'>Car Inventory</a>"
					+"<a data-toggle='tab' class='nav-link' href='#users_content'>Users</a>"
					+"<a data-toggle='tab' class='nav-link' href='#reservations_content'>Reservations</a>"
					+"<a data-toggle='tab' class='nav-link' href='#transactions_content'>Transactions</a>"
				+"</nav>"
			+"</div>"
		+"</div>"
	);
}

function renderContents() {
	$("#main_content").append(
		"<div class='container-fluid'>"
			+"<div class='tab-content'>"
				+"<div class='tab-pane fade-in active' id='main_location_content'>"
					+"<h2>Locations</h2>"
					+"<button type='button' class='btn btn-primary btn-sm mb-5' data-toggle='modal' data-target='#add_location_modal' onclick='showAddLocation();'>Add Location</button>"
					+"<table class='table table-striped table-sm' id='location_table'></table>"
				+"</div>"
				+"<div class='tab-pane fade' id='car_inventory_content'>"
					+"<h2>Car Inventory</h2>"
					+"<button type='button' class='btn btn-primary btn-sm mb-5' data-toggle='modal' data-target='#add_car_modal' onclick='showAddCar();'>Add A Car</button>"
					+"<table class='table table-striped table-sm' id='inventory_table'></table>"
				+"</div>"
				+"<div class='tab-pane fade' id='users_content'>"
					+"<h2 style='margin-bottom: 40px;'>User Accounts</h2>"
					+"<table class='table table-striped table-sm' id='users_table'></table>"
				+"</div>"
				+"<div class='tab-pane fade' id='reservations_content'>"
					+"<h2 style='margin-bottom: 40px;'>Active Reservations</h2>"
					+"<table class='table table-striped table-sm' id='reservations_table'></table>"
				+"</div>"
				+"<div class='tab-pane fade' id='transactions_content'>"
					+"<h2 style='margin-bottom: 40px;'>Transaction History</h2>"
					+"<table class='table table-striped table-sm' id='transactions_table'></table>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function renderLocationTable(data) {
	window.locationTable = $("#location_table").DataTable({
		"pageLength": 25,
		"data":       data,
		"autoWidth":  false,
		"columns": [
			{ "title": "Name",          	"data": "name"               },
			{ "title": "Address",       	"data": "address"            },
			{ "title": "City",          	"data": "city"               },
			{ "title": "State",         	"data": "state"              },
			{ "title": "Vehicle Count", 	"data": "currentVehicleCount"},
			{ "title": "Vehicle Capacity",  "data": "vehicleCapacity"    },
			{ "title": "Compact Price",     "data": "compactPPH"         },
			{ "title": "Sedan Price",       "data": "sedanPPH"           },
			{ "title": "SUV Price",         "data": "suvPPH"             },
			{ "title": "Truck Price",       "data": "truckPPH"           },
			{ "title": "Luxury Price",      "data": "luxuryPPH"          },
			{ "title": "Options",           "data": "options"            }
		]
	}); 
}

function renderInventoryTable(data) {
	window.inventoryTable = $("#inventory_table").DataTable({
		"pageLength": 25,
		"data":       data,
		"autoWidth":  false,
		"columns": [
			{ "title": "Make",          	"data": "make"               },
			{ "title": "Model",       	"data": "model"              },
			{ "title": "Year",          	"data": "year"               },
			{ "title": "Type",         	"data": "type"               },
			{ "title": "Location",  	"data": "locationName"       },
			{ "title": "Condition",         "data": "condition"          },
			{ "title": "Last Serviced",     "data": "lastServiced"       },
			{ "title": "License Plate",     "data": "registrationID"     },
			{ "title": "Current Miles",     "data": "mileage"            },
			{ "title": "Options",           "data": "options"            }
		]
	}); 
}

function renderUsersTable(data) {
	window.usersTable = $("#users_table").DataTable({
		"pageLength": 25,
		"data":       data,
		"autoWidth":  false,
		"columns": [
			{ "title": "ID",          	"data": "ID"                 },
			{ "title": "Username",       	"data": "username"           },
			{ "title": "Password",          "data": "password"           },
			{ "title": "Address",         	"data": "address"            },
			{ "title": "Driver's License",  "data": "driverslicense"     },
			{ "title": "Payment Info",      "data": "paymentinformation" },
			{ "title": "Options",           "data": "options"            }
		]
	}); 
}

function renderReservationsTable(data) {
	window.reservationsTable = $("#reservations_table").DataTable({
		"pageLength": 25,
		"data":       data,
		"autoWidth":  false,
		"columns": [
			{ "title": "Lot Id",       	"data": "locationId"         },
			{ "title": "Car Id",          	"data": "carId"              },
			{ "title": "Total Hours",       "data": "hours"              },
			{ "title": "Price",         	"data": "price"              },
			{ "title": "Pick-Up",    	"data": "startdate"          },
			{ "title": "Return",            "data": "enddate"            },
			{ "title": "User Id",           "data": "userID"             },
			{ "title": "Options",           "data": "options"            }
		]
	}); 
}

function renderTransactionsTable(data) {
	window.transactionsTable = $("#transactions_table").DataTable({
		"pageLength": 25,
		"data":       data,
		"autoWidth":  false,
		"columns": [
			{ "title": "User ID",          	"data": "userID"              },
			{ "title": "Car ID",       	"data": "carID"               },
			{ "title": "Location ID",     	"data": "locationID"          },
			{ "title": "Status",         	"data": "field"               },
			{ "title": "Price",  	        "data": "price"               },
			{ "title": "Pick-Up Date",      "data": "startDate"           },
			{ "title": "Return Date",       "data": "endDate"             },
			{ "title": "Options",           "data": "options"             }
		]
	}); 
}

function renderModal() {
	$("#root").append(
		"<div class='modal fade' id='add_location_modal' tabindex='-1' role='dialog' aria-labelledby='AddLocationModal' aria-hidden='true'>"
			+"<div class='modal-dialog' role='document'>"
				+"<div class='modal-content'>"
					+"<div class='modal-header'>"
						+"<h5 class='modal-title'>Add A New Location</h5>"
						+"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
							+"<span aria-hidden='true'>&times</span>"
						+"</button>"
					+"</div>"
					+"<div class='modal-body' id='add_location_body'>"
					+"</div>"
					+"<div class='modal-footer'>"
						+"<button type='button' class='btn btn-primary btn-sm' onclick='addLocation();'>Add</button>"
						+"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Close</button>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
		+"<div class='modal fade' id='add_car_modal' tabindex='-1' role='dialog' aria-labelledby='AddCarModal' aria-hidden='true'>"
                        +"<div class='modal-dialog' role='document'>"
                                +"<div class='modal-content'>"
                                        +"<div class='modal-header'>"
                                                +"<h5 class='modal-title'>Add A Car</h5>"
                                                +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
                                                        +"<span aria-hidden='true'>&times</span>"
                                                +"</button>"
                                        +"</div>"
                                        +"<div class='modal-body' id='add_car_body'>"
                                        +"</div>"
                                        +"<div class='modal-footer'>"
						+"<button type='button' class='btn btn-primary btn-sm' onclick='addCar();'>Add</button>"
						+"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Close</button>"
                                        +"</div>"
                                +"</div>"
                        +"</div>"
                +"</div>"
		+"<div class='modal fade' id='edit_modal' tabindex='-1' role='dialog' aria-labelledby='EditModal' aria-hidden='true'>"
                        +"<div class='modal-dialog' role='document'>"
                                +"<div class='modal-content'>"
                                        +"<div class='modal-header'>"
                                                +"<h5 class='modal-title'>Edit Info</h5>"
                                                +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
                                                        +"<span aria-hidden='true'>&times</span>"
                                                +"</button>"
                                        +"</div>"
                                        +"<div class='modal-body' id='edit_body'>"
                                        +"</div>"
                                        +"<div class='modal-footer' id='edit_footer'>"
                                        +"</div>"
                                +"</div>"
                        +"</div>"
                +"</div>"
	);
}

function showAddLocation() {
	$("#add_location_body").empty();
	$("#add_location_body").append(
		"<div class='input-group input-group-sm mb-3'>"
			+"<div class='input-group-prepend'>"
				+"<span class='input-group-text'>Name</span>"
			+"</div>"
			+"<input type='text' id='new_name' class='form-control' aria-label='Name' aria-describedby='Location Name' value='Milpitas-Lot-A1'>"
		+"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Address</span>"
                        +"</div>"
                        +"<input type='text' id='new_address' class='form-control' aria-label='Address' aria-describedby='Location Address' value='160 N Main St'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>City</span>"
                        +"</div>"
                        +"<input type='text' id='new_city' class='form-control' aria-label='City' aria-describedby='Location City' value='Milpitas'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>State</span>"
                        +"</div>"
                        +"<input type='text' id='new_state' class='form-control' aria-label='State' aria-describedby='Location State' value='CA'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Vehicle Capacity</span>"
                        +"</div>"
                        +"<input type='number' id='new_capacity' class='form-control' aria-label='Capacity' aria-describedby='Capacity' value='200'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Vehicle Count</span>"
                        +"</div>"
                        +"<input type='number' id='new_count' class='form-control' aria-label='Count' aria-describedby='Count' value='10'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Compact Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='new_compact' class='form-control' aria-label='Compact Price' aria-describedby='Compact Price' value='19.99'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Sedan Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='new_sedan' class='form-control' aria-label='Sedan Price' aria-describedby='Sedan Price' value='23.99'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>SUV Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='new_suv' class='form-control' aria-label='SUV Price' aria-describedby='SUV Price' value='26.99'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Truck Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='new_truck' class='form-control' aria-label='Truck Price' aria-describedby='Truck Price' value='30.99'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Luxury Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='new_luxury' class='form-control' aria-label='Luxury Price' aria-describedby='Luxury Price' value='45.99'>"
                +"</div>"
	);
}

function showAddCar() {
	$("#add_car_body").empty();
	$("#add_car_body").append(
		"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Lot Assignment</span>"
                        +"</div>"
			+"<select class='form-control' id='new_location'>"
			+"</select>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Car Type</span>"
                        +"</div>"
			+"<select class='form-control' id='new_type'>"
			+"</select>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Condition</span>"
                        +"</div>"
			+"<select class='form-control' id='new_condition'>"
			+"</select>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Year</span>"
                        +"</div>"
			+"<select class='form-control' id='new_year'>"
			+"</select>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Make</span>"
                        +"</div>"
			+"<select class='form-control' id='new_make'>"
			+"</select>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Model</span>"
                        +"</div>"
                        +"<input type='text' id='new_model' class='form-control' aria-label='Car Model' aria-describedby='Car Model' value='Camry'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Mileage</span>"
                        +"</div>"
                        +"<input type='text' id='new_mileage' class='form-control' aria-label='Car Mileage' aria-describedby='Car Mileage' value='5932'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>License Plate #</span>"
                        +"</div>"
                        +"<input type='text' id='new_license' class='form-control' aria-label='Car License Plate #' aria-describedby='Car License Plate #' value='9XVX123'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3 date' id='datetimepicker'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Last Serviced</span>"
                        +"</div>"
                        +"<input type='date' id='new_service' class='form-control' aria-label='Last Serviced' aria-describedby='Last Serviced'>"
                +"</div>"
	);
	populateSelects();
}
