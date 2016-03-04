const Nodepoleon = require('./lib/nodepoleon')
var nodepoleon = new Nodepoleon()

var expect = require('chai').expect
var assert = require('chai').assert
var chai = require('chai')

chai.use(require('chai-as-promised'))

describe('Nodepolenon#hash', function () {
  it('should return a valid hash', function () {
    var hash = nodepoleon.hash(0)
    expect(hash).to.be.a.string
    expect(hash).to.have.lengthOf(4)
  })

  it('should return false for invalid ids', function () {
    expect(nodepoleon.hash('')).to.be.false
    expect(nodepoleon.hash()).to.be.false
  })
})

describe('Nodepolenon#id', function () {
  it('should return a valid id', function () {
    var id = nodepoleon.id(nodepoleon.hash(42))
    expect(id).to.equal(42)
  })

  it('should return false for invalid hashes', function () {
    expect(nodepoleon.id('')).to.be.false
    expect(nodepoleon.id()).to.be.false
  })
})

describe('Nodepolenon#add', function (done) {
  it('should save the provided url', function () {
    var hash = nodepoleon.add('https://beevelop.com')
    return expect(hash).to.eventually.become(nodepoleon.hash(1))
  })

  it('should fail for invalid urls', function () {
    var hash = nodepoleon.add('invalid')
    return expect(hash).to.eventually.be.rejectedWith('Invalid URI')
  })
})

describe('Nodepolenon#get', function (done) {
  it('should get a save and retrieve url', function () {
    var url = 'https://beevelop.com'
    var req = nodepoleon.add(url).then(function (hash) {
      return nodepoleon.get(hash)
    })
    return expect(req).to.eventually.become(url)
  })
})
