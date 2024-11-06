function validateOTP(event) {
  event.preventDefault();

  const otpInputs = document.querySelectorAll('.otp-input');
  const message = document.getElementById('message');
  const otp = Array.from(otpInputs).map(input => input.value).join('');
  const validOTP = '1234'; // Example of a correct OTP for validation

  // Reset border color for new validation attempt
  otpInputs.forEach(input => input.style.borderColor = '#ddd');
  message.textContent = ''; // Clear previous message

  if (otp === validOTP) {
    otpInputs.forEach(input => input.style.borderColor = 'green');
    message.textContent = 'OTP Verified Successfully!';
    message.className = 'message success';
  } else {
    otpInputs.forEach(input => input.style.borderColor = 'red');
    message.textContent = 'Invalid OTP';
    message.className = 'message error';
    alert("Invalid OTP"); // Show alert for invalid OTP
  }
}

// Automatically move to next input field or paste across fields
document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
  input.addEventListener('input', () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  // Enable pasting across multiple fields
  input.addEventListener('paste', (event) => {
    const pasteData = event.clipboardData.getData('text').slice(0, inputs.length);
    pasteData.split('').forEach((char, i) => {
      if (inputs[i]) {
        inputs[i].value = char;
      }
    });
    inputs[pasteData.length - 1].focus(); // Focus last filled input
    event.preventDefault();
  });
});
