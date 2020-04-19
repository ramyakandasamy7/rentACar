
function initUI() {
	renderContainers();
	renderForm();
}

function renderContainers() {
	$("#root").append(
		"<div class='container-fluid' style='margin-top: 300px;'>"
			+"<div class='container m-auto text-center' id='form-container'>"
			+"</div>"
		+"</div>"
	);
}

function renderForm() {
	$("#form-container").append(
		"<div class='card m-auto' style='width: 300px;'>"
			+"<div class='card-body'>"
				+"<h4 class='card-title text-center'>Management Sign In</h4>"
				+"<input class='form-control mb-2' placeholder='Email' type='email' id='user' value='test@rentacar.com'>"
				+"<input class='form-control mb-2' placeholder='Password' type='password' id='password' value='testpassword'>"
				+"<button type='button' class='btn btn-primary' onclick='login()'>Login</button>"
			+"</div>"
		+"</div>"
	);
}
