import React, { useState, useEffect } from 'react';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

function generateUniqueId(contacts) {
  return contacts.reduce((maxId, contact) => Math.max(maxId, contact.id), 0) + 1;
}

export function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Rosie Simpson', number: '459-12-56' },
    { id: 2, name: 'Hermione Kline', number: '443-89-12' },
    { id: 3, name: 'Eden Clements', number: '645-17-79' },
    { id: 4, name: 'Annie Copeland', number: '227-91-26' },
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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleAddContact = (values, { resetForm }) => {
    const { name, number } = values;

    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: generateUniqueId(contacts),
      name,
      number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
    resetForm();
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm AddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} DeleteContact={handleDeleteContact} />
    </div>
  );
}