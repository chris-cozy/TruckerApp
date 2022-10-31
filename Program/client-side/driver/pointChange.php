<?php 
$points = $_POST['points'];

if(!empty($points)){
    # setup db connection variables
    $host = "localhost";
    $databaseUser = "admin";
    $databasePassword = "QNAXni7AkACXrEWencp9";
    $databaseName = "Driver Account";

    # creating connection
    $conn = new mysqli($host, $databaseUser, $databasePassword, $databaseName);

    # checking for error
    if(mysqli_connect_error){
        die('Connection Error('. mysqli_connect_errno().')'. mysqli_connect_error());
    }
    # choose points from the driver account database
    else {
        $SELECT = "SELECT points From Driver Account Where points = ?";
        $INSERT = "INSERT Into Driver Account (points) value(?)";

        # preparing
        $statmnt = $conn->prepare($SELECT);
        $statmnt->bind_param("i", $points);
        $statmnt->execute();
        $statmnt->bind_result($points);
        $statmnt->store_result();

        #unfinished -- 
        # Need to add info from Points Management table once a point change form is filled out and submitted
    }
}
else{
    $points = 0;
    die();
}


?>