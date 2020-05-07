const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');
const successMsg = document.querySelector('#msg1');
const successMsg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
  successMsg.textContent = 'Loading...';
  successMsg2.textContent = '';
  fetch('http://127.0.0.1:3000/weather?address=' + search.value).then(
    (response) => {
      response.json().then((dataObj) => {
        if (dataObj.error) {
          successMsg.textContent = dataObj.error;
          successMsg2.textContent = '';
        } else {
          successMsg2.textContent = dataObj.location;
          successMsg.textContent = dataObj.forecast;
        }
        clearSearchBox();
      });
    }
  );
  e.preventDefault();
});
const clearSearchBox = () => {
  setTimeout(() => {
    search.value = '';
  }, 7000);
};
