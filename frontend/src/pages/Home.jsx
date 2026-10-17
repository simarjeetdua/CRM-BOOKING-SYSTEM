
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <nav className="home-nav">
        <Link to="/" className="home-brand">
          BookFlow CRM
        </Link>

        <div className="home-nav-links">
          <a href="#features">Features</a>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="home-cta">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="home-hero">
        <p className="home-eyebrow">
          BOOKING AND CUSTOMER MANAGEMENT
        </p>

        <h1>
          Manage Your Bookings and Customers in One Place
        </h1>

        <p className="home-description">
          BookFlow CRM helps you organize customer information,
          manage bookings and services, and keep track of payments
          and invoices through one convenient platform.
        </p>

        <div className="home-actions">
          <Link to="/signup" className="home-cta">
            Get Started
          </Link>

          <a href="#features" className="home-secondary">
            Explore Features
          </a>
        </div>
      </section>

      <section id="features" className="home-features">
        <h2>Everything You Need to Manage Bookings</h2>

        <p>
          Organize your daily booking and customer management
          workflow with BookFlow CRM.
        </p>

        <div className="home-feature-grid">
          <article className="home-feature-card">
            <h3>Booking Management</h3>
            <p>
              Keep track of bookings and organize your
              appointment workflow.
            </p>
          </article>

          <article className="home-feature-card">
            <h3>Customer Management</h3>
            <p>
              Maintain customer information in one organized
              place.
            </p>
          </article>

          <article className="home-feature-card">
            <h3>Service Management</h3>
            <p>
              Organize the services your business offers.
            </p>
          </article>

          <article className="home-feature-card">
            <h3>Payments and Invoices</h3>
            <p>
              Manage payment records and invoices through
              your CRM workflow.
            </p>
          </article>
        </div>
      </section>

      <section className="home-bottom-cta">
        <h2>Ready to Organize Your Booking Workflow?</h2>
        <p>
          Get started with BookFlow CRM and manage your
          booking operations in one place.
        </p>

        <Link to="/signup" className="home-cta">
          Create Your Account
        </Link>
      </section>

      <footer className="home-footer">
        <p>
          © {new Date().getFullYear()} BookFlow CRM
        </p>
        <Link to="/login">Sign in</Link>
      </footer>
    </main>
  );
}

export default Home;
