import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPipelinePage = () => {
    const { pipeline_id } = useParams();

    const [formData, setFormData] = useState({
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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorFields, setErrorFields] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (errorFields[name]) {
            setErrorFields((prevErrors) => ({
                ...prevErrors,
                [name]: undefined,
            }));
        }
    };

    useEffect(() => {
        const fetchPipelineData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8000/api/pipeline/${pipeline_id}/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFormData({
                    deal_name: response.data.pipeline.deal_name,
                    expected_value: response.data.pipeline.expected_value,
                    lead: response.data.pipeline.lead
                });
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch lead data");
                setLoading(false);
            }
        };

        fetchPipelineData();
    }, [pipeline_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:8000/api/pipeline/${pipeline_id}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.status === 200) {
                setSuccessMessage("Pipeline updated successfully!");
                setError("");
                setTimeout(() => {
                    setSuccessMessage("");
                    setFormData({
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
                }, 1500);
            } else {
                const data = await response.json();
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
                <h2 className="text-xl font-semibold mb-4">Edit Pipeline</h2>

                <div className="flex">
                    <div className="w-1/2 pr-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Company Name</label>
                            <input
                                type="text"
                                name="company_name"
                                value={formData.lead.company_name} readOnly
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Contact Person Name</label>
                                <input
                                    type="text"
                                    name="contact_person_name"
                                    value={formData.lead.contact_person_name} readOnly
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Contact Person Surname</label>
                                <input
                                    type="text"
                                    name="contact_person_surname"
                                    value={formData.lead.contact_person_surname} readOnly
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.lead.email} readOnly
                                className={`w-full border border-gray-300 rounded-md p-2`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.lead.address} readOnly
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.lead.phone} readOnly
                                className={`w-full border border-gray-300 rounded-md p-2`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Website</label>
                            <input
                                type="text"
                                name="website"
                                value={formData.lead.website} readOnly
                                className={`w-full border border-gray-300 rounded-md p-2`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Size</label>
                            <select
                                name="size"
                                value={formData.lead.size} disabled
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
                                value={formData.lead.industry} disabled
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
                                value={formData.lead.notes} readOnly
                                className="w-full border border-gray-300 rounded-md p-2 h-[300px]"
                            ></textarea>

                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="top_lead"
                                checked={formData.lead.top_lead} disabled
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <label className="text-sm ml-2">Mark as a Top Lead</label>
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
                                name="expected_value"
                                value={formData.expected_value}
                                onChange={handleChange}
                                className={`w-full border ${errorFields.expected_value ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            />
                            {errorFields.expected_value && (
                                <p className="text-red-500 text-sm">{errorFields.expected_value}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button
                        type="submit"
                        className="bg-gray-900 text-white px-10 py-3 w-1/3 rounded-md shadow"
                    >
                        Update Pipeline
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

export default EditPipelinePage;