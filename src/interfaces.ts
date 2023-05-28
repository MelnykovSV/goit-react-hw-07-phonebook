export interface IState {
  contacts: IContact[];
  filter: string;
}

export interface IContactProps {
  name: string;
  number: string;
  id: string;
  deleteHandler: (id: string) => void;
}

export interface IContactsListProps {
  filteredContacts: IContact[];
  contactDeleteHandler: (id: string) => void;
}

export interface IFormProps {
  formSubmit: (data: IContact) => boolean;
}

export interface IContact {
  name: string;
  phone: string;
  id: string;
}

export interface IFilterProps {
  contactsFilter: (value: string) => void;
}

export interface IAddContactAction {}

// export interface IStore {

// }

export interface IContactsState {
  items: IContact[];
  isLoading: boolean;
  error: null | string;
}

export interface IContactPostData {
  name: string;
  phone: string;
}

export interface IFullState {
  contacts: IContactsState;
  filter: string;
}
