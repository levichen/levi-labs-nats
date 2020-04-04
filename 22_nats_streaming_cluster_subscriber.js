#!/usr/bin/env node

'use-strict'

const clusterId = 'levi-test-nats'
// const servers = ['nats://10.50.10.74:4222', 'nats://10.50.10.247:4222', 'nats://10.50.10.9:4222']
const servers = ['nats://10.50.10.247:4222']

const stan = require('node-nats-streaming').connect(clusterId, 'subscriber', { servers: servers })

const subject = 'foo'

stan.on('connect', function () {
  // Subscriber can specify how many existing messages to get.
  var opts = stan.subscriptionOptions().setDeliverAllAvailable()
  var subscription = stan.subscribe(subject, opts)

  subscription.on('message', function (msg) {
    console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData())
  })

  // After one second, unsubscribe, when that is done, close the connection
  setTimeout(function () {
    subscription.unsubscribe()
    subscription.on('unsubscribed', function () {
      stan.close()
    })
  }, 200000)
})

stan.on('close', function () {
  process.exit()
})
