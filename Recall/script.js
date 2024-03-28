window.addEventListener('click',function(ev){
    
    if(ev.target.classList.contains("next-button-main")){
        showNewWord();
        // getWord();
        document.querySelector(".play").style.opacity = "1";
        document.querySelector(".play").style.zIndex = "5";
        startTimer = setInterval(timer,1000);
    }
    else if(ev.target.classList.contains("fa-question-circle")){
        document.querySelector(".instructions").style.opacity = "1";
        document.querySelector(".instructions").style.zIndex = "5";
    }
    else if(ev.target.classList.contains("next-button-sample")){
        document.querySelector("#instruction").textContent=`Use the letters provided to recall the correct  word.[Tips.Not All letters will be used.]`;
        ev.target.textContent = "play";
        ev.target.classList.add("play-button");
        ev.target.classList.remove("next-button-sample");
        document.querySelector(".ques-div-sample").style.backgroundColor="rgb(85,105,118)";
        document.querySelectorAll(".ans-button-sample")[1].style.backgroundColor = "rgb(237,240,242)";
        document.querySelectorAll(".ans-button-sample")[1].style.color = "rgb(43,82,102)";
        document.querySelectorAll(".ans-button-sample")[1].style.boxShadow = "1px 1px 15px 5px #efefef";
        document.querySelector(".ans-div-sample").textContent+="e";
        document.querySelector(".circle-1").style.backgroundColor = "#efefef";
        document.querySelector(".circle-2").style.backgroundColor = "rgb(1, 115, 246)";
    }
    else if(ev.target.classList.contains("play-button")){
        document.querySelector("#instruction").textContent="Read the definition";
        ev.target.textContent = "play";
        ev.target.classList.add("next-button-sample");
        ev.target.classList.remove("play-button");
        document.querySelector(".ques-div-sample").style.backgroundColor="rgb(230,232,235)";
        document.querySelectorAll(".ans-button-sample")[1].style.backgroundColor = "rgb(43,82,102)";
        document.querySelectorAll(".ans-button-sample")[1].style.color = "rgb(237,240,242)";
        document.querySelectorAll(".ans-button-sample")[1].style.boxShadow = "none";
        document.querySelector(".ans-div-sample").textContent="av";
        document.querySelector(".circle-1").style.backgroundColor = "rgb(1, 115, 246)";
        document.querySelector(".circle-2").style.backgroundColor = "#efefef";

        showNewWord();
        // getWord();
        document.querySelector(".instructions").style.opacity = "0";
        document.querySelector(".instructions").style.zIndex = "1";
        document.querySelector(".play").style.opacity = "1";
        document.querySelector(".play").style.zIndex = "5";
        startTimer = setInterval(timer,1000);
    }
    else if(ev.target.classList.contains("fa-person-through-window")){  
        let mess="Do you want to Exit!";
        changePage(mess,"exit");
    }
    else if(ev.target.classList.contains("fa-reply")){
        let mess="Do you want to restart the game!";
        changePage(mess,"restart");
    }
    else if(ev.target.classList.contains("per")){
        let mess="Do you want to pause the game!";
        changePage(mess,"pause");
    }
    else if(ev.target.classList.contains("skip")){
        // console.log(selectedlist)
        removeSelected();
    }
    else if(ev.target.classList.contains("replay")){
        document.querySelector(".result-page").style.zIndex = "1";
        document.querySelector(".result-page").style.opacity = "0";
    }

})

function createAnsButton(){
    let div = document.getElementsByClassName("ans-buttons-div")[0];
    for(let i =0;i<10;i++){
        let button = document.createElement("button");
        button.class = "ans-button-main ";
        button.classList.add("ans-button");
        button.setAttribute("id",`b${i}`);
        div.appendChild(button);
    }
}
createAnsButton();



function changePage(mess,nav){
    let message;
    if(mess) {
        message = mess;
    }else{
        message ="sample message";
    }
    document.querySelector("#alert-mess").textContent = message;
    document.querySelector(".varify").style.top="0";
    document.querySelector(".yes").addEventListener('click',(ev)=>{
        if(nav=="exit"){
            exit();
        }
        else if(nav=="pause" || nav=="play"){
            pause();
        }
        else if(nav=="restart"){
            replay();
        }
    },{once:true});
    document.querySelector(".no").addEventListener('click',(ev)=>{
        nothing();
    },{once:true});
}

function nothing(){
    document.querySelector(".varify").style.top = "-100%";
}

function exit(){
    document.querySelector(".varify").style.top = "-100%";
    document.querySelector(".play").style.opacity = "0";
    document.querySelector(".play").style.zIndex = "1";
}

function replay(){
    document.querySelector(".varify").style.top = "-100%";
    time = 120;
    score = 0;
    count = 0;
    showNewWord();
}

function pause(){
    document.querySelector(".varify").style.top = "-100%";
    if(_(".per").classList.contains("fa-circle-pause")){
        _(".per").classList.remove("fa-circle-pause")
        _(".per").classList.add("fa-play")
        time = time;
        clearInterval(startTimer);
    }
    else if(_(".per").classList.contains("fa-play")){
        _(".per").classList.remove("fa-play")
        _(".per").classList.add("fa-circle-pause")
        startTimer = setInterval(timer,1000)
    }
    

}

function _(query){
    return document.querySelector(query);
}

function __(queryAll){
    return document.querySelectorAll(queryAll);
}

window.addEventListener("load",()=>{
    getWord();
})










// https://random-word-api.herokuapp.com/all