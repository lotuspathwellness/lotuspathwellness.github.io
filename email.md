---
layout: page
title: Contact Me
---

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<form action="https://formspree.io/f/mgovgngk" method="POST" class="contact-form" id="contact-form">
  <div class="form-group" style="position: relative;">
    <input type="text" name="name" id="name" class="form-control" placeholder="First name..." required>
    <span style="position: absolute; top: 0; right: 10px; color: red; font-size: 1.2rem;">*</span>
  </div>
  
  <div class="form-group">
    <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Last name...">
  </div>
  
  <div class="form-group" style="position: relative;">
    <input type="email" name="email" id="email" class="form-control" placeholder="Email..." required>
    <span style="position: absolute; top: 0; right: 10px; color: red; font-size: 1.2rem;">*</span>
  </div>
  
  <div class="form-group">
    <textarea name="message" id="message" class="form-control" rows="5" placeholder="Message"></textarea>
  </div>
  
  <div class="g-recaptcha" data-sitekey="6LdqaUgsAAAAANb-u4760oSgSA1Ox_D6mU7szzYT" style="margin-bottom: 1rem;"></div>
  
  <button type="submit" class="btn" style="background-color: #7B5BA6; border-color: #7B5BA6; color: white; border-radius: 20px; padding: 10px 30px;">Send Message</button>
</form>

<script>
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(response) {
    if (response.ok) {
      window.location.href = 'https://lotuspathwellness.ca/?submitted=true';
    } else {
      alert('There was a problem submitting your form. Please try again.');
    }
  }).catch(function(error) {
    alert('There was a problem submitting your form. Please try again.');
  });
});
</script>

<style>
.contact-form .form-group {
  margin-bottom: 1.5rem;
}
.contact-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #5D4E8C;
}
.contact-form .form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}
.contact-form .form-control:focus {
  outline: none;
  border-color: #7B5BA6;
  box-shadow: 0 0 0 2px rgba(123, 91, 166, 0.2);
}
</style>