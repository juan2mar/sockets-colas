//comando para establece la conexion

var socket = io();

var label = $('#lblNuevoTicket');
//los Eventos On son para escuchar información
//Nos dice cuando se conecta al servidor
socket.on('connect', function () {
    console.log('Conectado al servidor');
});
//Nos dice cuando se desconecta del servidor
socket.on('disconnect', function () {
    console.log('Se perdio conexión con el servidor');
});

//on 'estadoActual'
socket.on('estadoActual', function (data) {

    label.text(data.actual);

});

$('button').on('click', function () {

    socket.emit('siguienteTicket', null, function (siguienteTicket) {

        label.text(siguienteTicket);
    });
});