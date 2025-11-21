import api from "../api";

export default function ContactList({ contacts, fetchContacts, setEditingContact }) {
  const handleDelete = async (id) => {
    await api.delete(`/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div>
      {contacts.length === 0 && (
        <p className="text-center text-gray-500">No contacts found.</p>
      )}

      {contacts.map((c) => (
        <div
          key={c._id}
          className="border p-3 rounded mb-2 flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">{c.name}</h2>
            <p>{c.phone}</p>
            <p>{c.email}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEditingContact(c)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(c._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
