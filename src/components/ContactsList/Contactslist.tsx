import React from 'react';
import { Container, StyledSearchIcon } from './Contactslist.styled';
import { IContactsListProps, IContact } from '../../interfaces';
import shortid from 'shortid';
import { setFilter } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Contact } from '../Contact/Contact';

import {
  getContactsSelector,
  getIsLoading,
  getLoadingStatus,
} from '../../redux/slices/contactsSlice';

export const ContactsList = ({ contacts }: IContactsListProps) => {
  const storedContacts = useSelector(getContactsSelector);

  const formId = shortid.generate();

  const dispatch = useDispatch();

  const storeSearchHandler = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
    };

    dispatch(setFilter(target.value));
  };

  return (
    <Container>
      <h2>Contacts</h2>

      <label htmlFor={formId}>Find contacts by name</label>
      <div>
        <input
          type="text"
          name=""
          id={formId}
          onChange={storeSearchHandler}
          placeholder="Type to find..."
        />
        <StyledSearchIcon />
      </div>

      <ul>
        {storedContacts.map(({ name, phone, id }: IContact) => (
          <Contact name={name} number={phone} id={id} key={id} />
        ))}
      </ul>
    </Container>
  );
};
