import { useEffect, useState } from "react";
import axios from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    bookings: 0,
    payments: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const clientsRes = await axios.get("/clients");
      const bookingsRes = await axios.get("/bookings");
      const paymentsRes = await axios.get("/payments");

      const totalRevenue = paymentsRes.data.reduce(
        (sum, payment) => sum + (payment.amount || 0),
        0
      );

      setStats({
        clients: clientsRes.data.clients?.length || 0,
        bookings: bookingsRes.data?.length || 0,
        payments: paymentsRes.data?.length || 0,
        revenue: totalRevenue,
      });

      setRecentBookings(bookingsRes.data.slice(0, 5));
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card title="Total Clients" value={stats.clients} />
        <Card title="Total Bookings" value={stats.bookings} />
        <Card title="Total Payments" value={stats.payments} />
        <Card title="Total Revenue" value={`₹${stats.revenue}`} />
      </div>

      {/* Recent Bookings */}
      <div style={{ marginTop: "40px" }}>
        <h3>Recent Bookings</h3>

        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.serviceTitle}</td>
                <td>{booking.status}</td>
                <td>₹{booking.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Small Card Component
function Card({ title, value }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        background: "#f1f5f9",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;