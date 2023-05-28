import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContactPostData } from '../interfaces';
import { IContact } from '../interfaces';
import { getErrorMessage } from '../getErrorMessage';

axios.defaults.baseURL = 'https://646bd0557b42c06c3b2a7c77.mockapi.io';

export const fetchContacts = createAsyncThunk<IContact[], void>(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }: IContactPostData, thunkAPI) => {
    try {
      const response = await axios.post(`./contacts/`, { name, phone });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`./contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
