#!/usr/bin/env node

'use-strict'

const stan = require('node-nats-streaming').connect('test-cluster', 'subscriber')

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
  }, 20000)
})

stan.on('close', function () {
  process.exit()
})
