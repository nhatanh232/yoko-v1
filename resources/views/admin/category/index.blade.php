@extends('layouts.master')
@section('_css')
@endsection
@section('content')
    <div id="page-content">
        <div class="panel panel-bordered-primary">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-list" aria-hidden="true"></i> Danh sách danh mục</h3>
            </div>
            <div id="table-toolbar">
                <a href="{!! route($controllerName.'.create') !!}" class="btn btn-primary btn-rounded">
                    <span class="ladda-label"><i class="fa fa-plus"></i> Thêm {{ $title }}</span></a>
            </div>
            <div class="panel-body overflow-hidden">
                <table id="demo-custom-toolbar" class="table table-bordered table-striped table-hover" cellspacing="0"
                       data-toggle="table"
                       data-locale="vi-VN"
                       data-toolbar="#table-toolbar"
                       data-striped="true"
                       data-url="{{route($controllerName.".search")}}"
                       data-sort-name="created_at"
                       data-sort-order="desc"
                       data-show-toggle="false"
                       data-show-columns="true"
                       data-pagination="true"
                       data-side-pagination="server"
                       data-page-size="{{ config('constant.PAGE_SIZE') }}"
                       data-page-list="{{config('constant.PAGE_LIST')}}"
                       data-query-params="queryParams"
                       data-cookie="true"
                       data-cookie-id-table="{{$controllerName}}-index"
                       data-cookie-expire="{!! config('params.bootstrapTable.extension.cookie.cookieExpire') !!}"
                >
                    <thead>
                    <tr>
                        <th data-formatter="formatSTT" data-align="center">STT</th>
                        <th data-field="name">Tên danh mục</th>
                        <th data-field="status" data-formatter="formatStatus" data-align="center">Trạng thái</th>
                        <th data-field="id" data-formatter="actionColumn" data-align="center">Thao tác</th>
                    </tr>
                    </thead>
                </table>
            </div><!-- /.box-body -->
        </div><!-- /.box -->
        <!-- /.content -->
    </div>
@endsection

@section('after_scripts')
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/bootstrap-table.min.css">
    <!-- Latest compiled and minified JavaScript -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/bootstrap-table.min.js"></script>
    <!-- Latest compiled and minified Locales -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-vi-VN.min.js"></script>
    <script src="/js/category.js"></script>
    <!-- sweetalert -->
    <link rel="stylesheet" href="/css/sweetalert.css">
    <script src="/js/sweetalert.min.js"></script>
    <script>
        @if($message=json_decode(session('msg'), 1))
        show_pnotify("{!! $message['title'] !!}", "{!! $message['text'] !!}", "{!! $message['type'] !!}");
        @endif
    </script>
@endsection
