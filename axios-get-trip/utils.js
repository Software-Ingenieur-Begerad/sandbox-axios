const debug=require('debug')('utils');

function findSubStr(str, start, end) {
    var index = str.slice(start, end);
    debug('index: '+index);
    return index;
}
  
function gtfsDate2NodeDate(date){
    let start = 0;
    let end = 4;
    let year=findSubStr(date, start, end);
    debug('year: '+year);
    start=4;
    end=6;
    let month=findSubStr(date, start, end);
    debug('month: '+month);
    start=6;
    end=8;
    let day=findSubStr(date, start, end);
    debug('day: '+day);
    let nodeDate = new Date(year, month - 1, day);
    debug('nodeDate: '+nodeDate.toDateString());
    return nodeDate;
}

module.exports={
    gtfsDate2NodeDate
};
