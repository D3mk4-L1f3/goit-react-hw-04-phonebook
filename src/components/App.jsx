import React, { useState, useEffect } from 'react';
import ContactForm from './module/Form';
import ContactList from './module/List';
import Filter from './module/Filter';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactFilter = value => {
    setFilter(value.toLowerCase());
  };

  const getFilteredContacts = () => {
    const filterWithoutDashes = filter.replace(/-/g, '');

    if (!filter) {
      return contacts;
    }

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filterWithoutDashes) ||
        contact.number.replace(/-/g, '').includes(filterWithoutDashes)
    );
  };

  const addContact = userData => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === userData.name.toLowerCase()
      )
    ) {
      alert(`${userData.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, userData]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm createContactsArray={addContact} />
      <h2>Contacts</h2>
      <Filter onFilter={contactFilter} filter={filter} />
      <ContactList
        filteredArray={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </>
  );
}
