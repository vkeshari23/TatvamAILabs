import { useState } from "react";

import api from "../api/api";

function ContactForm({
  getContacts,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      email: "",
      notes: "",
    });

  const token =
    localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contacts",formData,{headers: {Authorization: token}});
      getContacts();

      setFormData({name:"",phone:"",email:"",notes:""})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">
        Add Contact
      </h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 mb-3 rounded"
      />

      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        name="notes"
        className="w-full border p-2 mb-3 rounded"
      />

      <button className="bg-blue-500 text-white px-5 py-2 rounded">
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;