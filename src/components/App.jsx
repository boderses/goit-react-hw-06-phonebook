import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookFilter from './PhonebookFilter/PhonebookFilter';
import PhonebookList from './PhonebookList/PhonebookList';
import { StyledContainer } from './App.styled.js';

const App = () => {
  return (
    <StyledContainer>
      <h1>Phonebook</h1>
      <PhonebookForm />
      <h2>Contacts</h2>
      <PhonebookFilter />
      <PhonebookList />
    </StyledContainer>
  );
};

export default App;
