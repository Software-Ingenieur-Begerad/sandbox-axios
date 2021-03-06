require('dotenv').config();
const axios = require('axios');
const debug=require('debug')('axios');

const URL=process.env.URL;
debug('URL: '+URL)

run().catch(err => {
    debug('run: error')
    console.log(err)
});

async function run() {
    debug('run:...')

    //HTTP GET
    let dataGet = await axios.get(
	URL
//async example to process responce
//    ).then(res => {
//	debug('res.data: %s',res.data)
//    });
    );

    debug('data received via GET');
    debug('dataGet: %s',dataGet);
    debug('dataGet.data.length: %s',dataGet.data.length);
    debug('dataGet.data: %s',dataGet.data);
    debug('dataGet.data[0].ageny_name: %s',dataGet.data[0].agency_name);
} 
