//get the elements

const deleteTaskButton = document.querySelector(".delete-task");
const completedTaskButton = document.querySelector(".complete-task");
const taskStatusBox = document.querySelector(".task-status-box");
const trashedTaskContainer = document.querySelector(
  ".task-container.trashed-container"
);
const completedTaskContainer = document.querySelector(
  ".task-container.completed-task"
);

//deleted task button interactions
deleteTaskButton.addEventListener("click", function (e) {
  e.preventDefault();
  //change the status text
  taskStatusBox.innerHTML = `
  <h4 id="task-status">Trashed Task</h4>
  <button class="btn rounded-3 btn-success back-button"
   onclick=goBack() 
   ><i class="fa-solid fa-arrow-left-long"></i> back</button>
  `;
  //dynamically section show and hide
  activetaskContainer.classList.add("hidden-container");
  trashedTaskContainer.classList.remove("hidden-container");
  completedTaskContainer.classList.add("hidden-container");
  // show the trashed task
  let allTrashedTasks = getData("trash");
  let singleTrashTask = "";
  if (allTrashedTasks.length > 0) {
    allTrashedTasks.map((item, index) => {
      for (let i = 0; i < item.length; i++) {
        singleTrashTask += `
        <li class="task bg-grey"  >
        <div class="row">
        <div class="col-sm-1 checkbox-container"
        style="vertical-align: middle; text-align: center; margin: auto;">

        <div class="complete-check" data-toggle="tooltip" data-placement="top" title="Mark as Complete"
          style="margin-right: 05px;">
          <i class="fa-solid fa-ban" style="color: #c92c2c;"></i>

        </div>
      </div>
          <div class="col-sm-9">
          <p class="task-desc" style="vertical-align: middle;
           text-align: left;
           margin:auto 20px;">
             <del>${item[i].task_content}</del></p>
          </div>   
          <div class="col-sm-2 priority-container" style="vertical-align: middle;
          text-align: center;
          margin: auto;">
    
        ${
          item[i].isImportant === true
            ? `    <span class="priority"><i class="fa-solid fa-star" style="color: #cf9904"></i></span>`
            : ""
        }
    
          </div>
        </div>
      </li>
        `;
      }
    });
    trashedTaskContainer.innerHTML = singleTrashTask;
  } else {
    trashedTaskContainer.innerHTML = `
    <li>
    <p class="task-desc alert mt-5 alert-warning" style="vertical-align: middle;
    text-align: left;
    margin: auto;">
     No Task Found</p>
</li>
    `;
  }
});

//completed task button interaction
completedTaskButton.addEventListener("click", function (e) {
  e.preventDefault();
  //change the status text
  taskStatusBox.innerHTML = `
  <h4 id="task-status">Completed Task</h4>
  <button class="btn rounded-3 btn-success back-button" 
  onclick=goBack()
  ><i class="fa-solid fa-arrow-left-long"></i> back</button>
  `;
  //dynamically section show and hide
  completedTaskContainer.classList.remove("hidden-container");
  trashedTaskContainer.classList.add("hidden-container");
  activetaskContainer.classList.add("hidden-container");
  // show the completed task
  let allCompletedTasks = getData("complete");
  let singlecompletedTask = "";
  if (allCompletedTasks.length > 0) {
    allCompletedTasks.map((item, index) => {
      for (let i = 0; i < item.length; i++) {
        singlecompletedTask += `
        <li class="task" style="background-color: rgb(37, 251, 122)" >
        <div class="row">
        <div class="col-sm-1 checkbox-container"
        style="vertical-align: middle; text-align: center; margin: auto;">

        <div class="complete-check" data-toggle="tooltip" data-placement="top" title="Mark as Complete"
          style="margin-right: 05px;">
          <i class="fa-solid fa-circle-check" style="color: #167d08;"></i>

        </div>
      </div>
          <div class="col-sm-9">
            <p class="task-desc" style="vertical-align: middle;
            text-align: left;
            margin:auto 20px;">
              ${item[i].task_content}</p>
          </div>
    
          <div class="col-sm-2 priority-container" style="vertical-align: middle;
          text-align: center;
          margin: auto;">
    
        ${
          item[i].isImportant === true
            ? `    <span class="priority"><i class="fa-solid fa-star" style="color: #cf9904"></i></span>`
            : ""
        }
    
          </div>
        </div>
      </li>
        `;
      }
    });
    completedTaskContainer.innerHTML = singlecompletedTask;
  } else {
    completedTaskContainer.innerHTML = `
    <li>
    <p class="task-desc alert mt-5 alert-warning" style="vertical-align: middle;
    text-align: left;
    margin: auto;">
     No Task Found</p>
</li>
    `;
  }
});

//go back button interactions
function goBack() {
  taskStatusBox.innerHTML = `
  <h4 id="task-status">Active Task</h4>
  `;
  completedTaskContainer.classList.add("hidden-container");
  trashedTaskContainer.classList.add("hidden-container");
  activetaskContainer.classList.remove("hidden-container");
}
