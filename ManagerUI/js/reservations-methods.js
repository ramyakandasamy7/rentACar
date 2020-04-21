function deleteReservation(id) {
	console.log(id);
        let confirmDelete = confirm("Are you really sure you want to remove this reservation from the database?");

        if (confirmDelete === true) {
                $.ajax({
                        url: MANAGER_API+"reservations",
                        type: "DELETE",
			data : { resId: id }
                }).done(function(data, stat, statCode) {
                        console.log(data);
                        console.log(stat);
                        console.log(statCode);
                        updateReservationsTable();
                });
        }
}
