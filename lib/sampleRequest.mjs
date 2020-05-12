import dns from 'dns'
import https from 'https'
import http from 'http'
import http2 from 'http2'


const callback = (res) => console.log({res})

export const reqOptions = {
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
    port: 8080,
    setHost: true,
    timeOut: 500,
    callback
}

