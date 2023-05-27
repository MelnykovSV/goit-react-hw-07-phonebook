import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContactPostData } from '../interfaces';

axios.defaults.baseURL = 'https://646bd0557b42c06c3b2a7c77.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }: IContactPostData, thunkAPI) => {
    try {
      const response = await axios.post(`./contacts/`, { name, phone });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`./contacts/${contactId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
