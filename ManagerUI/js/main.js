var MANAGER_API = "https://rentacarbe.ramyasmsseproject.com/managerapi/"

var YEARS = [
	"2020",
	"2019",
	"2018",
	"2017",
	"2016",
	"2015"
];

var MAKES = [
	"Acura",
	"BMW",
	"Chevrolet",
	"Dodge",
	"Fiat",
	"Kia",
	"Lexus",
	"Mazda",
	"Nissan",
	"Tesla",
	"Toyota",
	"Volkswagen"
];

var TYPES = [
	"Compact",
	"Sedan",
	"Suv",
	"Truck",
	"Luxury"
];

var CONDITIONS = [
	"Pristine",
	"Great",
	"Good",
	"Fair",
	"Poor",
	"Service"
];

function populateYears(elId) {
	$.each(YEARS, function(key, value) {
                $("#"+elId).
                        append($("<option></option>")
                                .attr("value",value)
                                .text(value));
        });
}

function populateMakes(elId) {
	$.each(MAKES, function(key, value) {
                $("#"+elId).
                        append($("<option></option>")
                                .attr("value",value)
                                .text(value));
        });
}

function populateTypes(elId) {
	$.each(TYPES, function(key, value) {
                $("#"+elId).
                        append($("<option></option>")
                                .attr("value",value)
                                .text(value));
        });
}

function populateConditions(elId) {
	$.each(CONDITIONS, function(key, value) {
                $("#"+elId).
                        append($("<option></option>")
                                .attr("value",value)
                                .text(value));
        });
}

function populateLocations(elId) {
	console.log(LOCATIONS);
        $.each(window.LOCATIONS, function(key, value) {
                $("#"+elId).
                        append($("<option></option>")
                                .attr("value",value.ID)
                                .text(value.name));
        });
}

function populateSelects() {
	populateYears("new_year");
        populateMakes("new_make");
        populateTypes("new_type");
        populateConditions("new_condition");
        populateLocations("new_location");
}

function setUserInfo(email, name, id, storeId) {
	localStorage.setItem("email",  email);
	localStorage.setItem("name",   name);
	localStorage.setItem("id",     id);
}

function clearUserInfo() {
	localStorage.removeItem("email");
	localStorage.removeItem("name");
	localStorage.removeItem("id");
}

function getUserEmail() {
	return localStorage.getItem('email');
}

function getUserName() {
	return localStorage.getItem('name');
}

function getUserId() {
	return localStorage.getItem('id');
}

function checkIfLoggedIn() {
	if (localStorage.getItem("email") === null) {
		logout();
	}
}

function logout() {
	clearUserInfo();
	location.replace("https://rentacar.ramyasmsseproject.com");
}
