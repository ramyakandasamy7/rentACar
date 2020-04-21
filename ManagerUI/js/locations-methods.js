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

function sendLocationEdit(id) {
        let name  = $("#edit_name").val();
        let addr  = $("#edit_address").val();
        let city  = $("#edit_city").val();
        let state = $("#edit_state").val();
        let capa = $("#edit_capacity").val();
        let comp = $("#edit_compact").val();
        let sedan = $("#edit_sedan").val();
        let suv = $("#edit_suv").val();
        let truck = $("#edit_truck").val();
        let luxur = $("#edit_luxury").val();

        $.ajax({
                url: MANAGER_API+"location",
                type: "PUT",
                data: {
                        id: id,
                        name: name,
                        address: addr,
                        city: city,
                        state: state,
                        capacity: capa,
                        compact: comp,
                        sedan: sedan,
                        suv: suv,
                        truck: truck,
                        luxury: luxur
                }
        }).done(function(data, stat, statCode) {
                console.log(statCode);
                updateLocationTable();
        });
}

function deleteLocation(id) {
        let confirmDelete = confirm("Are you really sure you want to remove this location from the database?");

        if (confirmDelete === true) {
                $.ajax({
                        url: MANAGER_API+"location",
                        type: "DELETE",
			data: { locationId: id}
                }).done(function(data, stat, statCode) {
                        console.log(data);
                        console.log(stat);
                        console.log(statCode);
                        updateLocationTable();
                });
        }
}

function editLocation(id) {
        let lotI = LOCATIONS.find(x => x.ID === id);
        console.log(lotI);
        $("#edit_body").empty();
        $("#edit_footer").empty();
        $("#edit_body").append(
                "<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Name</span>"
                        +"</div>"
                        +"<input type='text' id='edit_name' class='form-control' aria-label='Name' aria-describedby='Location Name' value='Milpitas-Lot-A1'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Address</span>"
                        +"</div>"
                        +"<input type='text' id='edit_address' class='form-control' aria-label='Address' aria-describedby='Location Address' value='160 N Main St'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>City</span>"
                        +"</div>"
                        +"<input type='text' id='edit_city' class='form-control' aria-label='City' aria-describedby='Location City' value='Milpitas'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>State</span>"
                        +"</div>"
                        +"<input type='text' id='edit_state' class='form-control' aria-label='State' aria-describedby='Location State' value='CA'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Vehicle Capacity</span>"
                        +"</div>"
                        +"<input type='number' id='edit_capacity' class='form-control' aria-label='Capacity' aria-describedby='Capacity' value='200'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Compact Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_compact' class='form-control' aria-label='Compact Price' aria-describedby='Compact Price' value='19.99'>"
		+"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Sedan Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_sedan' class='form-control' aria-label='Sedan Price' aria-describedby='Sedan Price' value='23.99'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>SUV Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_suv' class='form-control' aria-label='SUV Price' aria-describedby='SUV Price' value='26.99'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Truck Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_truck' class='form-control' aria-label='Truck Price' aria-describedby='Truck Price' value='30.99'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Luxury Price per Hour</span>"
                        +"</div>"
                        +"<input type='number' id='edit_luxury' class='form-control' aria-label='Luxury Price' aria-describedby='Luxury Price' value='45.99'>"
                +"</div>"
        );
        $("#edit_footer").append(
                "<button type='button' class='btn btn-primary btn-sm' onclick='sendLocationEdit(\""+lotI.ID+"\");'>Save</button>"
                +"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Cancel</button>"
        );

        $("#edit_name").val(lotI.name).text(lotI.name);
        $("#edit_address").val(lotI.address).text(lotI.address);
        $("#edit_city").val(lotI.city).text(lotI.city);
        $("#edit_state").val(lotI.state).text(lotI.state);
        $("#edit_capacity").val(lotI.vehicleCapacity).text(lotI.vehicleCapacity);
        $("#edit_compact").val(lotI.compactPPH).text(lotI.compactPPH);
        $("#edit_sedan").val(lotI.sedanPPH).text(lotI.sedanPPH);
        $("#edit_suv").val(lotI.suvPPH).text(lotI.suvPPH);
        $("#edit_truck").val(lotI.truckPPH).text(lotI.truckPPH);
        $("#edit_luxury").val(lotI.luxuryPPH).text(lotI.luxuryPPH);
}
