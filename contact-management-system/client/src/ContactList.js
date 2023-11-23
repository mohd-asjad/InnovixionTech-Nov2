import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import ContactItem from './ContactItem';



const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {

    // .......Fetching contacts from the backend when the component mounts.............
    axios.get('http://localhost:5000/api/contacts')
      .then(response => setContacts(response.data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleUpdateContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact._id === updatedContact._id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setSelectedContact(null);
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact._id !== contactId);
    setContacts(updatedContacts);
    setSelectedContact(null);
  };

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <ContactItem
            key={contact._id}
            contact={contact}
            onEditContact={handleEditContact}
            onDeleteContact={handleDeleteContact}
          />
        ))}
      </ul>
      <ContactForm
        onAddContact={handleAddContact}
        onUpdateContact={handleUpdateContact}
        selectedContact={selectedContact}
      />
    </div>
  );
};

export default ContactList;
