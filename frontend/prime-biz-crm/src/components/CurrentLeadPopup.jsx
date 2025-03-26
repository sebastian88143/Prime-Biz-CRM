import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

const CurrentLeadPopup = ({ isOpen, selectedLead, onClose, onLeadDeleted }) => {
    if (!isOpen || !selectedLead) return null;

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    const handleEditLead = () => {
        onClose();
        navigate(`/lead/${selectedLead.id}`, { state: { lead: selectedLead } });
    };

    const handleAddPipeline = () => {
        onClose();
        navigate(`/add_pipeline/${selectedLead.id}`, { state: { lead: selectedLead } });
    };

    const handleDeleteLead = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/delete_lead/${selectedLead.id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Lead deleted successfully!");
                setMessageType("success");
                setTimeout(() => {
                    onClose();
                    if (onLeadDeleted) {
                        onLeadDeleted();
                    }
                }, 1500);
            } else {
                setMessage(data.error || "Something went wrong.");
                setMessageType("error")
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            setMessageType("error");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs">
            <div className="bg-white p-12 rounded-lg shadow-lg w-1/2 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">Selected Lead: {selectedLead.company_name}</h2>
                <p className="text-sm text-gray-500 mb-4 text-center">Choose an action for the selected lead:</p>

                <div className="flex space-x-4 mb-4 justify-center">
                    <button
                        onClick={handleEditLead}
                        className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        <FaEdit className="mr-2" /> Edit Lead
                    </button>

                    <button
                        onClick={handleAddPipeline}
                        className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        <FaPlus className="mr-2" /> Add Pipeline
                    </button>

                    <button
                        onClick={handleDeleteLead}
                        className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        <FaTrash className="mr-2" /> Delete Lead
                    </button>
                </div>

                <button onClick={onClose} className="w-full bg-blue-500 text-white py-2 rounded">
                    Close
                </button>

                {message && (
                    <div
                        className={`w-full p-3 text-center mt-6 rounded ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrentLeadPopup;