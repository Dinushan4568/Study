<?php
    $db = mysqli_connect('Localhost', 'usarname','password', 'databasename');


    $sql = "INSERT INTO Tbl_brrow(Issue_id, student_id, book_id, issued_id, due_date, return_date, fine) VALUES (

        $_post['studentId'], $_post['bookId'], $_post['dateIssue'], $_post['DueDate'], $_post['ReturnDate'], $_post['fine']
    )";


    $aqlUpdate = "UPDATE Tbl_brrow SET Issue_id = $_post['updateValue'], $_post['studentId'], $_post['bookId'], $_post['dateIssue'], $_post['DueDate'] WHERE Issue_id = $_post['updateValueId']";


?>
