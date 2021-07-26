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

