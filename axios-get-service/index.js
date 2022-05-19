require('dotenv').config();
const axios=require('axios');
const debug=require('debug')('axios');

const URL=process.env.URL;
debug('URL: '+URL)

run().catch(err => {
    debug('run: error')
    console.log(err)
});


async function run() {
    debug('run:...')

    objService = await axios.get(URL);

    //iterate over object
    for (const key in objService) {
	debug(`${key}: ${objService[key]}`);
    }

    //iterate over object
    let timeCount=0;
    for (const time in objService.data) {
	//debug(`time: ${time}`);
	let tripCount=0;
	for (const tripId in objService.data[time]){
	    //debug(`tripId: ${tripId}`);
	    tripCount++;
	}
	timeCount++;
	//debug('tripCount: '+tripCount);
    }
    debug('timeCount: '+timeCount);
}
