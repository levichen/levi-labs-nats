const NATS = require('nats')

const nc = NATS.connect()

nc.subscribe('foo', function (msg) {
  console.log(msg)
})
