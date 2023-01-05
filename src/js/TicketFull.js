class TicketFull extends Ticket {
  constructor(id, name, description, status, created) {
    super(id, name, status, created);
    this.description = description;
  }
}

const ticketFull = new TicketFull('3', 'Alex', 'discrip', 'open', '24мая');
