'use strict';

(function () {
  const contactsButton = document.querySelector(`.contacts__more`);
  const modalFeedbackForm = document.querySelector(`.modal--write-us`);
  const modalButtonClose = document.querySelector(`.modal__close`);
  const feedbackForm = document.querySelector(`.write-us-form`);
  const feedbackName = feedbackForm.querySelector(`.write-us-form__input[name="user-name"]`);
  const feedbackEmail = feedbackForm.querySelector(`.write-us-form__input[name="email"]`);
  const feedbackMessage = feedbackForm.querySelector(`.write-us-form__input[name="message"]`);


  let isStorageSupport = true;
  let storage = {
    feedbackName: ``,
    feedbackEmail: ``
  };


  try {
    storage = {
      feedbackName: localStorage.getItem(`feedbackName`),
      feedbackEmail: localStorage.getItem(`feedbackEmail`)
    };
  } catch (err) {
    isStorageSupport = false;
  }


  const modalEscPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeModal(modalFeedbackForm);
      modalFeedbackForm.classList.remove(`modal--error`);
      contactsButton.focus();
      document.removeEventListener(`keydown`, modalEscPressHandler);
    }
  };

  const openModal = function (element) {
    element.classList.add(`modal--open`);

    document.addEventListener(`keydown`, modalEscPressHandler);
  };


  const closeModal = function (element) {
    element.classList.remove(`modal--open`);

    document.removeEventListener(`keydown`, modalEscPressHandler);
  };


  contactsButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    openModal(modalFeedbackForm);

    if (storage) {
      feedbackName.value = storage.feedbackName;
      feedbackEmail.value = storage.feedbackEmail;
      feedbackMessage.focus();
    } else {
      feedbackName.focus();
    }
  });


  modalButtonClose.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    closeModal(modalFeedbackForm);
    modalFeedbackForm.classList.remove(`modal--error`);
    contactsButton.focus();
  });


  const formError = function () {
    modalFeedbackForm.classList.remove(`modal--error`);
    modalFeedbackForm.style.offsetWidth = feedbackForm.offsetWidth;
    modalFeedbackForm.classList.add(`modal--error`);
  };


  feedbackForm.addEventListener(`submit`, function (evt) {
    if (!feedbackName.value || !feedbackEmail.value || !feedbackMessage.value) {
      evt.preventDefault();
      formError();
    } else {
      if (isStorageSupport) {
        localStorage.setItem(`feedbackName`, feedbackName.value);
        localStorage.setItem(`feedbackEmail`, feedbackEmail.value);
      }
    }
  });

})();
