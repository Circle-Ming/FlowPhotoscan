$(document).ready(function () {
    $(".menu label").click(function () {
        var isChecked = $(this).next("input[type='checkbox']").is(':checked');
        if (isChecked) {
            $(this).css(
                "background-image", "url(icon/arrow-left.png)"
            );
        } else {
            $(this).css(
                "background-image", "url(icon/arrow-down.png)"
            );
        }
    });
});