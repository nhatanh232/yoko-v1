@extends('layouts.master')
@section('after_styles')
    <!--Summernote [ OPTIONAL ]-->
    <link href="/assets/plugins/summernote/summernote.min.css" rel="stylesheet">
@endsection
@section('content')
    <div id="page-content">
        <div class="panel panel-bordered-info">
            <div class="panel-heading">
                <h3 class="panel-title">Thêm mới
                    <a class="pull-right" href="{{route($controllerName.'.index')}}"><i class="fa fa-reply"></i> Quay
                        lại</a>
                </h3>
            </div>
            <form id="frm_edit" class="form-horizontal" action="{{route($controllerName.'.update', ['id' => $id])}}" method="post"
                  enctype="multipart/form-data">
                @csrf
                <div class="panel-body">
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Tên sản phẩm</label>
                            <input type="text" name="name" id="name" class="form-control" placeholder="Tên sản phẩm"
                                   value="{{$product->name}}"/>
                            <label id="name-error" class="error" for="name" style="display: none;"></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Số lượng</label>
                            <input type="number" name="quantity" id="quantity" class="form-control"
                                   placeholder="Số lượng"
                                   value="{{ $product->quantity }}"/>
                            <label id="quantity-error" class="error" for="quantity" style="display: none;"></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Đơn vị</label>
                            <input type="text" name="unit" id="unit" class="form-control" placeholder="Đơn vị"
                                   value="{{ $product->unit  }}"/>
                            <label id="unit-error" class="error" for="unit" style="display: none;"></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Giá</label>
                            <input type="text" name="price" id="price" class="form-control" placeholder="Giá"
                                   value="{{ $product->price }}"/>
                            <label id="price-error" class="error" for="price" style="display: none;"></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Hình sản phẩm</label>
                            <input type="file" name="thumbnail" id="thumbnail" class="form-control"
                                   accept="image/x-png,image/gif,image/jpeg"
                                   onchange="readURL(this)"/>
                            <label id="thumbnail-error" class="error" for="thumbnail"
                                   style="display: none;"></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-6">
                            @if(!empty($product->thumbnail))
                                <img id="banner-img" src="/{{$product->thumbnail}}" class="form-control">
                            @else
                                <img id="banner-img" class="form-control">
                            @endif
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Danh mục</label>
                            <select class="form-control" name="category_id" id="category_id" style="width: 100%">
                                <option></option>
                                @foreach($category as $key => $value)
                                    @if($key == $product->category_id)
                                        <option value="{{$key}}" selected>{{$value}}</option>
                                    @else
                                        <option value="{{$key}}">{{$value}}</option>
                                    @endif
                                @endforeach
                            </select>
                            <label id="category_id-error" class="error" for="category_id"
                                   style="display: none;"></label>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Mô tả</label>
                            <textarea type="text" name="mini_description" id="mini_description"
                                      class="form-control" placeholder="Mô tả">{{ $product->mini_description }}</textarea>
                        </div>
                        <label id="mini_description-error" class="error" for="mini_description"
                               style="display: none;"></label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <label>Mô tả chi tiết</label>
                            <div id="summernote">

                            </div>
                            <textarea hidden name="description" id="description"></textarea>
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
    <script src="/assets/plugins/summernote/summernote.min.js"></script>
    <script src="/assets/plugins/summernote/lang/summernote-vi-VN.js"></script>
    <script src="/js/product.js"></script>
    <script>
        @if($message=json_decode(session('msg'), 1))
        show_pnotify("{!! $message['title'] !!}", "{!! $message['text'] !!}", "{!! $message['type'] !!}");
        @endif

        // SUMMERNOTE
        // =================================================================
        // Require Summernote
        // http://hackerwins.github.io/summernote/
        // =================================================================
        $('#summernote').summernote({
            height: '300px',
            lang: 'vi-VN',
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['picture']],
                ['view', ['fullscreen', 'codeview', 'help']],
            ],
            codeviewFilter: false,
            codeviewIframeFilter: true,
            spellCheck: true,
            disableGrammar: false,
            callbacks: {
                onImageUpload: function (files) {
                    let that = $(this);
                    sendFile(files[0], that);
                }
            }
        }).summernote('code', {!! json_encode($product->description) !!});

    </script>
@endsection
