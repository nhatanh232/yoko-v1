<link rel="stylesheet" href="/assets/plugins/jQuery-File-Upload/css/jquery.fileupload.css">
<!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
<script src="/assets/plugins/jQuery-File-Upload/js/vendor/jquery.ui.widget.js"></script>
<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
<script src="/assets/plugins/jQuery-File-Upload/js/jquery.iframe-transport.js"></script>
<!-- The basic File Upload plugin -->
<script src="/assets/plugins/jQuery-File-Upload/js/jquery.fileupload.js"></script>

<script type="text/javascript">

    var initUpload = function(obj){
        var file_location 	= $(obj).data('location');
        var error 			= $(obj).data('error');
        var is_change 		= $(obj).data('is-change');
        var object 			= $(obj).data('object');
        var progress        = $(obj).data('progress');
        var url = '<?=route('upload-file')?>';
        if(object){
            url += '?object='+object;
        }
        console.log(url);
        $(obj).fileupload({
            url: url,
            dataType: 'json',
            done: function (e, data) {
                console.log(data);

                if($(error).length > 0){
                    $(error).html('').hide();
                }
                if(data['result']['error']){
                    if($(error).length > 0){
                        $(error).html(data['result']['error']).show();
                    }
                    $(file_location).val("");
                    return false;
                }
                $.each(data.result.files, function (index, file) {
                    $(file_location).val(file.name);
                    if($(is_change).length > 0){
                        $(is_change).val(1);
                    }
                });
            },
            progressall: function (e, data) {
                if(progress){
                    var x = parseInt(data.loaded / data.total * 100, 10);
                    $(progress).css(
                        'width',
                        x + '%'
                    );
                }

            }
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    }

    var loadFileMultiple = function(file,file_location,list) {
        var span = document.createElement('span');
        span.innerHTML = [
            '<input type="hidden" name="',
            file_location
            ,'[]" value="',
            file,'">'
        ].join('');

        span.addEventListener('click', function (e) {
            if (e.offsetX > span.offsetWidth-15) {
                $(this).remove();
            }
        });
        document.getElementById(list).insertBefore(span, null);
    };

    var initUploadMultiple = function(obj){
        var file_location  = $(obj).data('location');
        var error           = $(obj).data('error');
        var is_change       = $(obj).data('is-change');
        var object          = $(obj).data('object');
        var progress        = $(obj).data('progress');
        var list            = $(obj).data('list');
        var url = '<?=route('upload-file')?>';
        if(object){
            url += '?object='+object;
        }

        $(obj).fileupload({
            url: url,
            dataType: 'json',
            done: function (e, data) {
                if($(error).length > 0){
                    $(error).html('').hide();
                }
                if(progress){
                    $(progress).css(
                        'width',
                        0 + '%'
                    );
                }
                if(data['result']['error']){
                    if($(error).length > 0){
                        $(error).html(data['result']['error']).show();
                    }
                    return false;
                }
                $.each(data.result.files, function (index, file) {
                    loadFileMultiple(file.name,file_location,list)
                    if($(is_change).length > 0){
                        $(is_change).val(1);
                    }
                });
            },
            progressall: function (e, data) {
                if(progress){
                    var x = parseInt(data.loaded / data.total * 100, 10);
                    $(progress).css(
                        'width',
                        x + '%'
                    );
                }

            }
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    }
</script>