import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookFilter from './PhonebookFilter/PhonebookFilter';
import PhonebookList from './PhonebookList/PhonebookList';
import { StyledContainer } from './App.styled.js';

const App = () => {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts'))
      ? JSON.parse(window.localStorage.getItem('contacts'))
      : []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [newContact, ...prevState]);
  };

  const findContact = searchName => {
    setFilter(searchName);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <StyledContainer>
      <h1>Phonebook</h1>
      <PhonebookForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <PhonebookFilter value={filter} onSearch={findContact} />
      <PhonebookList contacts={visibleContacts} onDelete={deleteContact} />
    </StyledContainer>
  );
};

export default App;
