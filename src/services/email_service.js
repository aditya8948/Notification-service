const { TicketRepository } = require('../repositories');
const { MAILER } = require('../config');
const { Enums } = require('../utils/common');

const { SUCCESS, FAILED } = Enums.STATUS;
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
        const ticket = await ticketRepo.create(data);
        const senderEmail = MAILER.options?.auth?.user || process.env.GMAIL_EMAIL;
        const mailResponse = await sendMail(senderEmail, data.recipientEmail, data.subject, data.content);

        await ticketRepo.update(ticket.id, { status: SUCCESS });

        return {
            ...ticket.toJSON(),
            mailResponse,
            status: SUCCESS
        };
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