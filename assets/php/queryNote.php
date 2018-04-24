<?php
    include_once('db.php');
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    $sql = 'select t_note from todo where t_id = :id';
    $query = $db->prepare($sql);
    $query->bindValue(':id',$id);
    $query->execute();
    echo $query->fetch(PDO::FETCH_ASSOC)['t_note'];
?>