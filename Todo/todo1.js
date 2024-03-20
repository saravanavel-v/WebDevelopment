const WRAPPER = document.querySelector(".wrapper-tasks");
let template = `<div class='task' id="task#id#">
    <div class="check"><i class='#complete# fa fa-check'></i></div>
    <p class="#completepa#">#content#</p>
    <i class='edit fa fa-pencil' title="Edit"></i>
    <i class='delete fa fa-times' title="Delete"></i>
    </div>
    <div class="edit-div" id="edit-value#Iid#">
    <input type='text'>
    <select><option>Low</option><option>Medium</option><option>High</option></select>
    <button class='save'>save</button></div>`;
function addTaskFromUI(){
  
  let taskContent = document.getElementById("task-content");
  let taskPriority = document.getElementById("task-priority");
  if(taskContent.value.length>0 && taskList.every(ele=>ele.taskContent!=taskContent)){
    addNewTask(taskContent.value,taskPriority.value);
    render(taskList);
    taskContent.value="";
    taskPriority.value="Low";
  }
}
function deleteTaskFromUI(id){
    if(id){
        deleteTask(id);
        render(taskList);
    }
}
function editTaskFromUi(id,taskContent,taskPriority){
  editTask(id,taskContent,taskPriority);
  render(taskList);
}

function render(taskList){
  let completedCount=0;
  let htmlString = "";
  if(taskList.length!=0){
    taskList.forEach(function(task){
    let complete = task.taskStatus ? 'complete' : "incomplete";
      if(complete==="complete"){
        completedCount++;
      }
      htmlString += template.replace("#id#",task.taskId).replace("#Iid#",task.taskId)
       .replace("#content#",task.taskContent)
       .replace("#complete#",complete).replace("#completepa#",task.taskStatus ? 'completepara' : "");
      // console.log(task.taskId,task.taskContent,task.taskStatus);
    });
    
    WRAPPER.innerHTML = htmlString;
  }else{
    WRAPPER.innerHTML = `<h1>No Tasks Found</h1>`;
    // console.log(taskList.length);
  }
  document.getElementById("taskCount").textContent="Tasks : "+completedCount+"/"+taskList.length;
}
let trash=false;
function init(){
    document.getElementById("add").addEventListener('click',addTaskFromUI);
    WRAPPER.addEventListener("click",function(ev){
          if(ev.target.classList.contains('delete')){
           
              document.querySelector("#warning > p").textContent="Do you Want To Delete The Task...";
              document.getElementById("warning").style.zIndex = "15";
              deleteYes(ev.target.closest('.task').id);
            // console.log(ev.target.closest('.task').id);
          }
          if (ev.target.classList.contains('incomplete')) {
            ev.target.classList.remove('incomplete');
            ev.target.classList.add('complete');
            changeStatus(ev);
          }
          else if(ev.target.classList.contains('complete')){
            ev.target.classList.remove('complete');
            ev.target.classList.add('incomplete');
            changeStatus(ev);
          }
          if(ev.target.classList.contains('edit')){
            let id = ev.target.closest('.task');
            editDesc(id);
          }
          if(ev.target.classList.contains('save')){
            let id = ev.target.closest('.edit-div');
            // id.children[0].style.height="0";
            // console.log(id.id);
            let taskId=id.previousElementSibling.id;
            let taskContent = ev.target.previousElementSibling.previousElementSibling.value;
            let taskPriority = ev.target.previousElementSibling.value;
            editTaskFromUi(taskId,taskContent,taskPriority);
            // console.log(taskContent,taskPriority);
          } 
     
    });
  document.getElementById("trash").addEventListener('click',function(){
    if(taskList.length!=0){
      trash=true;
      // console.log(document.querySelector("#warning > p").textContent);
      document.querySelector("#warning > p").textContent="Do you Want To Delete All Tasks...";
      document.getElementById("warning").style.zIndex = "15";
      deleteYes(document.getElementById("trash"));
    }
  });
  document.getElementById("select-1").addEventListener('change',function(){
    let selValue1=document.getElementById("select-1");
    if(selValue1.value=="Priority"){
      document.getElementById("select-2").style.opacity="1";
      document.getElementById("select-2").addEventListener("change",function(){
        let selValue2=document.getElementById("select-2");
        filterTask(selValue1,selValue2);
      });
    }
    else{
      document.getElementById("select-2").style.opacity="0";
      filterTask(selValue1);
    }
  });
}
init();
function editDesc(id){
  let taskContent=id.children[1].textContent;
  let taskPriority;
  taskList.forEach(task=>{
    if(task.taskId==id.id.slice(4)){
      taskPriority=task.taskPriority;
    }
  });
  // console.log(taskContent,taskPriority);
  let div=id.nextElementSibling;
  // console.log(id.nextElementSibling.children[0]);
  id.nextElementSibling.children[0].value=taskContent;
  id.nextElementSibling.children[1].value=taskPriority;
  div.style.height=document.querySelector(".edit-div").scrollHeight +40+ "px";
  
}
document.getElementById("mode").addEventListener('click',function(ev){
  
  if(ev.target.classList.contains("fa-moon")){
    ev.target.classList.remove("fa-moon");
    ev.target.classList.add("fa-sun");
   light(ev);
    // console.log(document.getElementById("body"),document.querySelectorAll(".wrapper-tasks"),document.querySelectorAll(".wbi"));
  }
  else{
    ev.target.classList.remove("fa-sun");
    ev.target.classList.add("fa-moon");
    dark(ev);
  }
})
function trashAll(){
  taskList.length=0;
  trash=false;
  render(taskList);
}
function deleteYes(id){
  document.getElementById("warning").addEventListener('click',function check(ev){
    if(ev.target.classList.contains('yes')){
      document.getElementById("warning").style.zIndex = "1";
      if(trash==true){
        trashAll();
        // console.log("trash",id);
      }
      else{
        deleteTaskFromUI(id);
        // console.log("delete",id);
      }
    }
    else{
      document.getElementById("warning").style.zIndex = "1";
      trash=false;
    }
    this.removeEventListener('click',check);
    });
}
function dark(){
  document.getElementById("body").classList.remove("theme1");
  document.querySelectorAll(".wrapper-tasks")[0].classList.remove("theme2");
  document.querySelectorAll(".wbi")[0].classList.remove("theme3");
  document.querySelectorAll(".wbi")[1].classList.remove("theme3");
  document.querySelectorAll("#warning")[0].classList.remove("theme2");
  document.querySelectorAll( ".task").forEach(ele=>{
    ele.style.borderBottom="1px solid #efefef";
  })
}
function light(){
  document.getElementById("body").classList.add("theme1");
  document.querySelectorAll(".wrapper-tasks")[0].classList.add("theme2");
  document.querySelectorAll(".wbi")[0].classList.add("theme3");
  document.querySelectorAll(".wbi")[1].classList.add("theme3");
  document.querySelectorAll( ".task").forEach(ele=>{
    ele.style.borderBottom="1px solid rgb(221,183,171)";
  })
  // console.log();
  document.querySelectorAll("#warning")[0].classList.add("theme2");
}