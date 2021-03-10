const http = require('http')
const https = require('https')
const fs = require('fs')
const qs = require('querystring')
const unzipper = require('unzipper')

function auth(req, res) {
  let query = qs.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1])
  getToken(query.code, function (info) {
    res.write(`<a href='http://localhost:8083/?access_token=${info.access_token}'>publish</a>`);
    res.end();
  })
}

function getToken(code, cb) {
  let req = https.request({
    hostname: 'github.com',
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.7c84a4b639b85594&client_secret=70e37b510694c2bbf34046d725b1daa06767df1f`,
    port: 443,
    method: 'POST'
  }, function (res) {
    let body = ''
    res.on('data', chunk => {
      body += (chunk.toString())
    })
    res.on('end', chunk => {
      cb(qs.parse(body))
    })
  })
  req.end()
}

function publish(req, res) {
  let query = qs.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1])
  getUser(query.token, info => {
    if (info.login === 'north-wanderer') {
      req.pipe(unzipper.Extract({ path: '../server/public/' }))
      req.on('end', function () {
        res.end('success')
      })
    }
  })
}

function getUser(token, cb) {
  let req = https.request({
    hostname: 'api.github.com',
    path: '/user',
    port: 443,
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'toy-publish'
    }
  }, function (res) {
    let body = ''
    res.on('data', chunk => {
      body += (chunk.toString())
    })
    res.on('end', chunk => {
      cb(JSON.parse(body))
    })
  })
  req.end()
}

http.createServer(function (req, res) {
  if (req.url.match(/^\/auth\?/)) return auth(req, res)
  if (req.url.match(/^\/publish\?/)) return publish(req, res)
}).listen('8082')
