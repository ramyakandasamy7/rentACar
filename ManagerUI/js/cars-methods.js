function addCar() {
        let make  = $('#new_make').children("option:selected").val();
        let model = $('#new_model').val();
        let year  = $('#new_year').children("option:selected").val();
        let type  = $('#new_type').children("option:selected").val();
        let cond  = $('#new_condition').children("option:selected").val();
        let locat = $('#new_location').val();
        let lic   = $('#new_license').val();
        let miles = $('#new_mileage').val();
        let serv  = $('#new_service').val();

        console.log(make);

        $.ajax({
                url: MANAGER_API+"inventory",
                type: "POST",
                data: {
                        make: make,
                        model: model,
                        year: year,
                        type: type,
                        condition: cond,
                        locationId: locat,
                        licensePlate: lic,
                        mileage: miles,
                        lastServiced: serv
                },
        }).done(function(data, stat, statCode) {
                console.log(statCode);
                updateInventoryTable();
        });
}

function deleteCar(id) {
        let confirmDelete = confirm("Are you really sure you want to remove this car from the database?");

        if (confirmDelete === true) {
                $.ajax({
                        url: MANAGER_API+"inventory/",
                        type: "DELETE",
                        data: { carId: id}
                }).done(function(data, stat, statCode) {
                        console.log(data);
                        console.log(stat);
                        console.log(statCode);
                        updateInventoryTable();
                });
        }
}

function sendCarEdit(id) {
        let make  = $('#edit_make').children("option:selected").val();
        let model = $('#edit_model').val();
        let year  = $('#edit_year').children("option:selected").val();
        let type  = $('#edit_type').children("option:selected").val();
        let cond  = $('#edit_condition').children("option:selected").val();
        let locat = $('#edit_location').val();
        let lic   = $('#edit_license').val();
        let miles = $('#edit_mileage').val();
        let serv  = $('#edit_service').val();

        console.log(make);

        $.ajax({
                url: MANAGER_API+"inventory",
                type: "PUT",
                data: {
                        id:id,
                        make: make,
                        model: model,
                        year: year,
                        type: type,
                        condition: cond,
                        locationId: locat,
                        licensePlate: lic,
                        mileage: miles,
                        lastServiced: serv
                }
        }).done(function(data, stat, statCode) {
                console.log(statCode);
                updateInventoryTable();
        });
}

function editCar(id) {
        let carI = CARS.find(x => x.ID === id);
        console.log(carI);
        $("#edit_body").empty();
        $("#edit_footer").empty();
        $("#edit_body").append(
                "<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Lot Assignment</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_location'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Car Type</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_type'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Condition</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_condition'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Year</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_year'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Make</span>"
                        +"</div>"
                        +"<select class='form-control' id='edit_make'>"
                        +"</select>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Model</span>"
                        +"</div>"
                        +"<input type='text' id='edit_model' class='form-control' aria-label='Car Model' aria-describedby='Car Model'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Mileage</span>"
                        +"</div>"
                        +"<input type='text' id='edit_mileage' class='form-control' aria-label='Car Mileage' aria-describedby='Car Mileage'>"
                +"</div>"
                +"<div class='input-group input-group-sm mb-3'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>License Plate #</span>"
                        +"</div>"
                        +"<input type='text' id='edit_license' class='form-control' aria-label='Car License Plate #' aria-describedby='Car License Plate #'>"
                +"</div>"
		+"<div class='input-group input-group-sm mb-3 date' id='datetimepicker'>"
                        +"<div class='input-group-prepend'>"
                                +"<span class='input-group-text'>Last Serviced</span>"
                        +"</div>"
                        +"<input type='date' id='edit_service' class='form-control' aria-label='Last Serviced' aria-describedby='Last Serviced'>"
                +"</div>"
        );
        $("#edit_footer").append(
                "<button type='button' class='btn btn-primary btn-sm' onclick='sendCarEdit(\""+carI.ID+"\");'>Save</button>"
                +"<button type='button' class='btn btn-danger btn-sm' data-dismiss='modal'>Cancel</button>"
        );

        populateYears("edit_year");
        populateMakes("edit_make");
        populateTypes("edit_type");
        populateConditions("edit_condition");
        populateLocations("edit_location");

        $("#edit_model").val(carI.model).text(carI.model);
        $("#edit_mileage").val(carI.mileage).text(carI.mileage);
        $("#edit_license").val(carI.registrationID).text(carI.registrationID);
        $("#edit_service").val(carI.lastServiced);
        $("#edit_year").find("option[value='"+carI.year+"']").attr("selected",true);
        $("#edit_make").find("option[value='"+carI.make+"']").attr("selected",true);
        $("#edit_type").find("option[value='"+carI.type+"']").attr("selected",true);
        $("#edit_location").find("option[value='"+carI.locationID+"']").attr("selected",true);
        $("#edit_condition").find("option[value='"+carI.condition+"']").attr("selected",true);
}
