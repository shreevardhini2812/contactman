import { useState, useEffect } from "react";
import api from "../api";

export default function ContactForm({ editingContact, setEditingContact, fetchContacts }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Load values for editing
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
      setEmail(editingContact.email);
    }
  }, [editingContact]);


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingContact) {
      await api.put(`/contacts/${editingContact._id}`, { name, phone, email });
      setEditingContact(null);
    } else {
      await api.post("/contacts", { name, phone, email });
    }

    setName("");
    setPhone("");
    setEmail("");
    fetchContacts();
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        className="w-full mb-2 p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        className="w-full mb-2 p-2 border rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        type="submit"
      >
        {editingContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}
