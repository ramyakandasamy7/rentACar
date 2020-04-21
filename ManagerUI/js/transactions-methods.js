function deleteTransaction(id) {
        let confirmDelete = confirm("Are you really sure you want to remove this transaction from the database?");

        if (confirmDelete === true) {
                $.ajax({
                        url: MANAGER_API+"transactions",
                        type: "DELETE",
                        data: {transId: id}
                }).done(function(data, stat, statCode) {
                        console.log(data);
                        console.log(stat);
                        console.log(statCode);
                        updateTransactionsTable();
                });
	}
}
