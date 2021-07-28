function actionColumn(value, row, index) {
    let btn = [];
    let active = row.status == ACTIVE ? '' : 'disabled';
    btn.push("<a class='btn btn-xs btn-primary' href='" + laroute.route('product.edit', {id: value}) + "' "+ active +">" +
        "<i class='fa fa-pencil'></i>" +
        "</a>");
    btn.push("<button class='btn btn-xs btn-danger' onclick='remove(" + value + ")' "+ active +">" +
        "<i class='fa fa-trash'></i>" +
        "</button>");
    return btn.join(" ");
}

function formatStatus(value, row) {
    switch (value) {
        case ACTIVE:
            return '<span class="badge badge-success">Hoạt động</span>';
        case EMPTY:
            return '<span class="badge badge-warning">Hết hàng</span>';
        case NOT_SELL:
            return '<span class="badge badge-danger">Không nhập mới</span>';
        default:
            return 'TBD';
    }
}

$('#category_id').select2({
   placeholder: 'Chọn danh mục'
});

function sendFile(file, that) {
    let data = new FormData();
    let csrf = document.querySelector('meta[name="csrf-token"]').content;
    data.append('file', file);
    data.append('_token', csrf);
    $.ajax({
        url: laroute.route('product.upload_image'),
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            $(that).summernote('insertImage', window.location.origin + "/" + data);
        },
        error: function (xhr, desc, err) {
            console.log(err);
        }
    })
}


$('#frm_add').validate({
    rules: {
        name: {
            required: true,
        },
        quantity:{
            required: true,
            min: 1
        },
        unit: {
            required: true
        },
        price: {
            required: true,
            min: 1,
            digits: true
        },
        thumbnail:{
            required: true
        },
        category_id:{
            required: true
        }
    },
    messages: {
        name: {
            required: "Vui lòng nhập tên danh mục",
        },
        quantity:{
            required: "Vui lòng nhập số lượng lớn hơn 0",
            min: "Vui lòng nhập số lương lớn hơn 0"
        },
        unit: {
            required: "Vui lòng nhập đơn vị"
        },
        price: {
            required: "Vui lòng nhập giá lớn hơn 0",
            min: "Vui lòng nhập giá lớn hơn 0",
            digits: "Vui lòng nhập giá là số"
        },
        thumbnail:{
            required: "Vui lòng chọn thumbnail"
        },
        category_id:{
            required: "Vui lòng chọn danh mục"
        }
    },
    submitHandler: function (form) {
        let textareaValue = $('#summernote').summernote('code');
        $('#description').val(textareaValue);
        form.submit();
    }
});

function readURL(input) {
    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#banner-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#banner-img').attr('src', '/images/no-image.png');
    }
}

$('#frm_edit').validate({
    rules: {
        name: {
            required: true,
        },
        quantity:{
            required: true,
            min: 1
        },
        unit: {
            required: true
        },
        price: {
            required: true,
            min: 1,
            digits: true
        },
        category_id:{
            required: true
        }
    },
    messages: {
        name: {
            required: "Vui lòng nhập tên danh mục",
        },
        quantity:{
            required: "Vui lòng nhập số lượng lớn hơn 0",
            min: "Vui lòng nhập số lương lớn hơn 0"
        },
        unit: {
            required: "Vui lòng nhập đơn vị"
        },
        price: {
            required: "Vui lòng nhập giá lớn hơn 0",
            min: "Vui lòng nhập giá lớn hơn 0",
            digits: "Vui lòng nhập giá là số"
        },
        category_id:{
            required: "Vui lòng chọn danh mục"
        }
    },
    submitHandler: function (form) {
        let textareaValue = $('#summernote').summernote('code');
        $('#description').val(textareaValue);
        form.submit();
    }
});

function remove(id) {
    let csrf = document.querySelector('meta[name="csrf-token"]').content;
    $.ajax({
        url: laroute.route('product.stop_selling', {id: id}),
        type: 'POST',
        dataType: "JSON",
        data: {
            _token: csrf
        },
        success: function (data) {
            if (data.status == 0) {
                swal("Thông báo!", data.msg, "success");
                $('#demo-custom-toolbar').bootstrapTable('refresh');
            } else {
                swal("Thông báo!", data.msg, "error");
            }
        },
        error: function (xhr, desc, err) {
            swal("Thông báo!", err, "error");
        }
    });
}
