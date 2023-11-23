import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contacts', formData);
      onAddContact(response.data);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
