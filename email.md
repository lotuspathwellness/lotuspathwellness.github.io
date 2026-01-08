---
layout: page
title: Contact Me
---

<form action="https://formspree.io/f/mgovgngk" method="POST" class="contact-form">
  <input type="text" name="_gotcha" style="display:none">
  <div class="form-group">
    <label for="name">Name <span style="color: red;">*</span></label>
    <input type="text" name="name" id="name" class="form-control" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email <span style="color: red;">*</span></label>
    <input type="email" name="email" id="email" class="form-control" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea name="message" id="message" class="form-control" rows="5"></textarea>
  </div>
  
  <button type="submit" class="btn" style="background-color: #7B5BA6; border-color: #7B5BA6; color: white; border-radius: 20px; padding: 10px 30px;">Send Message</button>
</form>

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