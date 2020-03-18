const NATS = require('nats')

const nc = NATS.connect()

nc.subscribe('foo', { queue: 'job.workers' }, function (msg) {
  console.log(msg)
})
