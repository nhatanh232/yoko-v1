function actionColumn(value, row, index) {
    let btn = [];
    let active = row.status == ACTIVE ? '' : 'disabled';
    btn.push("<a class='btn btn-xs btn-primary' href='" + laroute.route('category.edit', {id: value}) + "' "+ active +">" +
        "<i class='fa fa-pencil'></i>" +
        "</a>");
    btn.push("<button class='btn btn-xs btn-danger' onclick='remove(" + value + ")' "+ active +">" +
        "<i class='fa fa-trash'></i>" +
        "</button>");
    return btn.join(" ");
}

$('#frm_add').validate({
    rules: {
        name: {
            required: true,
        }
    },
    messages: {
        name: {
            required: "Vui lòng nhập tên danh mục",
        },
    },
    submitHandler: function (form) {
        form.submit();
    }
});

$('#frm_edit').validate({
    rules: {
        name: {
            required: true,
        }
    },
    messages: {
        name: {
            required: "Vui lòng nhập tên danh mục",
        },
    },
    submitHandler: function (form) {
        form.submit();
    }
});

function remove(id) {
    let csrf = document.querySelector('meta[name="csrf-token"]').content;
    $.ajax({
        url: laroute.route('category.delete', {id: id}),
        type: 'POST',
        dataType: "JSON",
        data: {
            _token: csrf
        },
        success: function (data) {
            console.log(data);
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


