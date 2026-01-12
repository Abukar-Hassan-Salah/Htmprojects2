
// Helpers
function setError(input, msgEl, message) {
  input.classList.remove('valid-state');
  input.classList.add('error-state');
  msgEl.textContent = message;
}

function clearError(input, msgEl) {
  input.classList.remove('error-state');
  input.classList.add('valid-state');
  msgEl.textContent = '';
}

function isValidEmail(value) {
  // Leverages browser's email type, but we add a simple sanity check
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(value);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailErr = document.getElementById('email-error');
  const passwordErr = document.getElementById('password-error');
  const togglePwd = document.getElementById('toggle-pwd');
  const remember = document.getElementById('remember');
  const submitBtn = document.getElementById('submit-btn');
  const formMsg = document.getElementById('form-message');

  // Restore remembered email
  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) {
    email.value = savedEmail;
    email.classList.add('valid-state');
  }

  // Show/hide password
  togglePwd.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    togglePwd.textContent = show ? 'Hide' : 'Show';
    togglePwd.setAttribute('aria-pressed', String(show));
    password.focus();
  });

  // Validation functions
  function validateEmail() {
    const val = email.value.trim();
    if (!val) {
      setError(email, emailErr, 'Email is required.');
      return false;
    }
    if (!isValidEmail(val)) {
      setError(email, emailErr, 'Enter a valid email address.');
      return false;
    }
    clearError(email, emailErr);
    return true;
  }

  function validatePassword() {
    const val = password.value;
    if (!val) {
      setError(password, passwordErr, 'Password is required.');
      return false;
    }
    if (val.length < 6) {
      setError(password, passwordErr, 'Use at least 6 characters.');
      return false;
    }
    clearError(password, passwordErr);
    return true;
  }

  // Live validation
  email.addEventListener('input', validateEmail);
  email.addEventListener('blur', validateEmail);
  password.addEventListener('input', validatePassword);
  password.addEventListener('blur', validatePassword);

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMsg.textContent = '';
    formMsg.className = 'form-message';

    const okEmail = validateEmail();
    const okPwd = validatePassword();

    if (!okEmail || !okPwd) {
      const firstInvalid = form.querySelector('.error-state');
      if (firstInvalid) firstInvalid.focus();
      formMsg.textContent = 'Please fix the errors and try again.';
      formMsg.classList.add('error');
      return;
    }

    // Handle "Remember me"
    if (remember.checked) {
      localStorage.setItem('rememberedEmail', email.value.trim());
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Disable button during "request"
    submitBtn.disabled = true;

    try {
      // Replace this with your real API call
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email.value.trim(), password: password.value })
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || 'Login failed');

      // Mock delay + mock success for demo
      await new Promise(r => setTimeout(r, 900));

      // Example: pretend only demo@example.com works
      if (email.value.trim().toLowerCase() !== 'demo@example.com') {
        throw new Error('Invalid credentials.');
      }

      formMsg.textContent = 'Login successful! Redirecting...';
      formMsg.classList.add('success');

      // Redirect (simulate)
      setTimeout(() => {
        window.location.href = './dashboard.html'; // change as needed
      }, 700);
    } catch (err) {
      formMsg.textContent = err.message || 'Something went wrong. Please try again.';
      formMsg.classList.add('error');
      submitBtn.disabled = false;
    }
  });

  // Optional: forgot password handler
  document.getElementById('forgot-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset link would be sent to your email. (Demo)');
  });
});
