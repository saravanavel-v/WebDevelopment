const today = {};

let selectedMonth;
let selectedYear;

function init(){
    getToday();
    selectedMonth = today.month;
    selectedYear = today.year;
    showMonth(today.month + 1 ,today.year);
    addDateBox();
    showCalendar(today.month,today.year);
    renderEmojis(today.month,today.year);
    
}
function getToday(){
    const dt = new Date();
    today.year  = dt.getFullYear();
    today.month = dt.getMonth();
    today.date = dt.getDate();
    today.day = DAYS[dt.getDay()];
    // console.log(today);
}
  
function showMonth(month,year){
    __("#month-year").textContent = `${MONTHS[month]} - ${year}`;
}

function addDateBox(){
    const fragment = new DocumentFragment();
    for (let i = 0; i < 42; i++) {
  
      const ele = document.createElement('div');
      ele.id = `d${i}`;
      ele.classList.add('tile');
  
      const dateEle = document.createElement('span');
      dateEle.setAttribute('class','dateBox');
      dateEle.textContent = i;
      const emojiEle = document.createElement('span');
      emojiEle.setAttribute('class','emoji');
      ele.appendChild(emojiEle);
      ele.appendChild(dateEle);
      fragment.append(ele);
    }

    __(".cal-dates").appendChild(fragment);
  }
  
function showCalendar(month,year){
    let firstDay = new Date(year,month,1).getDay();
    let lastDay;
    if(leapYear(year) && month==1){
      lastDay=29;
    }else{
      lastDay =  DAYSINMONTH[MONTHS[month+1]];
    }
    const DATEBOXES = _(".cal-dates > .tile");
    DATEBOXES.forEach(function(date){
      date.firstElementChild.classList.remove('emoji');
      date.lastElementChild.textContent="";
    });
  
    // console.log(DATEBOXES,firstDay,lastDay);
    for(let i = 0 ; i<lastDay; i++ ){
        // console.log(i+firstDay,DATEBOXES[i+firstDay],month,year);
      DATEBOXES[i+firstDay].firstElementChild.classList.add('emoji');
      DATEBOXES[i+firstDay].lastElementChild.textContent=i+1;
    }
  
  }
  
function prev() {
    selectedMonth -= 1;
    if (selectedMonth < 0) {
      selectedMonth = 11;
      selectedYear -= 1;
    }
    showMonth(selectedMonth + 1 ,selectedYear);
    showCalendar(selectedMonth,selectedYear);
    renderEmojis(selectedMonth,selectedYear);
}
  

function nxt() {
    selectedMonth += 1;
    if (selectedMonth > 11) {
      selectedMonth = 0;
      selectedYear += 1;
    }
    showMonth(selectedMonth + 1 ,selectedYear);
    showCalendar(selectedMonth,selectedYear);
    renderEmojis(selectedMonth,selectedYear);
}
  
function leapYear(year){
  if(year%4==0  || year%400==0 && year%100==0){
    return true;
  }else{
    return false;
  }
}
  
function renderEmojis(month,year){
   
    let firstDay = new Date(year,month,1).getDay();
    // console.log(month,year)
    for (let i = 0; i < 42; i++) {
       __(`#d${i}`).firstElementChild.innerHTML = "";
    }
    
    data = JSON.parse(localStorage.getItem("moodData"));
    if(data){
      console.log(data)
      let moodDataForTheYear = data[year] ? data[year] : null;
      let moodDataForTheMonth = moodDataForTheYear ? moodDataForTheYear[month] : null;
    
      // console.log(moodDataForTheMonth);
    
      if(moodDataForTheMonth){
        for(const date in moodDataForTheMonth){
          // console.log(moodEmoji[moodDataForTheMonth[date].emoji],firstDay,moodDataForTheMonth);
          document.querySelector(`#d${+date + firstDay}`).firstElementChild.innerHTML = `${moodEmoji[moodDataForTheMonth[date].emoji]}`;
        }
      }
    }
    else{
      data = {};
      console.log("can't get data")
    }
    calculateMoodForAll()
    calculateMoodForMonth()
}

function addMoodBoxs(obj){
  let moodBoxDiv = `<div class="mood-boxs">
    <div class="mood-boxs-child">
      <p class="show-emoji">#emoji#</p>
    </div>
    <div class="mood-boxs-child">
      <p class="title">#title#</p>
      <p class="time">#time#</p>
      <div class="work-list" >
        #worklist-p#
      </div>
      <p id="show-description">#description#</p>
    </div>

    </div>`;

  let workListTemp = "";
  obj.works.forEach((w)=>{
    let p = `<p class="p1">${w}</p>` 
    workListTemp += p;
  })
    

  let temp = moodBoxDiv.replace("#emoji#",moodEmoji[obj.emoji]).replace("#title#",obj.title).replace("#description#",obj.description).replace("#time#",obj.time).replace("#worklist-p#",workListTemp)
  __(".before-moods").innerHTML += temp;


// console.log(temp);
}
  
init();


{/* <p class="p1">Sleep</p>
        <p class="p1">Rest</p>
        <p class="p1">Work</p> */}
