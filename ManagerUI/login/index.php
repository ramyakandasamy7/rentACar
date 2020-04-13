<?php
session_start();

header("Access-Control-Allow-Origin: *");

?>
<html>
	<head>
		<title>Rent-A-Car</title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link href="../css/login.css" rel="stylesheet">
                <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script>
		<script src="../js/main.js?t=<?php echo time(); ?>"></script>
		<script src="../js/login-ui.js?t=<?php echo time(); ?>"></script>
		<script src="../js/login-methods.js?t=<?php echo time(); ?>"></script>
		<script>
			$(document).ready(function() {
				initUI();
			});
		</script>
	</head>
	<body>
		<div id='root'></div>
	</body>
</html>
