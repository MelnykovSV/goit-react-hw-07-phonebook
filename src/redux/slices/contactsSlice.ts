import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IContact, ContactsState, IContactsInitial } from '../../interfaces';
// import shortid from 'shortid';
import { IState } from '../../interfaces';
export const getContacts = (state: IState) => state.contacts;

const contactsInitialState: IContactsInitial = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    // Виконається в момент старту HTTP-запиту
    fetchingInProgress(state) {
      state.contacts.isLoading = true;
    },
    // Виконається якщо HTTP-запит завершився успішно
    fetchingSuccess(state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    // Виконається якщо HTTP-запит завершився з помилкою
    fetchingError(state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
// export const { addContact, deleteContact } = contactsSlice.actions;
