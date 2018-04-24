<?php
    include_once('db.php');
    
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    $sql = 'update todo set t_title = :title , t_note = :note , t_date = :date where t_id = :id';
    $query = $db->prepare($sql);
    $query->bindValue(':title',$title);
    $query->bindValue(':note',$note);
    $query->bindValue(':date',$ymd.' '.$time);
    $query->bindValue(':id',$id);
    $query->execute();
?>