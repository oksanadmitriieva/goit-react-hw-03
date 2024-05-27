import { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import css from "../App/App.module.css";
import initialContacts from "../../contacts.json";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts !== "[]" && savedContacts !== null
      ? JSON.parse(savedContacts)
      : initialContacts;
  });
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const [search, setSearch] = useState("");
  const searchResult = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={search} onSearch={setSearch} />
      <ContactList contacts={searchResult} onDelete={deleteContact} />
    </div>
  );
}
