@extends('layouts.master')
@section('after_styles')
@endsection
@section('content')
    <div id="page-content">
        <div class="panel panel-bordered-info">
            <div class="panel-heading">
                <h3 class="panel-title">Cập nhật
                    <a class="pull-right" href="{{route($controllerName.'.index')}}"><i class="fa fa-reply"></i> Quay
                        lại</a>
                </h3>
            </div>
            <form id="frm_edit" class="form-horizontal" action="{{route($controllerName.'.update', ['id' => $id])}}" method="post"
                  enctype="multipart/form-data">
                @csrf
                <div class="panel-body">
                    <!--Tiêu đề-->
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Tên danh mục</label>
                            <input type="text" name="name" id="name" class="form-control" placeholder="Tên danh mục"
                                   value="{{$category->name}}"/>
                            <label id="name-error" class="error" for="name" style="display: none;"></label>
                        </div>
                    </div>
                </div>
                <div class="panel-footer text-center">
                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary btn-rounded">
                                Lưu lại
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div><!-- /.panel -->
    </div>
@endsection

@section('after_styles')
@stop

@section('after_scripts')
    <script src="/js/category.js"></script>
    <script>
        @if($message=json_decode(session('msg'), 1))
        show_pnotify("{!! $message['title'] !!}", "{!! $message['text'] !!}", "{!! $message['type'] !!}");
        @endif
    </script>
@endsection
