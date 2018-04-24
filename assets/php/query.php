<?php
    include_once('db.php');
    $keys = array_keys($_POST);

    foreach($keys as $key)
        $$key = $_POST[$key];

    $res['todo'] = query(0);
    $res['success'] = query(1);
    
    echo json_encode($res);

    function query($endValue){
        global $db,$y,$m,$d,$res;
        $sql = 'select * from todo where t_date between :start and :end and t_end = :endValue order by t_date asc';
        $query = $db->prepare($sql);
        $query->bindValue(':start',date('Y-m-d H:i:s',mktime(0,0,0,$m,$d,$y)));
        $query->bindValue(':end',date('Y-m-d H:i:s',mktime(0,0,-1,$m,$d+1,$y)));
        $query->bindValue(':endValue',$endValue);
        $query->execute();
        $arr = [];
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
?>