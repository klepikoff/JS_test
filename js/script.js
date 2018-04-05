'use strict';
(function () {
  var savingButton = document.querySelector('.add__button');

  var inputName = document.querySelector('.add__input-name');
  var inputSurname = document.querySelector('.add__input-surname');
  var inputPhone = document.querySelector('.add__input-phone');

  var tParent = document.querySelector('.saved-section');
  var templateNewCard = document.querySelector('#newCard').content;

  window.contacts = [];

  window.addData = function(arr){
    for (var i = 0; i < arr.length; i++){   
    var newCard = templateNewCard.cloneNode(true);

    newCard.querySelector('.elem__init').textContent = arr[i].init;
    newCard.querySelector('.elem__name').textContent = arr[i].name;
    newCard.querySelector('.elem__surname').textContent = arr[i].surname;
    newCard.querySelector('.elem__phone').textContent = arr[i].phone;
    newCard.querySelector('.elem__phone').href = arr[i].phoneLink;

    newCard.querySelector('.elem__del').id = i;

    var fragment = document.createDocumentFragment();
    fragment.appendChild(newCard);
    tParent.appendChild(fragment);
    };
  };

  window.compareFunction = function(contactA, contactB) {
    if (contactA.surname < contactB.surname) {
      return -1;
    }
    if (contactA.surname > contactB.surname) {
      return 1;
    } else {
      return 0
    }
  }
    
  window.deleteData = function() {
    var deletedElems = document.querySelectorAll('.elem');
    if (deletedElems.length != 0){
      for (var i = 0; i < deletedElems.length; i++) {
        document.querySelector('.elem').remove();
      }
    }
  }

  window.createFunc = function(arr) {
    arr.push(
      {
       init: inputName.value.substring(0, 1) + inputSurname.value.substring(0, 1),
       name: inputName.value,
       surname: inputSurname.value,
       phone: inputPhone.value,
       phoneLink:'tel:' + inputPhone.value
      }
    );

    arr.sort(window.compareFunction);
    window.addData(contacts);
  };

  
  savingButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (inputPhone.value && inputSurname.value && inputName.value) {
      document.querySelector('.saved-section').removeAttribute('hidden');
      document.querySelector('.saved-section h1').removeAttribute('hidden');

      window.deleteData();
      window.createFunc(contacts);
          
      var stringContacts = JSON.stringify(contacts);
      localStorage.setItem("keyContacts", stringContacts);
    }
  });

  var delButton = document.querySelector('.del__button');
  delButton.addEventListener('click', function () {
  
    localStorage.removeItem("keyContacts");
    window.deleteData();
    document.querySelector('.saved-section h1').setAttribute('hidden', 'hidden')  
    contacts = [];
  });

  var post = [];
  var postContacts = localStorage.getItem("keyContacts");
  post = JSON.parse(postContacts);


  if (post){
    if (post.length > 0) {
    document.querySelector('.saved-section').removeAttribute('hidden');
    document.querySelector('.saved-section h1').removeAttribute('hidden');

    window.addData(post);

    contacts = post;
    }
  }

})();
