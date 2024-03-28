let user="";
let email="";
let login=false;
let createNew=false;
let userLogs=[];

const WHOLEPAGE=document.querySelector(".whole-page");
document.querySelector(".nav").addEventListener("click",ev=>{
  changePage(ev.target);
});
function changePage(ev){
  _(".icon").forEach(ele=>{
    ele.classList.remove("selected-nav");
  });
  if(ev.classList.contains("icon") && ev.classList.contains("h-icon")){
    WHOLEPAGE.style.transform=`translateX(0%)`;
    ev.classList.add("selected-nav");
  }
  if(ev.classList.contains("icon") && ev.classList.contains("c-icon")){
    WHOLEPAGE.style.transform=`translateX(-20%)`;
    ev.classList.add("selected-nav");
  }
  if(ev.classList.contains("icon") && ev.classList.contains("p-icon")){
    WHOLEPAGE.style.transform=`translateX(-40%)`;
    ev.classList.add("selected-nav");
  }
  if(ev.classList.contains("icon") && ev.classList.contains("cal-icon")){
    WHOLEPAGE.style.transform=`translateX(-60%)`;
    ev.classList.add("selected-nav");
  }
  if(ev.classList.contains("icon") && ev.classList.contains("u-icon")){
    WHOLEPAGE.style.transform=`translateX(-80%)`;
    ev.classList.add("selected-nav");
  }
}

__(".moods-div").addEventListener('click',()=>{
  changePage(__(".p-icon"));
  
})
__(".login-button").addEventListener('click',(ev)=>{
  __('.main').style.transform="translatex(-33.3%)";
  __("#alertbox").textContent="Login to Account";
  login=true;
});

__(".new-ac").addEventListener('click',(ev)=>{
  __('.main').style.transform="translatex(-33.3%)";
  __("#alertbox").textContent="Create New Account";
  createNew=true;
});

__(".logout").addEventListener("click",()=>{
  __('.main').style.transform="translatex(0)";
  let id = findId(email);
  userLogs[id].isLogin = false;
  saveUserLogDataOnLocal();
});

__(".continue").addEventListener('click',()=>{
  getUserInfo();
});

__(".save").addEventListener('click',function(ev){
  if(ev.target.classList.contains("save")){
    saveDataOnChanges();
  }
});
function __(query){
  return document.querySelector(query);
}

function _(queryAll){
  return document.querySelectorAll(queryAll);
}


function getUserInfo(){
  let uid=__("#uid");
  let eid=__("#eid");
  let pass1=__("#pass1");
  let pass2=__("#pass2");

  if(uid.value && eid.value && pass1.value && pass2.value){
    if(pass1.value===pass2.value){
      user=uid.value;
      email=eid.value;
      if(createNew && isExists(user,email,pass1.value)){
        showError("accont already exits...!");
      }
      if(createNew && !isExists(user,email,pass1.value)){
        userLogs.push({
          userName:user,
          email:email,
          password:pass1.value,
          isLogin:true,
        });

        __('.main').style.transform="translatex(-66.6%)";
        changePage(__(".h-icon"));

      }
      
      if(login && !isExists(user,email,pass1.value)){
        showError("account doesn't exits...!");
      }
      if(login && isExists(user,email,pass1.value)){
        __('.main').style.transform="translatex(-66.6%)";
        let id = findId(email);
        userLogs[id].isLogin = true;
        changePage(__(".h-icon"));
      }
      
      saveUserLogDataOnLocal();
      
    }
    else{
      showError("please enter the same password..!");
    }
  }
  else{
    showError("please enter the valid inputs...!");
  }
  
}


function isExists(userName,email,pass){
  let index = findId(email);
  return index >= 0 && userLogs[index].userName === userName && userLogs[index].email === email && userLogs[index].password === pass;
}

function findId(email){
  return userLogs.findIndex(function(user) {
    return user.email === email;
  });
}
function showError(error){
  __(".error").style.top="0";
  __(".error").textContent=error;
  setTimeout(()=>{
    __(".error").style.top="-100px";
  },1000)
}

function loadData(){

  let jsonData = localStorage.getItem("userLogs");
  if(jsonData){
    userLogs = JSON.parse(jsonData);
    userLogs.forEach(ele=>{
      if(ele.isLogin){
        user=ele.userName;
        email=ele.email;
        __("#name").textContent=user;
        __('.main').style.transform="translatex(-66.6%)";
        changePage(__(".h-icon"));
        showDataOnSavePage();
      }
    })
  }

}

function showDataOnSavePage(){
  let id = findId(email);
  __("#username").value=userLogs[id].userName;
  __("#email").value=userLogs[id].email;
  __("#password").value=userLogs[id].password;
  // console.log(userLogs[id],id,userLogs[id].password);

}

function saveDataOnChanges(){
  let username=__("#username");
  let emailId= __("#email");
  let pass=__("#password2");
  if(pass.value && emailId.value && username.value){
    console.log(username.value,emailId.value,pass.value);
    showError("changes saved..!");
    let id = findId(email);
    userLogs[id].userName = username.value;
    userLogs[id].email = emailId.value;
    userLogs[id].password = pass.value;
    saveUserLogDataOnLocal();
    showDataOnSavePage();
    __("#password2").value="";
  }else{
    showError("values shouldn't be empty...!")
  }
  
}

function saveUserLogDataOnLocal(){
  localStorage.setItem("userLogs",JSON.stringify(userLogs));
  console.log(userLogs);
}

loadData();
