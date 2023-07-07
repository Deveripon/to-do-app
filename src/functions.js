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
