require('dotenv').config();
const utils=require('./utils');
const axios=require('axios');
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
/*
    const service_id=dataGet.data[0].service_id;
    debug('service_id: %s',service_id);

    debug('dataGet.data[0].trip_id: %s',dataGet.data[0].trip_id);

    const trip_id=dataGet.data[0].trip_id;
    debug('trip_id: %s',trip_id);
*/
    for(var i = 0; i < 2; i++)
    {
	const tripId=dataGet.data[i].trip_id;
	debug('tripId: %s',tripId);
	const serviceId=dataGet.data[0].service_id;
	debug('serviceId: %s',serviceId);

	const queryService=`http://localhost:65534/service?serviceid=${serviceId}`;
	debug('queryService: '+queryService);
	let dataService = await axios.get(queryService);

	const monday=dataService.data[0].monday;
	const tuesday=dataService.data[0].tuesday;
	const wednesday=dataService.data[0].wednesday;
	const thursday=dataService.data[0].thursday;
	const friday=dataService.data[0].friday;
	const saturday=dataService.data[0].saturday;
	const sunday=dataService.data[0].sunday;
	const start_date=dataService.data[0].start_date;
	const end_date=dataService.data[0].end_date;
	const mapTime=new Map();
	const timeStart=utils.gtfsDate2NodeDate(start_date).getTime();
	debug('timeStart: '+timeStart);
	debug('mapTime size: '+mapTime.size);
	debug('mapTime has timeStart: '+mapTime.has(timeStart));
	mapTime.set(timeStart,tripId);
	debug('mapTime size: '+mapTime.size);
	debug('mapTime has timeStart: '+mapTime.has(timeStart));
    }
/*
    const map=new Map();

    debug('map size: '+map.size);
    debug('map has start_date: '+map.has(start_date));
    map.set(start_date,trip_id);
    debug('map size: '+map.size);
    debug('map has start_date: '+map.has(start_date));

    debug('map has end_date: '+map.has(end_date));
    map.set(end_date,trip_id);
    debug('map size: '+map.size);
    debug('map has end_date: '+map.has(end_date));

    const mapDate=new Map();
    const nodeDateStart=utils.gtfsDate2NodeDate(start_date);
    debug('nodeDateStart: '+nodeDateStart);

    debug('mapDate size: '+mapDate.size);
    debug('mapDate has nodeDateStart: '+mapDate.has(nodeDateStart));
    mapDate.set(nodeDateStart,trip_id);
    debug('mapDate size: '+mapDate.size);
    debug('mapDate has nodeDateStart: '+mapDate.has(nodeDateStart));
    const nodeDateStartCopy=new Date(nodeDateStart);
    debug('mapDate has nodeDateStartCopy: '+mapDate.has(nodeDateStartCopy));
*/
} 
