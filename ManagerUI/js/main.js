var MANAGER_API = "https://rentacarbe.ramyasmsseproject.com/managerapi/"

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
