const ctx = __('#myChart1');
const ctx2 = __("#myChart2");
var ch1,ch2;

function showStatisticsChart(obj){
    ch1 = new Chart(ctx, {
        type:"bar",
        data: {
            labels: ['Happy', 'Sad', 'Normal', 'Angry'],
            datasets: [{
                type: 'bar',
                label: 'mood',
                data:[obj.happy ? obj.happy : 0,obj.sad ? obj.sad : 0,obj.normal ? obj.normal : 0,obj.angry ? obj.angry : 0],
                backgroundColor:[
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255,55,86)',
                ],
                borderColor:[
                    'rgba(255, 99, 133,0.9)',
                    'rgba(54, 162, 236,0.9)',
                    'rgba(255, 205, 87,0.9)',
                    'rgba(255,55,87,0.9)',
                ],
                borderWidth: 1,
            }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });

    // let monthCount = 0;
    // Object.keys(obj).forEach((m)=>{
    //     monthCount += obj[m]
    // })
    // __("#month-count").textContent = monthCount;
}

function showMoodMeterChart(obj){
    // chart2.destroy();
    ch2 = new Chart(ctx2,{
        type:"doughnut",
        data:{
            datasets:[{
                label:'mood meter',
                data:[obj.happy ? obj.happy : 0,obj.sad ? obj.sad : 0,obj.normal ? obj.normal : 0,obj.angry ? obj.angry : 0],
                backgroundColor:[
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255,55,86)'
                ],
                borderRadius:90,
                borderColor:" transperent",
                circumference:180,
                rotation:270,
            }],
        
        },
        options:{
            cutout:50,
        }
    })

    let monthCount = 0;
    Object.keys(obj).forEach((m)=>{
        let selector = `.${m}count`;
        __(selector).textContent = obj[m];
        // console.log(obj[m],__(selector),selector) 
        monthCount += obj[m]
    })
    __("#month-count").textContent = monthCount;
}





function calculateMoodForMonth(){
    let countObj = {
        normal:0,
        sad:0,
        angry:0,
        happy:0
    };
    if(data[selectedYear]){
        if(data[selectedYear][selectedMonth]){
            Object.keys(data[selectedYear][selectedMonth]).forEach((ele)=>{
                // console.log(data[selectedYear][selectedMonth][ele].emoji,countObj[data[selectedYear][selectedMonth][ele].emoji] || 0)
                countObj[data[selectedYear][selectedMonth][ele].emoji] +=1; 
            })
        }
    }
    
    
    if(countObj){
        if(ch2){
            ch2.destroy();
        }
        showMoodMeterChart(countObj)
        // console.log(countObj);
    }
    
}

function calculateMoodForAll(){
    let countObj = {
        normal:0,
        sad:0,
        angry:0,
        happy:0
    };
    if(data[selectedYear]){
        if(data[selectedYear][selectedMonth]){
            __(".before-moods").innerHTML = "";
            Object.keys(data[selectedYear]).forEach((year)=>{
                Object.keys(data[selectedYear][year]).forEach((ele)=>{
                    console.log(data[selectedYear][year][ele])
                    addMoodBoxs(data[selectedYear][year][ele])
                    countObj[data[selectedYear][year][ele].emoji] +=1; 
                })
            })
        }
    }
    

    if(countObj){
        if(ch1){
            ch1.destroy();
        }
        showStatisticsChart(countObj)
        // console.log(countObj);
    }
    

}


// ctx2.onclick = function(evt) {
//     var activePoints = ch2.getElementsAtEvent(evt);
//     if (activePoints[0]) {
//       var chartData = activePoints[0]['_chart'].config.data;
//       var idx = activePoints[0]['_index'];

//       var label = chartData.labels[idx];
//       var value = chartData.datasets[0].data[idx];
      
//       console.log(label);
//       console.log(value);
//     }
// }
// console.log(ctx2.data);