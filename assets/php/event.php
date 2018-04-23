<?php
    include_once('db.php');
    
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    
    $res['todo'] = query(0);
    $res['success'] = query(1);
    
    echo json_encode($res);
    
    function query($endValue){
        global $db,$y,$m,$d;
        $sql = 'select count(*) as count from todo where t_date between :start and :end and t_end = :endValue';
        $query = $db->prepare($sql);
        $query->bindValue(':start',$y.'-'.$m.'-'.$d);
        $query->bindValue(':end',$y.'-'.$m.'-'.($d+1));
        $query->bindValue(':endValue',$endValue);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC)['count'];
    }
?>