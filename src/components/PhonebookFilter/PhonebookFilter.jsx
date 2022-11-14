import PropTypes from 'prop-types';
import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/reducers';
import { FilterForm, FilterInput } from './PhonebookFilter.styled';

const PhonebookFilter = () => {
  const getFilter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  return (
    <FilterForm>
      <label>
        Search contact by name
        <br />
        <FilterInput
          type="text"
          value={getFilter}
          onChange={event => dispatch(changeFilter(event.currentTarget.value))}
        />
      </label>
    </FilterForm>
  );
};

export default PhonebookFilter;

PhonebookFilter.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func,
};
