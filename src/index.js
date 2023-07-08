//let get the task add form data
const taskForm = document.getElementById("task-form");
const textArea = taskForm.querySelector(".task-content");
const checkBox = taskForm.querySelector("input[type=checkbox]");
const alertBox = document.querySelector(".massage-box");
const taskContainer = document.querySelector(".task-container");

//check the checkbox value
const checkBoxValue = () => {
  let value;
  return checkBox.checked ? (value = true) : (value = false);
};

//Add tasks
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //lets validate the form
  if (!textArea.value) {
    alertBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Sorry !</strong> You don't write any task description
    <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>
  </div>
    `;
  } else {
    //check database has data or not
    let taskData;
    getData("tasks") ? (taskData = getData("tasks")) : (taskData = []);
    //data push to the array
    taskData.push({
      id: taskData.length + 1,
      task_content: textArea.value,
      isImportant: checkBoxValue(),
      isTrashed: false,
      isCompleted: false,
    });
    //send ddta to local storage
    sendData("tasks", taskData);
    //lets reset the form value
    textArea.value = "";
    checkBox.checked = false;
    showData();

    alertBox.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
    Task Added Done !
    <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>
  </div>
    `;
  }
});

//lets get the task data and show  to the frontend
function showData() {
  let allTask = getData("tasks");

  if (!allTask) {
    taskContainer.innerHTML = `
    <li>
         <p class="task-desc alert mt-5 alert-warning" style="vertical-align: middle;
         text-align: left;
         margin: auto;">
          No Task Added</p>
   </li>
    `;
  }
  {
    let singleTask = "";

    allTask.map((task, index) => {
      singleTask += `    
      <li class="task">
     <div class="row">
 
       <div class="col-sm-1 checkbox-container"
         style="vertical-align: middle; text-align: center; margin: auto;">
 
         <div class="complete-check" data-toggle="tooltip" data-placement="top" title="Mark as Complete"
           style="margin-right: 05px;">
           <i class="fa-regular fa-circle" style="color: #0c7a0b;"></i>
 
         </div>
 
         <div class="delete-check" data-toggle="tooltip" data-placement="top" title="Delete task">
           <i class="fa-solid fa-circle-xmark"></i>
         </div>
       </div>
 
       <div class="col-sm-9">
         <p class="task-desc" style="vertical-align: middle;
         text-align: left;
         margin:auto 20px;">
           ${task.task_content}</p>
       </div>
 
       <div class="col-sm-2 priority-container" style="vertical-align: middle;
       text-align: center;
       margin: auto;">
 
     ${
       task.isImportant === true
         ? `    <span class="priority"><i class="fa-solid fa-star" style="color: #cf9904"></i></span>`
         : ""
     }
 
       </div>
     </div>
   </li>`;
    });
    taskContainer.innerHTML = singleTask;
  }
}
showData();
