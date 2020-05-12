import https from 'https'
import {reqOptions} from './sampleRequest.mjs'

const req = https.request(reqOptions, (res) => console.log('request ok \n'))

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
})

req.end();

req.end();