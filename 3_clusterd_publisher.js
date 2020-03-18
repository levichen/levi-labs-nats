
const NATS = require('nats')

const servers = ['nats://localhost:5222']

let nc = NATS.connect({ servers: servers })

nc = NATS.connect({ noRandomize: true, servers: servers })

nc.on('connect', () => {
  console.log('Connected to ' + nc.currentServer.url.host)
  for (let i = 0; i < 10; i = i + 1) {
    nc.publish('foo', new Date().toString())
  }
})
