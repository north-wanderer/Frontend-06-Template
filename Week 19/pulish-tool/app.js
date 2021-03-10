const http = require('http')
const fs = require('fs');
const child_process = require('child_process')
const qs = require('querystring')
const archiver = require('archiver')

// child_process.exec(`open -a '/Applications/Firefox Developer Edition.app' https://github.com/login/oauth/authorize?client_id=Iv1.7c84a4b639b85594`)
child_process.exec(`open -a /Applications/Chromium.app https://github.com/login/oauth/authorize?client_id=Iv1.7c84a4b639b85594`)
// child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.7c84a4b639b85594`)

http.createServer(function (req, res) {
  const params = qs.parse(req.url.match(/^\/\?([\s\S]+)$/)[1])
  publish(params.access_token)
}).listen('8083')

function publish(token) {
  let request = http.request({
    hostname: '127.0.0.1',
    port: 8082,
    method: 'POST',
    path: `/publish?token=${token}`,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  }, res => {
    console.log(res);
    request.end()
  })
  const archive = archiver('zip', { zlib: { level: 9 } })
  archive.directory('./sample/', false)
  archive.finalize()
  archive.pipe(request)
}
