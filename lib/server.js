'use strict'

const Nodepoleon = require('./nodepoleon')
let np = new Nodepoleon()

const bodyParser = require('body-parser')
const staticDir = require('path').resolve(__dirname, '..', 'static')

const $express = require('express')
$express()
  .set('views', staticDir)
  .set('view engine', 'jade')
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use($express.static(staticDir))
  .get('/:hash', (req, res) => {
    np.get(req.params.hash).then((url) => {
      res.status(301).redirect(url)
    }).catch(() => {
      res.sendStatus(404)
    })
  })

  .get('/', (req, res) => {
    res.render('index')
  })
  .post('/', (req, res) => {
    np.add(req.body.url).then((hash) => {
      let url = req.protocol + '://' + req.get('host') + '/' + hash
      res.render('added', {
        url: url
      })
    }).catch((err) => {
      res.status(400).send(err.toString())
    })
  })

  .listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
  })
