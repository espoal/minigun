import http from 'http'
import {reqOptions} from './sampleRequest.mjs'

const req = http.request(reqOptions, (res) => console.log('request ok \n'))

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
})

req.end();

req.end();