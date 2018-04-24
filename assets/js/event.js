function renderEvent() {
    var currentDate = $("#currentDate").text().replace('月', '').split('年');
    $("td:not(:empty)").each(function () {
        var day = $(this).attr('day');
        var td = $(this);
        $.ajax({
            url: uri.event,
            method: 'POST',
            dataType: 'json',
            data: {
                y: currentDate[0],
                m: currentDate[1],
                d: day
            },
            success: function (res) {
                if (res.todo > 0) {
                    td.append(`<span class="badge">${res.todo}</span>`);
                }
                td.attr({
                    'data-todo': res.todo,
                    'data-success': res.success
                });
            },
            error: function (err) {
                console.log(err);
            }
        })
    });
    $("td:not(:empty)").click(function () {
        var td = $(this);
        var day = td.attr('day');
        var todo = td.data('todo');
        var success = td.data('success');
        var ymd = currentDate.join('-') + '-' + day;
        $("#addTodoForm")[0].reset();
        $("#addTodoFormTime").val("00:00");
        $("#todo,#success").hide();
        $("#moreTitle").text($("#currentDate").text() + day + '日');
        $("#addTodoForm [name=ymd]").val(ymd);
        if(todo>0)
            $("#todo").show();
        if(success>0)
            $("#success").show();
        renderTodo(ymd.split('-'));
        $("#more").modal('show');
    });
}