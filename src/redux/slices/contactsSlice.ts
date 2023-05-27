import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IContactsState, IContact, IFullState } from '../../interfaces';

import { fetchContacts, removeContact, addContact } from '../operations';

const initialState: IContactsState = {
  items: [] as IContact[],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    //fetchContacts
    builder.addCase(fetchContacts.pending, (state: IContactsState, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchContacts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      fetchContacts.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    //addContact
    builder.addCase(addContact.pending, (state: IContactsState, action) => {
      state.isLoading = true;
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addContact.rejected, (state, action) => {
      state.isLoading = false;

      ///TODO: error occures without type guard :
      // Type 'unknown' is not assignable to type 'string | null'.ts(2322)

      if (typeof action.payload === 'string') {
        state.error = action.payload;
      } else {
        state.error = 'Unexpected error occured';
      }
    });
    //removeContact
    builder.addCase(removeContact.pending, (state: IContactsState, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeContact.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(removeContact.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      } else {
        state.error = 'Unexpected error occured';
      }
    });
  },
});

export const contactsReducer = contactsSlice.reducer;

export const getContacts = (state: IFullState) => state.contacts.items;
