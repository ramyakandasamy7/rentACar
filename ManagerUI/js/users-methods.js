function deleteUser(id) {
	let confirmDelete = confirm("Are you really sure you want to remove this user from the database?");

        if (confirmDelete === true) {
                $.ajax({
                        url: MANAGER_API+"users",
                        type: "DELETE",
			data: {userId: id}
                }).done(function(data, stat, statCode) {
                        console.log(data);
                        console.log(stat);
                        console.log(statCode);
                        updateUsersTable();
                });
        }
}
