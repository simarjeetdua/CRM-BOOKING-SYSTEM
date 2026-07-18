import { useEffect, useState } from "react";
import axios from "../api/axios";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadInvoice = async (id) => {
    try {
      const response = await axios.get(`/invoices/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = `Invoice-${id}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (err) {
      console.error(err);
      alert("Unable to download invoice");
    }
  };

  return (
    <div>
      <h2>Invoices</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Client</th>
            <th>Booking</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>

              <td>{invoice.client?.name}</td>

              <td>{invoice.booking?.serviceTitle}</td>

              <td>₹{invoice.amount}</td>

              <td>{invoice.status}</td>

              <td>
                {new Date(invoice.issuedDate).toLocaleDateString()}
              </td>

              <td>
                <button
                  onClick={() =>
                    downloadInvoice(invoice._id)
                  }
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;