#!/usr/bin/env node

'use-strict'

const clusterId = 'levi-test-nats'
// const servers = ['nats://10.50.10.74:4222', 'nats://10.50.10.247:4222', 'nats://10.50.10.9:4222']
const servers = ['nats://10.50.10.9:4222']

const stan = require('node-nats-streaming').connect(clusterId, 'publisher', { servers: servers })

const subject = 'foo'
const message = 'hello nats streaming 5'

stan.on('connect', function () {
  // Simple Publisher (all publishes are async in the node version of the client)
  setInterval(() => {
    stan.publish(subject, message, function (err, guid) {
      if (err) {
        console.log('publish failed: ' + err)
      } else {
        console.log('published message with guid: ' + guid)
      }
    })
  }, 1000)
})

stan.on('close', function () {
  process.exit()
})
