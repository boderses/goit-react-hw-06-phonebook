import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createContact } from '../../redux/reducers';
import { nanoid } from 'nanoid';
import {
  ContactAddForm,
  LableForm,
  InputForm,
  ButtonForm,
} from './PhonebookForm.styled';

const PhonebookForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    formSubmitHandler(name, number);
    setName('');
    setNumber('');
  };

  const formSubmitHandler = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts.`);
    }
    if (contacts.find(contact => contact.number === number)) {
      return alert(`${number} is already in contacts.`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(createContact(newContact));
  };

  return (
    <div>
      <ContactAddForm onSubmit={handleSubmit}>
        <LableForm>
          Name
          <InputForm
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </LableForm>
        <LableForm>
          Phone number
          <InputForm
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={event => setNumber(event.target.value)}
          />
        </LableForm>

        <ButtonForm type="submit">Add contact</ButtonForm>
      </ContactAddForm>
    </div>
  );
};

export default PhonebookForm;

PhonebookForm.propTypes = {
  onSubmit: PropTypes.func,
};
