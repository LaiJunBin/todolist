<?php
    include_once('db.php');
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    $sql = 'insert into todo(t_title,t_note,t_date) values(:title,:note,:date)';

    $query = $db->prepare($sql);
    $query->bindValue(':title',$title);
    $query->bindValue(':note',$note);
    $query->bindValue(':date',$ymd.' '.$time);
    $query->execute();
?>