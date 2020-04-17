var userEmail = getUserEmail();
var userName  = getUserName();
var userId    = getUserId();

var locationTable = "";

console.log(userEmail);
console.log(userName);
console.log(userId);

function initUI() {
	checkIfLoggedIn();
	renderContainers();
	renderNavigationBar();
	renderContents();
	getAllInventory();
	renderModal();
}

function renderContainers() {
	$("#root").append(
		"<nav class='navbar fixed-top navbar-dark bg-dark'>"
			+"<a class='navbar-brand' href='#'>ByeBuyCheckout Inventory Dashboard</a>"
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
					+"<a data-toggle='tab' class='nav-link active' href='#main_location_content'>Location</a>"
					+"<a data-toggle='tab' class='nav-link' href='#add_location_content'>Something Here</a>"
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
					+"<button type='button' class='btn btn-primary btn-sm mb-5' data-toggle='modal' data-target='#add_location_modal'>Add Location</button>"
					+"<table class='table table-striped table-sm' id='location_table'></table>"
				+"</div>"
				+"<div class='tab-pane fade' id='add_location_content'>"
					+"<h5>Add Store Inventory</h5>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

function renderInventoryTable(data) {
	window.locationTable = $("#location_table").DataTable({
		"pageLength": 50,
		"data":data,
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
					+"<div class='modal-body'>"
						+"<div class='input-group input-group-sm mb-3'>"
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
					+"</div>"
					+"<div class='modal-footer'>"
						+"<button type='button' class='btn btn-primary btn-sm' onclick='addLocation();'>Add</button>"
						+"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Close</button>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}

