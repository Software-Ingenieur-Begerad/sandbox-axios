require('dotenv').config();
const axios = require('axios');
const debug=require('debug')('trips');

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
    debug('dataGet.data[0].ageny_name: %s',dataGet.data[0].agency_name);
    debug('dataGet.data[0].route_short_name: %s',dataGet.data[0].route_short_name);
    debug('dataGet.data[0].agency_id: %s',dataGet.data[0].agency_id);
    debug('dataGet.data[0].route_id: %s',dataGet.data[0].route_id);

    const service_id=dataGet.data[0].service_id;
    debug('service_id: %s',service_id);

    debug('dataGet.data[0].service_id: %s',dataGet.data[0].service_id);
    debug('dataGet.data[0].trip_id: %s',dataGet.data[0].trip_id);

    const queryService=`http://localhost:65534/service?serviceid=${service_id}`;
    debug('queryService: '+queryService);
    let dataService = await axios.get(queryService);

    debug('dataService received via GET');
    debug('dataService: %s',dataService);
    debug('dataService.data.length: %s',dataService.data.length);
    debug('dataService.data: %s',dataService.data);

    const monday=dataService.data[0].monday;
    debug('monday: %s',monday);

    const tuesday=dataService.data[0].tuesday;
    debug('tuesday: %s',tuesday);

    const wednesday=dataService.data[0].wednesday;
    debug('wednesday: %s',wednesday);

    const thursday=dataService.data[0].thursday;
    debug('thursday: %s',thursday);

    const friday=dataService.data[0].friday;
    debug('friday: %s',friday);

    const saturday=dataService.data[0].saturday;
    debug('saturday: %s',saturday);

    const sunday=dataService.data[0].sunday;
    debug('sunday: %s',sunday);

    const start_date=dataService.data[0].start_date;
    debug('start_date: %s',start_date);

    const end_date=dataService.data[0].end_date;
    debug('end_date: %s',end_date);

} 
