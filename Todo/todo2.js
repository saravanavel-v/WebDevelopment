let taskList = [];
function addNewTask(taskContent,tP){
  
    taskList.push({
        taskContent : taskContent,
        taskStatus : false,
        taskPriority : tP,
        taskId : (!taskList.length) ? 1 :  taskList[taskList.length-1].taskId+1 ,
    })
  saveData();
  return taskList.length;
}
function deleteTask(id){
  
  let found =  taskList.findIndex(function(task){
       return task.taskId == id.slice(4);
   })
    taskList.splice(found,1);
  saveData();
}
function editTask(id,taskContent,taskPriority){
  let found =  taskList.findIndex(function(task){
       return task.taskId == id.slice(4);
   })
  if(taskContent.length!=0){
    taskList[found].taskContent = taskContent;
  }
  if(taskPriority.length!=0){
    taskList[found].taskPriority = taskPriority;
  }
  saveData();
}
function changeStatus(ev){
  let id = ev.target.closest('.task').id;
  let found = taskList.findIndex(function(task) {
    return task.taskId == id.slice(4);
  });
  taskList[found].taskStatus = !taskList[found].taskStatus;
  saveData();
  render(taskList);
}
function loadData(){
  let jsonData = localStorage.getItem("taskList");
  if(jsonData){
    taskList = JSON.parse(jsonData);
  }
  render(taskList);
}
function saveData(){
  localStorage.setItem("taskList",JSON.stringify(taskList));
}

function lowFilter(){
  let tasks = taskList.filter(function(ele){
    return ele.taskPriority == "Low";
  })
  render(tasks);
  // console.log(tasks);
}

function highFilter(){
  let tasks = taskList.filter(function(ele){
    return ele.taskPriority == "High";
  })
  render(tasks);
   // console.log(tasks);
}

function mediumFilter(){
  let tasks = taskList.filter(function(ele){
    return ele.taskPriority == "Medium";
  })
    render(tasks);
   // console.log(tasks);
}

function completeFilter(){
  let tasks = taskList.filter(function(ele){
    return ele.taskStatus == true;
  })
    render(tasks);
   // console.log(tasks);
}

function incompleteFilter(){
  let tasks = taskList.filter(function(ele){
    return ele.taskStatus == false;
  })
    render(tasks);
   // console.log(tasks);
}

function filterTask(value1,value2){
  if(value1.value=="Priority"){
    if(value2.value=="Low"){
      lowFilter();
    }
    else if(value2.value=="High"){
      highFilter();
    }
    else if(value2.value=="Medium"){
      mediumFilter();
    }
  }
  if(value1.value=="All Tasks"){
    render(taskList);
  }
  if(value1.value=="Completed"){
    completeFilter();
  }
  if(value1.value=="Not Completed"){
     incompleteFilter();
  }
}
loadData();
