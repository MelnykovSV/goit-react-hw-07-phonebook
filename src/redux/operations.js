import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} from './slices/contactsSlice';

axios.defaults.baseURL = 'https://646bd0557b42c06c3b2a7c77.mockapi.io';

// export const fetchContacts = () => async dispatch => {
//   try {
//     dispatch(fetchingInProgress());
//     const response = await axios.get('/contacts');
//     console.log(response);
//     dispatch(fetchingSuccess(response.data));
//   } catch (error) {
//     console.log(error);
//     dispatch(fetchingError(error.message));
//   }
// };

export const fetchContactsShort = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// export const addContact = createAsyncThunk(
//   'contacts/fetchContacts',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/contacts');
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
