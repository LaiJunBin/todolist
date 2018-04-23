<?php
    $user = 'root';
    $pwd = '1234';
    $dbname = 'todolist';
    $host = 'localhost';

    $dsn = "mysql:host=$host;dbname=$dbname";

    $db = new PDO($dsn,$user,$pwd);

?>