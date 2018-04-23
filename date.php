<?php
    $date = ($_POST['date']=="")?date('Y-m'):$_POST['date'];
    list($y,$m) = explode('-',$date);
    $max_day = date("t",strtotime($y.'-'.$m."-1"));
    $week = mb_split(' ','日 一 二 三 四 五 六');
    $count = 1;
    $result['date'] = [];
    for($i=1;$i<=$max_day;$i++){
        $index = date('w',mktime(0,0,0,$m,$i,$y));
        if($index==0 && count($result['date']) != 0){
            $count++;
        }
        $result['date'][$count][$index] = $i;
    }
    $result['prev_date'] = date('Y-m',mktime(0,0,0,$m-1,1,$y));
    $result['next_date'] = date('Y-m',mktime(0,0,0,$m+1,1,$y));
    $result['current_date'] = date('Y年m月',mktime(0,0,0,$m,1,$y));
    echo json_encode($result);
?>