const headerButton          = document.querySelector(".header__button");
const contact_modal         = document.querySelector("#contact_modal");
const globalFilter          = document.querySelector(".globalFilter");
const crossClose            = document.querySelector(".cross__close");
const firstnameInput        = document.querySelector("#firstName");
const lastNameInput         = document.querySelector("#lastName");
const mailInput             = document.querySelector("#email");
const messageArea           = document.querySelector("#message");
const form                  = document.querySelector("form");
const errorMessages         = document.querySelectorAll(".error__data");
const controlText           = document.querySelectorAll(".text__control");
const allInputs             = document.querySelectorAll("input");


// Open the modal and the filter
headerButton.addEventListener("click", function () {
  contact_modal.style.display = "block";
  globalFilter.classList.toggle("toggleVisibility");
});
// Close the modal and hide the filter
crossClose.addEventListener("click", function () {
  contact_modal.style.display = "none";
  globalFilter.classList.toggle("toggleVisibility");
});


// Launch events on inputs to verify if they are valid
firstnameInput.addEventListener("blur", firstNameValidation);
firstnameInput.addEventListener("input", firstNameValidation);
lastNameInput.addEventListener("blur", lastNameValidation);
lastNameInput.addEventListener("input", lastNameValidation);
mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);
messageArea.addEventListener("blur", messageValidation);
messageArea.addEventListener("input", messageValidation);
// Submit the form and reset the inputs styles and values
form.addEventListener("submit", handleFormSubmit);

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
  if (validation) {
    errorMessages[index].style.display = "none";
    if (controlText[index]) {
      controlText[index].style.border = "5px solid green";
    }
  } else {
    errorMessages[index].style.display = "block";
    if (controlText[index]) {
      controlText[index].style.border = "5px solid red";
    }
  }
}
// Regex for the first name and last name
const regexfirstName = /^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$/;
// Function to check if firstName is valid
function firstNameValidation() {
  if (
    firstnameInput.value.length < 2 ||
    !regexfirstName.test(firstnameInput.value)
  ) {
    showValidation({ index: 0, validation: false });
    inputsValidities.firstName = false;
  } else {
    showValidation({ index: 0, validation: true });
    inputsValidities.firstName = true;
  }
}
// Function to check if lastName is valid
function lastNameValidation() {
  if (
    lastNameInput.value.length < 2 ||
    !regexfirstName.test(lastNameInput.value)
  ) {
    showValidation({ index: 1, validation: false });
    inputsValidities.lastName = false;
  } else {
    showValidation({ index: 1, validation: true });
    inputsValidities.lastName = true;
  }
}

// Regex for the email
const regexMail = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z._-]{2,}[.]{1}[a-z]{2,10}$/;
// Function to check if email is valid
function mailValidation() {
  if (!regexMail.test(mailInput.value)) {
    showValidation({ index: 2, validation: false });
    inputsValidities.email = false;
  } else {
    showValidation({ index: 2, validation: true });
    inputsValidities.email = true;
  }
}
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
  } else {
    // Show user's informations
    console.log(
      "firstName :",
      firstnameInput.value,
      "lastName :",
      lastNameInput.value,
      "email :",
      mailInput.value,
      "message :",
      messageArea.value
    );
    form.reset();
    controlText.forEach((input) => {
      input.style.border = "none";
    });
    contact_modal.style.display = "none";
    globalFilter.classList.toggle("toggleVisibility");
  }
}