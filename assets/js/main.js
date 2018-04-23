$(function () {
    $(window).resize(layout);
});

function layout() {
    var width = $(window).width();
    if (width < 480 && !$("td").hasClass('btn btn-default')) {
        $("td").addClass('btn btn-default')
    } else if (width >= 480 && $("td").hasClass('btn btn-default')) {
        $("td").removeClass('btn btn-default')
    }
}