<?php
    include_once('db.php');
    
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    $sql = 'select count(*) as count from todo where t_date between :start and :end and t_end = :endValue';
    $query = $db->prepare($sql);
    $query->bindValue(':start',$y.'-'.$m.'-'.$d);
    $query->bindValue(':end',$y.'-'.$m.'-'.($d+1));
    $query->bindValue(':endValue',0);
    $query->execute();
    $res = $query->fetch(PDO::FETCH_ASSOC);
    echo $res['count'];
?>