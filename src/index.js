const taskForm = document.getElementById("task-form");
const textArea = taskForm.querySelector("textarea.task-content");
const checkBox = taskForm.querySelector("input[type=checkbox]");
const submitButton = taskForm.querySelector("input[type=submit]");
const massageBox = document.querySelector(".massage-box");
const taskContainer = document.querySelector(".task-container");
let checkValue;

//lets Cread data and  send data to local storage
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (textArea.value.length > 0) {
    //lets check the checkbox value
    if (checkBox.checked) {
      checkValue = true;
    } else {
      checkValue = false;
    }
    //check the database is task available or not
    let taskData;
    getData("tasks") ? (taskData = getData("tasks")) : (taskData = []);
    taskData.push({
      task_id: taskData.length + 1,
      task_content: textArea.value,
      isImportant: checkValue,
      isTrashed: false,
      isCompleted: false,
    });
    sendData("tasks", taskData);
    massageBox.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show"
    role="alert">
    Task Added Done !
    <button type="button"
      class="btn-close"
      data-dismiss="alert"
      aria-label="Close"></button>
  </div>
    `;
    textArea.value = "";
    checkBox.checked = false;
    ShowData();
  } else {
    massageBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show"
    role="alert">
    <strong>Sorry !</strong> You don't write any task description
    <button type="button"
      class="btn-close"
      data-dismiss="alert"
      aria-label="Close"></button>
  </div>
    `;
  }
});

//lets Read the data from LocalStorage and show to frontend
function ShowData() {
  let dbData = getData("tasks");
  let taskList = "";
  dbData.map((task, i) => {
    taskList +=
      task.isTrashed === true
        ? ""
        : `<li class="task">
    <div class="row">

      <div class="col-sm-1 checkbox-container"
        style="vertical-align: middle; text-align: center; margin: auto;">

        <div class="complete-check"
          data-toggle="tooltip"
          data-placement="top"
          title="Mark as Complete"
          style="margin-right: 05px;">
          <i class="fa-regular fa-circle"
            style="color: #0c7a0b;"></i>

        </div>

        <div class="delete-check"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete task">
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
      </div>

      <div class="col-sm-9">
        <p class="task-desc"
          style="vertical-align: middle;
        text-align: left;
        margin: auto;">${task.task_content}</p>
      </div>

      <div class="col-sm-2 priority-container"
        style="vertical-align: middle;
      text-align: center;
      margin: auto;">
       ${
         task.isImportant === true
           ? ` <span class="priority"><i class="fa-solid fa-star"
       style="color: #cf9904"></i></span>`
           : ""
       }
      </div>
    </div>
  </li>`;
  });
  taskContainer.innerHTML = taskList;
}

ShowData();

//lets DELETE and Mark Complete data
