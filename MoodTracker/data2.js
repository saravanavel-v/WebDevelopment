let SelectedMood="";
let selectedWorks=[];
let title="";
let description="";
let selectDate;
// let selectMonth;
// let selectYear;

__("#journal-title").addEventListener('change',(ev)=>{
    title = ev.target.value;
    // console.log(ev.target.value);
});


__("#description").addEventListener('change',(ev)=>{
    description = ev.target.value;
    // console.log(ev.target.value);
});


_(".mood").forEach((ele)=>{
    ele.addEventListener('click',(ev)=>{
        _(".mood").forEach((ele1)=>{
            ele1.classList.remove('selectedEmoji');
            if(ele==ele1){
                SelectedMood=ele1.classList[0];
                ele1.classList.add('selectedEmoji');
                // console.log(SelectedMood);
            }
        })
    });
});

_(".work").forEach((ele)=>{
    ele.addEventListener('click',(ev)=>{
        if(selectedWorks.includes(ev.target.textContent)){
            ev.target.classList.remove('selectedWork');
            let found = selectedWorks.filter(work=>{
                return work==ev.target.textContent;
            });
            selectedWorks.splice(found,1);
            // console.log(selectedWorks);
        }
        else{
            
            ev.target.classList.add('selectedWork');
            selectedWorks.push(ev.target.textContent);
            // console.log(selectedWorks);
        }
       
    })
})

__(".accept").addEventListener('click',()=>{
    if(title && SelectedMood && selectedWorks && description){
        // console.log(title,SelectedMood,selectedWorks,description);
        
        __("#journal-title").value="";
        __("#description").value="";
        _(".mood").forEach((ele)=>{
            ele.classList.remove('selectedEmoji');
        })
        _(".work").forEach((ele)=>{
            ele.classList.remove('selectedWork');
        })
        dt = {
            year:selectedYear ? selectedYear : today.year,
            month:selectedMonth >= 0 ? selectedMonth : today.month,
            date:selectDate ? selectDate-1 : today.date,
        }
        setDataToObj(title,SelectedMood,selectedWorks,description,dt);
        dt ={};

    }
    else{
        showError("please enter the valid inputs...!");
    } 
})

    __(".cal-dates").addEventListener('click',ev=>{
        if(ev.target.classList.contains("emoji")){
            let e = ev;
            if(selectedYear == today.year){
                if(selectedMonth <= today.month){
                    selectDate = ev.target.nextElementSibling.textContent;
                    // selectMonth = selectedMonth;
                    // selectYear = selectedYear;
                    changePage(__(".p-icon"));
                    console.log(e.textContent,selectedMonth,selectedYear,ev.target.nextElementSibling.textContent)  
                }
            }
            else if(selectedYear < today.year){
                selectDate = ev.target.nextElementSibling.textContent;
                // selectMonth = selectedMonth;
                // selectYear = selectedYear;
                changePage(__(".p-icon"));
                console.log(e.textContent,selectedMonth,selectedYear,ev.target.nextElementSibling.textContent)
            }
        }
    })
    



async function setDataToObj(t,e,wl,d,dateObj){
    let time  = new Date();
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    let seconds = time.getSeconds().toString().padStart(2, '0');
    let currentTime = `${hours}:${minutes}:${seconds}`;
    let timeInStr = `${time.getDate()} ${time.toLocaleString('en-US', { month: 'long' })}, ${currentTime}`
    let data1 = {};
    data1.title = t;
    data1.emoji = e;
    data1.time = timeInStr;
    data1.works = wl;
    data1.description = d;
    console.log(dateObj,data1);
    await addMoodEntry(dateObj,data1).then((obj)=>{
        console.log(obj)
        localStorage.setItem("moodData",JSON.stringify(obj))
    })
    // renderEmojis(today.month,today.year);
}
