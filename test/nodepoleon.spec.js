'use strict'

const Nodepoleon = require('../lib/nodepoleon')
var nodepoleon = new Nodepoleon()

var chai = require('chai')
var expect = chai.expect

chai.use(require('chai-as-promised'))

/* global describe, it */

describe('Nodepolenon#hash', () => {
  it('should return a valid hash', () => {
    var hash = nodepoleon.hash(0)
    expect(hash).to.be.a.string
    expect(hash).to.have.lengthOf(4)
  })

  it('should return false for invalid ids', () => {
    expect(nodepoleon.hash('')).to.be.false
    expect(nodepoleon.hash()).to.be.false
  })
})

describe('Nodepolenon#id', () => {
  it('should return a valid id', () => {
    var id = nodepoleon.id(nodepoleon.hash(42))
    expect(id).to.equal(42)
  })

  it('should return false for invalid hashes', () => {
    expect(nodepoleon.id('')).to.be.false
    expect(nodepoleon.id()).to.be.false
  })
})

describe('Nodepolenon#add', () => {
  it('should save the provided url', async () => {
    var hash = await nodepoleon.add('https://beevelop.com')
    expect(hash).to.be.equal(nodepoleon.hash(1))
  })

  it('should fail for invalid urls', () => {
    var hash = nodepoleon.add('invalid')
    return expect(hash).to.be.rejectedWith('Invalid URI')
  })
})

describe('Nodepolenon#get', (done) => {
  it('should get a save and retrieve url', async () => {
    var url = 'https://beevelop.com'
    var req = await nodepoleon.add(url).then((hash) => {
      return nodepoleon.get(hash)
    })
    
    expect(req).to.be.equal(url)
  })
})
