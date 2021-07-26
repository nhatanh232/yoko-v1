<?php
$arr_params = app('request')->all();
if (isset($arr_params['page'])) {
    $page = $arr_params['page'];
    unset($arr_params['page']);
} else {
    $page = 1;
}

$params = $arr_params ? "&".http_build_query($arr_params) : "";
$data_href = $arr_params ? $objects['path']."?".http_build_query($arr_params) : $objects['path'];
?>
<nav aria-label="Page navigation" class="text-right">
    <ul class="pagination">
        <li class="page-item prev">
            <a class="page-link" href="{{$objects['prev_page_url']}}<?=($page==1?'?page=1':'').$params?>" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <?php 
            $from = $objects['current_page']==1?1 : $objects['current_page'] - 1;

            if($from == 1){
                $to     =  $objects['current_page'] + 2;
            }else{
                $to     = $objects['current_page'] + 1;
            }

            if($to > $objects['last_page'])
                $to = $objects['last_page'];
                
            for($i = $from; $i<= $to;$i++ ){ 
        ?>
            
            <li class="page-item <?=$i==$objects['current_page']?'active':''?>"><a class="page-link" href="<?=$objects['path']?>?page={{$i}}<?=$params?>">{{$i}}</a>
            </li>
        <?php } ?>

        <li class="page-item next">
            <a class="page-link" href="{{$objects['next_page_url']}}<?= ($arr_params ? (isset($objects['next_page_url']) ? '&':'?').http_build_query($arr_params) : "") ?>" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    <div class="per_page">
        {!! Form::select("limit", \App\Helpers\General::get_limit_options(), $objects['per_page'], ['data-href' => $data_href, 'id' => 'limit', 'class' => 'form-control']) !!}
    </div>
</nav>