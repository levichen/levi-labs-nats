const NATS = require('nats')

const nc = NATS.connect()

for (let i = 0; i < 10; i = i + 1) {
  nc.publish('foo', new Date().toString())
}
