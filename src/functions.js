/**
 * @constractor
 * @param{}
 * @param{}
 * Data send to the localStorage
 */
function sendData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

/**
 * @constractor
 * @param{}
 * @param{}
 * Data get from localStorage
 */
function getData(key) {
  data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

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
  filterdData[index].isTrashed = true;
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
  //show the data to frontend
  showData();
  console.log(splicedData);
}

/**
 * @constractor
 * @param{}
 * @param{}
 * comment-text:make task incomplete
 */

function makeIncomplete(id) {
  alert(`task id is ${id}`);
}
