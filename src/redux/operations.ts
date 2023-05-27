import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

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

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`./contacts/${contactId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.put(`./contacts/${contactId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
