import React, { useState } from "react";
import { jsPDF } from "jspdf";

// Reusable Input Component
const InputField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black"
      placeholder="Value"
      value={value}
      onChange={onChange}
    />
  </div>
);

// InvoicesPage Component
const InvoicesPage = () => {
  // Definiowanie stanu dla formularzy
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    address: "",
    email: "",
    phone: ""
  });

  const [clientDetails, setClientDetails] = useState({
    companyName: "",
    address: "",
    email: "",
    phone: ""
  });

  const [itemDetails, setItemDetails] = useState({
    description: "",
    quantity: "",
    unitValue: ""
  });

  // Funkcja do obsługi zmiany wartości w formularzu
  const handleChange = (e, field, section) => {
    const { value } = e.target;
    if (section === "company") {
      setCompanyDetails((prev) => ({
        ...prev,
        [field]: value
      }));
    } else if (section === "client") {
      setClientDetails((prev) => ({
        ...prev,
        [field]: value
      }));
    } else if (section === "item") {
      setItemDetails((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Funkcja generująca PDF
  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Dodawanie danych do PDF
    doc.text("Invoice", 20, 20);

    doc.text("Your Company Details:", 20, 40);
    doc.text(`Company Name: ${companyDetails.companyName}`, 20, 50);
    doc.text(`Address: ${companyDetails.address}`, 20, 60);
    doc.text(`Email: ${companyDetails.email}`, 20, 70);
    doc.text(`Phone: ${companyDetails.phone}`, 20, 80);

    doc.text("Client's Details:", 20, 100);
    doc.text(`Company Name: ${clientDetails.companyName}`, 20, 110);
    doc.text(`Address: ${clientDetails.address}`, 20, 120);
    doc.text(`Email: ${clientDetails.email}`, 20, 130);
    doc.text(`Phone: ${clientDetails.phone}`, 20, 140);

    doc.text("Item Description:", 20, 160);
    doc.text(`Description: ${itemDetails.description}`, 20, 170);
    doc.text(`Quantity: ${itemDetails.quantity}`, 20, 180);
    doc.text(`Unit Value: $${itemDetails.unitValue}`, 20, 190);

    // Zapisz plik PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-8xl">
        <h2 className="text-2xl font-semibold mb-6">Invoices</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Two sections for company details */}
          <div>
            <h3 className="text-lg font-medium mb-2">Your details</h3>
            <InputField
              label="Company Name"
              value={companyDetails.companyName}
              onChange={(e) => handleChange(e, "companyName", "company")}
            />
            <InputField
              label="Address"
              value={companyDetails.address}
              onChange={(e) => handleChange(e, "address", "company")}
            />
            <InputField
              label="Email"
              value={companyDetails.email}
              onChange={(e) => handleChange(e, "email", "company")}
            />
            <InputField
              label="Phone"
              value={companyDetails.phone}
              onChange={(e) => handleChange(e, "phone", "company")}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Client's details</h3>
            <InputField
              label="Company Name"
              value={clientDetails.companyName}
              onChange={(e) => handleChange(e, "companyName", "client")}
            />
            <InputField
              label="Address"
              value={clientDetails.address}
              onChange={(e) => handleChange(e, "address", "client")}
            />
            <InputField
              label="Email"
              value={clientDetails.email}
              onChange={(e) => handleChange(e, "email", "client")}
            />
            <InputField
              label="Phone"
              value={clientDetails.phone}
              onChange={(e) => handleChange(e, "phone", "client")}
            />
          </div>
        </div>

        {/* Item details */}
        <div className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-medium mb-2">Item Description</h3>
          <InputField
            label="Item Description"
            value={itemDetails.description}
            onChange={(e) => handleChange(e, "description", "item")}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Quantity"
              value={itemDetails.quantity}
              onChange={(e) => handleChange(e, "quantity", "item")}
            />
            <InputField
              label="Unit value"
              value={itemDetails.unitValue}
              onChange={(e) => handleChange(e, "unitValue", "item")}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 max-w-2xl mx-auto">
          <button
            onClick={generateInvoice}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;