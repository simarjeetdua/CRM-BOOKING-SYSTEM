import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h3>Welcome, {user?.name}</h3>

      <button
        onClick={handleLogout}
        style={{ background: "red", color: "white" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;