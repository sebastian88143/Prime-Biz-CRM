import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const InvoicesPage = () => {
  const { pipeline_id } = useParams();

  const [clientData, setClientData] = useState({
    deal_name: "",
    expected_value: "",
    lead: {
      company_name: "",
      contact_person_name: "",
      contact_person_surname: "",
      email: "",
      address: "",
      phone: "",
      website: "",
      industry: "Manufacturing",
      size: "Small",
      top_lead: false,
      notes: "",
    }
  });

  const [ourCompanyData, setOurCompanyData] = useState({
    company_name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [clientLoading, setClientLoading] = useState(true);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorFields, setErrorFields] = useState({});
  const [invoiceData, setInvoiceData] = useState({
    description: "",
    quantity: "",
    unit_value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (errorFields[name]) {
      setErrorFields((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  useEffect(() => {
    fetchClientData();
    fetchOurCompanyData();
  }, [pipeline_id])

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/pipeline/${pipeline_id}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClientData({
        deal_name: response.data.pipeline.deal_name,
        expected_value: response.data.pipeline.expected_value,
        lead: response.data.pipeline.lead
      });
      setClientLoading(false);
    } catch (err) {
      setError("Failed to fetch lead data");
    } finally {
      setClientLoading(false);
    }
  };

  const fetchOurCompanyData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/user_info/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOurCompanyData({
        company_name: response.data.user.company_name,
        email: response.data.user.email,
        address: response.data.user.address,
        phone: response.data.user.phone
      });
      setCompanyLoading(false);
    } catch (err) {
      setError("Failed to fetch our company data");
    } finally {
      setCompanyLoading(false);
    }
  };

  const validateForm = () => {
    let errors = {};
  
    if (!invoiceData.description.trim()) {
      errors.description = "Item Description is required.";
    }
  
    if (!invoiceData.quantity.trim()) {
      errors.quantity = "Quantity is required.";
    } else if (!/^\d+$/.test(invoiceData.quantity)) {
      errors.quantity = "Quantity must be an integer (e.g. 35, 108, 305).";
    }
  
    if (!invoiceData.unit_value.trim()) {
      errors.unit_value = "Unit Value is required.";
    } else if (!/^\d+([.,]\d+)?$/.test(invoiceData.unit_value)) {
      errors.unit_value = "Unit Value must be a number (e.g., 1234.56 or 789000,79).";
    }
  
    if (Object.keys(errors).length > 0) {
      setErrorFields(errors);
      setSuccessMessage("");
      return false;
    }
  
    setErrorFields({});
    setErrorMessage("");
    return true;
  };

  const navigate = useNavigate();

  const generateInvoice = (e) => {
    e.preventDefault();
  
    if (!validateForm()) 
      return;
  
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.setFontSize(18);
    doc.text("INVOICE", 105, 20, { align: "center" });
  
    const issueDate = new Date().toLocaleDateString("en-GB");
    doc.setFontSize(12);
    doc.text(`Issue Date: ${issueDate}`, 150, 30);
  
    doc.setFontSize(14);
    doc.text("Your Company:", 20, 40);
    doc.setFontSize(12);
    doc.text(`${ourCompanyData.company_name}`, 20, 50);
    doc.text(`${ourCompanyData.address.split(',').join('\n')}`, 20, 60);
    doc.text(`${ourCompanyData.email}`, 20, 100);
    doc.text(`${ourCompanyData.phone}`, 20, 110);
  
    doc.setFontSize(14);
    doc.text("Bill To:", 140, 40);
    doc.setFontSize(12);
    doc.text(`${clientData.lead.company_name}`, 140, 50);
    doc.text(`${clientData.lead.address.split(',').join('\n')}`, 140, 60);
    doc.text(`${clientData.lead.email}`, 140, 100);
    doc.text(`${clientData.lead.phone}`, 140, 110);
  
    const quantity = parseInt(invoiceData.quantity, 10);
    const unitValue = parseFloat(invoiceData.unit_value.replace(",", "."));
    const totalPrice = quantity * unitValue;
  
    const head = [["Description", "Quantity", "Unit Price (£)", "Total (£)"]];
    const body = [
      [
        invoiceData.description,
        quantity,
        unitValue.toFixed(2),
        totalPrice.toFixed(2),
      ],
    ];
  
    autoTable(doc, {
      startY: 130,
      head: head,
      body: body,
      theme: "grid",
      styles: { fontSize: 12 },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    });
  
    doc.setFontSize(14);
    doc.text(`Total Amount: £${totalPrice.toFixed(2)}`, 120, doc.lastAutoTable.finalY + 15);
  
    doc.save(`Invoice_${clientData.lead.company_name}.pdf`);
  
    setSuccessMessage("Invoice generated successfully!");
    setErrorMessage("");
  
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/pipeline");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
      <form onSubmit={generateInvoice} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-8xl">
        <h2 className="text-2xl font-semibold mb-6">Invoices</h2>

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold w-1/2 text-left">Your Details</h1>
          <h1 className="text-2xl font-semibold w-1/2 text-left pl-6">Client's Details</h1>
        </div>

        <div className="flex">
          <div className="w-1/2 pr-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={ourCompanyData.company_name} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={ourCompanyData.address} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={ourCompanyData.email} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={ourCompanyData.phone} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="w-1/2 pl-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="client_company_name"
                value={clientData.lead.company_name} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                name="client_address"
                value={clientData.lead.address} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="client_email"
                value={clientData.lead.email} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                name="client_phone"
                value={clientData.lead.phone} readOnly
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-medium mb-2">Item Description</h3>
          <div>
            <label className="block text-sm font-medium">Item Description</label>
            <input
              type="text"
              name="description"
              onChange={(e) => handleChange(e, "description", "item")}
              className={`w-full border ${errorFields.description ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errorFields.description && (
              <p className="text-red-500 text-sm">{errorFields.description}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="text"
                name="quantity"
                onChange={(e) => handleChange(e, "quantity", "item")}
                className={`w-full border ${errorFields.quantity ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
              />
              {errorFields.quantity && (
                <p className="text-red-500 text-sm">{errorFields.quantity}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Unit Value</label>
              <input
                type="text"
                name="unit_value"
                onChange={(e) => handleChange(e, "unitValue", "item")}
                className={`w-full border ${errorFields.unit_value ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
              />
              {errorFields.unit_value && (
                <p className="text-red-500 text-sm">{errorFields.unit_value}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-black text-white py-2 px-10 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            Generate Invoice
          </button>
        </div>

        {successMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default InvoicesPage;