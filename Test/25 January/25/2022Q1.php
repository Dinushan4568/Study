<?php
    $_Sql = mysqli_connect('Localhost', 'userName', 'password', 'emp_db');

    $_input = "INSERT INTO emp_db (Employee_ID, NIC, Title, First_Name, Last_Name, Gender, Date_of_Birth, Age, Salary) 
    VALUES ('$empId', '$nic', '$title', '$firstName', '$lastName', '$gender', '$DateOfBirth', '$age', '$salary')";
?>