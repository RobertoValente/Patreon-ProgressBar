function getData() {
    $.ajax({
        type: 'GET',
        url: '/getData',
        dataType: 'json',
        success: function(data) {
            //$('#total-bar').width(data.patronCount);
            //data.patronCount = 48178;
            let percent = (data.patronCount * 100) / data.maxPatronos;

            $('#goal-current').text(data.patronCount);
            $('#total-bar').width("calc(" + percent + '% - 8px)');
            $('#goal-total').text(data.maxPatronos);
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

$(document).ready(function() {
    getData();
    setInterval(getData, 30000);
});