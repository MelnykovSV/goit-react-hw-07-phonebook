import { useEffect } from 'react';
// import { Form } from '../Form/Form';
import { ContactsList } from '../ContactsList/Contactslist';
import { ModernNormalize } from 'emotion-modern-normalize';
import { Container } from './App.styled';
import { IContact } from '../../interfaces';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

import {
  getContactsSelector,
  getIsLoading,
  getLoadingStatus,
} from '../../redux/slices/contactsSlice';

import { getFilter } from '../../redux/slices/filterSlice';

import { useDispatch } from 'react-redux';

import axios from 'axios';

import { fetchContacts, fetchContactsShort } from '../../redux/operations';

export const App = () => {
  const storedContacts = useSelector(getContactsSelector);
  const isLoading = useSelector(getLoadingStatus);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  // const shownContacts = storedContacts.filter((item: IContact) => {
  //   return item.name.includes(filter);
  // });

  useEffect(() => {
    dispatch(fetchContactsShort());
  }, []);

  return (
    <Container>
      <ModernNormalize />
      <h2>Phonebook</h2>
      {/* {<p>{JSON.stringify(isLoading)}</p>}
      <div>{JSON.stringify(storedContacts)}</div> */}

      {/* <Form /> */}
      <ContactsList contacts={storedContacts} />
      <ToastContainer />
    </Container>
  );
};
