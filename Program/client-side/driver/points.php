<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Good Driver | Points</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <section class="header">
        <nav>
            <a href="index.html"><img src="logo.png"></a>
            <div class="nav-links" id="navLinks">
                <i class="fa fa-times-circle-o" onclick="hideMenu()"></i>
                <ul>
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="points.html">POINTS</a></li>
                    <li><a href="products.html">PRODUCTS</a></li>
                    <li><a href="profile.html">PROFILE</a></li>
                </ul>
            </div>
            <i class="fa fa-bars" onclick="showMenu()"></i>
        </nav>

        <div class="text-box">
            <h1>MyPoints *insert total*</h1>
            <p>Here would be a table comprised of point related information</p>
        </div>    

    </section>

    <table>
        <tr>
            <th>points</th>
        </tr>
        <?php
        $conn = mysqli_connect("team21-database2.cobd8enwsupz.us-east-1.rds.amazonaws.com", "admin", "QNAXni7AkACXrEWencp9", "Driver_Account");
        # TODO: Link driverID to current user from login info
        # TODO: Use driverID to specify which user to check the points of

        # Gather point value from table
        $pts = "SELECT points From Driver_Account Where driverID = ?";

        # Store result
        $result = $conn->query($pts);

        # If there is a result in the table, display it on the webpage
        if($result->num_rows > 0){
            if($row = $result-> fetch_assoc()){
                echo "<tr><td>" . $row["points"] "</td></tr>";
            }
        }
        # If not, display an error
        else{
            echo "Error: No result.";
        }

        # Closing connection
        $conn->close();
        ?>
    </table>

<!-- JS for Toggling Nav Menu -->
<script>

    var navLinks = document.getElementById("navLinks");
    function showMenu(){
        navLinks.style.right = "0";
    }
    function hideMenu(){
        navLinks.style.right = "-400px";
    }

</script>

</body>
</html>
