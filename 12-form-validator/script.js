// DOM selectors
const formElement = document.querySelector("#form");
const password1Element = document.querySelector("#password1");
const password2Element = document.querySelector("#password2");
const messageContainer = document.querySelector(".message-container");
const message = document.querySelector("#message");

// States and rules
let isValid = false;
let passwordsMatch = false;

// Function expressions
const validateForm = () => {
    // Using Constraint API
    isValid = formElement.checkValidity();

    // Styling main message for an error
    if (!isValid) {
        message.textContent = "Please fill out all fields";
        message.style.color = "red";
        messageContainer.style.borderColor = "red";
        return;
    }

    // Check to see if passwords match
    if (password1Element.value === password2Element.value) {
        passwordsMatch = true;
        password1Element.style.borderColor = "green";
        password2Element.style.borderColor = "green";
    } else {
        passwordsMatch = false;
        message.textContent = "Make sure passwords match.";
        message.style.color = "red";
        messageContainer.style.borderColor = "red";
        password1Element.style.borderColor = "red";
        password2Element.style.borderColor = "red";
        return;
    }

    // If form is valid and passwords match
    if (isValid && passwordsMatch) {
        message.textContent = "Successfully registered!";
        message.style.color = "green";
        messageContainer.style.borderColor = "green";
    }
}

const storeFormData = () => {
    const user = {
        name: formElement.name.value,
        phone: formElement.phone.value,
        email: formElement.email.value,
        url: formElement.url.value,
        password: formElement.password.value
    };

    // Do something with the user data
    console.log(user);
}

const processFormData = event => {
    event.preventDefault();

    // Validate form
    validateForm();

    // Submit data if valid
    if (isValid && passwordsMatch) storeFormData();
}

// Event listeners
formElement.addEventListener("submit", processFormData);