import { useEffect, useState } from "react";
import axios from "../api/axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    client: "",
    serviceTitle: "",
    bookingDate: "",
    totalAmount: "",
  });

  useEffect(() => {
    fetchBookings();
    fetchClients();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

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
      await axios.post("/bookings", formData);
      fetchBookings();

      setFormData({
        client: "",
        serviceTitle: "",
        bookingDate: "",
        totalAmount: "",
      });
    } catch (error) {
      alert("Error creating booking");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      alert("Error deleting booking");
    }
  };

  return (
    <div>
      <h2>Bookings</h2>

      {/* Add Booking Form */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Add Booking</h3>

        <form onSubmit={handleSubmit}>
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
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
            name="serviceTitle"
            placeholder="Service Title"
            value={formData.serviceTitle}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />

          <br /><br />

          <button type="submit">Create Booking</button>
        </form>
      </div>

      {/* Booking Table */}
      <h3>All Bookings</h3>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.client?.name}</td>
              <td>{booking.serviceTitle}</td>
              <td>
                {new Date(booking.bookingDate).toLocaleDateString()}
              </td>
              <td>{booking.status}</td>
              <td>₹{booking.totalAmount}</td>
              <td>
                <button
                  onClick={() => handleDelete(booking._id)}
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

export default Bookings;