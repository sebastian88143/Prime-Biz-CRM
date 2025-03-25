import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddPipelinePage = () => {
    const { lead_id } = useParams();

    const [formData, setFormData] = useState({
        company_name: "",
        contact_person_name: "",
        contact_person_surname: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        industry: "Manufacturing",
        size: "Small",
        top_lead: false,
        notes: "",
        deal_name: "",
        expected_deal_value: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorFields, setErrorFields] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchLeadData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8000/api/lead/${lead_id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFormData((prev) => ({ ...prev, ...response.data.lead }));
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch lead data");
                setLoading(false);
            }
        };

        fetchLeadData();
    }, [lead_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errorFields[name]) {
            setErrorFields((prevErrors) => ({
                ...prevErrors,
                [name]: undefined,
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/api/add_pipeline/${lead_id}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Pipeline added successfully!");
                setError("");
                setTimeout(() => {
                    setSuccessMessage("");
                    setFormData({
                        company_name: "",
                        contact_person_name: "",
                        contact_person_surname: "",
                        email: "",
                        phone: "",
                        address: "",
                        website: "",
                        industry: "Manufacturing",
                        size: "Small",
                        top_lead: false,
                        notes: "",
                        deal_name: "",
                        expected_deal_value: "",
                    });
                }, 1500);
            } else {
                setErrorFields(data.error_fields || {});
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An unexpected error occurred.");
            setSuccessMessage("");
        }
    }

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-8xl">
                <h2 className="text-xl font-semibold mb-4">Add To Pipeline</h2>

                <div className="flex">
                    <div className="w-1/2 pr-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Company Name</label>
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name} readOnly
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Contact Person Name</label>
                                <input
                                    type="text"
                                    name="contact_person_name"
                                    value={formData.contact_person_name} readOnly
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Contact Person Surname</label>
                                <input
                                    type="text"
                                    name="contact_person_surname"
                                    value={formData.contact_person_surname} readOnly
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email} readOnly
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone} readOnly
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Website</label>
                            <input
                                type="text"
                                name="website"
                                value={formData.website} readOnly
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Size</label>
                            <select
                                name="size"
                                value={formData.size} disabled
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Big">Big</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Industry</label>
                            <select
                                name="industry"
                                value={formData.industry} disabled
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Retail">Retail</option>
                                <option value="Services">Services</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-1/2 pl-6 flex flex-col">
                        <div>
                            <label className="block text-sm font-medium">Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes} readOnly
                                className="w-full border border-gray-300 rounded-md p-2 h-[300px]"
                            ></textarea>

                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Deal Name</label>
                            <input
                                type="text"
                                name="deal_name"
                                value={formData.deal_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Expected Deal Value</label>
                            <input
                                type="text"
                                name="expected_deal_value"
                                value={formData.expected_deal_value}
                                onChange={handleChange}
                                className={`w-full border ${errorFields.expected_deal_value ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            />
                            {errorFields.expected_deal_value && (
                                <p className="text-red-500 text-sm">{errorFields.expected_deal_value}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button
                        type="submit"
                        className="bg-gray-900 text-white px-10 py-3 w-1/3 rounded-md shadow"
                    >
                        Add To Pipeline
                    </button>
                </div>
            </form>

            {successMessage && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                    {successMessage}
                </div>
            )}
            {error && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
                    {error}
                </div>
            )}
        </div>
    );
};

export default AddPipelinePage;