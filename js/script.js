'use strict';

(function () {
  const contactsButton = document.querySelector(`.contacts__more`);
  const modalFeedbackForm = document.querySelector(`.modal--write-us`);
  const modalFormButtonClose = document.querySelector(`.modal__close`);
  const feedbackForm = document.querySelector(`.write-us-form`);
  const feedbackName = feedbackForm.querySelector(`.write-us-form__input[name="user-name"]`);
  const feedbackEmail = feedbackForm.querySelector(`.write-us-form__input[name="email"]`);
  const feedbackMessage = feedbackForm.querySelector(`.write-us-form__input[name="message"]`);

  const mapLink = document.querySelector(`.map`);
  const modalMap = document.querySelector(`.modal--map`);
  const modalMapButtonClose = modalMap.querySelector(`.modal__close`);
  const modalMapPlug = modalMap.querySelector(`.modal__plug`);

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


  const openModal = function (element, escHandler) {
    element.classList.add(`modal--open`);

    document.addEventListener(`keydown`, escHandler);
  };


  const closeModal = function (element, escHandler) {
    element.classList.remove(`modal--open`);

    document.removeEventListener(`keydown`, escHandler);
  };


  const modalFormEscPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeModal(modalFeedbackForm);
      modalFeedbackForm.classList.remove(`modal--error`);
      contactsButton.focus();
      document.removeEventListener(`keydown`, modalFormEscPressHandler);
    }
  };

  contactsButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    openModal(modalFeedbackForm, modalFormEscPressHandler);

    if (storage) {
      feedbackName.value = storage.feedbackName;
      feedbackEmail.value = storage.feedbackEmail;
      feedbackMessage.focus();
    } else {
      feedbackName.focus();
    }
  });


  modalFormButtonClose.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    closeModal(modalFeedbackForm, modalFormEscPressHandler);
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


  const modalMapEscPressHandler = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeModal(modalMap);
      modalMapPlug.classList.remove(`modal__plug--off`);
      mapLink.focus();
      document.removeEventListener(`keydown`, modalMapEscPressHandler);
    }
  };


  mapLink.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    modalMapPlug.classList.add(`modal__plug--off`);
    openModal(modalMap, modalMapEscPressHandler);

  });


  modalMapButtonClose.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    closeModal(modalMap, modalMapEscPressHandler);
    modalMapPlug.classList.remove(`modal__plug--off`);
    mapLink.focus();
  });
})();
