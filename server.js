const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const uuid = require('uuid');

let idUu = uuid.v4();
const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

const tickets = [
  {
    id: 10,
    name: 'Заправка принтера',
    description: 'Срочно заправить принтер у директора! Срок - 2 дня.',
    status: true,
    created: new Date(2021,4,25,11,35,22).toLocaleString().slice(0, -3),
  },
  {
    id: 20,
    name: 'Переустановить Windows',
    description: 'Нужно переустановить Windows в бухгалтерии в кротчайшие сроки, нужна W10 х64.',
    status: false,
    created: new Date(2020,4,19,02,35,13).toLocaleString().slice(0, -3),
  }
];

app.use(async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');
  const { method } = ctx.request.query;
  //console.log(method)
  let numEl = '0';
    for (let index in method) {
      if (parseInt(method[index]) ) {
        numEl += method[index]
      }
    }
    let valDeleteTicket = parseInt(numEl);
    let numElEdit = '0';
    for (let index in method) {
      if (parseInt(method[index]) ) {
        numElEdit += method[index]
      }
    }
    let valEditTicket = parseInt(numElEdit);

  switch (method) {
    case 'allTickets':
      for(key in tickets) {
        delete tickets[key].description;
      }
      ctx.response.body = tickets;
      return;

    case 'ticketById':
      const { id } = ctx.request.query;
      const ticketsId = tickets.find(obj => {
        return obj.id == id;
      })
      ctx.response.body = ticketsId;
      return;

    case 'createTicket':
      if (ctx.request.method !== 'POST') {
        ctx.response.status = 404;
        return;
      }
      if (tickets.some(sub => sub.id === ctx.request.body.id)) {
        ctx.response.status = 400;
        ctx.response.body = 'subscription exists';
        return;
      }
      ctx.request.body.id = idUu;
      ctx.request.body.created = new Date().toLocaleString().slice(0, -3),
      ctx.request.body.status = false;
      tickets.push(ctx.request.body);
      ctx.response.body = tickets;
      return;

      case 'checkmarkTrue':
        const idxTrue = (Object.keys(ctx.request.body)).toString();
      tickets[idxTrue].status = true;
        ctx.response.body = tickets[idxTrue];
        console.log(tickets)
      return;

      case 'checkmarkFalse':
        const idxFalse = (Object.keys(ctx.request.body)).toString();
        tickets[idxFalse].status = false;
        ctx.response.body = tickets[idxFalse];
      return;

      case `deleteTicked${valDeleteTicket}`:
        console.log(ctx.request.query);
        tickets.splice(valDeleteTicket, 1);
        ctx.response.body = tickets;
      return;

      case `editTicket${valEditTicket}`:
        tickets[valEditTicket].name = ctx.request.body.name;
        tickets[valEditTicket].description = ctx.request.body.description;
        ctx.response.body = tickets;
      return;

    default:
      ctx.response.body = tickets;
      console.log('по умолчанию')
  }

});

const server = http.createServer(app.callback());
const port = 7070;
server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server is listening to ' + port);
});