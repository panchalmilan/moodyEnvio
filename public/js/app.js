const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');
const successMsg = document.querySelector('#msg1');
const successMsg2 = document.querySelector('#msg2');
const enterLoc = document.querySelector('#enteredLoc');

weatherForm.addEventListener('submit', (e) => {
  enterLoc.textContent = '';
  successMsg.textContent = 'Loading...';
  successMsg2.textContent = '';
  fetch('/weather?address=' + search.value).then(
    (response) => {
      response.json().then((dataObj) => {
        if (dataObj.error) {
          enterLoc.textContent = '';
          successMsg.textContent = dataObj.error;
          successMsg2.textContent = '';
        } else {
          // enterLoc.textContent = search.value.style.textTransform.uppercase;
          enterLoc.textContent = search.value;
          successMsg2.textContent = dataObj.location;
          successMsg.textContent = dataObj.forecast;
        }
      });
    }
  );
  e.preventDefault();
});
