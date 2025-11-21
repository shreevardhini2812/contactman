import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import api from "./api";
import './App.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
  const load = async () => {
    await fetchContacts();
  };
  load();
}, []);

  // Search Logic
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Manager</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Form */}
        <ContactForm
          editingContact={editingContact}
          setEditingContact={setEditingContact}
          fetchContacts={fetchContacts}
        />

        {/* List */}
        <ContactList
          contacts={filteredContacts}
          fetchContacts={fetchContacts}
          setEditingContact={setEditingContact}
        />
      </div>
    </div>
  );
}
