
const fs = require('fs');


class Ticket {

    constructor (numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl{

    constructor () {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../data/data.json');

        //cada vez que empieza un nuevo día yo quiero que se reinicie todo

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        }else{

            this.reiniciarConteo();
        }
    }

    siguiente () {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    reiniciarConteo (){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 =  [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    getUltimoTicket () {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio){

        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes';
        }
        // se extrae el numero para romper la relacion que tiene js
        // que todos los objetos se deben pasar por referencia
        let numeroTicket = this.tickets[0].numero;
        //De esta manera elimino el primer elemento del arreglo
        this.tickets.shift();
        
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        console.log(atenderTicket);
        //Agrego este ticket al inicio del arreglo
        // Si no funciona
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1); //borra el ultimo elemento del arreglo
        }

        this.grabarArchivo();

        return atenderTicket;
    }

    

    grabarArchivo () {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        };
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./data/data.json', jsonDataString);
    }

}


module.exports = {

    TicketControl
}