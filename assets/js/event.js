function renderEvent() {
    $("td:not(:empty)").each(function () {
        var day = $(this).text();
        var td = $(this);
        $.ajax({
            url: uri.event,
            method: 'POST',
            data: {
                y: $("#currentDate").text().replace('月', '').split('年')[0],
                m: $("#currentDate").text().replace('月', '').split('年')[1],
                d: day
            },
            success: function (res) {
                if (res > 0) {
                    td.append(`<span class="badge">${res}</span>`);
                }
            }
        })
    });
}