require('dotenv').config();
const axios = require('axios');
const debug=require('debug')('axios');

const URL=process.env.URL||'https://tarifmatrix.vbn.de:4445/fares/info';
debug('URL: '+URL)

const USR=process.env.USR||'USR';

const KEY=process.env.KEY||'KEY';

/**
 * Disable server authorization only in development mode
 */
if (process.env.NODE_ENV === 'development') {
    const https = require('https');
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
  axios.defaults.httpsAgent = httpsAgent
  debug('%s RejectUnauthorized is disabled.',process.env.NODE_ENV)
}

run().catch(err => {
    debug('run: error')
    console.log(err)
});

async function run() {
    debug('run:...')


    //HTTP GET
    let dataGet = await axios.get(
	URL,
	{
	    // Axios looks for the `auth` option, and, if it is set, formats a
	    // basic auth header for you automatically.
	    auth: {
		username: `${USR}`,
		password: `${KEY}`
	    }
	}
//async example to process responce
//    ).then(res => {
//	debug('res.data: %s',res.data)
//    });
    );

    debug('data received via GET');
    debug('dataGet: %s',dataGet)
    debug('dataGet.data.length: %s',dataGet.data.length)
    debug('dataGet.data: %s',dataGet.data)
    debug('dataGet.data[0].extern: %s',dataGet.data[0].extern)
} 
