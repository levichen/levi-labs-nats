#!/usr/bin/env node

'use-strict'

const stan = require('node-nats-streaming').connect('test-cluster', 'publisher')

const subject = 'foo'
const message = 'hello nats streaming 5'

stan.on('connect', function () {
  // Simple Publisher (all publishes are async in the node version of the client)
  stan.publish(subject, message, function (err, guid) {
    if (err) {
      console.log('publish failed: ' + err)
    } else {
      console.log('published message with guid: ' + guid)
    }
  })
})

stan.on('close', function () {
  process.exit()
})
