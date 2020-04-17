

function login() {
	let u = $('#user').val();
	let p = $('#password').val();

	console.log(u);
	console.log(p);
	$.ajax({
		url: MGMT_USER_API+"manager",
		type: 'POST',
		data: {email: u, password: p}
	}).done(function(data) {
		console.log(data);
		setUserInfo(data.email, data.name, data.id);
		location.replace('https://rentacar.ramyasmsseproject.com/dashboard');
	});
}
