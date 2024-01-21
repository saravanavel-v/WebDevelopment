
// let baseLink = `https://superheroapi.com/api/122163551822011543/search/`;
// let link = `https://superheroapi.com/api//${name}/image`;
// console.log(name,baseLink);

let json ;

async function fetchData(){
  try{
    blurPage();
    let NAME=_("#name").value;
    const data = await fetch(`https://superheroapi.com/api/122163551822011543/search/${NAME}`);
    if(data.status===200){
      json = await data.json();
      filterData(NAME);
    }else{ 
      throw new Error("something failed...")
    }
  }catch(err){
    console.log(err.message);
  }
  finally{
    unBlurPage();
  }
  
}


function filterData(NAME){
  let name=NAME.replace('-',"\\-")
  // console.log(name)
  let resultList=[];
  let rege = new RegExp(`^[${name}]+$`, 'ig')
  json.results.forEach(function(res) {
    if (rege.test(res.name)) {
      // console.log(res)
      resultList.push(res);
    }
  });
  if(resultList.length!=0){
    getImagelinks(resultList[0]);
    getData(resultList[0]);
  }else{
    showError("enter a full name")
  }
}

function _(query){
  return document.querySelector(query);
}
 
function __(queryAll){
  return document.querySelectorAll(queryAll);
}
function getImagelinks(rList){
  let rs = rList.image.url; 
  showImage(rs);
}


function showImage(img){
  _("#image").innerHTML="";
  try{
    let div = document.createElement("div");
    div.classList.add('img');
    div.style.backgroundImage=`url(${img})`; 
    _("#image").appendChild(div);
  }catch(er){
    console.log(er.message)
  }finally{
    fetch(img)
    .then(unBlurPage());
  }
}

function getData(data){
  let dataObj = {};
  let dataEle = [];
  Object.keys(data).forEach(key=>{
    dataObj[key] = data[key];
  })
  Object.keys(dataObj).forEach(key=>{
    __(".back").forEach(ele=>{
      if(ele.classList.contains(key)){
        dataEle.push([ele,dataObj[key]]);
      }
    })
  })
  // console.log(dataEle)
  showData(dataEle);
}

function showData(data){
  data.forEach(ele=>{
    ele[0].innerHTML = "";
    Object.keys(ele[1]).forEach(key=>{
      let p = document.createElement("p");
      p.className="p";
      if(typeof ele[1][key] === "object"){
        p.textContent = key+" : "+ele[1][key][0];
        // console.log(key+" : "+ele[1][key][0]);
      }else{
        p.textContent = key+" : "+ele[1][key];
        // console.log(key+" : "+ele[1][key])
      }
      ele[0].appendChild(p);
      // console.log(p)
    })
  })
}

function blurPage(){
  _(".prodecter").style.backDropFilter="10px";
  _(".prodecter").style.zIndex="11";
  _(".prodecter").style.opacity="1";
  // _(".alert").textContent = message;
}

function unBlurPage(){
  
  _(".prodecter").style.backDropFilter="0";
  _(".prodecter").style.zIndex="1";
  _(".prodecter").style.opacity="0";
}

function showError(message){
  let e = setTimeout(function(){
    alert(message)
    unBlurPage();
  },3000);
  e
}


