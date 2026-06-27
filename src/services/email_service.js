const { TicketRepository } = require('../repositories');
const { MAILER } = require('../config');


const ticketRepo = new TicketRepository();

async function sendMail(mailFrom, mailTo, subject, text){
    try {
        const response = await MAILER.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

async function createTicket(data){
    try {
        const response = await ticketRepo.create(data);
        console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPendingEmail(){
    try {
        const response = await ticketRepo.getPendingTicket();
        return response
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail,
    createTicket,
    getPendingEmail
}