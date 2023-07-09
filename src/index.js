//let get the task add form data
const taskForm = document.getElementById("task-form");
const textArea = taskForm.querySelector(".task-content");
const checkBox = taskForm.querySelector("input[type=checkbox]");
const alertBox = document.querySelector(".massage-box");
const activetaskContainer = document.querySelector(
  ".task-container.active-task"
);

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

  if (allTask.length <= 0) {
    activetaskContainer.innerHTML = `
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
 
         <div class="complete-check" onclick= dataComplete(${index}) data-toggle="tooltip" data-placement="top" title="Mark as Complete"
           style="margin-right: 05px;">
           <i class="fa-solid fa-circle-check" style="color: #167d08;"></i>
 
         </div>
 
         <div class="delete-check" onclick= dataDelete(${index}) data-toggle="tooltip" data-placement="top" title="Delete task">
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
    activetaskContainer.innerHTML = singleTask;
  }
}
showData();

//lets delete task data
/**
 * @constractor
 * @param{}
 * @param{}
 * Delete data from the storage
 */
function dataDelete(index) {
  //get all data from local storage
  let filterdData = getData("tasks");
  //change the object properties value when button in clicked
  let trashItems = (filterdData[index].isTrashed = true);
  //find the clicked data to delete
  let trashed = filterdData.find((task) => task.isTrashed == true);
  //find the index of the data to delete
  let indexofTrashedData = filterdData.indexOf(trashed);
  //splice the data from the index to delete data from main task array and keep the trashed data in the array
  let splicedData = filterdData.splice(indexofTrashedData, 1);

  //keep the ramining data in a variable which is not trashed
  let remainData = filterdData;

  //send the trashed data to the new local storage key
  let trashedDataArray;
  getData("trash")
    ? (trashedDataArray = getData("trash"))
    : (trashedDataArray = []);
  trashedDataArray.push(splicedData);
  sendData("trash", trashedDataArray);

  //send data to the main task key of local storage
  sendData("tasks", remainData);
  //show the data
  showData();
}
/**
 * @constractor
 * @param{}
 * @param{}
 * Data complete and send to local storage
 */
//lets complete task data
function dataComplete(index) {
  //get all data from local storage
  let filterdData = getData("tasks");
  //change the filterd data state to completed
  filterdData[index].isCompleted = true;
  let completedTask = filterdData.find((data) => data.isCompleted == true);
  //get the index of the completed task
  let indexOfCompletedTask = filterdData.indexOf(completedTask);

  //splice  the data
  let completedTaskData = filterdData.splice(indexOfCompletedTask, 1);
  let remainData = filterdData;

  //data send to the database
  let completedDataArray;
  getData("complete")
    ? (completedDataArray = getData("complete"))
    : (completedDataArray = []);
  completedDataArray.push(completedTaskData);
  sendData("complete", completedDataArray);
  //send data to the main task key of local storage
  sendData("tasks", remainData);
  //show the data
  showData();
}
