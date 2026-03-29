const xlsx = require("xlsx");

function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return createObj(xlsx.utils.sheet_to_json(sheet));
}

module.exports = readExcel;


function createObj(values = []){
  
  const header = values[0];
  const output =  values.slice(1).map(obj=>{
    const record = {};
    const keypair = [];
    const valuepair = [];
    for( const [key , value] of Object.entries(header)){
       keypair.push(value);
    }

    for (const [key ,value] of Object.entries(obj)){
      valuepair.push(value);
    }

    for(let i = 0 ; i < keypair.length ; i++){
      record[keypair[i]] = valuepair[i];
    }

    return record;
  })
  return output;
}