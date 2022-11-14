import PropTypes from 'prop-types';
import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/reducers';
import ContactItem from './PhonebookItem/PhonebookItem';
import { ContactListBlock } from './PhonebookList.styled';

const PhonebookList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <ContactListBlock>
      {visibleContacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={contactId => dispatch(deleteContact(contactId))}
        />
      ))}
    </ContactListBlock>
  );
};
export default PhonebookList;

PhonebookList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
};
