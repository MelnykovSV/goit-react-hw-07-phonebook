import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { IContact, ContactsState, IContactsInitial } from '../../interfaces';
// import shortid from 'shortid';
import { IState } from '../../interfaces';
import { fetchContactsShort, removeContact } from '../operations';
export const getContacts = (state: IState) => state.contacts;

const contactsInitialState: IContactsInitial = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    getContacts1(state) {
      return state.items;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    deleteContact(state, action) {
      // state.items = state.items.filter(item => {
      //   return item.id !== action.payload;
      // });
      const index = state.items.findIndex(task => {
        return task.id === action.payload;
      });
      console.log(index);
      state.items.splice(index, 1);

      // return newState;
    },

    addContact(state, action) {
      state.items = [
        ...state.items,
        { id: '123', name: 'unknown', phone: '123123123' },
      ];
    },
    // // Виконається в момент старту HTTP-запиту
    // fetchingInProgress(state) {
    //   state.isLoading = true;
    // },
    // // Виконається якщо HTTP-запит завершився успішно
    // fetchingSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.items = action.payload;
    // },
    // // Виконається якщо HTTP-запит завершився з помилкою
    // fetchingError(state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: {
    [fetchContactsShort.pending](state, action) {
      state.isLoading = true;
    },
    [fetchContactsShort.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContactsShort.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [removeContact.pending](state, action) {
      state.isLoading = true;
    },
    [removeContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [removeContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
// export const {
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
//   getIsLoading,
//   getContacts1,
//   deleteContact,
//   addContact,
// } = contactsSlice.actions;
export const getContactsSelector = state => state.contacts.items;
export const getLoadingStatus = state => state.contacts.isLoading;
