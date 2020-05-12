import https from 'https'
import fs from 'fs'

const options = {
    key: fs.readFileSync('./lib/server/certs/RootCA.key'),
    cert: fs.readFileSync('./lib/server/certs/RootCA.pem')
}

const server = https.createServer(options, (req, res) => {
    console.log({req});
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello');
})

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

server.listen(8000)