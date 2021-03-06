'use strict'
const salt = process.env.SALT || 'unicorn'
const min = process.env.MIN_HASH_LENGTH || 4
const alphabet = process.env.ALPHABET || 'abcdefghjkmnopqrstwxyz'

const $valid = require('valid-url')
const Hashids = require('hashids')
const $hash = new Hashids(salt, min, alphabet)
const $urls = require('save')('url', {
  logger: {
    info: () => {
    },
    verbose: () => {
    }
  }
})

class Nodepoleon {

  hash(id) {
    if (arguments.length < 1) return false
    id = parseInt(id, 10)
    return $hash.encode(id) || false
  }

  id(hash) {
    if (arguments.length < 1) return false
    let id = $hash.decode(hash)
    return (id && id[0]) || false
  }

  add(url) {
    return new Promise((resolve, reject) => {
      if (!$valid.isWebUri(url)) throw new Error('Invalid URI')
      $urls.create({url: url}, (err, res) => {
        if (err) throw err
        resolve(this.hash(res._id))
      })
    })
  }

  get(hash) {
    return new Promise((resolve, reject) => {
      $urls.read(this.id(hash), (err, res) => {
        if (err) throw err
        if (!res) throw Error('URL not found')
        resolve(res.url)
      })
    })
  }
}

module.exports = Nodepoleon
