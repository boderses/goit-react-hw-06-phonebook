import { React, Component } from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookFilter from './PhonebookFilter/PhonebookFilter';
import PhonebookList from './PhonebookList/PhonebookList';
import { StyledContainer } from './App.styled.js';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevStat => ({
      contacts: [newContact, ...prevStat.contacts],
    }));
  };

  findContact = searchName => {
    this.setState({ filter: searchName });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contactsInLocalStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsInLocalStorage)
      this.setState({ contacts: contactsInLocalStorage });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App component was update');
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <StyledContainer>
        <h1>Phonebook</h1>
        <PhonebookForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <PhonebookFilter
          value={this.state.filter}
          onSearch={this.findContact}
        />
        <PhonebookList
          contacts={visibleContacts}
          onDelete={this.deleteContact}
        />
      </StyledContainer>
    );
  }
}

export default App;
