require('dotenv').config();
const axios = require('axios');
const debug=require('debug')('axios');

const URL=process.env.URL||'https://tarifmatrix.vbn.de:4445/fares/info';
debug('URL: '+URL)

const USR=process.env.USR||'USR';
debug('USR: '+USR)

const KEY=process.env.KEY||'KEY';
debug('KEY: '+KEY)

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
	});
    res.status; // 200

    debug('data received via GET');
    debug('dataGet len: %s',dataGet.length)
//    debug('dataGet: %s',dataGet)
    debug('dataGet: %s',JSON.stringify(dataGet))
//    debug('res JSON: %s',JSON.stringify(res));

/*
    //HTTP POST

    //url as first,
    //request body as second and
    //options as third  POST argument
    //response is returned
    const res=await axios.post(
	'http://localhost:3000/user',
	//'https://dedriver.org/gtfs/realtime',
	encodedPost,
	{
	    headers:{
		'content-type':'application/octet-stream'}
	    //		'content-type':'application/x-protobuf'}
	    //'transformRequest':[]
	}
    ).then(res => res.data);
    debug('POST sent');
    debug('res JSON: %s',JSON.stringify(res));
    //debug('res content-type: %s',res.data.headers['content-type']);
*/
} 
