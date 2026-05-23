import { useState } from "react";

import api from "../api/api";

function ContactList({
  contacts,
  getContacts,
}) {
  const token =localStorage.getItem("token");

  const [editId, setEditId] =useState(null);

  const [editForm, setEditForm] =useState({
      name: "",
      phone: "",
      email: "",
      notes: "",
    })

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}`,{headers: {Authorization: token}})

      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setEditForm({
      name: item.name,
      phone: item.phone,
      email: item.email,
      notes: item.notes,
    });
  };

  const handleChange = (e) => {
    setEditForm({...editForm,[e.target.name]:e.target.value})
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/contacts/${id}`,editForm,{headers: {Authorization: token}});

      setEditId(null);

      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-5 rounded shadow overflow-auto">
      <h2 className="text-2xl font-bold mb-4">
        Contact List
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">
              Name
            </th>

            <th className="border p-2">
              Phone
            </th>

            <th className="border p-2">
              Email
            </th>

            <th className="border p-2">
              Notes
            </th>

            <th className="border p-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">
                {editId === item._id ? (
                  <input type="text" name="name" value={editForm.name} onChange={handleChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  item.name
                )}
              </td>

              <td className="border p-2">
                {editId === item._id ? (
                  <input type="text" name="phone" value={editForm.phone} onChange={handleChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  item.phone
                )}
              </td>

              <td className="border p-2">
                {editId === item._id ? (
                  <input type="text" name="email" value={editForm.email} onChange={handleChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  item.email
                )}
              </td>

              <td className="border p-2">
                {editId === item._id ? (
                  <input type="text" name="notes" value={editForm.notes} onChange={handleChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  item.notes
                )}
              </td>

              <td className="border p-2">
                <div className="flex gap-2">
                  {editId === item._id ? (
                    <button onClick={() =>handleUpdate(item._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button onClick={() =>handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() =>handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;