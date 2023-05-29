import React, { useEffect } from 'react';
import { Form } from '../Form/Form';
import { ContactsList } from '../ContactsList/Contactslist';
import { ModernNormalize } from 'emotion-modern-normalize';
import { Filter } from '../Filter/Filter';
import { StatusIndicator } from '../StatusIndicator/StatusIndicator';
import { Container } from './App.styled';
import { IContact } from '../../interfaces';
import { ToastContainer, toast } from 'react-toastify';
import { updateFilter, getFilter } from '../../redux/slices/filterSlice';
import { getContacts } from '../../redux/slices/contactsSlice';
import {
  fetchContacts,
  addContact,
  removeContact,
} from '../../redux/operations';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const App = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(getFilter);
  const contacts = useAppSelector(getContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  ///Saves contact to contacts if there is no contact with such name
  const formSubmitHandler = (data: IContact): boolean => {
    const normalizedName = data.name.toLowerCase();
    if (
      !contacts.some(
        (item: IContact) => item.name.toLowerCase() === normalizedName
      )
    ) {
      dispatch(addContact({ name: data.name, phone: data.phone }));
      return true;
    } else {
      toast(`${data.name} is already in contacts.`);

      return false;
    }
  };

  ///Deletes contact
  const contactDeleteHandler = (id: string): void => {
    dispatch(removeContact(id));
  };

  /// Sets contacts filter
  const contactsFilter = (value: string): void => {
    dispatch(updateFilter(value.toLowerCase()));
  };

  const filteredContacts = contacts.filter((item: IContact): boolean =>
    item.name.toLowerCase().includes(filter)
  );

  return (
    <Container>
      <ModernNormalize />
      <h2>Phonebook</h2>

      <Form formSubmit={formSubmitHandler}></Form>
      <StatusIndicator />
      <h2>Contacts</h2>
      <Filter contactsFilter={contactsFilter} />
      <ContactsList
        filteredContacts={filteredContacts}
        contactDeleteHandler={contactDeleteHandler}
      />

      <ToastContainer />
    </Container>
  );
};
