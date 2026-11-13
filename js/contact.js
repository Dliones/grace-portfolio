// contact.js - Contact form validation

const form = document.getElementById('contactForm');
const successBox = document.getElementById('formSuccess');

// Show or clear an error under a field
function setError(input, message) {
  document.getElementById(input.id + 'Error').textContent = message;
  input.classList.toggle('invalid', message !== '');
}

// Validation functions: each returns an error message, or '' if valid
function checkName(value) {
  return value.trim() === '' ? 'Enter your name.' : '';
}

function checkEmail(value) {
  if (value.trim() === '') return 'Enter your email address.';
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;      // text@text.text
  return pattern.test(value) ? '' : 'Enter a valid email, like name@example.com.';
}

function checkPhone(value) {
  if (value.trim() === '') return 'Enter your phone number.';
  return /^[0-9]+$/.test(value) ? '' : 'Use digits only, with no spaces, + or dashes.';
}

function checkMessage(value) {
  return value.trim() === '' ? 'Write a short message.' : '';
}

// Map each input to its validator
const fields = [
  { input: document.getElementById('name'), check: checkName },
  { input: document.getElementById('email'), check: checkEmail },
  { input: document.getElementById('phone'), check: checkPhone },
  { input: document.getElementById('message'), check: checkMessage }
];

// Validate live as the user leaves each field
fields.forEach(function (f) {
  f.input.addEventListener('blur', function () {
    setError(f.input, f.check(f.input.value));
  });
});

// Validate everything on submit
form.addEventListener('submit', function (event) {
  event.preventDefault();
  successBox.hidden = true;
  let allValid = true;

  fields.forEach(function (f) {
    const message = f.check(f.input.value);
    setError(f.input, message);
    if (message !== '') allValid = false;
  });

  if (allValid) {
    const name = document.getElementById('name').value.trim();
    successBox.textContent = 'Thank you, ' + name + '. Your message is ready to send. I will reply soon.';
    successBox.hidden = false;
    form.reset();
  }
});
