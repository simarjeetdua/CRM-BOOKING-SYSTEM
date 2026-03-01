import { useEffect, useState } from "react";
import axios from "../api/axios";

function Payments() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  const [formData, setFormData] = useState({
    booking: "",
    amount: "",
  });

  useEffect(() => {
    fetchBookings();
    fetchPayments();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings");
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/payments");
      setPayments(res.data);
    } catch (error) {
      console.error("Error fetching payments");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/payments/generate", formData);
      fetchPayments();

      setFormData({
        booking: "",
        amount: "",
      });
    } catch (error) {
      alert("Error generating payment");
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.put(`/payments/${id}`, {
        status: "Paid",
        paymentDate: new Date(),
      });

      fetchPayments();
    } catch (error) {
      alert("Error updating payment");
    }
  };

  return (
    <div>
      <h2>Payments</h2>

      {/* Generate Payment Form */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Generate Payment Link</h3>

        <form onSubmit={handleSubmit}>
          <select
            value={formData.booking}
            onChange={(e) =>
              setFormData({ ...formData, booking: e.target.value })
            }
            required
          >
            <option value="">Select Booking</option>
            {bookings.map((booking) => (
              <option key={booking._id} value={booking._id}>
                {booking.serviceTitle}
              </option>
            ))}
          </select>

          <br /><br />

          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />

          <br /><br />

          <button type="submit">Generate Payment</button>
        </form>
      </div>

      {/* Payments Table */}
      <h3>All Payments</h3>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Booking</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Link</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.booking?.serviceTitle}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.status}</td>
              <td>
                {payment.paymentLink ? (
                  <a
                    href={payment.paymentLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Link
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                {payment.status !== "Paid" && (
                  <button
                    onClick={() => markAsPaid(payment._id)}
                    style={{ background: "green", color: "white" }}
                  >
                    Mark Paid
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

export default Payments;