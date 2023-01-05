class Ticket {
  constructor(id, name, status, created) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
  }
}
const ticket = new Ticket('7', 'Ivan', 'discT', 'Onopen', '7июля')