
// let data = {
//     "2023": {
//       "9": {
//         "07": "Happy",
//         "08": "Happy",
//         "09": "Sad",
//         "10": "Depressed",
//         "12": "Neutral"
//       },
//       "10": {
//         "07": "Happy",
//         "08": "Happy",
//         "09": "Sad",
//         "10": "Depressed",
//         "11": "Neutral",
//         "01": "Happy",
//         "02": "Happy",
//         "03": "Happy",
//         "04": "Happy",
//         "05": "Happy",
//       }
//     }
//   }
  
let data = {};
  
  //check if data exists for the given year/given month and then add the entry for the date
  function addMoodEntry(dt,dataObj){
    console.log("add mood entry function ")
    return new Promise((res,rej)=>{
      let currentYear = data[dt.year] || null ;
      let currentMonth = (currentYear && currentYear[dt.month]) ? currentYear[dt.month] : null ;
      // console.log("$$$",currentYear[dt.month])
    
      if(currentYear){
        if(currentMonth){
          currentMonth[dt.date] = dataObj;
          // console.log(data)
          res(data)
        }
        else{
          console.log("###",currentYear[dt.month])
          currentYear[dt.month] = {};
          currentYear[dt.month][dt.date] = dataObj;
          // console.log(data)
          res(data)
        }
      }
      else{
        data[dt.year] = {};
        data[dt.year][dt.month]={};
        console.log(data[dt.year][dt.month])
        data[dt.year][dt.month][dt.date] = dataObj;
        // console.log(data)
        res(data);
      }
    })
  
  }
  
  