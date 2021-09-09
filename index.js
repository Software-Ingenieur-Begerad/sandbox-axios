require('dotenv').config();
const axios = require('axios');
const debug=require('debug')('axios');

const URL=process.env.URL||'https://dedriver.org/gtfs/realtime';
debug('URL: '+URL)

const TOKEN=process.env.TOKEN||'TOKEN';
debug('TOKEN: '+TOKEN)

run().catch(err => {
    debug('run: error')
    console.log(err)
});

async function run() {
    debug('run:...')


    //HTTP GET
    let dataGet = await axios.get(
	//'https://dedriver.org/gtfs/realtime',
	URL,
	//'http://67.212.79.244:8080/hermes_st_Transcollines/pb/vehiclePositions.pb',
	//'https://dedriver.org/gtfs-rt/vehiclePostions.pb',
	//'http://localhost:3000/user',
    	{
	    headers:{
		'accept':'application/octet-stream',
		'authorization':`${TOKEN}`
		//'authorization':`Basic ${TOKEN}`
	    }
	}
    )
	.then(res => res.data);
    debug('data received via GET');
    debug('dataGet len: %s',dataGet.length)

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
