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
      console.error("Error fetching bookings", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/payments");
      setPayments(res.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create Razorpay Order
      const { data } = await axios.post(
        "/payments/create-order",
        formData
      );

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "BookFlow CRM",
        description: "Booking Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            await axios.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment Successful ✅");

            fetchPayments();

            setFormData({
              booking: "",
              amount: "",
            });

          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: "Customer",
          email: "customer@example.com",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error(error);
      alert("Unable to create payment.");
    }
  };

  return (
    <div>
      <h2>Payments</h2>

      <div style={{ marginBottom: "30px" }}>
        <h3>Pay Booking</h3>

        <form onSubmit={handleSubmit}>
          <select
            value={formData.booking}
            onChange={(e) =>
              setFormData({
                ...formData,
                booking: e.target.value,
              })
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

          <br />
          <br />

          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
            required
          />

          <br />
          <br />

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
            }}
          >
            Pay with Razorpay
          </button>
        </form>
      </div>

      <h3>Payment History</h3>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Booking</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment ID</th>
            <th>Payment Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.booking?.serviceTitle}</td>

              <td>₹{payment.amount}</td>

              <td>{payment.status}</td>

              <td>{payment.paymentId || "-"}</td>

              <td>
                {payment.paymentDate
                  ? new Date(
                      payment.paymentDate
                    ).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;