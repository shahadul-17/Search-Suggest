<?php
    mysqli_report(MYSQLI_REPORT_STRICT);

    try {
        $connection = mysqli_connect("localhost", "root", "", "databasename");
    }
    catch (Exception $exception) {
        $connection = False;
    }

    $flag = 0;
    $data = "";

    if ($connection) {
        if (isset($_GET["query"])) {
            try {
                $result = mysqli_query($connection, "SELECT * FROM tablename WHERE columnname LIKE '" . $_GET["query"] . "%'");
            }
            catch (Exception $exception) {
                $result = False;
            }

            if ($result) {
                $flag = 1;

                while ($array = mysqli_fetch_array($result)) {
                    $data = $array["columnname"] . "-" . $data;
                }
            }
            else {
                $data = "Unable to retrieve results from database.";
            }
        }
        else {
            $data = "Query not found.";
        }
    
        mysqli_close($connection);
    }
    else {
        $data = "Unable to establish connection with database.";
    }

    if ($flag == 0) {       // exception occurred...
        echo $data, "-";
    }
    else {      // data retrieved from database...
        echo $data;
    }
?>