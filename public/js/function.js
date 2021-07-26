$(function () {
    $('#limit').on('change', function(){
        var href = $(this).attr('data-href');
        location.href = updateUrlParameter('limit', $(this).val(), href);
    });

    $('[data-toggle="tooltip"]').tooltip();

    var browseImage = function() {
        $('.browse-image').click(function () {
            var name = $(this).attr('data-target');
            BrowseServer(name);
        });
    };
    browseImage();

    var browseImageList = function() {
        $('.browse-image-list').click(function () {
            var target = $(this).attr('data-target');
            BrowseServerList(target);
        });
    };
    browseImageList();
});

function updateUrlParameter(key, value, url){
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

function BrowseServerList(target){
    var index = $(target).data('index') + 1;
    $(target).data('index',index);
    var name    = 'image_details_'+index;
    var preview = 'preview_image_details_'+index;
    var span = document.createElement('span');
    span.innerHTML =
        [
            '<img class="'+preview+'" style="height: 140px; border: 1px solid #2bc5f8; margin: 7px" title=""/>',
            '<input type="hidden" id="'+name+'" name="image_details[]" data-preview=".'+preview+'" >'
        ].join('');

    span.addEventListener('click', function (e) {
        if (e.offsetX > span.offsetWidth-15) {
            $(this).remove();
        }
    });

    $(target).append(span);

    var config = {};
    config.startupPath = 'Images:/banner/';
    var finder = new CKFinder(config);
    finder.selectActionFunction = SetFileField;
    finder.selectActionData = name;
    finder.callback = function( api ) {
        api.disableFolderContextMenuOption( 'Batch', true );
    };
    finder.popup();
}

function BrowseServer(name) {
    var config = {};
    config.startupPath = 'Images:/banner/';
    var finder = new CKFinder(config);
    finder.selectActionFunction = SetFileField;
    finder.selectActionData = name;
    finder.callback = function( api ) {
        api.disableFolderContextMenuOption( 'Batch', true );
    };
    finder.popup();
}

function SetFileField(fileUrl, data) {
    var name = '';
    try {
        var hostname = (new URL(fileUrl)).hostname;
        name = fileUrl.split(hostname);
        name = name[name.length - 1];
    } catch (_) {
        name = fileUrl;
    }

    $('#' + data["selectActionData"]).val(name).trigger('change');

    var preview = $('#' + data["selectActionData"]).attr('data-preview');
    $(preview).attr('src', _base_url + name);

    preview = $('#' + data["selectActionData"]).attr('data-url');
    $(preview).val('');
}

function ajax_loading(show) {
    if ($('#bg-load').length == 0) {
        $('body').append('<div id="bg-load" class="wrap-loader"><div id="container"><div id="loader" class="loader"></div></div></div>');
    }
    if (show) {
        $('#bg-load').show();
    } else {
        $('#bg-load').hide();
    }
}

function malert(msg, title, callback, sbcallback, alert) {
    title = title || 'Thông báo';
    callback = callback || function (e) {};
    alert = alert || 'alert-success';

    if (jQuery("#modal_alert").attr('id') != 'modal_alert') {
        var html = ''+
            '<div class="modal fade" id="modal_alert" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="pci-cross pci-circle"></i></button>' +
            '<h4 class="modal-title">Thông báo</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>Thành công!</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" id="btn_success" class="btn btn-success" data-dismiss="modal"><i class="fa fa-check" aria-hidden="true"></i> Đồng ý</button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-undo" aria-hidden="true"></i> Thoát</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        jQuery( "body" ).append(html);
    }

    $("#modal_alert .btn-success").unbind( "click" );
    if (sbcallback) {
        $("#modal_alert .modal-footer").show();
        $("#modal_alert .btn-success").bind( "click", sbcallback );
    } else {
        $("#modal_alert .modal-footer").hide();
    }

    $("#modal_alert .modal-title").html(title);
    $("#modal_alert .modal-body").html('<div class="alert '+alert+'" role="alert">'+msg+'</div>');

    $('#modal_alert').modal('show');
    $('#modal_alert').on('hidden.bs.modal', callback);
}

function alert_warning(msg, title, callback, sbcallback) {
    malert(msg, title, callback, sbcallback, 'alert-warning');
}
function alert_danger(msg, title, callback, sbcallback) {
    malert(msg, title, callback, sbcallback, 'alert-danger');
}
function alert_success(msg, callback) {
    malert(msg, null, callback, null, 'alert-success');
}
function show_pnotify(_message, _title, _type) {
    _title = _title || 'Thông báo';
    _message = _message || 'success';

    new PNotify({
        title: _title,
        text: _message,
        type: _type,
        delay: 3000
    });
}
function confirm_delete(msg, callback,icon) {
    msg = msg || 'Bạn có muốn xóa nội dung này?';
    callback = callback || function (e) {};
    icon = icon || 'icon_delete';
    if ($("#confirm_delete").length == 0) {
        var html = ''+
            '<div id="confirm_delete" class="DeleteModal modal fade" role="dialog">'+
            '<div class="modal-dialog"'+
            '<!-- Modal content-->'+
            '<div class="modal-content">'+
            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
            '<div class="content">'+
            '<i class="'+icon+'">&nbsp</i>'+
            '<h2></h2>'+
            '<button type="button" class="btn btn-cancel" data-dismiss="modal">Hủy</button>'+
            '<button type="button" class="btn btn-del" data-dismiss="modal">Đồng ý</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';

        $( "body main" ).append(html);
    }

    $("#confirm_delete .content h2").html(msg);

    $('#confirm_delete').modal('show');
    $("#confirm_delete .btn-del").unbind( "click" );
    $("#confirm_delete .btn-del").bind( "click", callback );
}
function init_select2(element) {
    $(element).select2({ theme: "bootstrap", allowClear: true, width: "100%" });
}
//Date picker
function init_datepicker(element) {
    $(element).datepicker({
        autoclose: true,
        language: "vi",
        todayBtn: "linked",
        clearBtn: true,
        todayHighlight: true,
        format: "dd-mm-yyyy",
    });
}

function add_rule_phone_number() {
    jQuery.validator.addMethod("rgphone", function (value, element) {
        return this.optional(element) || /^(098|095|097|096|039|038|037|036|035|034|033|032|090|093|077|076|078|079|070|091|094|083|084|085|081|082|092|058|056|099|059|086|088|089|087)[0-9]{7}$/.test(value);
    }, "Số điện thoại không đúng định dạng");
}

function add_rule_email_format() {
    jQuery.validator.addMethod("emailExt", function(value, element, param) {
        return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/);
    },'Email không đúng định dạng');
}

function formatHtmlEntities(value, row, index) {
    return htmlEntities(value);
}

var __entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};
function htmlEntities(value) {
    return String(value).replace(/[&<>"'`=\/]/g, function (s) {
        return __entityMap[s];
    });
}

function formatSTT(value, row, index) {
    return index + 1;
}

function formatStatus(value, row) {
    switch (value) {
        case ACTIVE:
            return '<span class="badge badge-success">Hoạt động</span>';
        case LOCK:
            return '<span class="badge badge-danger">Khóa</span>';
        default:
            return 'TBD';
    }
}

function formatPrice(value, row, index) {
    return Intl.NumberFormat('vi-VN',
        {
            style: 'currency',
            currency: 'VND'
        }).format(value);
}

