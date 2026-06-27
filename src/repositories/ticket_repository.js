const crudRepository = require('./crud_repository');

const { Ticket } = require('../models');
const { where } = require('sequelize');
class TicketRepository extends crudRepository {
    constructor(){
        super(Ticket);

    }

    async getPendingTicket(){
        const response = await Ticket.findAll({
            where:{
                status: 'PENDING'
            }
        })
        return response;
    }
}

module.exports = TicketRepository;