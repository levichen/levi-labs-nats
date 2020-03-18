
const NATS = require('nats')

const servers = ['nats://localhost:4222']

let nc = NATS.connect({ servers: servers })

nc = NATS.connect({ noRandomize: true, servers: servers })

nc.on('connect', () => {
  console.log('Connected to ' + nc.currentServer.url.host)
})

nc.subscribe('foo', { queue: 'job.workers' }, function (msg) {
  console.log(msg)
})
