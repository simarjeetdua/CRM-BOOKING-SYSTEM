import PDFDocument from "pdfkit";

const generateInvoice = (invoice, res) => {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${invoice.invoiceNumber}.pdf`
  );

  doc.pipe(res);

  // Title
  doc
    .fontSize(24)
    .text("BOOKFLOW CRM", { align: "center" });

  doc.moveDown();

  doc
    .fontSize(18)
    .text("INVOICE", { align: "center" });

  doc.moveDown(2);

  // Invoice Details
  doc.fontSize(12);

  doc.text(`Invoice Number : ${invoice.invoiceNumber}`);
  doc.text(
    `Invoice Date : ${new Date(
      invoice.issuedDate
    ).toLocaleDateString()}`
  );

  doc.moveDown();

  // Client Details
  doc.fontSize(14).text("Client Details");

  doc.fontSize(12);

  doc.text(`Name : ${invoice.client.name}`);
  doc.text(`Email : ${invoice.client.email}`);
  doc.text(`Phone : ${invoice.client.phone}`);

  doc.moveDown();

  // Booking Details
  doc.fontSize(14).text("Booking Details");

  doc.fontSize(12);

  doc.text(`Service : ${invoice.booking.serviceTitle}`);
  doc.text(
    `Booking Date : ${new Date(
      invoice.booking.bookingDate
    ).toLocaleDateString()}`
  );

  doc.moveDown();

  // Payment Details
  doc.fontSize(14).text("Payment");

  doc.fontSize(12);

  doc.text(`Amount : ₹${invoice.amount}`);
  doc.text(`Status : ${invoice.status}`);
  doc.text(
    `Payment ID : ${invoice.payment?.paymentId || "-"}`
  );

  doc.moveDown();

  doc
    .fontSize(18)
    .text(`TOTAL : ₹${invoice.amount}`, {
      align: "right",
    });

  doc.moveDown(2);

  doc
    .fontSize(12)
    .text(
      "Thank you for choosing BookFlow CRM!",
      {
        align: "center",
      }
    );

  doc.end();
};

export default generateInvoice;