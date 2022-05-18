require('dotenv').config();
const utils=require('./utils');
const axios=require('axios');
const debug=require('debug')('trips');

const URL=process.env.URL;
debug('URL: '+URL)

let dataGet='';
let dataServices='';

run(dataGet,dataServices).catch(err => {
    debug('run: error')
    console.log(err)
});

async function handleTrip(element){
    const mapTime=new Map();
    mapTime.clear();

	const tripId=element.trip_id;
	//debug('tripId: %s',tripId);
	const tripShortName=element.trip_short_name;
	//debug('tripShortName: %s',tripShortName);
	const serviceId=element.service_id;
	//debug('serviceId: %s',serviceId);

	const queryService=`http://localhost:65534/service?serviceid=${serviceId}`;
	//debug('queryService: '+queryService);
	dataServices = await axios.get(queryService);

	const monday=dataServices.data[0].monday;
	const tuesday=dataServices.data[0].tuesday;
	//debug('tuesday: '+tuesday);
	const wednesday=dataServices.data[0].wednesday;
	//debug('wednesday: '+wednesday);
	const thursday=dataServices.data[0].thursday;
	const friday=dataServices.data[0].friday;
	const saturday=dataServices.data[0].saturday;
	const sunday=dataServices.data[0].sunday;
	const start_date=dataServices.data[0].start_date;
	const dateStart=utils.gtfsDate2NodeDate(start_date);
	//debug('dateStart: '+dateStart);
	const end_date=dataServices.data[0].end_date;
	const dateEnd=utils.gtfsDate2NodeDate(end_date);
	//debug('dateEnd: '+dateEnd);
	let dateNext=new Date(dateStart);
	//debug('dateNext: '+dateNext);

	while(dateNext.getTime()<=dateEnd.getTime()){
	    let weekday=dateNext.getDay();
	    //debug('weekday: '+weekday);

	    if((weekday===utils.dateWeekday.monday && monday) ||
	       (weekday===utils.dateWeekday.tuesday && tuesday) ||
	       (weekday===utils.dateWeekday.wednesday && wednesday) ||
	       (weekday===utils.dateWeekday.thursday && thursday) ||
	       (weekday===utils.dateWeekday.friday && friday) ||
	       (weekday===utils.dateWeekday.saturday && saturday) ||
	       (weekday===utils.dateWeekday.sunday && sunday)){
		//update map
		updateMap(dateNext.getTime(),tripId,tripShortName,mapTime);
	    }
	    dateNext=new Date(dateNext.setDate(dateNext.getDate()+1));
	    //debug('dateNext: '+dateNext.getDate());
	    //debug('dateNext.getTime(): '+dateNext.getTime());
	}
	//debug('dateEnd: '+dateEnd);
    //debug('dateNext: '+dateNext);
    return mapTime;
}

async function run(dataTrips, dataServices) {
    debug('run:...')

    //HTTP GET
    dataTrips = await axios.get(URL);

    //TODO refactor callback function
    const map=new Map(dataTrips.data.forEach(handleTrip));
    debug('map.size: '+map.size);
}

function updateMap(time,tripId,tripShortName,map){
    //debug('time: '+time);
    //time map empty
    if(map.size===0){
	//debug('map.size: '+map.size);
	//create trip map
	let mapTrips=new Map();
	//add trip to trip map
	addTrip(tripId,tripShortName,mapTrips);
	//add time to time map
	map.set(time,mapTrips);
	//debug('map.size: '+map.size);
    }//time map NOT empty
    else{
	//debug('map.size: '+map.size);
	//time not present yet
	if(!map.has(time)){
	    //debug('map has not: '+time);
	    //create trips map
	    let mapTrips=new Map();
	    //add trip to trip map
	    addTrip(tripId,tripShortName,mapTrips);
	    //add time to time map
	    map.set(time,mapTrips);
	    //debug('map.size: '+map.size);
	}
	//time already present
	else{
	    //debug('map has: '+time);
	    let mapTrips=map.get(time);
	    //debug('mapTrips.size: '+mapTrips.size);
	    //TODO Does it matter to override existing trips?
	    //add trip to trip map
	    addTrip(tripId,tripShortName,mapTrips);
	}
    }
}

function addTrip(tripId, tripShortName, map){
    map.set(tripId,tripShortName);
    //debug('map.size: '+map.size);
}
