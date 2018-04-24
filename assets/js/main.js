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
                renderEvent();
                $("#addTodo").modal('hide');
            }
        });
        return false;
    });

    $("#modifyTodoForm").on('submit',function(){
        var formData = getFormData($(this))
        $.ajax({
            url:uri.modifyTodo,
            method:'POST',
            data:formData,
            success:function(res){
                renderTodo(formData.ymd.split('-'));
                $("#modifyTodo").modal('hide');
            }
        });
        return false;
    });
});

function renderTodo([y,m,d]){
    $("#todo tr[va]").remove();
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
                    var [ymd,time] = item.t_date.split(' ');
                    tr.find(".TodoNoteViewTd").click(function(){
                        $("#TodoNoteTitle").text(item.t_title);
                        $("#TodoNoteMain").text(item.t_note==''?'沒有描述...':item.t_note);
                        $("#TodoNote").modal('show');
                    });
                    tr.find('.modifyBtn').click(function(){
                        $("#modifyTodoFormTitle").val(item.t_title);
                        $("#modifyTodoFormNote").val(item.t_note);
                        $("#modifyTodoFormTime").val(time);
                        $("#modifyTodoForm [name=ymd]").val(ymd);
                        $("#modifyTodoForm [name=id]").val(id);
                        $("#modifyTodo").modal('show');
                    });
                    tr.find('.deleteBtn').click(function(){
                        if(confirm(`確定刪除 ${item.t_title} 嗎?`)){
                            $.ajax({
                                url:uri.deleteTodo,
                                method:'POST',
                                data:{
                                    id:id,
                                },
                                success:function(){
                                    renderTodo(ymd.split('-'));
                                    renderEvent();
                                    alert('刪除成功!');
                                },
                                error:function(err){
                                    alert('刪除失敗');
                                }
                            });
                        }
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
    });
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