$(function () {
    var week = ['日', '一', '二', '三', '四', '五', '六']

    function renderDate(date) {
        $.ajax({
            url: uri.date,
            dataType: 'json',
            method: 'POST',
            data: {
                date: date
            },
            success: function (result) {
                $("#dayBody").html('');
                Object.keys(result['date']).forEach(function (x) {
                    $("#dayBody").append("<tr></tr>");
                    for (var i = 1; i <= 7; i++) {
                        $("#dayBody tr").last().append("<td></td>");
                    }
                    Object.keys(result['date'][x]).forEach(function (y) {
                        $("#dayBody tr").last().find('td').eq(y).attr({
                            'data-th': `星期${week[y]}`,
                            'day': result['date'][x][y]
                        }).addClass('btn').text(result['date'][x][y]);
                    });
                    $("#prev").attr('date', result['prev_date']);
                    $("#next").attr('date', result['next_date']);
                    $("#currentDate").text(result['current_date']);
                });
                renderEvent(true);
                layout();
            },
            error: function (err) {
                console.log(err)
            }
        });
    }
    renderDate(null);
    $("#dateStatusDiv button").click(function () {
        renderDate($(this).attr('date'));
    })
});