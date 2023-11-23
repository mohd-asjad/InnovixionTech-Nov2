import React from 'react';
import axios from 'axios';

const ContactItem = ({ contact, onEditContact, onDeleteContact }) => {
  
  if (!contact) {
    return null;
  }
  const handleEdit = () => {
    onEditContact(contact);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${contact._id}`);
      onDeleteContact(contact._id);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <li>
      {contact.name} - {contact.email} - {contact.phone}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ContactItem;
