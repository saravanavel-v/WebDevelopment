let splitedWords = [];
let selectedlist = [];
let selectedWords = [];
let score = 0;
let answeredQuestions = 0;
let count=0;
let time = 90;
let startTimer;
const alphabetList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let firstWord;
let secondWord;
let selectedWord="";
async function showNewWord(){ 
    console.log(count,wordList,wordList[count])
   selectedWords=[];
   selectedlist=[];
   selectedWord="";
   word = wordList[count].word;
   definition = wordList[count].definition;
   
   

   spiltWord();
   showHalfAns();
}

function spiltWord(){
    firstWord = word.substring(0,Math.round(word.length/2));
    secondWord = word.substring(Math.round(word.length/2));
    splitedWords =secondWord.split("");

    // fill(splitedWords);
    // console.log(splitedWords,10-splitedWords.length)
}

function showHalfAns(){
    let splitedletters = shuffle(splitedWords);
    selectLetters();
    _(".ans-div-main").textContent = firstWord;
    _(".ques-main").textContent = definition;
    // console.log(word,"-",definition);
    __(".ans-button").forEach((ele,idx)=>{
        ele.textContent = splitedletters[idx];
    })
    
}


function selectLetters(){
    while(splitedWords.length<10){
        let r = Math.floor(Math.random()*26);
        splitedWords.push(alphabetList[r]);
    }
}


_(".ans-buttons-div-main").addEventListener("click",function (ev){
    if(ev.target.classList.contains("ans-button")){
        // console.log(ev.target,this)
        if(!ev.target.classList.contains("selected")){
            ev.target.classList.add("selected");
            selectedWords.push(_(".ans-div-main").textContent);
            _(".ans-div-main").textContent += ev.target.textContent; 
            selectedWord = _(".ans-div-main").textContent;
            selectedlist.push(ev.target);
        }
    }
})

_(".fa-delete-left").addEventListener('click',function(ev){
    if(selectedlist.length!=0 && selectedWords.length!=0){
        _(".ans-div-main").textContent = selectedWords[selectedWords.length-1]
        selectedWord = _(".ans-div-main").textContent;
        selectedWords.splice(selectedWords.length-1)
        selectedlist[selectedlist.length-1].classList.remove("selected");
        selectedlist.splice(selectedlist.length-1);
    }
})

_(".submit").addEventListener("click",function(){
    console.log(word==selectedWord);
    if(word==selectedWord){
        count+=1;
        // score += ;
        _("#answered-questinos").textContent = count;
        
        removeSelected();
        showNewWord();
    }
    else{
        count+=1;
        removeSelected();
        showNewWord();
    }
    
    
})

function removeSelected(){
    selectedlist.forEach((ele,idx)=>{
        ele.classList.remove("selected");
        // console.log(idx,ele,selectedlist[idx])
        if(idx==selectedlist.length-1){
            showNewWord();
        }
    })
    
}


function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let r1 = Math.floor(Math.random()*(arr.length));
       let temp = arr[i];
       arr[i] = arr[r1];
       arr[r1] = temp;
     }
     return arr;
}

function timer(){
    time--;
    _("#timer").textContent = time > 60 ? `${parseInt(time/60)} :${time%60}` :"00:"+time >10 ? `0${time}`:time ;
    // console.log(time > 60 ? `${parseInt(time/60)} :${time%60}` :time);
    if(time==0){
        
        _(".time-end").style.zIndex = "5"; 
        clearInterval(startTimer);
    }
}