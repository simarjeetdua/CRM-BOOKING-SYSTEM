import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "230px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>BookFlow CRM</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/clients" style={{ color: "white" }}>Clients</Link>
        <Link to="/bookings" style={{ color: "white" }}>Bookings</Link>
        <Link to="/offers" style={{ color: "white" }}>Offers</Link>
        <Link to="/payments" style={{ color: "white" }}>Payments</Link>
        <Link to="/support" style={{ color: "white" }}>Support</Link>
      </nav>
    </div>
  );
}

export default Sidebar;