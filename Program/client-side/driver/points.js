document.addEventListener('DOMContentLoaded', function () {

});

// Shows all point management actions by a given sponsor, for drivers to view their points history
    const displayPointDistribution(sponsorID) {
        if (sponsorID == NULL) {
            alert("Invalid Sponsor.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Points_Management Where sponsorID = ?";
                /*
                 May need to only display the driver being managed and the point distribution to that driver:
                    const query1 = "SELECT Driver_Username From Points_Management Where sponsorID = ?"; 
                    const query2 = "SELECT points From Points_Management Where sponsorID = ?";

                    connection.query(query1, [sponsorID], (err, result) =>{...});
                    connection.query(query2, [sponsorID], (err, result) =>{...});
                */
                connection.query(query, [sponsorID], (err, result) => {
                    if (err) reject(new Error(err.message));
                });
            });

            console.log(response);
            return(response);
        } catch (error){
            console.log(error);
        }
    }