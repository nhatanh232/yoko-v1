<?php
$js_version = \App\Helpers\General::get_version_js();
?>
<script type="text/javascript" src="{{url('/assets/plugins/ckeditor/ckeditor.js')}}?v=<?=$js_version?>"></script>
<script type="text/javascript" src="{{url('/assets/plugins/ckfinder/ckfinder.js')}}?v=<?=$js_version?>"></script>
<script type="text/javascript" src="{{url('/assets/plugins/ckeditor/adapters/jquery.js')}}?v=<?=$js_version?>"></script>
<script type="text/javascript" src="{{url('/assets/plugins/ckeditor/config.js')}}?v=<?=$js_version?>"></script>