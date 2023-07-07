const taskForm = document.getElementById("task-form");
const textArea = taskForm.querySelector("textarea.task-content");
const checkBox = taskForm.querySelector("input[type=checkbox]");
const submitButton = taskForm.querySelector("input[type=submit]");
let checkValue;

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
    });
    sendData("tasks", taskData);
  } else {
    alert("Please type a task");
  }
});
