import { useEffect, useState } from "react";

import api from "../api/api";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactLists";
import Layout from "../layout/Layout";

function Dashboard() {
  const [contacts, setContacts] =useState([]);

  const [search, setSearch] =useState("");
  const [editData, setEditData] =useState(null);

  const token = localStorage.getItem( "token");

  const getContacts = async () => {
    try {
      const response =await api.get("/contacts",{headers: {Authorization: token}});
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const filteredContacts = contacts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.phone.includes(search));

  return (
    <Layout>

      <div className="max-w-6xl mx-auto p-5">
        <input type="text" value={search} onChange={(e) =>setSearch(e.target.value)} placeholder="Search by name or phone" 
          className="w-full border p-3 rounded mb-5"
        />

        <div className="flex flex-col gap-5">
          <ContactForm
            getContacts={getContacts}
            editData={editData}
            setEditData={setEditData}
          />

          <ContactList
            contacts={filteredContacts}
            getContacts={getContacts}
            setEditData={setEditData}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;