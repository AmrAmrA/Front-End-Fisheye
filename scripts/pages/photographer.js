let PhotographerId = new URLSearchParams(window.location.search).get("id");

function displayData() {
  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      let photographersSection = document.querySelector(".photograph-header");
      for (let photographPage of data.photographers) {
        if (photographPage.id == PhotographerId) {
          const { name } = photographPage;
          const photographeModel = new photographerFactory(
            photographPage,
            "onePhotographer"
          );
          const userCardDOM = photographeModel.getUserCardDOM();
          photographersSection.appendChild(userCardDOM);
          const contactTitle = document.querySelector(".contact__title");
          contactTitle.textContent = `Contactez-moi ${name}`;
        }
      }
    });
}

displayData();

const headerButton = document.querySelector(".header__button");

const contact_modal = document.querySelector("#contact_modal");
const globalFilter = document.querySelector(".globalFilter");
const crossClose = document.querySelector(".cross__close");


headerButton.addEventListener("click", function () {
  contact_modal.style.display = "block";
  globalFilter.classList.toggle("toggleVisibility");
});

crossClose.addEventListener("click", function () {
  contact_modal.style.display = "none";
  globalFilter.classList.toggle("toggleVisibility");
});

const firstnameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const mailInput = document.querySelector("#email");
const messageArea = document.querySelector("#message");
const form = document.querySelector("form");


firstnameInput.addEventListener("blur", firstNameValidation);
firstnameInput.addEventListener("input", firstNameValidation);
lastNameInput.addEventListener("blur", lastNameValidation);
lastNameInput.addEventListener("input", lastNameValidation);
mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);
messageArea.addEventListener("blur", messageValidation);
messageArea.addEventListener("input", messageValidation);
const allInputs = document.querySelectorAll("input");
form.addEventListener("submit", handleFormSubmit);
const errorMessages = document.querySelectorAll(".error__data");
const controlText = document.querySelectorAll(".text__control");

const inputsValidities = {
  firstName: false,
  lastName: false,
  email: false,
  message: false,
};

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
