"use strict";

var weatherForm = document.querySelector('form');
var search = weatherForm.querySelector('input');
var successMsg = document.querySelector('#msg1');
var successMsg2 = document.querySelector('#msg2');
weatherForm.addEventListener('submit', function (e) {
  successMsg.textContent = 'Loading...';
  successMsg2.textContent = '';
  fetch('/weather?address=' + search.value).then(function (response) {
    response.json().then(function (dataObj) {
      if (dataObj.error) {
        successMsg.textContent = dataObj.error;
        successMsg2.textContent = '';
      } else {
        successMsg2.textContent = dataObj.location;
        successMsg.textContent = dataObj.forecast;
      }

      clearSearchBox();
    });
  });
  e.preventDefault();
});

var clearSearchBox = function clearSearchBox() {
  setTimeout(function () {
    search.value = '';
  }, 7000);
};