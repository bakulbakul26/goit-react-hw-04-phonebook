import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ onDeleteContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      try {
        setContacts(JSON.parse(storedContacts));
      } catch (error) {
        console.error('Error parsing contacts from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};

const ContactItem = ({ contact, onDeleteContact }) => (
  <li>
    <p>
      {contact.name}: {contact.number}
    </p>
    <button className={css.btn} onClick={() => onDeleteContact(contact.id)}>
      Delete
    </button>
  </li>
);

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
