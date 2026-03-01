import { useEffect, useState } from "react";
import axios from "../api/axios";

function Clients() {
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("/clients");
      setClients(res.data.clients);
    } catch (error) {
      console.error("Error fetching clients");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/clients", formData);
      fetchClients();

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
      });
    } catch (error) {
      alert("Error creating client");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      alert("Error deleting client");
    }
  };

  return (
    <div>
      <h2>Clients</h2>

      {/* Add Client Form */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Add Client</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Client Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />

          <br /><br />

          <button type="submit">Add Client</button>
        </form>
      </div>

      {/* Client Table */}
      <h3>All Clients</h3>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.company}</td>
              <td>
                <button
                  onClick={() => handleDelete(client._id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;