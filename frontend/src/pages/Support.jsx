import { useEffect, useState } from "react";
import axios from "../api/axios";

function Support() {
  const [clients, setClients] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [formData, setFormData] = useState({
    client: "",
    subject: "",
    message: "",
    priority: "Medium",
  });

  useEffect(() => {
    fetchClients();
    fetchTickets();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("/clients");
      setClients(res.data.clients);
    } catch (error) {
      console.error("Error fetching clients",error);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get("/support");
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/support", formData);
      fetchTickets();

      setFormData({
        client: "",
        subject: "",
        message: "",
        priority: "Medium",
      });
    } catch (error) {
      alert("Error creating ticket");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/support/${id}`, {
        status: newStatus,
      });

      fetchTickets();
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <div>
      <h2>Support Tickets</h2>

      {/* Create Ticket Form */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Create Ticket</h3>

        <form onSubmit={handleSubmit}>
          <select
            value={formData.client}
            onChange={(e) =>
              setFormData({ ...formData, client: e.target.value })
            }
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>

          <br /><br />

          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />

          <br /><br />

          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />

          <br /><br />

          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <br /><br />

          <button type="submit">Create Ticket</button>
        </form>
      </div>

      <hr />

      {/* Tickets Table */}
      <h3>All Tickets</h3>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Client</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.client?.name}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>
                {ticket.status !== "Resolved" && (
                  <button
                    onClick={() => updateStatus(ticket._id, "Resolved")}
                    style={{ background: "green", color: "white" }}
                  >
                    Mark Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Support;