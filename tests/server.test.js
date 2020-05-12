const dns = require('dns')
const http = require('http')

// const callback = (res) => console.log({res})

const reqOptions = {
    agent: undefined,
    auth: "",
    createConnection: false,
    defaultPort: 8000,
    family: 4,
    headers: undefined,
    hostname: 'localhost',
    insecureHTTPParser: false,
    localAddress: '127.0.0.1',
    lookup: dns.lookup,
    maxHeaderSize: 16384,
    method: 'GET',
    path: '/',
    protocol: 'http:',
    port: 8000,
    setHost: true,
    timeOut: 500,
    callback: null
}


test('http server', done => {

    const server = http.createServer((req, res) => {
        // console.log({req})
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('hello world \n')
    })

    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    server.listen(8000)

    reqOptions.agent = new http.Agent()

    const req = http.request(reqOptions, (res) => {
        //console.log({res})
        expect(res).toBeTruthy()
        expect(res.statusCode).toBe(200)
        expect(res.httpVersion).toBe('1.1')
        expect(res.httpVersion).toBe('1.1')
        server.close()
        done()
    })


    req.end()





})



const fs = require('fs')

test('read certificates', ()=> {

        const options = {
            key: fs.readFileSync('./server/certs/RootCA.key'),
            cert: fs.readFileSync('./server/certs/RootCA.pem')
        }


    expect(options).toBeTruthy()
})







