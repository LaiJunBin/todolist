<?php
    include_once('db.php');
    
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    $sql = 'delete from todo where t_id = :id';
    $query = $db->prepare($sql);
    $query->bindValue(':id',$id);
    $query->execute();
?>