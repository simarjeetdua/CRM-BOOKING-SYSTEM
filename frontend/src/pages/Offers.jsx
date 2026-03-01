import { useEffect, useState } from "react";
import axios from "../api/axios";

function Offers() {
  const [clients, setClients] = useState([]);
  const [offers, setOffers] = useState([]);

  const [formData, setFormData] = useState({
    client: "",
    items: [{ title: "", quantity: 1, price: 0 }],
    discount: 0,
    tax: 0,
  });

  useEffect(() => {
    fetchClients();
    fetchOffers();
  }, []);

  const fetchClients = async () => {
    const res = await axios.get("/clients");
    setClients(res.data.clients);
  };

  const fetchOffers = async () => {
    const res = await axios.get("/offers");
    setOffers(res.data);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { title: "", quantity: 1, price: 0 }],
    });
  };

  const calculateSubtotal = () => {
    return formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - Number(formData.discount) + Number(formData.tax);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/offers", {
        ...formData,
        subtotal: calculateSubtotal(),
        totalAmount: calculateTotal(),
      });

      fetchOffers();

      setFormData({
        client: "",
        items: [{ title: "", quantity: 1, price: 0 }],
        discount: 0,
        tax: 0,
      });
    } catch (error) {
      alert("Error creating offer");
    }
  };

  return (
    <div>
      <h2>Offers / Quotations</h2>

      {/* Offer Form */}
      <form onSubmit={handleSubmit}>
        <h3>Create Offer</h3>

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

        <h4>Items</h4>

        {formData.items.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Title"
              value={item.title}
              onChange={(e) =>
                handleItemChange(index, "title", e.target.value)
              }
              required
            />

            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", Number(e.target.value))
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", Number(e.target.value))
              }
            />
          </div>
        ))}

        <button type="button" onClick={addItem}>
          + Add Item
        </button>

        <br /><br />

        <input
          type="number"
          placeholder="Discount"
          value={formData.discount}
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Tax"
          value={formData.tax}
          onChange={(e) =>
            setFormData({ ...formData, tax: e.target.value })
          }
        />

        <br /><br />

        <h4>Subtotal: ₹{calculateSubtotal()}</h4>
        <h3>Total: ₹{calculateTotal()}</h3>

        <button type="submit">Create Offer</button>
      </form>

      <hr />

      {/* Offers Table */}
      <h3>All Offers</h3>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Client</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td>{offer.client?.name}</td>
              <td>₹{offer.totalAmount}</td>
              <td>{offer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Offers;