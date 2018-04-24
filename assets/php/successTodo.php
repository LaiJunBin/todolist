<?php
    include_once('db.php');
    
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    $sql = 'update todo set t_end = :end where t_id = :id';
    $query = $db->prepare($sql);
    $query->bindValue(':end',$end);
    $query->bindValue(':id',$id);
    $query->execute();
?>