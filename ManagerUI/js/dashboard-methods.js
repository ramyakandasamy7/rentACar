function getAllInventory() {
	$.ajax({
		url: MANAGER_API+"location",
		type: "GET",
		dataType: "json"
	}).done(function(data) {
		console.log(data.Items);
		renderInventoryTable(data.Items);
	});	
}

function updateInventoryTable(data) {
        window.inventoryTable.destroy();
        renderInventoryTable(data);
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
	});

}
