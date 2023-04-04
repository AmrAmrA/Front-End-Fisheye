const headerButton = document.querySelector('.header__button');
const crossClose = document.querySelector('.cross__close');
// Open the modal and the filter
headerButton.addEventListener('click', openModal);
// Close the modal and hide the filter
crossClose.addEventListener('click', closeModaleForm);

// Variables to prepare the form
const firstnameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const mailInput = document.querySelector('#email');
const messageArea = document.querySelector('#message');
const form = document.querySelector('form')

// Submit the form and reset the inputs styles and values
form.addEventListener('submit', handleFormSubmit);

// Object to store the inputs validities we start with false
// when they are valid we switch to true
const inputsValidities = {
  firstName: false,
  lastName: false,
  email: false,
  message: false,
};

// Function to show the error message and change the border color
function showValidation({ index, validation }) {
  const errorMessages = document.querySelectorAll('.error__data');
  const controlText = document.querySelectorAll('.text__control');
  if (validation) {
    errorMessages[index].style.display = 'none';
    if (controlText[index]) {
      controlText[index].style.border = '5px solid green';
    }
  } else {
    errorMessages[index].style.display = 'block';
    if (controlText[index]) {
      controlText[index].style.border = '5px solid red';
    }
  }
}
// Regex for the first name and last name
const regexfirstAndLastName = /^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$/;
// Function to check if firstName is valid
function firstNameValidation() {
  if (
    firstnameInput.value.length < 2
    || !regexfirstAndLastName.test(firstnameInput.value)
  ) {
    showValidation({ index: 0, validation: false });
    inputsValidities.firstName = false;
    return;
  }

  showValidation({ index: 0, validation: true });
  inputsValidities.firstName = true;
}
firstnameInput.addEventListener('blur', firstNameValidation);
firstnameInput.addEventListener('input', firstNameValidation);
// Function to check if lastName is valid
function lastNameValidation() {
  if (
    lastNameInput.value.length < 2
    || !regexfirstAndLastName.test(lastNameInput.value)
  ) {
    showValidation({ index: 1, validation: false });
    inputsValidities.lastName = false;
  } else {
    showValidation({ index: 1, validation: true });
    inputsValidities.lastName = true;
  }
}
lastNameInput.addEventListener('blur', lastNameValidation);
lastNameInput.addEventListener('input', lastNameValidation);
// Regex for the email
const regexMail = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z._-]{2,}[.]{1}[a-z]{2,10}$/;
// Function to check if email is valid
function mailValidation() {
  if (regexMail.test(mailInput.value)) {
    showValidation({ index: 2, validation: true });
    inputsValidities.email = true;
  } else {
    showValidation({ index: 2, validation: false });
    inputsValidities.email = false;
  }
}
mailInput.addEventListener('blur', mailValidation);
mailInput.addEventListener('input', mailValidation);
// Function to check if message is valid
function messageValidation() {
  if (messageArea.value.length < 10) {
    showValidation({ index: 3, validation: false });
    inputsValidities.message = false;
  } else {
    showValidation({ index: 3, validation: true });
    inputsValidities.message = true;
  }
}
messageArea.addEventListener('blur', messageValidation);
messageArea.addEventListener('input', messageValidation);

// function to submit the form
function handleFormSubmit(event) {
  event.preventDefault();
  const keys = Object.keys(inputsValidities);
  const keysFailed = keys.filter((key) => {
    if (!inputsValidities[key]) return key;
  });

  if (keysFailed.length) {
    keysFailed.forEach((key) => {
      const index = keys.indexOf(key);
      showValidation({ index, validation: false });
    });
    return;
  }
  // Show user's informations
  console.log(
    'firstName :',
    firstnameInput.value,
    'lastName :',
    lastNameInput.value,
    'email :',
    mailInput.value,
    'message :',
    messageArea.value,
  );
  form.reset();
  const controlText = document.querySelectorAll('.text__control');
  controlText.forEach((input) => {
    input.style.border = 'none';
  });
  closeModaleForm();
}

/**
 * When the user clicks the close button, the modal is hidden,
 * the body is no longer hidden, the global
 * filter is toggled, the focus is set to the header button, and the body is no longer scrollable.
 */
const contactModal = document.querySelector('#contact_modal');
const PhotographerId = new URLSearchParams(window.location.search).get('id');
displayDataAndMedia().then((data) => {
  {
    for (const photographPage of data.photographers) {
      if (photographPage.id == PhotographerId) {
        const { name } = photographPage;
        const contactTitle = document.querySelector('.contact__title');
        contactTitle.setAttribute('tabindex', '0');
        contactTitle.innerHTML = `Contactez-moi <br> ${name}`;
        contactModal.setAttribute('name', `Contactez-moi ${name}`);
        contactTitle.focus();
      }
    }
  }
});

function closeWithEnter() {
  crossClose.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeModaleForm();
    }
  });
}

const body = document.querySelector('body');
function closeWithTab() {
  body.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModaleForm();
    }
  });
}

// close the modal with the escape key
const globalFilter = document.querySelector('.globalFilter');
function closeModaleForm() {
  contactModal.setAttribute('aria-hidden', 'true');
  body.setAttribute('aria-hidden', 'false');
  contactModal.style.display = 'none';
  headerButton.focus();
  globalFilter.classList.remove('toggleVisibility');
}

function openModal() {
  contactModal.setAttribute('aria-hidden', 'false');
  body.setAttribute('aria-hidden', 'true');
  contactModal.style.display = 'block';
  globalFilter.classList.add('toggleVisibility');
  const contactTitle = document.querySelector('.contact__title');
  contactTitle.focus();
  closeWithTab();
  closeWithEnter();
}
const modalHeader = document.querySelector('.modal__header');
contactModal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && e.target.classList == 'contact_button') {
    modalHeader.focus();
  }
});
