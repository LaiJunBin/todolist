$(function () {
    $(window).resize(layout);
    $("#addTodoForm").on('submit',function(){
        var formData = getFormData($(this))
        var form = this;
        $.ajax({
            url:uri.addTodo,
            method:'POST',
            data:formData,
            success:function(res){
                form.reset();
                renderTodo(formData.ymd.split('-'));
                $("#addTodo").modal('hide');
            }
        });
        return false;
    });
});

function renderTodo([y,m,d]){
    $("#todo tr:gt(0)").remove();
    $.ajax({
        url:uri.query,
        method:'POST',
        dataType:'JSON',
        data:{
            'y':y,
            'm':m,
            'd':d
        },
        success:function(res){
            for(var item of res.todo){
                var tr = $("<tr>").append(`<td data-th="代辦事項" class="btn-default TodoNoteViewTd">${item.t_title}</td>`)
                .append(`<td data-th="時間">${item.t_date}</td>`)
                .append(`<td data-th="操作">
                    <button type="button" class="modifyBtn btn btn-warning">修改</button>
                    <button type="button" class="deleteBtn btn btn-danger">刪除</button>
                    <button type="button" class="successBtn btn btn-success">完成</button>
                </td>`).attr('va',item.t_id);
                var click_obj  = function(item){
                    var id = tr.attr('va');
                    tr.find(".TodoNoteViewTd").click(function(){
                        $("#TodoNoteTitle").text(item.t_title);
                        $.ajax({
                            url:uri.queryNote,
                            method:'POST',
                            data:{
                                id:id
                            },
                            success:function(res){
                                $("#TodoNoteMain").text(res==''?'沒有描述...':res);
                                $("#TodoNote").modal('show');
                            }
                        });
                    });
                    tr.find('.modifyBtn').click(function(){
                        //Code..
                    });
                }(item)
                // .append(`<td data-th="操作">
                //     <button type="button" class="deleteBtn btn btn-danger" va="${item.t_id}">刪除</button>
                // </td>`)
                // .append(`<td data-th="操作">
                //     <button type="button" class="successBtn btn btn-success" va="${item.t_id}">完成</button>
                // </td>`)
                $("#todo main .rwd-table tr").last().after(tr);
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}

function layout() {
    var width = $(window).width();
    if (width < 480 && !$("main.full td").hasClass('btn btn-default')) {
        $("main.full td").addClass('btn btn-default')
    } else if (width >= 480 && $("main.full td").hasClass('btn btn-default')) {
        $("main.full td").removeClass('btn btn-default')
    }
}

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
        if (Object.keys(indexed_array).indexOf(n['name']) == -1)
            indexed_array[n['name']] = n['value'];
        else if (indexed_array[n['name']] instanceof Array)
            indexed_array[n['name']].push(n['value']);
        else {
            indexed_array[n['name']] = [indexed_array[n['name']]];
            indexed_array[n['name']].push(n['value']);
        }
    });
    return indexed_array;
}