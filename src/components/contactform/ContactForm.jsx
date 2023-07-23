import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);

    if (!name.trim()) {
      setNameError('Name is required');
      return;
    } else if (!/^[A-Za-z.'\- ]+$/.test(name)) {
      setNameError(
        'Name can only contain letters, apostrophe, dash, and spaces'
      );
      return;
    }
    setNameError('');

    if (!number.trim()) {
      setNumberError('Phone number is required');
      return;
    } else if (
      !/^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$/.test(
        number
      )
    ) {
      setNumberError('Invalid phone number format');
      return;
    }
    setNumberError('');

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    addContact(contact);
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formcontact} onSubmit={handleSubmit}>
      <label className={css.inputlabel}>Name</label>
      <input
        className={css.inputfield}
        type="text"
        name="name"
        minLength={2}
        maxLength={50}
        pattern="^[A-Za-z.'\- ]+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {submitted && nameError && <p className={css.error}>{nameError}</p>}

      <label className={css.inputlabel}>Number</label>
      <input
        className={css.inputfield}
        type="tel"
        name="number"
        pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      {submitted && numberError && <p className={css.error}>{numberError}</p>}

      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
